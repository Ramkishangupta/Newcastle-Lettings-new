import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { logo, logoBlack } from "../assets/assets";

// Navigation Items
const navItems = [
  { name: "Search Properties", path: "/searchproperties" },
  { name: "Services", path: "/services" },
  {
    name: "Property Maintenance",
    dropdown: ["Request Service", "Maintenance Plans"],
    path: "/property-maintenance",
  },
  { name: "Report A Repair", path: "/report-repair" },
  {
    name: "About",
    dropdown: ["Our Team", "History", "Testimonials"],
    path: "/about",
  },
  { name: "Contact Us", path: "/contact" },
];

// Hamburger Icon
const Hamburger = memo(({ open }) => (
  <div className="w-7 h-7 flex flex-col justify-center items-center relative cursor-pointer">
    <span className={`block absolute h-0.5 w-7 bg-white rounded transition-all duration-300 ${open ? "rotate-45 top-3.5" : "top-2"}`} />
    <span className={`block absolute h-0.5 w-7 bg-white rounded transition-all duration-300 ${open ? "opacity-0" : "top-3.5"}`} />
    <span className={`block absolute h-0.5 w-7 bg-white rounded transition-all duration-300 ${open ? "-rotate-45 top-3.5" : "top-5"}`} />
  </div>
));

// Desktop Navigation
const DesktopNav = ({ navItems, isScrolled, setOpenDropdown, openDropdown }) => (
  <div className={`hidden md:flex items-center justify-between px-12 py-6 w-full ${isScrolled ? "bg-[#f0f0f0]" : "bg-transparent"}`}>
    <img src={isScrolled ? logoBlack : logo} alt="Logo" className="w-50 h-full" />

    <div className="flex-1 flex justify-center space-x-12">
      {navItems.map(({ name, dropdown, path }) => (
        <div
          key={name}
          className="relative"
          onMouseEnter={() => dropdown && setOpenDropdown(name)}
          onMouseLeave={() => dropdown && setOpenDropdown(null)}
        >
          <Link
            to={path}
            className={`relative font-medium flex items-center gap-2 cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            } after:absolute after:left-0 after:-bottom-4 after:h-[3px] after:w-0 after:bg-[#3b5be4] after:transition-all hover:after:w-full`}
          >
            {name}
            {dropdown && <FaChevronDown className="ml-1 text-xs" />}
          </Link>

          <AnimatePresence>
            {dropdown && openDropdown === name && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 -translate-x-1/2 mt-4 bg-white text-[#9c9c9c] shadow-lg py-6 px-8 min-w-[240px] z-40"
              >
                <ul className="space-y-3">
                  {dropdown.map((item) => (
                    <li
                      key={item}
                      className="font-light tracking-wide text-base hover:text-[#233366] cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  </div>
);

// Mobile Navigation
const MobileNav = ({
  mobileOpen,
  setMobileOpen,
  mobileDropdown,
  setMobileDropdown,
  isScrolled,
}) => (
  <>
    <div className={`md:hidden w-full flex items-center justify-between px-4 py-4 ${isScrolled ? "bg-[#233366]" : "bg-transparent"}`}>
      <img src={logo} alt="Logo" className="w-30 h-full" />
      <button onClick={() => setMobileOpen(!mobileOpen)}>
        <Hamburger open={mobileOpen} />
      </button>
    </div>

    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed inset-0 bg-[#233366] z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4">
            <img src={logo} alt="Logo" className="w-30 h-full" />
            <button onClick={() => setMobileOpen(false)}>
              <Hamburger open />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {navItems.map(({ name, dropdown, path }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.07 }}
                className="border-b border-[#2e4170]"
              >
                <Link
                  to={path}
                  className="text-white font-medium px-4 py-4 flex justify-between items-center"
                  onClick={() =>
                    setMobileDropdown(mobileDropdown === name ? null : name)
                  }
                >
                  {name}
                  {dropdown && (
                    <FaChevronDown
                      className={`text-xs transition-transform ${
                        mobileDropdown === name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {dropdown && mobileDropdown === name && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4 space-y-2"
                    >
                      {dropdown.map((d) => (
                        <li
                          key={d}
                          className="text-[#8e9bca] pl-2 text-base font-semibold hover:text-white cursor-pointer"
                          onClick={() => setMobileOpen(false)}
                        >
                          {d}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-[#2e4170] text-white text-sm">
            <div className="flex justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <FaEnvelope /> enquiries@sw.co.uk
              </div>
              <div className="flex items-center gap-2">
                <FaPhone /> 0800 122 3050
              </div>
            </div>
            <div className="flex justify-around py-4 border-t border-[#2e4170] text-2xl">
              <FaInstagram />
              <FaLinkedinIn />
              <FaTwitter />
              <FaFacebookF />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);

// Main Navbar Component
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300">
      <DesktopNav
        navItems={navItems}
        isScrolled={isScrolled}
        setOpenDropdown={setOpenDropdown}
        openDropdown={openDropdown}
      />
      <MobileNav
        navItems={navItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        mobileDropdown={mobileDropdown}
        setMobileDropdown={setMobileDropdown}
        isScrolled={isScrolled}
      />
    </nav>
  );
};

export default Navbar;
