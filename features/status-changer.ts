import { Client } from "discord.js";

export default (client: Client) => {
    const statusOptions = [
        'hello',
        'world',
        'test',
    ]
    let counter = 0;

    const updateStatus = () => {
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    name: statusOptions[counter],
                }
            ]
        })

        if (++counter >= statusOptions.length) {
            counter = 0;
        }

        setTimeout(updateStatus, 500000); // should be around 3+ mins
    }
    // updateStatus(); // i don't want it to run, that's why it's commented
}

export const config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer',
}