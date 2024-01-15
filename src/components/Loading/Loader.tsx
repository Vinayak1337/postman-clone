import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import Loading from './Loading';

const LoaderContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loading: false,
  setLoading: () => {},
});

const Loader: FC<{
  type?: 'Image' | 'Video' | 'Default';
  children: ReactNode;
}> = ({ type = 'Default', children }) => {
  const [loading, setLoading] = useState(false);

  let Content = Loading.Default;

  switch (type) {
    case 'Image':
      Content = Loading.Image;
      break;

    case 'Video':
      Content = Loading.Video;
      break;

    default:
      Content = Loading.Default;
  }

  return (
    <LoaderContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      <div className="w-full h-full">
        {loading && (
          <Loading>
            <Content />
          </Loading>
        )}
        {children}
      </div>
    </LoaderContext.Provider>
  );
};

export default Loader;

export const useLoader = () => useContext(LoaderContext);
