export interface IAction {
    label: string;
    key: string;
    icon?: string;
}
export interface ISummaryTile {
    key: string;
    title: string;
    description: string;
    className: string;
    actions?: IAction[];
    progress?: number;
}

export interface IDropdownItem {
    label: string;
    value: string | number;
    icon?: string;
}

export interface IChartSeriesRecord {
    name: string;
    value: number;
}

export interface IChartSeriesGroupedRecord {
    name: string;
    series: IChartSeriesRecord[];
}