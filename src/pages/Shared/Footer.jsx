import React from 'react';
import Logo from '../../assets/Logo.png';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            {/* Main Footer */}
            <footer className="bg-purple-100 bg-opacity-90 text-purple-800 p-10">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8 sm:gap-0">
                    {/* Logo Section */}
                    <aside className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                        <img className="w-10 mb-2" src={Logo} alt="Logo" />
                        <p className="font-semibold">
                            BookNest
                            <br />
                            <span className="text-sm font-normal">Where stories find a home.</span>
                        </p>
                    </aside>

                    {/* Contact Section */}
                    <nav className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                        <h6 className="footer-title font-bold mb-2">Contact details</h6>
                        <p>
                            Dhaka<br /> Bangladesh
                        </p>
                    </nav>

                    {/* Social Section */}
                    <nav className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                        <h6 className="footer-title font-bold mb-2">Social</h6>
                        <div className="flex gap-6 text-2xl">
                            <a
                                href="https://github.com/fahadbgnr?tab=repositories"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-600 transition"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/sheikh-fahad-956777357"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-600 transition"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </nav>
                </div>
            </footer>

            {/* Bottom Footer */}
            <footer className="bg-purple-100 bg-opacity-90 text-purple-800 p-4">
                <div className="max-w-7xl mx-auto text-center text-sm">
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
