import global from "../styles/globals.css"
import { QueryClient, QueryClientProvider } from 'react-query';


export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>  
  );
}
