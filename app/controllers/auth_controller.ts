import User from '#models/user'
import { TokenService } from '#services/token_service'
import { registerUserValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'

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

  @inject()
  async register({ auth, request, response }: HttpContext, tokenService: TokenService) {
    const payload = await request.validateUsing(registerUserValidator)

    const user = await User.create(payload)
    const token = await tokenService.generateEmailVerificationToken(user)

    await auth.use('web').login(user)
    // const domain = Env.get

    const url = router
      .builder()
      .prefixUrl('http://localhost:3333')
      .qs({ token })
      .makeSigned('auth.verify_email', {
        expiresIn: '3 days',
      })

    await mail.send((message) => {
      message
        .to(payload.email)
        .from('contact@guild-o-matic.fr')
        .subject('📧 Vérification de votre adresse email')
        .htmlView('emails/verify_email', { url })
    })

    return await response.redirect().toRoute('auth.email_verification')
  }

  @inject()
  async verifyEmail({ auth, inertia, request }: HttpContext, tokenService: TokenService) {
    const user = await auth.getUserOrFail()
    const { token } = request.qs()

    const { content: userToken } = await tokenService.getUserEmailVerificationToken(user)

    if (await hash.verify(userToken, token)) {
      await user.merge({ isEmailVerified: true }).save()
    }

    return await inertia.render('auth/verify_email')
  }

  async emailVerification({ inertia }: HttpContext) {
    return await inertia.render('auth/email_verification')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('/')
  }
}
