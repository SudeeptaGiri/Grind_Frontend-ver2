import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './styles.css'

import { AuthContext, AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';


import Login from './pages/login';
import Register from './pages/Register';
import Error from './pages/Error';
import Roadmap from './pages/Roadmap';
import Select from './pages/Select';

import Community from './pages/Community';
import Start from './pages/Start';


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
          <Routes>
            {/* TODO: Fix AuthRoute */}
            <Route exact path = "/" element = {<Roadmap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/community" element={<Community />} />
            <Route path="/start" element={<Start />} />
            <Route path="/select" element={<Select />} />
            <Route path = "*" element = {<Error />} />
          </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
