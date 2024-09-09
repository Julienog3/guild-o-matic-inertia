import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Guild extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare ownerId: string

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @column()
  declare gw2GuildId: string

  @column()
  declare discordLink?: string

  @column()
  declare description: string

  @column()
  declare thumbnailUrl?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUUID(guild: Guild) {
    guild.id = randomUUID()
  }
}
