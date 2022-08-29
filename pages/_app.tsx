import '../styles/globals.scss';
import { AppProps } from 'next/app';
import GlobalLayout from '../components/templates/GlobalLayout/GlobalLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
};

export default MyApp;
