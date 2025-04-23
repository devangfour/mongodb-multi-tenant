import type { HttpContext } from '@adonisjs/core/http'

export async function login({ auth, request, response }: HttpContext) {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const user = await auth.use('web').attempt(email, password)

    return response.redirect(user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard')
  } catch {
    return response.status(401).send({ message: 'Invalid credentials' })
  }
}

export async function logout({ auth, response }: HttpContext) {
  await auth.logout()
  return response.redirect('/login')
}
