import { updateTimingPoints, updateHitObjects } from "./parser/functions";
import { readFileSync, writeFileSync } from "fs";
import { loadFile, replaceAll, replaceValue } from "./parser/parser";
import { modAudio, createFileName } from "./audio/ffmpeg";
import { Beatmap, FileMap } from "./types";
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

    const map: Beatmap = loadFile(npath + filename);
    const bAudio = map.AudioFilename;

    consola.log(`Modding ${map.Title} [${map.Version}]`);
    consola.log(`Audio: ${npath + map.AudioFilename}`);
    consola.log(`ID: ${map.BeatmapID}\n`);

    // better to copy the file and edit whats necessary beacause I would rather this
    // app only affect the objects that need to be changed.
    const newAudio = await modAudio(npath, bAudio, rate);
    const newName = createFileName(filename, rate);
    const newVersion = `${map.Version} [${rate}x]`;

    const newHitObjects = updateHitObjects(map.hitObjects, rate);
    const newTimingPoints = updateTimingPoints(map.timingPoints, rate);
    let data = await readFileSync(npath + filename, "utf-8");

    if (!data) {
        consola.fatal(`[modBeatmap] error reading file ${newName}`);
        process.exit(1);
    }

    data = replaceAll(data, map.hitObjects, newHitObjects);
    data = replaceAll(data, map.timingPoints, newTimingPoints);
    data = replaceValue(data, "AudioFilename", newAudio);
    data = replaceValue(data, "Version", newVersion);
    data = replaceValue(
        data,
        "PreviewTime",
        String(~~(parseInt(map.PreviewTime) / rate))
    );

    try {
        await writeFileSync(npath + newName, data, "utf8");
        consola.success(`modded new file -> ${newName}`);
    } catch (err) {
        consola.fatal(`[writeFileSync] error writting file ${newName}`);
        consola.log(err);
        process.exit(1);
    }

    return newName;
}

export async function changeParam(
    npath: string,
    filename: string,
    changes: FileMap
) {
    let data = await readFileSync(npath + filename, "utf-8");
    consola.info("adding metadata changes...");

    for (const [k, v] of Object.entries(changes)) {
        data = replaceValue(data, k, v);
    }

    try {
        await writeFileSync(npath + filename, data, "utf8");
        consola.success(`metadata changes applied to -> ${filename}`);
    } catch (err) {
        consola.fatal("[writeFileSync] error applying metadata changes");
        consola.log(err);
        process.exit(1);
    }
}
