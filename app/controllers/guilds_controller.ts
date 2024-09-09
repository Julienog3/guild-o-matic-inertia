import Guild from '#models/guild'
import GW2Service from '#services/gw2_service'
import { createGuildValidator } from '#validators/guild'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class GuildsController {
  constructor(protected gw2Service: GW2Service) {}

  async index({ inertia }: HttpContext) {
    const guilds = await Guild.query().preload('owner')

    const guildsWithData = await Promise.all(
      gw2Account.guild_leader.map(async (guildId) => {
        return await this.gw2Service.getGuild(user.gw2ApiKey, guildId)
      })
    )
    return await inertia.render('guilds/list', { guilds })
  }

  async create({ inertia, auth }: HttpContext) {
    const user = await auth.getUserOrFail()

    if (!user.gw2ApiKey) {
      return
    }

    const gw2Account = await this.gw2Service.getAccount(user.gw2ApiKey)

    const guilds = await Promise.all(
      gw2Account.guild_leader.map(async (guildId) => {
        return await this.gw2Service.getGuild(user.gw2ApiKey, guildId)
      })
    )

    return await inertia.render('guilds/create', { guilds })
  }

  async store({ response, request, auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const payload = await request.validateUsing(createGuildValidator)

    logger.info(user)
    logger.info(payload)

    const guild = await user.related('guilds').create(payload)
    return response.redirect().back()
  }
}
