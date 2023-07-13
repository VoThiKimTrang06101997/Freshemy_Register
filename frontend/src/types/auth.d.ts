export type Login = {
    email: string;
    password: string;
    confirmPassword: string;
};

export type Register = {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    confirmPassword: string
};


export type Token = {
    accessToken: string;
    refreshToken: string;
};
