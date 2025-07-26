import { prisma } from '@/lib/prisma';
import { validateNiche } from '../utils/validate';
import { handleApiError } from '../utils/apiError';

export async function GET() {
    try {
        const niches = await prisma.niche.findMany({
            orderBy: { createdAt: 'desc'},
    });

    return new Response(JSON.stringify(niches), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        validateNiche(data);

        const newNiche = await prisma.niche.create({
            data: {
                name: data.name,
                category: data.category,
                level: data.level,
            },
        });

        return new Response(JSON.stringify(newNiche), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
      return handleApiError(err);
    }
}
