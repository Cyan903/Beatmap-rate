import fs from "fs";
import ini from "ini";
import consola from "consola";

export function loadFile(filePath: string) {
    try {
        return ini.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
        consola.fatal(`[loadFile] could not process "${filePath}"`);
        process.exit(1);
    }
}

export function parseObjects(obj: string, config: any): string[] {
    const items = config[obj];

    if (typeof items !== "object") {
        consola.fatal(`[parseObjects] could not read "${obj}" in file`);
        process.exit(1);
    }

    return Object.keys(items);
}
