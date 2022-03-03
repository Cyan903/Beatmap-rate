import consola from "consola";

export function updateTimingPoints(timingPoints: any[], rate: number) {
    return timingPoints.map((p) => {
        if (p[0].startsWith("//")) {
            return p[0];
        }

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
    consola.info(`moving notes | x${objects.length} total`);

    return objects.map((n) => {
        if (n.startsWith("//")) {
            return n;
        }

        const note = n.split(",");
        note[2] = String(parseFloat(note[2]) / rate);

        return note.join(",");
    });
}
