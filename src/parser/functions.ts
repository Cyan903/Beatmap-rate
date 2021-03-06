import consola from "consola";

export function updateTimingPoints(timingPoints: string[], rate: number) {
    consola.info(`moving timing | x${timingPoints.length} total`);

    return timingPoints.map((p) => {
        if (p.startsWith("//")) {
            return p[0];
        }

        const item = p.split(",");
        item[0] = String(parseFloat(item[0]) / rate);

        if (parseFloat(item[1]) > 0) {
            item[1] = String(parseFloat(item[1]) / rate);
        }

        return item.join(",");
    });
}

export function updateHitObjects(objects: string[], rate: number) {
    consola.info(`moving notes | x${objects.length} total`);

    return objects.map((n) => {
        if (n.startsWith("//")) {
            return n;
        }

        const note = n.split(",");
        const type = note[3];

        switch (type) {
            case "12":
                note[2] = String(parseFloat(note[2]) / rate);
                note[5] = String(parseFloat(note[5]) / rate);
                break;
            default:
                note[2] = String(parseFloat(note[2]) / rate);
                break;
        }

        return note.join(",");
    });
}
