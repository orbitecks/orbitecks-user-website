import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Services from './pages/Services.tsx';
import ServiceDetail from './pages/ServiceDetail.tsx';
import Portfolio from './pages/Portfolio.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import Contact from './pages/Contact.tsx';
import Blog from './pages/Blog.tsx';
import Consultation from './pages/Consultation.tsx';
import Terms from './pages/Terms.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import RefundPolicy from './pages/RefundPolicy.tsx';
import Nda from './pages/Nda.tsx';
import NotFound from './pages/NotFound.tsx';
import Forbidden from './pages/Forbidden.tsx';
import ServerError from './pages/ServerError.tsx';
import OfflinePage from './pages/OfflinePage.tsx';
import Maintenance from './pages/Maintenance.tsx';
import OfflineBanner from './components/OfflineBanner.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import PageContainer from './components/PageContainer.tsx';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <OfflineBanner />
        <ScrollToTop />
        <Navbar />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:projectId" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/nda" element={<Nda />} />
            <Route path="/403" element={<Forbidden />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="/offline" element={<OfflinePage />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageContainer>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
