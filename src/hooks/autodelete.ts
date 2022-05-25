import { Hook } from '../models/hook';
import { Message } from 'discord.js';

export class AutoDeleteHook extends Hook {
    channels: string[] = [];
    delayMs = 0;

    constructor(channels: string[], delayMs: number) {
        super();
        this.delayMs = delayMs;
        this.channels = channels;
    }

    isEligible(msg: Message<boolean>): boolean {
        if (this.channels.indexOf(msg.channel.id) === -1) {
            return false;
        }

        return true;
    }

    async handler(msg: Message): Promise<void> {
        setTimeout(async () => {
            try {
                await msg.delete();
            } catch (error) {
                console.log(error);
            }
        }, this.delayMs);
    }
}
