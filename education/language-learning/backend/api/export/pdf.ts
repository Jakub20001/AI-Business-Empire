import { prisma } from '../../lib/db';
import { generateLeaderboardPDF } from '../../lib/pdf';

export default async function handler(req, res) {
    const users = await prisma.user.findMany({ orderBy: { xp: 'desc' }});
    const pdf = await generateLeaderboardPDF(users);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=leaderboard.pdf');
    res.send(pdf);
}