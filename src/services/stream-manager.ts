import { AudioPlayerStatus, createAudioPlayer, createAudioResource, entersState, joinVoiceChannel, StreamType, VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import { VoiceChannel } from "discord.js";
import { createDiscordJSAdapter } from "./adapter";

export let player = createAudioPlayer();
export let currentConnection: VoiceConnection;

export function playSong(sourceUrl: string) {
    const resource = createAudioResource(sourceUrl, {
        inputType: StreamType.Arbitrary,
    });

    player.play(resource);

    return entersState(player, AudioPlayerStatus.Playing, 5e3);
}

export async function connectToChannel(channel: VoiceChannel) {
    currentConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: createDiscordJSAdapter(channel),
    });

    try {
        await entersState(currentConnection, VoiceConnectionStatus.Ready, 30e3);
        return currentConnection;
    } catch (error) {
        currentConnection.destroy();
        throw error;
    }
}
