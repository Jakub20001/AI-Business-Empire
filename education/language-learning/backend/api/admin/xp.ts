import { prisma } from '../../lib/db';

export default async function handler(req, res) {
    const {userId, amount, reason } = req.body;

    await prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: amount}}
    });

    await prisma.xPHistory.create({
        data: { userId, amount, reason }
    });

    res.status(200).json({ success: true});
}
