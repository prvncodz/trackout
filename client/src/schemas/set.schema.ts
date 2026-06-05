import * as z from "zod";

const CreateSetSchema = z.object({
    setNo: z.coerce.number().min(1).max(20),
    weight: z.coerce.number().min(1),
    reps: z.coerce.number().min(1),
    rest: z.string().optional(),
    completed: z.boolean().optional(),
    isPr: z.boolean().optional(),
});

export type CreateSetInput = z.infer<typeof CreateSetSchema>

export default CreateSetSchema;
