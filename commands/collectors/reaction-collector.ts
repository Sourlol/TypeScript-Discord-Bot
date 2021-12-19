import { Message, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'testing',

    callback: ({ message, channel }) => {
        message.reply('Please confirm this action');
        message.react('👍');

        const filter = (reaction: MessageReaction, user: User) => {
            return user.id === message.author.id;
        }

        const collector = message.createReactionCollector({
            filter,
            max: 1,
            time: 5000,
        })

        collector.on('collect', (reaction) => {
            console.log(message.author.id, ': ', reaction.emoji.name);
        })

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.reply('You did not react in time')
                return;
            }

            let text = 'Collected:\n\n';

            collected.forEach((message) => {
                text += `${message.emoji.name}\n`;
            })

            message.reply(text)
        })
    }
} as ICommand;