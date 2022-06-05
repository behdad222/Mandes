import { Message, Client } from 'discord.js';

export abstract class Hook {
    channels: string[];
    abstract isEligible(msg: Message): boolean;
    abstract handler(msg: Message, client?: Client): Promise<void>;
}