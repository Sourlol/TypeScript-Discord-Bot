import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Clears specified amount of messages.',
    permissions: ['MANAGE_MESSAGES'],
    requireRoles: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',
    slash: 'both',
    testOnly: true,

    callback: async ({ message, interaction, channel, args }) => {
        const amount = parseInt(args.shift()!);

        if (message) {
            await message.delete();
        }

        // Bulk delete
        // const { size } = await channel.bulkDelete(amount, true);

        // Fetch then delete
        const messages = await channel.messages.fetch({ limit: amount });
        const { size } = messages;

        messages.forEach((message) => message.delete());

        const reply = `Deleted ${size} message(s).`;

        if (interaction) {
            return ({
                custom: true,
                content: `Deleted ${size} message(s).`,
                ephemeral: true,
            });
        }
    }
} as ICommand;