import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';

import Root from './pages/Root.jsx';       // layout
import Home from './pages/Home.jsx';       // actual pages
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx'; // capitalize filename for consistency
import GenerateResume from './pages/GenerateResume.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          {/* 👇 These routes will render inside <Outlet /> in Root.jsx */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path='generateresume' element={<GenerateResume/>}/>
		  </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
