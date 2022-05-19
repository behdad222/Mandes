import { globalConfig } from '../config';
import { parse } from 'node-html-parser';
import { Hook } from '../models/hook';
import { Message } from 'discord.js';
import { isUri } from 'valid-url';
import axios from 'axios';
import { connectToChannel, currentConnection, player, playSong } from '../services/stream-manager';
import { VoiceConnectionStatus } from '@discordjs/voice';

export class CastBoxHook extends Hook {
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
        if (!msg.content.startsWith(globalConfig.commandTrigger + 'p')) {
            return;
        }

        const msgArray = msg.content.split(' ');
        const url = msgArray[1];

        if (isUri(url) && url.includes("castbox.fm")) {
            if (currentConnection) {
                if (currentConnection?.state.status !== VoiceConnectionStatus.Destroyed) {
                    msg.reply('Sorry, someone is already using this bot somewhere! If nobody is listening you can disconnect it using "=dc"');
                    return;
                }
            }
            try {
                console.log('Get response...');
                const response = await axios.get(url);
                console.log('Parsing response...', response.data.length, 'chars');
                const root = parse(response.data);
                const queryResult = root.getElementsByTagName('source');
                const sourceUrl = queryResult[0].getAttribute('src');

                // Play the audio
                const channel = msg.member?.voice.channel;
                if (!channel) {
                    msg.reply('You should first join to a channel jigar!');
                    return;
                }

                msg.reply('Roger that!');
                const connection = await connectToChannel(channel as any);
                playSong(sourceUrl);
                connection.subscribe(player);

            } catch (error) {
                console.log(error);
            }
        } else {
            msg.reply('OOps! this url seems to be invalid. Right now I can only play from CastBox!');
        }
    }
}
