import consola from "consola";
import path from "path";
import { exec } from "child_process";

export function createFileName(filename: string, rate: number) {
    const p = path.parse(filename);

    return `${p.name} [${rate.toFixed(2)}x]${p.ext}`;
}

// https://superuser.com/a/1676402
export async function modAudio(
    npath: string,
    filename: string,
    rate: number,
    pitchType: boolean
) {
    const newName = createFileName(filename, rate);
    const cmds = pitchType
        ? `ffmpeg -i "${
              npath + filename
          }" -vf "setpts=(PTS-STARTPTS)/${rate}" -af "asetrate=$(ffprobe -v error -show_entries stream=sample_rate -of default=noprint_wrappers=1:nokey=1 '${
              npath + filename
          }')*${rate}" "${npath + newName}" -y`
        : `ffmpeg -i "${
              npath + filename
          }" -vf "setpts=(PTS-STARTPTS)/${rate}" -af atempo=${rate} "${
              npath + newName
          }" -y`;

    if (!cmds) {
        consola.fatal("[modAudio] invalid option for ffmpeg");
        process.exit(1);
    }

    exec(cmds, (err) => {
        if (err) {
            consola.fatal(`[modAudio] error modding audio ${filename}`);
            consola.log(err);
            process.exit(1);
        }

        consola.success(
            `modded audio to ${rate}x rate ${pitchType ? "(nightcore)" : ""}`
        );
    });

    return newName;
}
