# Beatmap-rate
![package-version](https://img.shields.io/github/package-json/v/cyanpiano/beatmap-rate) ![last-commit](https://img.shields.io/github/last-commit/cyanpiano/Beatmap-rate) ![repo-size](https://img.shields.io/github/repo-size/cyanpiano/beatmap-rate)

CLI program to change a [beatmap](https://osu.ppy.sh/wiki/en/Beatmap)'s playback speed. There are many like it, but this one aims to be cross platform relying on just 2 dependencies. Currently, **mania** and **ctb** are not supported. 

![beatmap-rate-menu](https://raw.githubusercontent.com/CyanPiano/Static-github/main/Beatmap-rate/beatmap-rate-menu.png)

This program requires [ffmpeg](https://ffmpeg.org/) to be installed. This can vary between operating systems, but as long as ffmpeg is in your path or is callable through the command line, the CLI should run fine.


### Usage
The speed multiplier is limited with a max rate of 2.0x and minimum rate of 0.5x. Although you can run the program multiple times if necessary.

    -h, --help      - Displays information about commands.
    -i, --info      - Information about the CLI.
    -p, --path      - Path to .osu file (this is required).
    -r, --rate      - Speed multiplier (this is also required).
    -v, --version   - Change beatmap's version name.
    -c, --creator   - Change beatmap's creator.
    -a, --artist    - Change beatmap's artist.
    -n, --nightcore - Change audio pitch (y/n) (no by default).


### Install
To install...
```sh
$ npm i -g .
```

To develop...
```sh
$ git clone https://github.com/CyanPiano/Beatmap-rate.git
$ npm i
$ npm run build
$ npm i -g .
```
