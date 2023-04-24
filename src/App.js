import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './App.css';

import { Layout } from './components/layout/Layout';

function App() {

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

      return (
        <Layout />
      );
}
 
export default App;