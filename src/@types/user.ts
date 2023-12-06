export type UserAuth = {
    id?: string;
    username: string;
    password: string;
    createdAt?: string;
}

export type UserLogin = {
    username: string;
    password: string;
}

export type OTPUser = {
    username: string;
    otp: string;
}