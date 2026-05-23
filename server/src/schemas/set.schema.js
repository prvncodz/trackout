import * as z from "zod";


const CreateSetSchema = z.object({
    setNo: z.number().min(1).max(20),
    weight: z.number().min(1),
    reps: z.number().min(1),
    rest: z.string().optional(),
    completed: z.boolean().optional(),
    isPr: z.boolean().optional(),
    exerciseId: z.string(),
})

export default CreateSetSchema
