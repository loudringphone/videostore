import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './App.css';

import { Layout } from './components/layout/Layout';

function App() {

      return (
        <div className="App">
            <ScrollToTop />
            <Layout />
        </div>
      );
}
 
export default App;




function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo({
        // In general, if you want to scroll to the top of the page, using document.documentElement.scrollTop is the more reliable and widely used approach. However, if you need to scroll to a specific position on the page or use more advanced scrolling behaviors, window.scrollTo or window.scrollBy may be more appropriate.
        top: 0,
        left: 0,
        behavior: "instant",
        });
    }, [pathname]);

    return null;
}