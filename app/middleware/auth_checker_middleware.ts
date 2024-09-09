import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthCheckerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    ctx.inertia.share({
      user: async (context: HttpContext) => {
        await context.auth.check()
        return context.auth?.user
      },
    })

    return next()
  }
}
