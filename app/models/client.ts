import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Plan from '#models/plan'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare db_name: string

  @column()
  declare fly_app_name: string

  @column()
  declare status: 'running' | 'stopped'

  @column()
  declare plan_id: number

  @belongsTo(() => Plan, {
    foreignKey: 'plan_id'
  })
  declare plan: BelongsTo<typeof Plan>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
