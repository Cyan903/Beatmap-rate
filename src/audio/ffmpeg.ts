import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import consola from "consola";

const ffmpeg = createFFmpeg();

export async function initAudio() {
    await ffmpeg.load();
    consola.success("[initAudio] loaded ffmpeg");
}

