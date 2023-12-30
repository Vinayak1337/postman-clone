import prisma from '@/prisma';

export async function POST(req: Request) {
  try {
  } catch (error) {}
}

export async function GET(req: Request) {
  try {
    const requests = await prisma.request.findMany({
      select: {
        id: true,
        method: true,
        url: true,
      },
    });

    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response('Internal server error', {
      status: 500,
      statusText: error.meta.message || error.message,
    });
  }
}
