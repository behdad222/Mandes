import { globalConfig } from '../config';
import { Hook } from '../models/hook';
import { Message } from 'discord.js';
import { currentConnection } from '../services/stream-manager';
import { VoiceConnectionStatus } from '@discordjs/voice';

export class DisconnectHook extends Hook {
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
        if (!msg.content.startsWith(globalConfig.commandTrigger + 'dc')) {
            return;
        }

        if (currentConnection) {
            try {
                if (currentConnection.state.status !== VoiceConnectionStatus.Destroyed) {
                    currentConnection.disconnect();
                    currentConnection.destroy();
                } else {
                    msg.reply('Hey man, Nobody is listening!');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            msg.reply('Hey man, Nobody is listening!');
        }
    }
}

