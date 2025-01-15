import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class VerifiedMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/sign-in'

  async handle(ctx: HttpContext, next: NextFn) {
    if (!ctx.auth.user || !ctx.auth.user.isEmailVerified) {
      return ctx.response.redirect(this.redirectTo, true)
    }

    return next()
  }
}
