import { ReactNode } from 'react';

const Method = ({ children }: { children: ReactNode }) => (
  <div className="font-medium text-sm">{children}</div>
);

const GET = () => <p className="text-GET">GET</p>;

const POST = () => <p className="text-POST">POST</p>;

const PUT = () => <p className="text-PUT">PUT</p>;

const PATCH = () => <p className="text-PATCH">PATCH</p>;

const DELETE = () => <p className="text-DELETE">DEL</p>;

const HEAD = () => <p className="text-HEAD">HEAD</p>;

const OPTIONS = () => <p className="text-OPTIONS">OPTIONS</p>;

Method.GET = GET;
Method.POST = POST;
Method.PUT = PUT;
Method.PATCH = PATCH;
Method.DELETE = DELETE;
Method.HEAD = HEAD;
Method.OPTIONS = OPTIONS;

export const methods = {
  GET: <Method.GET />,
  POST: <Method.POST />,
  PUT: <Method.PUT />,
  PATCH: <Method.PATCH />,
  DELETE: <Method.DELETE />,
  HEAD: <Method.HEAD />,
  OPTIONS: <Method.OPTIONS />,
};

export type methods = typeof methods;

export default Method;
