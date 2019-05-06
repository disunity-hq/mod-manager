import { promisify } from "util";
import * as fs from "fs";

const readFile = promisify(fs.readFile);
const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);
export { copyFile, readFile, writeFile };
