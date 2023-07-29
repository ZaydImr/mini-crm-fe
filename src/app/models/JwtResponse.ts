import { Role } from "./Role";

export interface JwtResponse{
    accessToken: string;
    tokenType: string;
    type: string;
    username: string;
    fullname: string;
    picture: string;
    email: string;
    role: Role[];
}