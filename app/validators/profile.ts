import vine from '@vinejs/vine'

export const getAccountValidator = vine.compile(
  vine.object({
    accessToken: vine.string().trim().optional(),
  })
)

export const updateUserValidator = vine.compile(
  // @ts-expect-error
  vine.object({
    username: vine.string().trim().optional(),
    email: vine.string().email().optional(),
    gw2ApiKey: vine.string().trim().optional(),
  })
)
