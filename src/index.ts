import { updateTimingPoints, updateHitObjects } from "./functions";
import { writeFile } from "fs";
import { getTimingPoints, getHitObjects, loadFile } from "./parser/parser";
import { initAudio } from "./audio/ffmpeg";

// testing...
(async () => {
    await initAudio();

    // prettier-ignore
    const filePath = "";
    const f = loadFile(filePath);

    const points = getTimingPoints(f);
    const objects = getHitObjects(f);

    const fixedPoints = updateTimingPoints(points, 1.4);
    const fixedObjects = updateHitObjects(objects, 1.4);
})();
