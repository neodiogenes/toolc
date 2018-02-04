import { ReportFilter } from "./reportfilter";

export class ScheduledReport {
    id: string;
    name: string;
    url: string;
    format: string;
    delivery: string;
    scheduleType: string;
    owner: {
    	id: string;
    }
    
    dayOfWeek: string;
    timeOfDay: number;
    dayOfMonth: string;    
    
    filters: string;
    parsedFilters: ReportFilter[];

    index: number;
    
    constructor() {
        this.owner = { id: ''};
    }
}