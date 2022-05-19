import { OnlyMediaHook } from './only-media';
import { Hook } from '../models/hook';
import { Message } from 'discord.js';
import { CastBoxHook } from './castbox';
import { DisconnectHook } from './disconnect';

const hooksList: Hook[] = [
    new OnlyMediaHook(['835947472026599464']),
    new CastBoxHook(['782733951315476500']),
    new DisconnectHook(['782733951315476500']),
];

export function hookRouter(msg: Message) {
    hooksList.forEach((h: Hook) => {
        if (h.isEligible(msg)) {
            h.handler(msg);
        }
    });
}