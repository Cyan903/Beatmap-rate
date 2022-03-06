#!/usr/bin/env node

import { modBeatmap, changeParam } from "../index";
import consola from "consola";
import minimist from "minimist";
import { cmdList, print } from "./cmd";
import { FileMap } from "../types";

function invalidArg(arg: string) {
    if (String(arg) == "true") {
        return true;
    }

    return typeof arg !== "string" && typeof arg !== "number" && arg != "";
}

async function parseArgs(args: minimist.ParsedArgs) {
    const editVals: FileMap = {};
    const aPath = args.path;
    const aRate = args.rate;
    const pitch = !!args.nightcore;

    if (args.help || args.info) {
        print(args.help ? "help" : "info");

        return;
    } else if ([aPath, aRate].includes(undefined)) {
        consola.fatal(".osu file path and rate must be specified (see -h)");
        process.exit(1);
    }

    const spath = aPath.split("/");
    const [filename, filepath] = [
        spath[spath.length - 1],
        spath.slice(0, spath.length - 1).join("/") + "/",
    ];

    // Handle -a -c -v
    for (const [k, v] of Object.entries(args)) {
        if (!["artist", "creator", "version"].includes(k)) {
            continue;
        } else if (invalidArg(v)) {
            consola.error(`cannot set ${k}, check arguments`);
            continue;
        }

        switch (k) {
            case "version":
                editVals["Version"] = v;
                break;
            case "creator":
                editVals["Creator"] = v;
                break;
            case "artist":
                editVals["Artist"] = v;
                editVals["ArtistUnicode"] = v;
                break;
        }
    }

    const newFilename = await modBeatmap(filepath, filename, aRate, pitch);
    await changeParam(filepath, newFilename, editVals);
}

function shorthands(args: minimist.ParsedArgs): minimist.ParsedArgs {
    const shorts: {
        [arg: string]: string;
    } = {};

    cmdList.forEach((k) => (shorts[k[0]] = k));

    for (const arg of Object.keys(args)) {
        const shorthand = shorts[arg];

        if (arg.length == 1 && arg != "_" && shorthand) {
            args[shorthand] = args[arg];
            delete args[arg];
        }
    }

    return args;
}

parseArgs(shorthands(minimist(process.argv.slice(2))));
