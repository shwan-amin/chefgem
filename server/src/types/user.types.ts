import { string } from "zod";

export interface RegisteredUser {
    id: string,
    email: string
}

export type Token = string