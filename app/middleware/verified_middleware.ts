import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

export default class VerifiedMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/sign-in'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    if (!ctx.auth.user || !ctx.auth.user.isEmailVerified) {
      return ctx.response.redirect(this.redirectTo, true)
    }

    return next()
  }
}
