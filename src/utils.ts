import Fs from 'fs'
import Path from 'path'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

export async function downloadFile(url: string, ext: string): Promise<string> {
    const path = Path.resolve('downloaded', uuidv4() + '.' + ext);

    // axios image download with response type "stream"
    const response = await Axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });

    // pipe the result stream into a file on disc
    response.data.pipe(Fs.createWriteStream(path));

    // return a promise and resolve when download finishes
    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve(path);
        });

        response.data.on('error', () => {
            reject()
        });
    });

}