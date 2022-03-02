import fs from "fs";
import ini from "ini";

const filePath = "";

const config = ini.parse(fs.readFileSync(filePath, "utf-8"));

function parseObjects(obj: string, config: any) {
    const items = config[obj];

    if (typeof items !== "object") {
        return "";
    }

    return Object.keys(items);
}

console.log(parseObjects("TimingPoints", config));
