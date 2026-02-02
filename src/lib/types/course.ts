export interface Course {
	id: string;
	name: string;
	instructor: string;
	startTime: string;
	endTime: string;
	location: string;
	capacity: number;
	enrolled: number;
	description?: string;
}
