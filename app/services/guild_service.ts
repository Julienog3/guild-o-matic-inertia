import Guild from '#models/guild'
import { inject } from '@adonisjs/core'
import GW2Service from '#services/gw2_service'
import env from '#start/env'

const LIMIT = 30

@inject()
export default class GuildService {
  constructor(protected gw2Service: GW2Service) {}

  async all(page: number) {
    const guilds = await Guild.query().preload('owner').paginate(page, LIMIT)

    const guildsWithDetails = await Promise.all(
      guilds.map(async (guild) => ({
        details: await this.gw2Service.getGuildDetails(
          env.get('GW2_API_KEY'),
          guild.gw2GuildId
        ),
        ...guild.serialize(),
      }))
    )

    return guildsWithDetails
  }

  async find(id: string) {
    return await Guild.query()
      .where('id', id)
      .preload('owner')
      .preload('categories')
      .firstOrFail()
  } 
}
