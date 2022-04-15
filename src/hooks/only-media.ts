import { Hook } from '../models/hook';
import { Message } from 'discord.js';

export class OnlyMediaHook extends Hook {
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
        const foundImage = msg.attachments.filter(a => a.contentType.includes('image') || a.contentType.includes('video'));
        const arr = Array.from(foundImage);

        if (!arr.length) {
            await msg.author.createDM(true);
            await msg.author.dmChannel.send({
                content: `
                :face_with_monocle:  سلام، متاسفانه پیام شما با محتوای زیر حذف شد. لطفا نظرات خودتون رو در ترد‌ها ارسال کنید!
                
                `,
                embeds: [{
                    author: {
                        name: msg.author.username,
                        iconURL: msg.author.avatarURL(),
                    },
                    description: msg.content
                }]
            });
            await msg.delete();
        }
    }
}