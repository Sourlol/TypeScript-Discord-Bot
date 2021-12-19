import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Sends an embed.',
    permissions: ['ADMINISTRATOR'],
    // slash command defining is not needed is not used/wanted (+ embeds are incompatible)

    callback: async ({ message, text }) => { // must be async for await on teh message reply embed send
        const json = JSON.parse(text);

        const embed = new MessageEmbed(json);

        return embed;

        /* HOW TO SEND EMBED REGULARLY
        const embed = new MessageEmbed()
            .setDescription("Description")
            .setTitle("Title")
            .setColor('RANDOM')
            .setAuthor('Sour')
            .setFooter('Footer')
            .addFields([{
                name: 'name',
                value: 'value',
                inline: true //puts fields on same line
            },
            {
                name: 'name2',
                value: 'value2',
                inline: true
            }])
            .addField('name3', 'value3');

        const newMessage = await message.reply({ // await allows editing 
            embeds: [embed]
        })
        await new Promise(resolve => setTimeout(resolve, 5000));

        const newEmbed = newMessage.embeds[0];
        newEmbed.setTitle('Edited Title');
        newMessage.edit({
            embeds: [newEmbed]
        })
        */


    }
} as ICommand;