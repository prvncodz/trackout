export interface CompletedWorkout {
    _id: string;
    owner: string;
    name: string
    exercises: string[],
    noOfSets: number;
    createdAt: string;
    updatedAt: string;
}

