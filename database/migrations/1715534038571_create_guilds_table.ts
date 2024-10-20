import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'guilds'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('owner_id').references('users.id').onDelete('CASCADE')
      table.string('gw_2_guild_id').notNullable()
      table.string('discord_link').nullable()
      table.string('description').notNullable()
      table.string('thumbnail').nullable()
      table.boolean('is_recruiting').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
