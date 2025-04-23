import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ClientOnlyMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    if (auth.user?.role === 'admin') {
      return response.redirect().toPath('/admin/dashboard');
    }
    
    if (auth.user?.role !== 'client') {
      return response.unauthorized('Access denied')
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}