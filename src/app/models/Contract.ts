import { Client } from "./Client";

export interface Contract{
    numContract: string;
    startDate: Date;
    endDate: Date;
    type: string;
    lienDeSignature: string;
    client: Client
}