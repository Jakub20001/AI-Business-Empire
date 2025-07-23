import PDFDocument from 'pdfkit';
// Define User interface if not exported from @prisma/client
interface User {
    id: number;
    username: string;
    xp: number;
    level: number;
}
import { Buffer } from 'buffer';

export function generateLeaderboardPDF(users: User[]) {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.fontSize(18).text('Leaderboard', { align: 'center' });
    doc.moveDown();

    users.forEach((u, i) => {
        doc.text(`${i + 1}. ${u.username} - ${u.xp} XP - Lvl ${u.level}`);
    });

    doc.on('data', buffers.push.bind(buffers));
    return new Promise<Buffer>((resolve) => {
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.end();
    });
}