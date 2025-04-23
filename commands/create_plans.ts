import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'

import Plan from '#models/plan'

export default class CreatePlans extends BaseCommand {
  static commandName = 'create:plans'
  static description = 'Create static plans in the database'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const plans = [
      {
        name: 'Basic',
        description: 'Basic plan with limited features',
        db_limit: 1,
        price: 9.99
      },
      {
        name: 'Professional',
        description: 'Professional plan with more features',
        db_limit: 3,
        price: 19.99
      },
      {
        name: 'Enterprise',
        description: 'Enterprise plan with all features',
        db_limit: 10,
        price: 49.99
      }
    ]

    for (const planData of plans) {
      const existingPlan = await Plan.findBy('name', planData.name)
      
      if (existingPlan) {
        this.logger.info(`Plan ${planData.name} already exists, skipping...`)
        continue
      }

      const plan = new Plan()
      plan.name = planData.name
      plan.description = planData.description
      plan.db_limit = planData.db_limit
      plan.price = planData.price

      await plan.save()
      this.logger.success(`Created plan: ${planData.name}`)
    }

    this.logger.success('All plans created successfully!')
  }
} 