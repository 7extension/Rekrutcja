import { Command } from '../../interfaces'
import { SlashCommandBuilder } from '@discordjs/builders'
const { Modal, TextInputComponent, showModal } = require('discord-modals')

export const command: Command = {
  data: new SlashCommandBuilder().setName('rekrutacja').setDescription('Rekrutacja na pomocnika!'),
  run: async (interaction) => {
    const form = new Modal()
      .setCustomId('application' + interaction.user.id)
      .setTitle(' ')
      .addComponents(
        new TextInputComponent()
        .setCustomId('question1' + interaction.user.id)
        .setLabel('Dlaczego akurat ty?')
        .setStyle('LONG') // SHORT or LONG
        .setMinLength(4)
        .setMaxLength(120)
        .setPlaceholder('Napisz, dlaczego akurat ty zasługujesz na to stanowisko')
        .setRequired(true)
    )
    .addComponents(
      new TextInputComponent()
        .setCustomId('question2' + interaction.user.id)
        .setLabel('Jak masz na imie?')
        .setStyle('SHORT') // SHORT or LONG
        .setMinLength(2)
        .setMaxLength(10)
        .setPlaceholder('Napisz jak masz na imie!')
        .setRequired(true)
    )
    .addComponents(
      new TextInputComponent()
        .setCustomId('question3' + interaction.user.id)
        .setLabel('Co byś wprowadził do naszego serwera?')
        .setStyle('SHORT') // SHORT or LONG
        .setMinLength(10)
        .setMaxLength(120)
        .setPlaceholder('Wpisz tu co byś wprowadził do naszego serwera')
        .setRequired(true)
    )
    .addComponents(
      new TextInputComponent()
        .setCustomId('question4' + interaction.user.id)
        .setLabel('Ile masz lat?')
        .setStyle('SHORT') // SHORT or LONG
        .setMinLength(2)
        .setMaxLength(2)
        .setPlaceholder('Wpisz tutaj ile masz lat')
        .setRequired(true)
    )
    .addComponents(
      new TextInputComponent()
        .setCustomId('question5' + interaction.user.id)
        .setLabel('Jakie masz doświadczenie?')
        .setStyle('LONG') // SHORT or LONG
        .setMinLength(10)
        .setMaxLength(120)
        .setPlaceholder('Wpisz tutaj jakie masz doświadczenie w pełnieniu podobnych funkcji')
        .setRequired(true)
    )

    /// you can add more questions here

    showModal(form, {
      client: interaction.client,
      interaction: interaction,
    })
  },
}
