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
    matSpring: string | null,
    matH?: "H1" | "H2" | "H3" | "H4" | null,
    matBuild: string | null,
    pillHeight: "Standard" | "Max" | "Super" | null,
    pillBuild: "N" | "S" | "E" | "B" | "V" | "A" | "M" | "TH1" | null,
    pillCover: string | null,
    dependencies: Dependency[],
    prevDependencies: Dependency[],
}