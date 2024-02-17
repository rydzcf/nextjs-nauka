export interface Dependency {
    parent: string;
    child: string;
  }

export interface Req {
    size: number,
    gr: string | null,
    tex: string | null,
    headerName: string | null,
    headerWidth: string | null,
    headerHeight: number | null,
    boxName: string | null,
    boxElem?: number | null,
    leg?: string | null
    dependencies: Dependency[]
}