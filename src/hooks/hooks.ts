import { OnlyMediaHook } from './only-media';
import { Hook } from '../models/hook';
import { Message } from 'discord.js';

const hooksList: Hook[] = [
    new OnlyMediaHook(['835947472026599464'])
];

export function hookRouter(msg: Message) {
    hooksList.forEach((h: Hook) => {
        if (h.isEligible(msg)) {
            h.handler(msg);
        }
    });
}