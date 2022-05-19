import { Client, Intents } from 'discord.js';
import { hookRouter } from './hooks/hooks';

const client = new Client(
    {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
    }
);

client.on('ready', () => {
    client.user.setActivity({ type: 'WATCHING', name: '999' });
});

client.on('messageCreate', async (msg) => {
    hookRouter(msg);
});

let token = process.env.TOKEN;
token = 'OTUwNzczMTE4MzE2NzE2MTEy.GpiSdZ.TahlLNg4WTRnaRM092Vt8H63ThBkDS6Lj2Ap60'
if (token) {
    client.login(token);
}