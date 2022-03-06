import { readFileSync } from "fs";
import consola from "consola";

export async function print(file: string) {
    consola.log(await readFileSync("./static/logo.txt", "utf-8"));
    consola.log(await readFileSync(`./static/${file}.txt`, "utf-8"));
}

export const cmdList = [
    "help",
    "info",
    "path",
    "rate",
    "version",
    "creator",
    "artist",
    "nightcore",
];
