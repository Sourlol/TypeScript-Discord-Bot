import { ButtonInteraction, Interaction, MessageActionRow, MessageButton } from "discord.js"; // auto imports with ctrl + SPACE
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'testing',
    slash: true,
    testOnly: true,

    callback: async ({ message, interaction: msgInt, channel, guild }) => { // this thing "interaction: msgInt" renames the parameter to whaterver is listed after the colon. Only in TS
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_yes') //name for btn in code
                    // .setDisabled() // false by default, but if it is present it will be true 
                    .setEmoji('🔨')
                    .setLabel('Confirm') // anme on MessageButton
                    .setStyle('SUCCESS') // the color
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_no')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
            )

        const linkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://sourdev.com/') // no custom id if using setURL
                    .setLabel('Vist My Website') // required for setURl
                    .setStyle('LINK') // required for setURl
            )

        await msgInt.reply({
            content: 'Are you sure?',
            components: [row, linkRow], // defined earlier
            ephemeral: true,
        })

        const filter = (btnInt: Interaction) => {
            return msgInt.user.id === btnInt.user.id; // this is unnessacary because ephemeral: true
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 15000,
        })

        collector.on('collect', (i: ButtonInteraction) => {
            i.reply({
                content: 'You clicked a button.',
                ephemeral: true,
            })
        })

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })

            if (collection.first()?.customId === 'ban_yes') {
                // const person = Interaction.guild.members.cache.get('595014081430159405');
                // const channel = '910286269626613810';

                // const person = channel.guild.members.cache.get('595014081430159405') || ''

                // person!.send('test');

                // const person = channel.guild.members.cache.get('595014081430159405'); // dming a user

                // if (!person) throw new Error("Failed to find person in the cache");

                // person.send("test pls work");

                const person = channel.guild.members.cache.get('595014081430159405'); // dming a user

                if (!person) throw new Error("Failed to find person in the cache");

                person.send("test pls work");

                // await msgInt.reply({
                //     content: 'Sucessfully dmed user',
                // })
            }

            await msgInt.editReply({
                content: 'An action has already been taken.',
                components: [],
            })
        })
    }
} as ICommand;