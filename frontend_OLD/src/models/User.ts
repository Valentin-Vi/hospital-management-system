export type User = {
    email: string,
    name: string,
    lastname: string,
    type: UserType,
};

export const userType = {
    VISITOR: 'VISITOR',
    CLIENT: 'CLIENT',
    DOCTOR: 'DOCTOR',
    DESK: 'DESK',
    ADMIN: 'ADMIN'
} as const;

export type UserType = (typeof userType)[keyof typeof userType];

export type DefaultUser = {
    email: null,
    name: null,
    lastname: null,
    type: 'VISITOR'
};
