import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        name: 'PVP',
      },
      {
        name: 'PVE',
      },
      {
        name: 'MCM',
      },
    ])
    // Write your database queries inside the run method
  }
}
