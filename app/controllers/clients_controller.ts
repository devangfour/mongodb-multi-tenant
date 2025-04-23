import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'
import Plan from '#models/plan'
import hash from '@adonisjs/core/services/hash'

export default class ClientsController {
  async index({ inertia }: HttpContext) {
    const clients = await Client.query().preload('plan')
    const plans = await Plan.all()

    return inertia.render('Admin/Dashboard', {
      clients,
      plans,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'password', 'plan_id'])

    // generate DB + Fly.io logic would go here
    const dbName = `tenant_${Date.now()}`
    const flyAppName = `flyapp-${dbName}`

    await Client.create({
      ...data,
      password: await hash.make(data.password),
      db_name: dbName,
      fly_app_name: flyAppName,
    })

    return response.redirect().back()
  }
}
