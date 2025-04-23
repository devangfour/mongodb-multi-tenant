import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'db_instances'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.string('fly_app_name').notNullable()
      table.string('region').notNullable()
      table.string('connection_uri').notNullable()
      table.string('status').defaultTo('stopped')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}