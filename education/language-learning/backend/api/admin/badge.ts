import { prisma } from '../../lib/db';

export default async function handler(req, res) {
    const {userId, badgeId} = req.body;

    await prisma.userBadge.create({
        data: { userId, badgeId}
    });

    res.status(200).json({success: true});
}
