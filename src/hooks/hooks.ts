import { OnlyMediaHook } from './only-media';
import { Hook } from '../models/hook';
import { Message } from 'discord.js';

const hooksList: Hook[] = [
    new OnlyMediaHook(['964585107124006963'])
];

export function hookRouter(msg: Message) {
    hooksList.forEach((h: Hook) => {
        if (h.isEligible(msg)) {
            h.handler(msg);
        }
    });
}