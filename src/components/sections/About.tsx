import React from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { ParticleSphere } from '../ui/ParticleSphere';
import './About.css';

const About: React.FC = () => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    const skewX = useTransform(smoothVelocity, [-1000, 0, 1000], [-3, 0, 3]);
    const shiftX1 = useTransform(smoothVelocity, [-1000, 0, 1000], [25, 0, -25]);
    const shiftX2 = useTransform(smoothVelocity, [-1000, 0, 1000], [-25, 0, 25]);
    const shiftX3 = useTransform(smoothVelocity, [-1000, 0, 1000], [10, 0, -10]);
    const yOffsets = useTransform(smoothVelocity, [-1000, 0, 1000], [5, 0, -5]);
    const glitchOpacity = useTransform(smoothVelocity, [-500, -50, 0, 50, 500], [0.7, 0, 0, 0, 0.7]);

    return (
        <section id="about" className="about section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <h2 className="section-title">About <span className="text-gradient">me.</span></h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="lead">
                            I am a Computer Science student with an open-minded approach to new knowledge and
                            challenges. I am looking for an opportunity to gain my first professional experience, broaden
                            my horizons, and grow through practical application.
                        </p>
                        <p>
                            During my studies, I gained a solid foundation in algorithms, data structures, and system architecture.
                            I am characterized by responsibility, reliability, independence, and a strong willingness to learn new things
                        </p>
                        <p>
                            In my free time, I enjoy working on personal projects, learning new technologies, and expanding my knowledge in the field of computer science.
                        </p>
                    </motion.div>

                    <div
                        className="about-image-container relative"
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                        style={{ skewX, y: yOffsets }}
                    >

                        <div className="profile-image-wrapper relative z-10">
                            <img src="/portrait.png" alt="Tomáš Chrapovič" className="profile-image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
