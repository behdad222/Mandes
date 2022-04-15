import { Message, Client } from 'discord.js';

export abstract class Hook {
    abstract channels: string[];
    abstract isEligible(msg: Message): boolean;
    abstract handler(msg: Message, client?: Client): Promise<void>;
}