import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import { Repl } from '@adonisjs/repl'

export default class Tinker extends BaseCommand {
  static commandName = 'tinker'
  static description = 'Start the AdonisJS REPL'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const repl = new Repl({
      historyFilePath: this.app.tmpPath('repl_history')
    })
    await repl.start()
  }
} 