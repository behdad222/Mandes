import { Hook } from '../models/hook';
import { Message } from 'discord.js';

export class AnonymousMessageHook extends Hook {
    channels: string[] = [];

    constructor(channels: string[]) {
        super();
        this.channels = channels;
    }

    isEligible(msg: Message<boolean>): boolean {
        if (this.channels.indexOf(msg.channel.id) === -1) {
            return false;
        }

        return true;
    }

    async handler(msg: Message): Promise<void> {
        const mentionedUser = msg.mentions.users.first();
        if (mentionedUser) {
            console.log(msg.content);

            mentionedUser.send({
                content: 'شما یک پیام جدید دریافت کردید!',
                embeds: [{
                    color: 'LIGHT_GREY',
                    description: msg.content.replace(/<@!?[0-9]+>/g, ''),
                }],
            });
        }
    }
}