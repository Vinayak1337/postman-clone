import prisma from '@/prisma';

export async function GET(
  _: Request,
  context: { params: { 'request-id': string } },
) {
  try {
    const { 'request-id': requestId } = context.params;

    if (!requestId) return new Response('No id provided', { status: 400 });

    const requests = await prisma.request.findUnique({
      where: { id: requestId },
    });

    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  context: { params: { 'request-id': string } },
) {
  try {
    const { 'request-id': requestId } = context.params;

    if (!requestId) return new Response('No id provided', { status: 400 });

    await prisma.request.delete({
      where: { id: requestId },
    });

    return new Response('Deleted Successfully!', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: { 'request-id': string } },
) {
  try {
    const { 'request-id': requestId } = context.params;
    const body = await req.json();

    if (!requestId) return new Response('No id provided', { status: 400 });

    await prisma.request.update({
      where: { id: requestId },
      data: body,
    });

    return new Response('Updated Successfully!', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', { status: 500 });
  }
}
