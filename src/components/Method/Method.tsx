import { ReactNode } from 'react';

const Method = ({ children }: { children: ReactNode }) => (
  <div className="font-medium text-sm">{children}</div>
);

const GET = () => <p className="text-GET">GET</p>;

const POST = () => <p className="text-POST">POST</p>;

const PUT = () => <p className="text-PUT">PUT</p>;

const DELETE = () => <p className="text-DELETE">DEL</p>;

Method.GET = GET;
Method.POST = POST;
Method.PUT = PUT;
Method.DELETE = DELETE;

export default Method;
