import { Role } from "./Role";

export interface JwtResponse{
    accessToken: string;
    type: string;
    username: string;
    email: string;
    role: Role[];
}