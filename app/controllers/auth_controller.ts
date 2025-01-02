import User from '#models/user'
import { registerUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class AuthController {
  async signIn({ inertia }: HttpContext) {
    return await inertia.render('auth/sign_in')
  }

  async signUp({ inertia }: HttpContext) {
    return await inertia.render('auth/sign_up')
  }

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    return await response.redirect('/guilds')
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    await User.create(payload)
    return await response.redirect('/sign-in')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('/')
  }
}
