export interface IActiveIntegrations {
    name: string;
    icon: string;
}

export interface IEmployee {
    name: string;
    id: number;
}

export interface IEmployeeHours {
    employeeId: number;
    year: number;
    month: number;
    regularHours: number;
    sredHours: number;
    totalExpectedHours: number;
    expectedSredHours: number;
}
export interface IEmployeeTimesheets {
    employeeId: number;
    expectedTimesheet: number;
    missingTimesheet: number;
    month: number;
    trackedTimesheet: number;
    year: number;
}
export interface IProject {
    projectId: number;
    year: number;
    month: number;
    hoursAllocated: number;
    hoursConsumed: number;
    projectName: string;
}

export interface IDashboardData {
    employees: IEmployee[];
    employeeHours: IEmployeeHours[];
    employeeTimesheets: IEmployeeTimesheets[];
    projects: IProject[];
}

export interface IEmployeeListItem {
    name: string;
    employeeId: number;
    expectedSredHours: number;
    expectedTimesheet: number;
    missingTimesheet: number;
    month: number;
    regularHours: number;
    sredHours: number;
    totalExpectedHours: number;
    trackedTimesheet: number;
    year: number;
}

export interface ISummary {
    employeeHours: IEmployeeHours[];
    employeeTimesheets: IEmployeeTimesheets[];
    projects: IProject[];

    totalTrackedHours: number;
    totalExpectedHours: number;
    totalTrackedPercent: number;
    totalSredHoursExpected: number;
    totalSredHoursTracked: number;
    totalSredTrackedPercent: number;

    expctedTimesheets: number;
    trackedTimesheets: number;
    timesheetTrackedPercent: number;

    totalProjectAllocation: number;
    totalProjectConsumed: number;
    projectConsumedPercent: number;
    employeesList: IEmployeeListItem[];
}