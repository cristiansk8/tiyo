import { ApiQR } from "./QR.interface";

export enum UserPlan {
    Basic = "Basic",
    Pro = "Pro",
    Enterprise = "Enterprise",
}

export interface User {
    id: number;
    email: string
    name?: string;
    phone?: string;
    photo?: string;
    facebook?: string;
    instagram?: string;
    plan: UserPlan;

    qr?: ApiQR[];
}

