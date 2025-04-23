import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminOnlyMiddleware {
  async handle({auth, response}: HttpContext, next: NextFn) {
    if(auth.user?.role === 'client') {
      return response.redirect().toPath('/client/dashboard');
    }
    if (auth.user?.role !== 'admin') {
      return response.unauthorized('Access denied')
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}