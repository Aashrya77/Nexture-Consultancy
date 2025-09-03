import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Import layout
import PublicLayout from './Components/PublicLayout';
import HomePage from './Components/HomePage/HomePage'
import AboutPage from './Components/AboutPage/AboutPage';
import StudyAbroadPage from './Components/StudyAbroad/StudyAbroadPage';
import BlogPage from './Components/Blogs/BlogPage';
import ContactPage from './Components/ContactPage/ContactPage';
import LoginPage from './Auth/Login/LoginPage';
import RegisterPage from './Auth/Register/RegisterPage';

// Import individual country pages
import AustraliaPage from './Components/Countries/Australia/AustraliaPage';
import CanadaPage from './Components/Countries/Canada/CanadaPage';
import UnitedStatesPage from './Components/Countries/UnitedStates/UnitedStatesPage';
import UnitedKingdomPage from './Components/Countries/UnitedKingdom/UnitedKingdomPage';
import GermanyPage from './Components/Countries/Germany/GermanyPage';
import NewZealandPage from './Components/Countries/NewZealand/NewZealandPage';

import AdminHomepagePage from './Admin/AdminHome/AdminHomepagePage';
import AdminAboutPage from './Admin/AdminAbout/AdminAboutPage';
import AdminLayout from './Admin/AdminLayout/AdminLayout';

// Admin imports
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes wrapped with PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="study-abroad" element={<StudyAbroadPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            
            {/* Individual country routes */}
            <Route path="study/australia" element={<AustraliaPage />} />
            <Route path="study/canada" element={<CanadaPage />} />
            <Route path="study/united-states" element={<UnitedStatesPage />} />
            <Route path="study/united-kingdom" element={<UnitedKingdomPage />} />
            <Route path="study/germany" element={<GermanyPage />} />
            <Route path="study/new-zealand" element={<NewZealandPage />} />
          </Route>
          {/* Admin routes */}

            <Route element={<AdminLayout />}>
            <Route path="home" element={<AdminHomepagePage />} />
             <Route path="about" element={<AdminAboutPage />} />
            </Route>
           

        </Routes>
      </div>
    </Router>
  );
}

export default App;
