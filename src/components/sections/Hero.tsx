import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';
import './Hero.css';

const codeSnippet = `const developer = {
    title: "Bc.",
    name: "Tomáš Chrapovič",
    role: "Computer Science Student",
    mail: "chrapovic.tomas@gmail.com",
    github: "https://github.com/chrapovicTomas",
};

developer.startCoding();`;

const Hero: React.FC = () => {
    const { displayedText, isTyping } = useTypewriter(codeSnippet, 30, 1500);

    return (
        <section id="home" className="hero section">
            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.p
                        className="hero-greeting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Hello, I'm
                    </motion.p>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                    >
                        Bc. Tomáš <span className="text-gradient">Chrapovič</span>
                        <span className="hero-subtitle text-gradient">Student of Computer Science.</span>
                    </motion.h1>


                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <a href="#projects" className="btn btn-primary">
                            My Projects <ArrowRight size={18} />
                        </a>
                        <a href="/chrapovic_resume.pdf" className="btn btn-outline">
                            Download CV <Download size={18} />
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    <div className="code-block glass-panel">
                        <pre>
                            <code>
                                {displayedText}
                                <span className={`cursor ${isTyping ? 'typing' : 'blinking'}`}>_</span>
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </div>

            {/* Background ambient glow effect */}
            <div className="ambient-glow"></div>
        </section>
    );
};

export default Hero;
