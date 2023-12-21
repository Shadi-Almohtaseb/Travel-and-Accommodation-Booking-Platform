export type UserAuth = {
    id?: string;
    userName: string;
    password: string;
    createdAt?: string;
}

export type UserLogin = {
    userName: string;
    password: string;
}

export type OTPUser = {
    userName: string;
    otp: string;
}