import React from 'react';
import PopupModal from './Components/PopupModal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import authentication context
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';

// Import layout
import PublicLayout from './Components/PublicLayout';
import HomePage from './Components/HomePage/HomePage'
import AboutPage from './Components/AboutPage/AboutPage';
import StudyAbroadPage from './Components/StudyAbroad/StudyAbroadPage';
import BlogPage from './Components/Blogs/BlogPage';
import BlogDetail from './Components/Blogs/BlogDetail';
import ContactPage from './Components/ContactPage/ContactPage';
import ConsultationPage from './Components/ConsultationPage/ConsultationPage';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import IELTSPage from './Components/TestPrep/IELTSPage';
import PTEPage from './Components/TestPrep/PTEPage';

// Import individual country pages
import AustraliaPage from './Components/Countries/Australia/AustraliaPage';
import CanadaPage from './Components/Countries/Canada/CanadaPage';
import UnitedStatesPage from './Components/Countries/UnitedStates/UnitedStatesPage';
import UnitedKingdomPage from './Components/Countries/UnitedKingdom/UnitedKingdomPage';
import GermanyPage from './Components/Countries/Germany/GermanyPage';
import NewZealandPage from './Components/Countries/NewZealand/NewZealandPage';

// Import legal pages
import TermsOfService from './Components/TermsOfService/TermsOfService';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';

import AdminHomepagePage from './Admin/AdminHome/AdminHomepagePage';
import AdminPopupImage from './Admin/AdminHome/AdminPopupImage';
import AdminAboutPage from './Admin/AdminAbout/AdminAboutPage';
import AdminTeam from './Admin/AdminTeam/AdminTeam';
import AdminLayout from './Admin/AdminLayout/AdminLayout';
import AdminConsultationPage from './Admin/AdminConsultation/AdminConsultationPage';
import AdminBlog from './Admin/AdminBlog/AdminBlog';
import AdminDashboard from './Admin/AdminDashboard/AdminDashboard';
import AdminContact from './Admin/AdminContact/AdminContact';
import AdminUsers from './Admin/AdminUsers/AdminUsers';
import CounselorDashboard from './Components/CounselorDashboard/CounselorDashboard';
function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <PopupModal />
        <div className="App">
          <Routes>
            {/* Public routes wrapped with PublicLayout */}
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="study-abroad" element={<StudyAbroadPage />} />
              <Route path="counselor-dashboard" element={<CounselorDashboard />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="test-prep/ielts" element={<IELTSPage />} />
              <Route path="test-prep/pte" element={<PTEPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="consultation" element={<ConsultationPage />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              
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
              <Route index element={<AdminDashboard />} />
              <Route path="homepage" element={<AdminHomepagePage />} />
              <Route path="about" element={<AdminAboutPage />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="consultations" element={<AdminConsultationPage />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="popup-image" element={<AdminPopupImage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
