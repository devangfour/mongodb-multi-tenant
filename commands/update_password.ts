import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UpdatePassword extends BaseCommand {
  static commandName = 'update:password'
  static description = 'Update user password with proper hashing'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    try {
      const email = 'client@example.com'
      const password = 'password123'

      const user = await User.findBy('email', email)
      if (!user) {
        this.logger.error(`User with email ${email} not found`)
        return
      }

      // Update user's password - model will handle hashing automatically
      user.password = password
      await user.save()

      console.log('User password:', user.password)

      // Verify the password using the auth system's verification
      const authUser = await User.findBy('email', email)
      if (authUser) {
        console.log('Auth user:', authUser.password) 
        const authValid = await hash.verify(authUser.password, password)
        console.log('Auth system verification test:', authValid)
      }

      this.logger.success('Password updated successfully')
    } catch (error) {
      this.logger.error('Error updating password:', error)
    }
  }
} 