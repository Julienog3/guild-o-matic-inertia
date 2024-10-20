import env from '#start/env'
import { inject } from '@adonisjs/core'
import axios from 'axios'
import { GW2Account, GW2GuildAuthenticated } from '../types/gw2.js'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class GW2Service {
  private client = axios.create({ baseURL: env.get('GW2_API_URL') })

  async getAccount(apiKey?: string): Promise<GW2Account> {
    return await this.client
      .get('/account', {
        headers: {
          Authorization: `Bearer ${apiKey ?? env.get('GW2_API_KEY')}`,
        },
      })
      .then(({ data }) => data)
      .catch((err) => logger.info(err))
  }

  async getGuild(apiKey: string, guildId: string): Promise<GW2GuildAuthenticated> {
    return await this.client
      .get(`/guild/${guildId}`, {
        headers: {
          Authorization: `Bearer ${apiKey ?? env.get('GW2_API_KEY')}`,
        },
      })
      .then(({ data }) => data)
  }
}
