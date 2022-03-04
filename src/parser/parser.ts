import { readFileSync } from "fs";
import ini from "ini";
import consola from "consola";
import parser from "osu-parser";

const sectionReg = /^\[([a-zA-Z0-9]+)\]$/;
const keyValReg = /^([a-zA-Z0-9]+)[ ]*:[ ]*(.+)$/;

// https://github.com/nojhamster/osu-parser/blob/539b73e087d46de7aa7159476c7ea6ac50983c97/index.js#L359
function parseLine(line: string, beatmap: any) {
    let match = sectionReg.exec(line);

    if (match) {
        beatmap.group = match[1].toLowerCase();
        return;
    }

    switch (beatmap.group) {
        case "timingpoints":
            beatmap.timingPoints.push(line);
            break;
        case "hitobjects":
            beatmap.hitObjects.push(line);
            break;
        case "events":
            beatmap.events.push(line);
            break;

        default:
            if (!beatmap.group) {
                match = /^osu file format (v[0-9]+)$/.exec(line);
                if (match) {
                    beatmap.fileFormat = match[1];
                    return;
                }
            }
    }

    match = keyValReg.exec(line);
    if (match) {
        beatmap[match[1]] = match[2];
    }
}

export function loadFile(filePath: string) {
    try {
        if (!filePath.endsWith(".osu")) {
            consola.fatal(`[loadFile] "${filePath}" not a .osu file!`);
            process.exit(1);
        }

        const beatmap = {
            timingPoints: [] as string[],
            hitObjects: [] as string[],
            events: [] as string[],
        };

        const content = readFileSync(filePath, "utf-8");

        for (const line of content.split("\n")) {
            const ln = line.toString().trim();

            if (!ln) continue;
            parseLine(ln, beatmap);
        }

        return beatmap;
    } catch {
        consola.fatal(`[loadFile] could not process "${filePath}"`);
        process.exit(1);
    }
}

export function replaceAll(result: string, map: any, newMap: any) {
    for (const ln in map) {
        const point = map[ln];

        if (point.startsWith("//")) {
            continue;
        }

        result = result.replace(point, newMap[parseInt(ln)]);
    }

    return result;
}

export function replaceValue(result: string, key: string, value: string) {
    for (let i of result.split("\n")) {
        const ln = i.toString().trim();
        const match = keyValReg.exec(ln);
        if (!match) {
            continue;
        } else if (match[1].toLowerCase() == key.toLowerCase()) {
            result = result.replace(match[0], `${match[1]}: ${value}`);
        }
    }

    return result;
}
