import { prisma } from '../lib/db';

export async function dailyXPBonus() {
    const activeUsers = await prisma.user.findMany();

    for (const user of activeUsers) {
        await prisma.user.update({
            where: { id: user.id },
            data: { xp: {increment: 10}}
        });

        await prisma.xPHistory.create({
            data: {userId: user.id, amount: 10, reason: 'Daily bonus' }
        });
    }
}
