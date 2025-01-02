import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  //  @ts-expect-error
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(6)
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    email: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    gw2ApiKey: vine.string().trim().optional(),
    password: vine.string().trim().minLength(7).escape().confirmed(),
  })
)
