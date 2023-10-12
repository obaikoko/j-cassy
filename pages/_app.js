import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { loadProducts } from '@/src/features/products/productSlice';

import Layout from '@/components/Layout';
export default function App({ Component, pageProps }) {
  // store.dispatch(loadProducts());
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  );
}
