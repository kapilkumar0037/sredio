import { ISummaryTile } from "../../../shared/models/general.models";
import { IActiveIntegrations } from "../models/general.models";

export class DashboardConstants {
    public static readonly SummaryTiles: ISummaryTile[] = [
        {
            className: 'primary',
            title: 'Hours summary',
            description: 'Tracked 200/250',
            actions: [
                { label: 'View details', key: 'view-detail', icon: 'bi-arrow-right-circle' },
                { label: 'Remind', key: 'remind', icon: 'bi-envelope-arrow-up-fill' },
            ],
            progress: 75
        },
        {
            className: 'success',
            title: 'Timesheet summary',
            description: 'Created 200/250',
            actions: [
                { label: 'View details', key: 'view-detail', icon: 'bi-arrow-right-circle' },
                { label: 'Remind', key: 'remind', icon: 'bi-envelope-arrow-up-fill' },
            ],
            progress: 60
        },
        {
            className: 'info',
            title: 'SR & ED Hours',
            description: 'Tracked 150/250',
            actions: [
                { label: 'View details', key: 'view-detail', icon: 'bi-arrow-right-circle' },
            ],
            progress: 60
        },
        {
            className: 'warning',
            title: 'Project hours',
            description: 'Consumed 200/250',
            actions: [
                { label: 'View details', key: 'view-detail', icon: 'bi-arrow-right-circle' },
            ],
            progress: 50
        },
    ]

    public static readonly ActiveIntegrations: IActiveIntegrations[] = [
        { name: 'Jira', icon: 'jira' },
        { name: 'Bitbucket', icon: 'bitbucket' },
        { name: 'Github', icon: 'github' },
        { name: 'Azure', icon: 'azure' },
        { name: 'Harvest', icon: 'harvest' },
        { name: 'ClickUp', icon: 'clickup' },
        { name: 'Airtable', icon: 'airtable' },
        { name: 'Bigtime', icon: 'bigtime' },
    ]
}