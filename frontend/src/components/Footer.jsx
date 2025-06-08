import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <>
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content with Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold">Newcastle Lettings</h3>
            <p className="mt-2 text-sm text-gray-400">
              Newcastle Lettings is committed to helping you find the perfect home or tenant. We offer dedicated letting services across the Newcastle area with a strong focus on transparency and professionalism.
            </p>
          </div>

          {/* Products/Services Column */}
          <div>
            <h3 className="text-lg font-semibold">SERVICES</h3>
            <ul className="mt-2 text-sm text-gray-400 space-y-1">
              <li>Property Lettings</li>
              <li>Tenant Support</li>
              <li>Maintenance Handling</li>
              <li>Property Management</li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h3 className="text-lg font-semibold">USEFUL LINKS</h3>
            <ul className="mt-2 text-sm text-gray-400 space-y-1">
              <li><Link to="/services" className="hover:underline">Our Services</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/report-repair" className="hover:underline">Report a Repair</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold">CONTACT</h3>
            <ul className="mt-2 text-sm text-gray-400 space-y-1">
              <li>28 Fenham Hall Dr,</li>
              <li>Newcastle upon Tyne NE4 9UU,</li>
              <li>United Kingdom</li>
              <li className="mt-2">+44 191 274 9932</li>
              <li>info@newcastlelettings.com</li> {/* Optional: Replace if known */}
            </ul>
          </div>
        </div>
      </div>
    </footer>

    {/* Copyright */}
    <div className="p-2 text-center text-sm text-gray-400 bg-[#161D27]">
      <p>© {new Date().getFullYear()} Newcastle Lettings. All rights reserved.</p>
    </div>
  </>
);

export default Footer;
