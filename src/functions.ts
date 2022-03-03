import consola from "consola";
import { getTimingPoints, getHitObjects, loadFile } from "./parser/parser";

// prettier-ignore
const filePath = "";

export function updateTimingPoints(timingPoints: any[], rate: number) {
    return timingPoints.map((p) => {
        const item = {
            point: p[0].split(","),
            bpm: p[1],
        };

        item.point[0] = String(parseFloat(item.point[0]) / rate);
        consola.info(`changing bpm | ${item.bpm} -> ${item.bpm * rate}`);

        if (parseFloat(item.point[1]) > 0) {
            item.point[1] = String(parseFloat(item.point[1]) / rate);
        }

        return item.point.join(",");
    });
}

// WILL NOT RUN UNLESS TIMING POINTS ARE DONE
export function updateHitObjects(objects: any[], rate: number) {
    return objects.map((n) => {
        const note = n.split(",");
        note[2] = String(parseFloat(note[2]) / rate);

        return note.join(",");
    });
}

const points = getTimingPoints(loadFile(filePath));
const objects = getHitObjects(loadFile(filePath));

const fixedPoints = updateTimingPoints(points, 1.4);
const fixedObjects = updateHitObjects(objects, 1.4);
