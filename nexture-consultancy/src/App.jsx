import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import authentication context
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import layout
import PublicLayout from './Components/PublicLayout';
import HomePage from './Components/HomePage/HomePage'
import AboutPage from './Components/AboutPage/AboutPage';
import StudyAbroadPage from './Components/StudyAbroad/StudyAbroadPage';
import BlogPage from './Components/Blogs/BlogPage';
import ContactPage from './Components/ContactPage/ContactPage';
import ConsultationPage from './Components/ConsultationPage/ConsultationPage';
import AdminLogin from './pages/AdminLogin/AdminLogin';

// Import individual country pages
import AustraliaPage from './Components/Countries/Australia/AustraliaPage';
import CanadaPage from './Components/Countries/Canada/CanadaPage';
import UnitedStatesPage from './Components/Countries/UnitedStates/UnitedStatesPage';
import UnitedKingdomPage from './Components/Countries/UnitedKingdom/UnitedKingdomPage';
import GermanyPage from './Components/Countries/Germany/GermanyPage';
import NewZealandPage from './Components/Countries/NewZealand/NewZealandPage';

import AdminHomepagePage from './Admin/AdminHome/AdminHomepagePage';
import AdminAboutPage from './Admin/AdminAbout/AdminAboutPage';
import AdminTeam from './Admin/AdminTeam/AdminTeam';
import AdminLayout from './Admin/AdminLayout/AdminLayout';
import AdminConsultationPage from './Admin/AdminConsultation/AdminConsultationPage';

// Admin imports
function App() {
  return (
    <AuthProvider>
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
              <Route path="consultation" element={<ConsultationPage />} />
              
              {/* Individual country routes */}
              <Route path="study/australia" element={<AustraliaPage />} />
              <Route path="study/canada" element={<CanadaPage />} />
              <Route path="study/united-states" element={<UnitedStatesPage />} />
              <Route path="study/united-kingdom" element={<UnitedKingdomPage />} />
              <Route path="study/germany" element={<GermanyPage />} />
              <Route path="study/new-zealand" element={<NewZealandPage />} />
            </Route>
            
            {/* Admin Login Route (outside of PublicLayout) */}
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Protected Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminHomepagePage />} />
              <Route path="homepage" element={<AdminHomepagePage />} />
              <Route path="about" element={<AdminAboutPage />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="consultations" element={<AdminConsultationPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
