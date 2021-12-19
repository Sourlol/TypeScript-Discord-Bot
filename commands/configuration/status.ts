import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sets the status of the bot.',
    minArgs: 1,
    expectedArgs: '<status>',
    slash: 'both',
    testOnly: true,
    ownerOnly: true,

    callback: ({ client, text }) => {
        client.user?.setPresence({
            status: 'dnd',
            activities: [
                {
                    name: text,
                    type: 'WATCHING',
                }
            ],
        })

        return {
            custom: true,
            content: 'Status updated',
            ephemeral: true,
        }
    }
} as ICommand;