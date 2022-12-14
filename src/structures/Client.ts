import '../utils/string.extensions'

import Discord from 'discord.js'
import { Client, Collection, Intents, MessageEmbed } from 'discord.js'
import path from 'path'
import { readdirSync } from 'fs'
import { Command, Event, Config } from '../interfaces'
const discordModals = require('discord-modals')
const { format, parse } = require('date-and-time')
import config from '../config'

export default class InfernoClient extends Client {
  public commands: Collection<string, Command> = new Collection()
  public events: Collection<string, Event> = new Collection()
  public aliases: Collection<string, Command> = new Collection()

  public constructor() {
    super({
      intents: [
        [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES],
      ],
      presence: {
        status: 'idle',
        activities: [{ name: 'Sadie Sink<3', type: 'STREAMING', url: 'https://twitch.tv/p1kaacho72' }],
      },
      partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
    })
  }

  public async init() {
    /* Commands */
    const commandPath = path.join(__dirname, '..', 'commands')
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'))

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`)
        this.commands.set(command.data.name, command)
      }
    })

    /* Events */
    const eventPath = path.join(__dirname, '..', 'events')
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`)
      this.events.set(event.name, event)
      this.on(event.name, event.run.bind(null, this))
    })

    this.login(config.BOT_TOKEN)
    discordModals(this)

    this.on('modalSubmit', (modal) => {
      const logs = this.channels.cache.get(config.APPLICATIONS_LOG_CHANNEL) as Discord.TextChannel
      if (!logs) return console.log('Cannot find log channel')
      const answer1 = modal.getTextInputValue('question1' + modal.user.id)
      const answer2 = modal.getTextInputValue('question2' + modal.user.id)
      const answer3 = modal.getTextInputValue('question3' + modal.user.id)
      const answer4 = modal.getTextInputValue('question4' + modal.user.id)
      const answer5 = modal.getTextInputValue('question5' + modal.user.id)
      //if you added more questions, you can add them answers here
      modal.reply('Dziekujemy za zlozenie wniosku! Rozpatrzymy go najszybciej jak bedzie to mozliwe.')
      let result: string = `**Dlaczego akurat ty?:** ${answer1}\n**Jak masz na imie?:** ${answer2}\n**Co by?? wprowadzi?? do naszego serwera?:** ${answer3}\n**Ile masz lat?:** ${answer4}\n **Jakie masz do??wiadczenie?:** ${answer5}`
      console.log(format(new Date(), 'YYYY/MM/DD HH:mm') + result.replaceAll('**', ' '))
      console.log('-----------------------------------------------------')
      if (result.length > 2040) {
        result =
          'Aplikacja jest za d??uga zobacz konsole.'
        console.log('^^^^ Nie mo??na wys??a?? wiadomo??ci, wyslano w konsoli ^^^^')
        console.log('-----------------------------------------------------')
      }

      const embed = new MessageEmbed()
        .setTitle('Aplikacja od: ' + modal.user.tag)
        .setDescription(result)
        .setTimestamp()
        .setFooter({ text: 'Prosy Najwi??ksze' })
        .setColor('RANDOM')

      logs.send({ embeds: [embed] })
    })
  }
}
