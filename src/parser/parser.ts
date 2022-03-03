import { readFileSync } from "fs";
import ini from "ini";
import consola from "consola";
import parser from "osu-parser";

export function loadFile(filePath: string) {
    try {
        if (!filePath.endsWith(".osu")) {
            consola.fatal(`[loadFile] "${filePath}" not a .osu file!`);
            process.exit(1);
        }

        const content = readFileSync(filePath, "utf-8");
        const file = ini.parse(content);
        const beatmap = parser.parseContent(content);

        consola.success(`[loadFile] loaded ${filePath}`);
        return { file, beatmap };
    } catch {
        consola.fatal(`[loadFile] could not process "${filePath}"`);
        process.exit(1);
    }
}

function parseObjects(obj: string, config: any): string[] {
    const items = config[obj];

    if (typeof items !== "object") {
        consola.fatal(`[parseObjects] could not read "${obj}" in file`);
        process.exit(1);
    }

    return Object.keys(items);
}

// Calculate the BPM
export const getTimingPoints = (config: any) => {
    const timingPoints: any[] = parseObjects("TimingPoints", config);
    let lastBPM = 0;

    // https://github.com/nojhamster/osu-parser/blob/539b73e087d46de7aa7159476c7ea6ac50983c97/index.js#L114
    for (let point in timingPoints) {
        const p = parseFloat(timingPoints[point].split(",")[1]);
        const bpm = !isNaN(p) && p !== 0 && p > 0 ? 60000 / p : lastBPM;

        lastBPM = bpm;
        timingPoints[point] = [timingPoints[point], bpm];
    }

    return timingPoints;
};

export function addToFile(
    beatmap: any,
    hitObjects: any[],
    timingPoints: any[],
    oldAudio: string,
    newAudio: string
): string {
    let oldData = ini.stringify(beatmap).replace(/=true\n/g, "\n").replace(oldAudio, newAudio);
    const pointData = `[TimingPoints]\n${timingPoints.join("\n")}`;
    const hitData = `\n[HitObjects]\n${hitObjects.join("\n")}`;

    return [oldData, pointData, hitData, ""].join("\n");
}

export function updateValue() {
    
}

// We don't need to do anything special here
export const getHitObjects = (config: any) =>
    parseObjects("HitObjects", config);
