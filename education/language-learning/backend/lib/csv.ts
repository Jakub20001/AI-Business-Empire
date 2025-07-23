import { PrismaClient } from '@prisma/client';
import { Parser } from 'json2csv';

// Define User type if not exported directly
type User = {
    username: string;
    xp: number;
    level: number;
};

export function generateCSV(users: User[]) {
    const fields = ['username', 'xp', 'level'];
    const parser = new Parser({ fields });
    return parser.parse(users);
}
