import DiscordJS, { Intents } from 'discord.js';
import Chalk from 'chalk';
import WOKcmd from 'wokcommands';
import path from 'path';
import mongoose from 'mongoose';
import 'dotenv/config';


const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
})

client.on('ready', async () => {
    await mongoose.connect(process.env.MONGO_URI || '', {
        keepAlive: true
    })

    console.log(Chalk.bold.green('The bot is online'));

    new WOKcmd(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['809574452018151454'],
        botOwners: ['595014081430159405'],
        mongoUri: process.env.MONGO_URI,
    })
})

client.login(process.env.TOKEN);

// ts-node index.ts
// npm run dev

// MongoDB Cluster Password: TnkQmyTIdgyoPtpM