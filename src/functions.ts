import { getTimingPoints, getHitObjects, loadFile } from "./parser/parser";

// prettier-ignore
const filePath = "";

export function updateTimingPoints(timingPoints: any[], RATE: number) {
    return timingPoints.map((p) => {
        const item = {
            point: p[0].split(","),
            bpm: p[1],
        };

        // PARSE FLOAT NOT PARSE INT I GOT IT YESSSSSSSSSSSSSSSSSSSSSSSSSSS
        item.point[0] = String(parseFloat(item.point[0]) / RATE);

        if (parseFloat(item.point[1]) > 0) {
            item.point[1] = String(parseFloat(item.point[1]) / RATE);
        }

        return item.point.join(",");
    });
}

// WILL NOT RUN UNLESS TIMING POINTS ARE DONE
export function updateHitObjects() {}

const points = getTimingPoints(loadFile(filePath));
const objects = getHitObjects(loadFile(filePath));
const fixedPoints = updateTimingPoints(points, 1.3);

console.log(fixedPoints.join("\n"));

// console.log(parseObjects("HitObjects", loadFile(filePath)));
// console.log(
//     getHitObjects(loadFile(filePath))
// )
