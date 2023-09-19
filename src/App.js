
import React from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';
import CsvDownload from "./csvDownload/csvDownload";
import LocationAuth from './locationAuth/locationAuth';
import Home from './Home';
function App() {
    return (
      <LocationAuth/>
    );
};
export default App;
