import { PrismaClient, User } from "@prisma/client";
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(createProperties: Create): Promise<User>;
    validateCredentials(credentialsProperties: ValidateCredentials): Promise<User>;
    getById(id: string): Promise<User | null>;
}
interface Create {
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
}
interface ValidateCredentials {
    email: string;
    password: string;
}
export {};
