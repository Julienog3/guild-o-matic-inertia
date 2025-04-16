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
import { editGuild, removeGuild } from '#abilities/main'
import GuildService from '#services/guild_service'
import logger from '@adonisjs/core/services/logger'
import GuildDto from '../dto/guild.js'

@inject()
export default class GuildsController {
  constructor(
    protected gw2Service: GW2Service,
    protected guildService: GuildService,
    protected presenter: GuildsPresenter
  ) {}

  async index({ request, inertia }: HttpContext) {
    const page = request.input('page', 1)

    const { is_recruiting, categories } = request.qs()

    let guildsQuery = Guild.query().preload('owner').preload('categories')
    const allCategories = await Category.query()

    if (is_recruiting) {
      guildsQuery.where('is_recruiting', is_recruiting)
    }

    if (categories) {
      const categoriesSelected = typeof categories === 'string' ? [categories] : categories

      categoriesSelected.forEach((category: string) => {
        guildsQuery.whereHas('categories', (categoriesQuery) => {
          categoriesQuery.where('category_id', Number(category))
        })
      })
    }

    const guilds = await guildsQuery.paginate(page, 10)

    const guildsWithDetails = {
      meta: guilds.getMeta(),
      data: await Promise.all(
        guilds.map(async (guild) => ({
          ...guild.serialize(),
          details: await this.gw2Service.getGuildDetails(env.get('GW2_API_KEY'), guild.gw2GuildId),
        }))
      ),
    }

    return await inertia.render('guilds/list', {
      guilds: guildsWithDetails,
      categories: allCategories,
    })
  }

  async create({ response, inertia, auth }: HttpContext) {
    const user = await auth.getUserOrFail()

    if (!user.gw2ApiKey) {
      return response.abort({ message: "User can't create guild without API key" }, 403)
      // return response.redirect().back()
    }

    const gw2Account = await this.gw2Service.getAccount(user.gw2ApiKey)

    const guilds = await Promise.all(
      gw2Account.guild_leader.map(async (guildId) => {
        return await this.gw2Service.getGuildDetails(user.gw2ApiKey, guildId)
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

  async show({ inertia, params, auth }: HttpContext) {
    const { id } = params
    await auth.check()

    const guild = await this.guildService.find(id)
    const guildToJson = new GuildDto(guild).toJson()

    const guildWithDetails = {
      ...guildToJson,
      details: await this.gw2Service.getGuildDetails(guild.owner.gw2ApiKey, guild.gw2GuildId),
    }

    const isOwner = auth.isAuthenticated && auth?.user?.id === guild.owner.id

    // const guildWithDetails = { ...guild.serialize() } as Guild & GW2GuildAuthenticated

    return await inertia.render('guilds/show', { guild: guildWithDetails, isOwner })
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
    response.redirect().toRoute('guilds.show', { id: guild.id })
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
