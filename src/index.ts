import { updateTimingPoints, updateHitObjects } from "./parser/functions";
import { copyFile, readFile, writeFile } from "fs";
import { loadFile, replaceAll, replaceValue } from "./parser/parser";
import { modAudio, createFileName } from "./audio/ffmpeg";
import consola from "consola";

export async function modBeatmap(
    npath: string,
    filename: string,
    rate: number
) {
    if (rate > 2 || rate < 0.5) {
        consola.fatal("[modBeatmap] rate must be between 0.5-2!");
        process.exit(1);
    }

    const map: any = loadFile(npath + filename);
    const bAudio = map.AudioFilename;

    // better to copy the file and edit whats necessary beacause I would rather this
    // app only affect the objects that need to be changed.
    const newAudio = await modAudio(npath, bAudio, rate);
    const newName = createFileName(filename, rate);
    const newVersion = `${map.Version} [${rate}x]`;

    const newHitObjects = updateHitObjects(map.hitObjects, rate);
    const newTimingPoints = updateTimingPoints(map.timingPoints, rate);

    copyFile(npath + filename, npath + newName, (err) => {
        if (err) {
            consola.fatal("[modBeatmap] could not create file");
            process.exit(1);
        }

        consola.success(`created new file -> ${newName}`);
    });

    readFile(npath + newName, "utf8", (err, data) => {
        if (err) {
            consola.fatal(`[readFile] error reading file ${newName}`);
            consola.log(err);
            process.exit(1);
        }

        data = replaceAll(data, map.hitObjects, newHitObjects);
        data = replaceAll(data, map.timingPoints, newTimingPoints);
        data = replaceValue(data, "AudioFilename", newAudio);
        data = replaceValue(data, "Version", newVersion);
        data = replaceValue(
            data,
            "PreviewTime",
            String(map.PreviewTime / rate)
        );

        writeFile(npath + newName, data, "utf8", (err) => {
            if (err) {
                consola.fatal(`[readFile] error writting file ${newName}`);
                consola.log(err);
                process.exit(1);
            }

            consola.success(`modded new file -> ${newName}`);
        });
    });
}

modBeatmap(
    "./tmp/_bemodding/",
    "Camellia - Kono Hoshi de.... (Raytoly) [Reality].osu",
    0.7
);
