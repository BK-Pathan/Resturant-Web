import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import "./footer.css";




function Footer() {
  return (
    <section className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          {/* Company Info */}
          <div className="footer-company">
            <div className="footer-logo">
              <Logo width="100px" />
            </div>
           
          </div>

          {/* Company Links */}
          <div>
            <h3 className="footer-title">Company</h3>
            <ul className="footer-list">
              <li><Link className="footer-link" to="/">Features</Link></li>
              <li><Link className="footer-link" to="/">Pricing</Link></li>
              <li><Link className="footer-link" to="/">Affiliate Program</Link></li>
              <li><Link className="footer-link" to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="footer-title">Support</h3>
            <ul className="footer-list">
              <li><Link className="footer-link" to="/">Account</Link></li>
              <li><Link className="footer-link" to="/">Help</Link></li>
              <li><Link className="footer-link" to="/">Contact Us</Link></li>
              <li><Link className="footer-link" to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="footer-title">Legals</h3>
            <ul className="footer-list">
              <li><Link className="footer-link" to="/">Terms & Conditions</Link></li>
              <li><Link className="footer-link" to="/">Privacy Policy</Link></li>
              <li><Link className="footer-link" to="/">Licensing</Link></li>
            </ul>
          </div>
          <div>
             <p className="footer-copy">
              &copy; {new Date().getFullYear()} My Restaurant Admin. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
