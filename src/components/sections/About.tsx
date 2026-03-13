import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lamp } from '../ui/Lamp';
import './About.css';

const About: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Variants for container (staggering children)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.8, // Wait for Lamp animation to progress
            },
        },
    };

    // Variants for individual text items
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1] as any,
            },
        },
    };

    return (
        <section id="about" className="about-section-wrapper section">
            <Lamp>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="section-header center"
                >
                    <h2 className="section-title">About <span className="text-gradient">me.</span></h2>
                    <p className="section-subtitle">Get to know more about my background and skills.</p>
                </motion.div>
            </Lamp>

            <div className="container about-container-main">
                <div className="about-content">
                    <motion.div
                        className="about-text"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.p className="lead" variants={itemVariants}>
                            I am a Computer Science student with an open-minded approach to new knowledge and
                            challenges. I am looking for an opportunity to gain my first professional experience, broaden
                            my horizons, and grow through practical application.
                        </motion.p>
                        <motion.p variants={itemVariants}>
                            During my studies, I gained a solid foundation in algorithms, data structures, and system architecture.
                            I am characterized by responsibility, reliability, independence, and a strong willingness to learn new things.
                        </motion.p>
                        <motion.p variants={itemVariants}>
                            In my free time, I enjoy working on personal projects, learning new technologies, and expanding my knowledge in the field of computer science.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        ref={ref}
                        className="about-image-container relative"
                        initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, delay: 1.4, ease: [0.33, 1, 0.68, 1] }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <motion.div
                            className="profile-image-wrapper relative z-10"
                            whileHover={{ 
                                y: -10, 
                                scale: 1.02,
                                transition: { duration: 0.4, ease: "easeOut" } 
                            }}
                            style={{
                                transformStyle: "preserve-3d",
                                translateZ: "50px"
                            }}
                        >
                            <img 
                                src="/portrait.png" 
                                alt="Tomáš Chrapovič" 
                                className="profile-image" 
                                style={{ transform: "translateZ(30px)" }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;