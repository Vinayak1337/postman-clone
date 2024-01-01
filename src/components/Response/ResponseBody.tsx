/* eslint-disable @next/next/no-img-element */
import { useRTKSelector } from '@/lib/redux';
import { Suspense } from 'react';

const ResponseBody = () => {
  const contentType = useRTKSelector(
    (state) =>
      state.request.response[state.request.selectedRequestId].headers[
        'content-type'
      ],
  );
  const body = useRTKSelector(
    (state) => state.request.response[state.request.selectedRequestId].body,
  );

  return (
    <div className="flex justify-center items-center w-full max-h-[44vh]">
      {RenderBody(body, contentType)}
    </div>
  );
};

const RenderBody = (body: any, contentType: string) => {
  switch (true) {
    case contentType.includes('application/json'):
      return (
        <Suspense>
          {import('react-json-view').then(({ default: JSONView }) => (
            <JSONView src={body} />
          ))}
        </Suspense>
      );

    case contentType.includes('text/html'):
      return (
        <Suspense>
          {import('react-html-parser').then(({ default: HTMLView }) =>
            HTMLView(body),
          )}
        </Suspense>
      );

    case contentType.includes('image'):
      return <img className="object-contain" src={body} alt="" />;

    case contentType.includes('audio'):
      return <audio src={body} controls />;

    case contentType.includes('video'):
      return <video className="w-full h-full" src={body} controls />;

    default:
      return <p>{typeof body === 'string' ? body : JSON.stringify(body)}</p>;
  }
};

export default ResponseBody;