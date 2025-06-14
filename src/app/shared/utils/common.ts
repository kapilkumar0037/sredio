import { SharedConstants } from "../constants/general.constants";

export class CommonUtility {
    public static getMonth(month: number) {
        return SharedConstants.MonthDropdownItems.find(item => item.value === month) || { label: month.toString(), value: month};
    }
    public static getYear(year: number) {
        return SharedConstants.YearDropdownItems.find(item => item.value === year) || { label: year.toString(), value: year};
    }
}