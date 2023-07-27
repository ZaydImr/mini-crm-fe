import { Client } from "./Client";

export interface Contract{
    numContract?: number;
    startDate?: Date;
    endDate?: Date;
    type?: string;
    lienDeSignature?: string;
    client?: Client
}