import Guild from '#models/guild'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { GW2GuildAuthenticated } from '../types/gw2.js'

@inject()
export class GuildsPresenter {
  async toJson(guilds: ModelPaginatorContract<Guild & { details: GW2GuildAuthenticated }>) {
    return {
      meta: guilds.getMeta(),
      data: guilds.map((guild) => ({
        id: guild.id,
        gw2_guild_id: guild.gw2GuildId,
        owner: {
          id: guild.owner.id,
          username: guild.owner.username,
        },
      })),
    }
  }
}
