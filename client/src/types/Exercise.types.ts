import { Set } from "./Set.types";

export interface Exercise {
    _id:string;
    logId: string;
    name: string;
    muscleGroup: string;
    note?: string;
    sets: Set[];
    createdAt: string;
    updatedAt: string;
}
