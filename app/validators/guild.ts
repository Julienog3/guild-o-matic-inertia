import vine from '@vinejs/vine'

export const createGuildValidator = vine.compile(
  vine.object({
    gw2GuildId: vine.string(),
    discordLink: vine.string().optional(),
    categories: vine.array(vine.number()),
    description: vine.string(),
    thumbnail: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
  })
)
