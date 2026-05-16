// import * as z from "zod";
// import ApiError from "../utils/ApiError"
//
// const schemaValidation= (schema, source)=> (req,res,next)=> {
//     try {
//         schema.parse(source);
//     } catch (error) {
//         if (error isInstance of z.ZodError) {
//             console.error(error.message);
//             throw new ApiError(400, "invalid input credentials", error.name)
//         }
//     }
// }
