import Guild from '#models/guild'
import GW2Service from '#services/gw2_service'
import { createGuildValidator, editGuildValidator } from '#validators/guild'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GuildsPresenter } from '#presenters/guilds_presenter'
import env from '#start/env'
import Category from '#models/category'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import logger from '@adonisjs/core/services/logger'
import { editGuild, removeGuild } from '#abilities/main'

@inject()
export default class GuildsController {
  constructor(
    protected gw2Service: GW2Service,
    protected presenter: GuildsPresenter
  ) {}

  async index({ request, inertia, auth }: HttpContext) {
    await auth.check()
    const page = request.input('page', 1)

    const guilds = await Guild.query().preload('owner').preload('categories').paginate(page, 30)

    const guildsWithDetails = await Promise.all(
      guilds.map(async (guild) => ({
        details: await this.gw2Service.getGuild(
          guild.owner?.gw2ApiKey ?? env.get('GW2_API_KEY'),
          guild.gw2GuildId
        ),
        ...guild.serialize(),
      }))
    )

    return await inertia.render('guilds/list', { guilds: guildsWithDetails })
  }

  async create({ response, inertia, auth }: HttpContext) {
    const user = await auth.getUserOrFail()

    if (!user.gw2ApiKey) {
      return response.redirect().back()
    }

    const gw2Account = await this.gw2Service.getAccount(user.gw2ApiKey)

    const guilds = await Promise.all(
      gw2Account.guild_leader.map(async (guildId) => {
        return await this.gw2Service.getGuild(user.gw2ApiKey, guildId)
      })
    )

    const categories = await Category.query()

    return await inertia.render('guilds/create', { guilds, categories })
  }

  async store({ response, request, auth }: HttpContext) {
    const user = await auth.getUserOrFail()

    const { thumbnail, categories, ...payload } = await request.validateUsing(createGuildValidator)

    const guild = await user.related('guilds').create(payload)

    if (categories) {
      await guild.related('categories').attach(categories)
    }

    if (thumbnail) {
      const fileUrl = `${cuid()}.${thumbnail.extname}`
      await thumbnail.move(app.makePath('uploads', 'guilds'), {
        name: fileUrl,
      })
      await guild.merge({ thumbnail: '/uploads/guilds/' + fileUrl }).save()
    }

    return response.redirect().back()
  }

  async show({ inertia, request }: HttpContext) {
    const guildId = request.param('id')

    const guild = await Guild.query()
      .where('id', guildId)
      .preload('owner')
      .preload('categories')
      .firstOrFail()

    const guildDetails = await this.gw2Service.getGuild(guild.owner.gw2ApiKey, guild.gw2GuildId)

    return await inertia.render('guilds/show', { guild, guildDetails })
  }

  async edit({ params, inertia }: HttpContext) {
    const guild = await Guild.query()
      .where('id', params.id)
      .preload('owner')
      .preload('categories')
      .firstOrFail()

    const categories = await Category.query()

    return await inertia.render('guilds/edit', { guild, categories })
  }

  async update({ params, bouncer, request, response }: HttpContext) {
    const guild = await Guild.findOrFail(params.id)

    if (await bouncer.denies(editGuild, guild)) {
      return response.abort({ message: 'Cannot edit guild.' }, 403)
    }

    const { thumbnail, ...payload } = await request.validateUsing(editGuildValidator)

    if (thumbnail) {
      const fileUrl = `${cuid()}.${thumbnail.extname}`
      await thumbnail.move(app.makePath('uploads', 'guilds'), {
        name: fileUrl,
      })
      await guild.merge({ thumbnail: '/uploads/guilds/' + fileUrl }).save()
    }

    await guild.merge(payload).save()
    await response.redirect().back()
  }

  async remove({ bouncer, params, response }: HttpContext) {
    const guild = await Guild.findOrFail(params.id)

    if (await bouncer.denies(removeGuild, guild)) {
      return response.abort({ message: 'Cannot remove guild.' }, 403)
    }

    await guild.delete()
    return response.redirect().back()
  }
}
