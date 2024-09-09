import vine from '@vinejs/vine'

export const createGuildValidator = vine.compile(
  vine.object({
    gw2GuildId: vine.string(),
    discordLink: vine.string().optional(),
    description: vine.string(),
    thumbnailUrl: vine.string().optional(),
  })
)
