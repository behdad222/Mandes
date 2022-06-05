import { Hook } from '../models/hook';
import { Message, TextChannel } from 'discord.js';

export class TicketHook extends Hook {
    targetChannelId = '';

    constructor(targetChannelId: string) {
        super()
        this.targetChannelId = targetChannelId;
    }

    isEligible(msg: Message<boolean>): boolean {
        console.log(msg.channel.type);

        if (msg.channel.type !== 'DM') {
            return false;
        }

        if (msg.author.bot) {
            return false;
        }

        return true;
    }

    async handler(msg: Message): Promise<void> {
        const channel = await msg.client.channels.fetch(this.targetChannelId);

        await (channel as TextChannel).send({
            content: 'Dear Admins, You have a new message:',
            embeds: [{
                author: {
                    name: msg.author.username,
                    iconURL: msg.author.avatarURL(),
                },
                description: msg.content
            }]
        });

        msg.reply(' :ok_hand_tone2: پیام شما با موفقیت دریافت شد.')
    }
}