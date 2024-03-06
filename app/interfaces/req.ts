export interface Dependency {
    parent: string;
    child: string;
  }

export interface Req {
    [key: string]: any,
    size: number,
    gr: string | null,
    tex: string | null,
    headerName: string | null,
    headerWidth: string | null,
    headerHeight: number | null,
    headerHeightCustom: number | null,
    boxName: string | null,
    boxIndex: string | null,
    legs?: string | null,
    frame?: string | null,
    matSpring?: string | null,
    matH?: "H1" | "H2" | "H3" | "H4" | null,
    matZone?: "1P" | "7P" | null,
    matBuild?: string | null,
    pillHeight?: string | null,
    pillBuild?: string | null,
    pillCover?: string | null,
    dependencies: Dependency[],
    prevDependencies: Dependency[],
}
