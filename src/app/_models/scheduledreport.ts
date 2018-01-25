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
    
    index: number;
    
    constructor() {
        this.owner = { id: ''};
    }
}