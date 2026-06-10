import { Exercise } from "./Exercise.types";

export interface Log {
    _id: string;
    owner: string;
    exercises: string[];
    logName: string;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExpandedLog extends Omit<Log, "exercises"> {
    exercises: Exercise[];
}
