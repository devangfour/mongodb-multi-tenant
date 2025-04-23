import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class AuthController {
    async login({ request, auth, response }: HttpContext) {
      try {
        console.log('=== Login Controller Started ===')
        console.log('Request method:', request.method())
        console.log('Request URL:', request.url())
        console.log('Request headers:', request.headers())
        
        const { email, password } = request.all()
        console.log('Login attempt for email:', email)
        console.log('Password received:', password)
    
        const user = await User.findBy('email', email)
        console.log('User found:', user ? 'Yes' : 'No')
        if (user) {
          console.log('User details:', {
            id: user.id,
            email: user.email,
            role: user.role,
            hasPassword: !!user.password,
            passwordHash: user.password
          })

          // Test password verification
          const isPasswordValid = await hash.verify(user.password, password)
          console.log('Password verification result:', isPasswordValid)
          
          // Test creating a new hash with the same password
          const newHash = await hash.make(password)
          console.log('New hash for same password:', newHash)
          console.log('Verification with new hash:', await hash.verify(password, newHash))
        }
        
        if (user && await hash.verify(user.password, password)) {
          console.log('Password verified successfully')
          await auth.use('web').login(user)
          console.log('User logged in successfully')
          
          // Redirect based on user role
          if (user.role === 'admin') {
            return response.redirect().toPath('/admin/dashboard')
          } else {
            return response.redirect().toPath('/client/dashboard')
          }
        }
    
        console.log('Login failed - invalid credentials')
        return response.status(401).json({ message: 'Invalid credentials' })
      } catch (error) {
        console.error('Login error:', error)
        return response.status(500).json({ message: 'Internal server error' })
      }
    }
  
    async logout({ auth, response }: HttpContext) {
      try {
        await auth.use('web').logout()
        return response.redirect().toPath('/login')
      } catch (error) {
        console.error('Logout error:', error)
        return response.status(500).json({ message: 'Internal server error' })
      }
    }
}
  