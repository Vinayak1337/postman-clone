/* eslint-disable @next/next/no-img-element */
import { useRTKSelector } from '@/lib/redux';
import { Suspense } from 'react';
import Loading from '../Loading/Loading';
import Loader, { useLoader } from '../Loading/Loader';
import clsx from 'clsx';

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

  const { loading, setLoading } = useLoader();

  return (
    <div className="max-w-full h-full max-h-full overflow-hidden">
      <div className="flex w-full h-full overflow-y-scroll">
        {RenderBody(body, contentType, loading, setLoading)}
      </div>
    </div>
  );
};

const RenderBody = (
  body: any,
  contentType: string,
  loading: boolean,
  setLoading: (value: boolean) => void,
) => {
  switch (true) {
    case contentType.includes('application/json'):
      return (
        <Suspense
          fallback={
            <Loading>
              <Loading.Default></Loading.Default>
            </Loading>
          }
        >
          {import('react-json-view').then(({ default: JSONView }) => (
            <JSONView src={body} />
          ))}
        </Suspense>
      );

    case contentType.includes('text/html'):
      return (
        <Suspense
          fallback={
            <Loading>
              <Loading.Default></Loading.Default>
            </Loading>
          }
        >
          {import('react-html-parser').then(({ default: HTMLView }) =>
            HTMLView(body),
          )}
        </Suspense>
      );

    case contentType.includes('image'):
      return (
        <Loader type="Image">
          <img
            onLoad={setLoading.bind(null, true)}
            className={clsx('object-contain', {
              hidden: loading,
            })}
            src={body}
            alt=""
          />
        </Loader>
      );

    case contentType.includes('audio'):
      return (
        <Loader type="Video">
          <audio
            onLoad={setLoading.bind(null, true)}
            className={clsx({
              hidden: loading,
            })}
            src={body}
            controls
          />
        </Loader>
      );

    case contentType.includes('video'):
      return (
        <Loader type="Video">
          <video
            onLoad={setLoading.bind(null, true)}
            className={clsx('w-full h-full aspect-video', {
              hidden: loading,
            })}
            src={body}
            controls
          />
        </Loader>
      );

    default:
      return (
        <Loader>
          <p
            onLoad={setLoading.bind(null, true)}
            className={clsx({
              hidden: loading,
            })}
          >
            {typeof body === 'string' ? body : JSON.stringify(body)}
          </p>
        </Loader>
      );
  }
};

export default ResponseBody;
