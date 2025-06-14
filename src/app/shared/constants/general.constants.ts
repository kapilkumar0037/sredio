import { IDropdownItem } from "../models/general.models"

export class SharedConstants {
    public static readonly YearDropdownItems: IDropdownItem[] = [
        { label: '2025', value: 2025 },
        { label: '2024', value: 2024 },
        { label: '2023', value: 2023 }
    ]
    public static readonly MonthDropdownItems: IDropdownItem[] = [
        { label: 'All', value: -1 },
        { label: 'January', value: 1 },
        { label: 'February', value: 2 },
        { label: 'March', value: 3 },
        { label: 'April', value: 4 },
        { label: 'May', value: 5 },
        { label: 'June', value: 6 },
        { label: 'July', value: 7 },
        { label: 'August', value: 8 },
        { label: 'September', value: 9 },
        { label: 'October', value: 10 },
        { label: 'November', value: 11 },
        { label: 'December', value: 12 },
    ]
}

