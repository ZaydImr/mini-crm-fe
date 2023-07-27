import { Client } from "./Client";
import { User } from "./User";

export interface Affair{
    id?: number;
    title?: string;
    object?: string;
    type?: string;
    client?: Client;
    user?: User;
}