import { prisma } from '../../lib/db';
import { generateCSV } from '../../lib/csv';

export default async function handler(req, res) {
    const users = await prisma.user.findMany({ orderBy: { xp: 'desc' }});
    const csv = generateCSV(users);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Diposition', 'attachment; filename=leaderboard.csv');
    res.send(csv);
}
