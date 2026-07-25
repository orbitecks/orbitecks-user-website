import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navigationData } from '../data/navigationData';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  const { logo, navLinks, buttons } = navigationData;

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
            <span className="nav-logo-dot" style={{ background: logo.dotColor }} />
            {logo.textFirst}<span>{logo.textSecond}</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            {navLinks.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="nav-right">
            <Link to="/contact" className="btn btn-outline btn-sm">
              {buttons.talk}
            </Link>
            <Link to="/consultation" className="btn btn-primary btn-sm">
              {buttons.consultation}
            </Link>
            {/* Mobile Toggle */}
            <button
              className="nav-toggle"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(v => !v)}
            >
              <span style={mobileOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
              <span style={mobileOpen ? { opacity: 0 } : {}} />
              <span style={mobileOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        {navLinks.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => isActive ? 'active' : ''}
            end={item.to === '/'}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link to="/contact" className="btn btn-outline" onClick={() => setMobileOpen(false)}>
            {buttons.talk}
          </Link>
          <Link to="/consultation" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
            {buttons.consultation}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
