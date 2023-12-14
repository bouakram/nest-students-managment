export enum Role {
    Admin = "admin",
    User = "user",
}

type User = {
    id: string,
    userName: string,
    password: string,
    Role: Role
}

export interface Authenticate {
    token: string,
    user: User,
}