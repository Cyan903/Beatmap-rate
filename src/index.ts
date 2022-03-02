import { loadFile, parseObjects } from "./parser/parser";

const filePath =
    "";

console.log(parseObjects("TimingPoints", loadFile(filePath)));
