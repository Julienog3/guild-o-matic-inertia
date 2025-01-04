import { TokenType } from "#models/token";
import User from "#models/user";
import string from '@adonisjs/core/helpers/string'
import hash from "@adonisjs/core/services/hash";
import { DateTime } from "luxon";

export class TokenService {
  public async generateEmailVerificationToken(user: User | null) {
    const content = string.generateRandom(64)
    const hashedContent = await hash.make(content)

    if (!user) return content

    await user.related('tokens').create({
      type: TokenType.EMAIL_VERIFICATION,
      expiresAt: DateTime.now().plus({ hours: 24 }),
      content: hashedContent
    })

    return content
  }
  
  public async getUserEmailVerificationToken(user: User) {
    return await user.related('tokens')
      .query()
      .where('type', TokenType.EMAIL_VERIFICATION)
      .firstOrFail()
  }
}