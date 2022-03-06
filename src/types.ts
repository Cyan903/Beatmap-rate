export interface FileMap {
    fileFormat?: string;
    group?: string;
    AudioFilename?: string;
    AudioLeadIn?: string;
    PreviewTime?: string;
    Countdown?: string;
    SampleSet?: string;
    StackLeniency?: string;
    Mode?: string;
    LetterboxInBreaks?: string;
    WidescreenStoryboard?: string;
    DistanceSpacing?: string;
    BeatDivisor?: string;
    GridSize?: string;
    TimelineZoom?: string;
    Title?: string;
    TitleUnicode?: string;
    Artist?: string;
    ArtistUnicode?: string;
    Creator?: string;
    Version?: string;
    Source?: string;
    Tags?: string;
    BeatmapID?: string;
    BeatmapSetID?: string;
    HPDrainRate?: string;
    CircleSize?: string;
    OverallDifficulty?: string;
    ApproachRate?: string;
    SliderMultiplier?: string;
    SliderTickRate?: string;
}

export interface Beatmap extends FileMap {
    timingPoints: string[];
    hitObjects: string[];
    events: string[];
}
