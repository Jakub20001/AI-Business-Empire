import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const users = await prisma.user.findmany({
        orderBy: { xp: 'desc' },
        select: { username: true, xp: true, level: true},
        take: 50
    });
    res.status(200).json(users);
}