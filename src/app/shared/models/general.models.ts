export interface IAction {
    label: string;
    key: string;
    icon?: string;
}
export interface ISummaryTile {
    title: string;
    description: string;
    className: string;
    actions?: IAction[];
    progress?: number;
}