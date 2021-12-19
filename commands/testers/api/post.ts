import axios from 'axios';
import { ICommand } from "wokcommands";

export default {
    category: 'API Testing',
    description: 'Example of a GET request.',
    permissions: ['ADMINISTRATOR'],
    slash: 'both',
    testOnly: true,

    callback: async ({ args }) => {
        const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts',
            {
                title: 'Sour the developer',
                body: 'javascript, node.js, etc.'
            },
            {
                headers: { 'Content-Type': 'application/json' }
            },
        )

        console.log(data);
    }
} as ICommand;