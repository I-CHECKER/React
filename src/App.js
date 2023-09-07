import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LocationAuth from "./locationAuth/locationAuth";
import MapRender from "./locationAuth/mapRender";
import CsvDownload from "./csvDownload/csvDownload";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LocationAuth/>}></Route>
                <Route path="/csv" element={<CsvDownload/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
