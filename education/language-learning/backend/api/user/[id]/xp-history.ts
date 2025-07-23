import { prisma } from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const history = await prisma.xPHistory.findMany({
        where: {userId: id as string },
        orderBy: { createdAt: 'desc'},
        take: 100
    });
    res.status(200).json(history);
}
