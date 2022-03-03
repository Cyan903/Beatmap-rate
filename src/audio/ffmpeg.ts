import consola from "consola";
import path from "path";
import { exec } from "child_process";

export function createFileName(filename: string, rate: number) {
    const p = path.parse(filename);

    return `${p.name} [${rate.toFixed(2)}x]${p.ext}`;
}

// https://superuser.com/a/1676402
export async function modAudio(npath: string, filename: string, rate: number) {
    const newName = createFileName(filename, rate);

    exec(
        `ffmpeg -i "${npath+filename}" -vf "setpts=(PTS-STARTPTS)/${rate}" -af atempo=${rate} "${npath+newName}" -y`,
        (err) => {
            if (err) {
                consola.fatal(`[modAudio] error modding audio ${filename}`);
                consola.log(err);
                process.exit(1);
            }

            consola.success(`modded audio to ${rate}x rate`);
        }
    );

    return newName;
}
