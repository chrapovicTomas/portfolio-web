import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal, Database, Layout, Server, Figma, Code, GitBranch, Users, MessageSquare, Target, Lightbulb, Clock, BrainCircuit } from 'lucide-react';
import './Skills.css';

const hardSkills = [
    { name: 'C / C++', icon: <Terminal size={20} />, type: 'hard' },
    { name: 'Python', icon: <Server size={20} />, type: 'hard' },
    { name: 'Java', icon: <Database size={20} />, type: 'hard' },
    { name: 'React', icon: <Layout size={20} />, type: 'hard' },
    { name: 'HTML / CSS', icon: <Layout size={20} />, type: 'hard' },
    { name: 'JavaScript, TypeScript', icon: <Code size={20} />, type: 'hard' },
    { name: 'UI / UX', icon: <Figma size={20} />, type: 'hard' },
    { name: 'GIT', icon: <GitBranch size={20} />, type: 'hard' },
    { name: 'Unity', icon: <Database size={20} />, type: 'hard' }
];

const softSkills = [
    { name: 'Communication', icon: <MessageSquare size={20} />, type: 'soft' },
    { name: 'Teamwork', icon: <Users size={20} />, type: 'soft' },
    { name: 'Adaptability', icon: <Target size={20} />, type: 'soft' },
    { name: 'Time Management', icon: <Clock size={20} />, type: 'soft' },
    { name: 'Problem Solving', icon: <BrainCircuit size={20} />, type: 'soft' },
    { name: 'Creativity', icon: <Lightbulb size={20} />, type: 'soft' }
];

const languages = [
    { name: 'Slovak', level: 'Native Language', code: 'SK' },
    { name: 'Czech', level: 'Fluent', code: 'CZ' },
    { name: 'English', level: 'B2', code: 'EN' },
    { name: 'German', level: 'A2', code: 'DE' },
];

interface SkillProps {
    name: string;
    icon: React.ReactNode;
    type: string;
}

const BentoCard3D = ({ item, index }: { item: SkillProps, index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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

    return (
        <motion.div
            ref={ref}
            className={`bento-3d-wrapper ${item.type}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
        >
            <div className="bento-3d-card glass-panel">
                <div className="bento-3d-icon">{item.icon}</div>
                <h4 className="bento-3d-title">{item.name}</h4>
            </div>
        </motion.div>
    );
};

const Skills: React.FC = () => {
    return (
        <section id="skills" className="skills section">
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="section-header center"
                >
                    <h2 className="section-title">My <span className="text-gradient">Skills.</span></h2>
                    <p className="section-subtitle" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Technologies & Tools I work with</p>
                </motion.div>

                <div className="skills-content">
                    <div className="bento-3d-split-container">
                        <div className="bento-3d-category">
                            <h3 className="category-title">Hard Skills</h3>
                            <div className="bento-3d-grid hardskills-grid">
                                {hardSkills.map((skill, index) => (
                                    <BentoCard3D key={`hard-${index}`} item={skill} index={index} />
                                ))}
                            </div>
                        </div>

                        <div className="bento-3d-category">
                            <h3 className="category-title">Soft Skills</h3>
                            <div className="bento-3d-grid softskills-grid">
                                {softSkills.map((skill, index) => (
                                    <BentoCard3D key={`soft-${index}`} item={skill} index={index} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Languages Section */}
                    <motion.div
                        className="skills-category"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <h3>Languages</h3>
                        <div className="languages-grid">
                            {languages.map((lang, index) => (
                                <motion.div
                                    key={`lang-${index}`}
                                    className="language-card glass-panel"
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="lang-code-circle">
                                        <span>{lang.code}</span>
                                    </div>
                                    <div className="lang-info">
                                        <span className="lang-name">{lang.name}</span>
                                        <span className="lang-level text-gradient">{lang.level}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
