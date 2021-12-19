import { ICommand } from "wokcommands";

const actions = ['give', 'remove', 'has'];

export default {
    category: 'Moderation',
    description: 'Gives a role to the user.',
    permissions: ['MANAGE_ROLES'],
    minArgs: 3,
    expectedArgs: `<"${actions.join('", "')}"> <user @> <role @>`,
    slash: "both",
    testOnly: true,
    guildOnly: true,
    options: [
        {
            name: 'action',
            description: `The action to preform. One of: ${actions.join(', ')}`,
            type: 'STRING',
            required: true,
            choices: actions.map((action) => ({
                name: action,
                value: action,
            })),
        },
        {
            name: 'user',
            description: 'The user to preform te action on.',
            type: 'USER',
            required: true,
        },
        {
            name: 'role',
            description: 'The role to preform te action on.',
            type: 'ROLE',
            required: true,
        },
    ],

    callback: ({ guild, args }) => {
        const action = args.shift();
        if (!action || !actions.includes(action)) {
            return `Unkown action. Please use one of the following: ${actions.join(', ')}`;
        }

        const memberId = args.shift()!.replace(/[<@!&>]/g, '');
        const roleId = args.shift()!.replace(/[<@!&>]/g, '');
        const member = guild!.members.cache.get(memberId);
        const role = guild!.roles.cache.get(roleId);

        if (!member) {
            return `Could not find member with the ID ${memberId}`;
        }

        if (!role) {
            return `Could not find role with the ID ${roleId}`;
        }

        if (action === 'has') {
            return member.roles.cache.has(roleId) ? 'User has role.' : 'User does not have role.';
        }

        if (action === 'give') {
            member.roles.add(role);
            return 'Role given';
        }

        if (action === 'remove') {
            member.roles.remove(role);
            return 'Role removed';
        }

        return 'Unkown action.';
    }
} as ICommand;