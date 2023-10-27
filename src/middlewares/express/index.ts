import { bodyParser } from "./body-parser";
import { corsMiddleware } from "./cors";

export const middlewares = [
    ...corsMiddleware,
    ...bodyParser
] as const;