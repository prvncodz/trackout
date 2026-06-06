
export interface Set  {
    _id:string
    owner: string;
    exerciseId: string;
    setNo: number;
    weight: number;
    reps: number;
    rest?: string;
    isPr?: boolean;
    completed?: boolean;
    createdAt: string;
    updatedAt: string;
}
