import { Role } from "./Role";

export interface User{
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    fullname?: string;
    phoneNumber?: string;
    deleted?: boolean;
    role?: Role;
    picture?: string;
}