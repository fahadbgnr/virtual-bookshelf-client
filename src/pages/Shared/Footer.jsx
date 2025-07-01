import React from 'react';
import Logo from '../../assets/Logo.png';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            {/* Main Footer */}
            <footer className="footer sm:footer-horizontal bg-purple-100 bg-opacity-90 text-purple-800 p-10">
                <aside className="text-center sm:text-left">
                    <img className='w-10 mx-auto sm:mx-0' src={Logo} alt="Logo" />
                    <p className="mt-2 font-semibold">
                        BookNest
                        <br />
                        <span className="text-sm font-normal">Where stories find a home.</span>
                    </p>
                </aside>

                <nav className="text-center sm:text-left">
                    <h6 className="footer-title font-bold mb-2">Contact details</h6>
                    <p>Dhaka<br /> Bangladesh</p>
                </nav>

                <nav className="text-center sm:text-left">
                    <h6 className="footer-title font-bold mb-2">Social</h6>
                    <div className="flex justify-center sm:justify-start gap-6 text-2xl">
                        <a
                            href="https://github.com/fahadbgnr?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-purple-600 transition"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sheikh-fahad-956777357"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-purple-600 transition"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </nav>
            </footer>

            {/* Bottom Footer */}
            <footer className="footer sm:footer-horizontal footer-center bg-purple-100 bg-opacity-90 text-purple-800 p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;
