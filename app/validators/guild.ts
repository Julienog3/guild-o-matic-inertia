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

export const editGuildValidator = vine.compile(
  vine.object({
    discordLink: vine.string().optional(),
    categories: vine.array(vine.number()).optional(),
    description: vine.string(),
    isRecruiting: vine.boolean(),
    thumbnail: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'png'],
      })
      .optional(),
  })
)
