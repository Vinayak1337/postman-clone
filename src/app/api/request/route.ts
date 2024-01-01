import prisma from '@/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const request = await prisma.request.create({
      data: {
        method: body.method,
        url: body.url,
      },
    });

    return new Response(JSON.stringify(request), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error);
    return new Response('Internal server error', {
      status: 500,
      statusText: error.meta.message || error.message,
    });
  }
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

    return new Response(JSON.stringify(requests), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error);
    return new Response('Internal server error', {
      status: 500,
      statusText: error.meta.message || error.message,
    });
  }
}
