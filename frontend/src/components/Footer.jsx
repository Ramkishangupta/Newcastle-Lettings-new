import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn, FaInstagram } from 'react-icons/fa';


const SocialLink = ({ href, icon, platform }) => (
  <a
    href={href}
    className="text-white"
    aria-label={`Visit our ${platform} page`}
    target="_blank"
    rel="noopener noreferrer" 
  >
    {icon}
  </a>
);

const Footer = () => (
  <>
    {/* Social Media Section */}
    <div className="p-4 text-center bg-[#3b5be4] flex justify-evenly flex-wrap">
      <p className="text-sm text-white">Get connected with us on social networks!</p>
      <div className="mt-2 flex justify-center space-x-4 gap-2">
        <SocialLink href="#" icon={<FaFacebookF />} platform="Facebook" />
        <SocialLink href="#" icon={<FaTwitter />} platform="Twitter" />
        <SocialLink href="#" icon={<FaGoogle />} platform="Google+" />
        <SocialLink href="#" icon={<FaLinkedinIn />} platform="LinkedIn" />
        <SocialLink href="#" icon={<FaInstagram />} platform="Instagram" />
      </div>
    </div>

    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content with Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold">COMPANY NAME</h3>
            <ul className="mt-2 text-sm text-gray-400">
              <li>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-lg font-semibold">PRODUCTS</h3>
            <ul className="mt-2 text-sm text-gray-400">
              <li>MDBootstrap</li>
              <li>MDWordPress</li>
              <li>BrandFlow</li>
              <li>Bootstrap Angular</li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h3 className="text-lg font-semibold">USEFUL LINKS</h3>
            <ul className="mt-2 text-sm text-gray-400">
              <li>Your Account</li>
              <li>Become an Affiliate</li>
              <li>Shipping Rates</li>
              <li>Help</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold">CONTACT</h3>
            <ul className="mt-2 text-sm text-gray-400">
              <li>New York, NY 10012, US</li>
              <li>info@example.com</li>
              <li>+01 234 567 88</li>
              <li>+01 234 567 89</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    {/* Copyright Section */}
    <div className="p-2 text-center text-sm text-gray-400 bg-[#161D27]">
      <p>© 2017 Copyright: MDBootstrap.com</p>
    </div>
  </>
);

export default Footer;
