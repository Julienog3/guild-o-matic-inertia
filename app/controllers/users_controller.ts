import GW2Service from '#services/gw2_service'
import { getAccountValidator, updateUserValidator } from '#validators/profile'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
// import logger from '@adonisjs/core/services/logger'

export default class UsersController {
  async index({ inertia }: HttpContext) {
    return await inertia.render('profile/profile')
  }

  @inject()
  async getGW2Account({ request, response }: HttpContext, service: GW2Service) {
    const { accessToken } = await request.validateUsing(getAccountValidator)
    const account = await service.getAccount(accessToken)
    logger.info({ account })
    return response.send({ account })
  }

  async update({ auth, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const payload = await request.validateUsing(updateUserValidator)

    await user.merge(payload).save()
    response.redirect().back()
  }
}
