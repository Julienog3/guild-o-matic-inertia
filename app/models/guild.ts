import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  computed,
  manyToMany,
} from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { inject } from '@adonisjs/core'
import string from '@adonisjs/core/helpers/string'
import Category from './category.js'

@inject()
export default class Guild extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare gw2GuildId: string

  @column()
  declare discordLink?: string

  @column()
  declare description: string

  @column()
  declare isRecruiting: boolean

  @column()
  declare thumbnail?: string

  @column()
  declare ownerId: string

  @belongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  declare owner: BelongsTo<typeof User>

  @manyToMany(() => Category, {
    pivotTable: 'guild_categories',
  })
  declare categories: ManyToMany<typeof Category>

  @computed()
  get excerpt() {
    return string.truncate(this.description, 50)
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUUID(guild: Guild) {
    guild.id = randomUUID()
  }
}
