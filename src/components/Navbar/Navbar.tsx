import { fetchRequests } from '@/lib/request.actions';
import { Prisma } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';

async function Navbar() {
  const requests = await fetchRequests();

  return (
    <nav className="w-full overflow-hidden">
      <div className="w-full overflow-x-scroll hide-scrollbar"></div>
    </nav>
  );
}

export default Navbar;

const RequestTab = ({
  request: { id, method, url },
  currentRequestId,
}: {
  request: Pick<Prisma.RequestCreateInput, 'id' | 'method' | 'url'>;
  currentRequestId: string;
}) => (
  <Link
    className={clsx('', {
      'border-t-2 border-t-primary border-x border-x-gray-500':
        id === currentRequestId,
    })}
    href={`/${id!}`}
  ></Link>
);
