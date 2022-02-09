import '@/components/baseUI/Form/index.scss';
import '@/styles/global.css';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
