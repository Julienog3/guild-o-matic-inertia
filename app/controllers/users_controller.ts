import Guild from '#models/guild'
import GW2Service from '#services/gw2_service'
import { getAccountValidator, updateUserValidator } from '#validators/profile'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

export default class UsersController {
  async index({ inertia }: HttpContext) {
    return await inertia.render('profile/profile')
  }

  @inject()
  async guilds({ auth, inertia }: HttpContext, gw2Service: GW2Service) {
    const user = await auth.getUserOrFail()

    const guilds = await Guild.query()
      .where('owner_id', user.id)
      .preload('owner')
      .preload('categories')

    const guildsWithDetails = await Promise.all(
      guilds.map(async (guild) => ({
        details: await gw2Service.getGuild(
          guild.owner?.gw2ApiKey ?? env.get('GW2_API_KEY'),
          guild.gw2GuildId
        ),
        ...guild.serialize(),
      }))
    )

    return await inertia.render('profile/guilds', { guilds: guildsWithDetails })
  }

  @inject()
  async getGW2Account({ request, response }: HttpContext, gw2Service: GW2Service) {
    const { accessToken } = await request.validateUsing(getAccountValidator)
    const account = await gw2Service.getAccount(accessToken)

    return response.send({ account })
  }

  async update({ auth, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const payload = await request.validateUsing(updateUserValidator)

    await user.merge(payload).save()
    response.redirect().back()
  }
}
