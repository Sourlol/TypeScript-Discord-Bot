import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Replies with pong',
    slash: 'both', // true: slash
    testOnly: true, // true: registers instantly, false: registers in up to an hour (global)

    callback: ({ }) => {
        return 'Pong';
    }
} as ICommand;

