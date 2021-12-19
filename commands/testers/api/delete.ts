import axios from 'axios';
import { ICommand } from "wokcommands";

export default {
    category: 'API Testing',
    description: 'Example of a GET request.',
    permissions: ['ADMINISTRATOR'],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<id>',
    expectedArgsTypes: ['NUMBER'],
    slash: 'both',
    testOnly: true,

    callback: async ({ args }) => {
        let uri = `https://jsonplaceholder.typicode.com/posts/${args[0]}`;

        const { data } = await axios.delete(uri);
        console.log(data);
    }
} as ICommand;