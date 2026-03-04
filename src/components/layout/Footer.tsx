import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer section">
            {/* Top Left Line */}
            <div className="decor-angle-top"></div>
            <div className="decor-horizontal-top"></div>
            <div className="decor-circle-top"></div>
            {/* Bottom Right Line */}
            <div className="decor-angle-bottom"></div>
            <div className="decor-horizontal-bottom"></div>
            <div className="decor-circle-bottom"></div>
            <div className="container footer-container">
                <div className="footer-top">
                    {/* Left Side: Huge Typography Name */}
                    <div className="footer-hero-name">
                        <span className="name-role">Bc.</span>
                        <div className="name-large">
                            <h1>Tomáš</h1>
                            <h1 className="name-indent text-gradient">Chrapovič</h1>
                        </div>
                    </div>

                    {/* Right Side: Contacts and Info */}
                    <div className="footer-contacts-section">
                        <h4 className="contacts-title">... /Navigation ...</h4>

                        <nav className="footer-nav">
                            <a href="#home">Main</a>
                            <a href="#about">About</a>
                            <a href="#education">Education</a>
                            <a href="#projects">Projects</a>
                            <a href="#skills">Skills</a>
                        </nav>

                        <div className="footer-site-box glass-panel">
                            <p>/ Powered by React /</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Social Pills */}
                <div className="footer-bottom-pills">
                    <a href="https://github.com/chrapovicTomas" target="_blank" rel="noopener noreferrer" className="social-pill">
                        <Github size={20} />
                        <span>Github</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                        <Linkedin size={20} />
                        <span>Linkedin</span>
                    </a>
                    <a href="mailto:chrapovic.tomas@gmail.com" className="social-pill">
                        <Mail size={20} />
                        <span>E-mail</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
