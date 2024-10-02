// import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import './styles/App.css';
// import './Footer';
// import Footer from './Footer';
// import Emergency from "./emergency";
// import Lost from "./lost";
// import MainButtons from "./mainButtons";
// import CreateNfcTag from "./createnfctag"; // Import the new component

// function App() {
//     return (
//         <BrowserRouter> 
//             <div className="mainPage">
//                 <MainButtons />
//                 <Routes>
//                     <Route path="/lost" element={<Lost />} />
//                     <Route path="/emergency" element={<Emergency />} />
//                 </Routes>
//                 <Footer />
//             </div>    
//         </BrowserRouter>
//     );
// }

// export default App;
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import './styles/App.css';
import './Footer';
import Footer from './Footer';
import Emergency from "./emergency";
import Lost from "./lost";
import MainButtons from "./mainButtons";

function App() {
    const [nfcId, setNfcId] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('nfcid');
        if (id) {
            setNfcId(id);
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="mainPage">
                <MainButtons />
                <Routes>
                    <Route path="/lost" element={<Lost nfcId={nfcId} />} />
                    <Route path="/emergency" element={<Emergency nfcId={nfcId} />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;