import { updateTimingPoints, updateHitObjects } from "./parser/functions";
import { copyFile, writeFileSync } from "fs";
import {
    getTimingPoints,
    getHitObjects,
    loadFile,
    addToFile,
} from "./parser/parser";
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

    const map = loadFile(npath + filename);
    const bAudio = map.beatmap.AudioFilename;
    const objects = {
        hit: getHitObjects(map.file),
        timing: getTimingPoints(map.file),
    };

    // better to copy the file and edit whats necessary beacause I would rather this
    // app only affect the objects that need to be changed.
    const newAudio = await modAudio(npath, bAudio, rate);
    const newHitObjects = updateHitObjects(objects.hit, rate);
    const newTimingPoints = updateTimingPoints(objects.timing, rate);
    const newName = createFileName(filename, rate);

    copyFile(npath + filename, npath + newName, (err) => {
        if (err) {
            consola.fatal("[modBeatmap] could not create file");
            process.exit(1);
        }

        consola.success(`created new file -> ${newName}`);
    });

    delete map.file.TimingPoints;
    delete map.file.HitObjects;

    writeFileSync(
        npath + newName,
        addToFile(
            map.file,
            newHitObjects,
            newTimingPoints,
            map.beatmap.AudioFilename,
            newAudio
        )
    );
}

modBeatmap(
    "/osu/Songs/1367326 rejection - The Way Of Adventure (feat Kusaka Akira)/",
    "rejection - The Way Of Adventure (feat. Kusaka Akira) (KuroKuroKuro) [Kuro & Shamirin's Adventure].osu",
    1.3
);