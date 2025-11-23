import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row flex-wrap justify-between gap-10 text-center sm:text-left">
        
        {/* Contact Section */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 justify-center sm:justify-start">
              <MdOutlineMailOutline size={18} /> your@email.com
            </li>
            <li className="flex items-center gap-2 justify-center sm:justify-start">
              <FaPhoneAlt size={16} /> +91 12345 67890
            </li>
            <li className="flex items-center gap-2 justify-center sm:justify-start">
              <CiLocationOn size={20} /> Your City, India
            </li>
          </ul>
        </div>

        {/* Follow Me Section */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-3">Follow Me</h3>
          <ul className="flex justify-center sm:justify-start gap-5 text-xl">
            <li><IoLogoInstagram /></li>
            <li><FaLinkedin /></li>
            <li><FaGithub /></li>
          </ul>
        </div>

        {/* About Section */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p className="text-sm leading-relaxed">
            I'm a passionate developer building modern and user-friendly websites. Let's connect and collaborate to build something great together.
          </p>
        </div>
      </div>
        <div className=" text-gray-400 text-sm text-center py-4">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
