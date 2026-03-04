import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Layout, Server, Figma, Code, GitBranch, Users, MessageSquare, Target, Lightbulb, Clock, BrainCircuit } from 'lucide-react';
import './Skills.css';

const hardSkills = [
    { name: 'C / C++', icon: <Terminal size={24} /> },
    { name: 'Python', icon: <Server size={24} /> },
    { name: 'Java', icon: <Database size={24} /> },
    { name: 'React, HTML, CSS', icon: <Layout size={24} /> },
    { name: 'JavaScript, TypeScript', icon: <Code size={24} /> },
    { name: 'UI / UX', icon: <Figma size={24} /> },
    { name: 'GIT, Linux, Unity', icon: <GitBranch size={24} /> },
];

const otherSkills = [
    { name: 'Communication', icon: <MessageSquare size={24} /> },
    { name: 'Teamwork', icon: <Users size={24} /> },
    { name: 'Adaptability', icon: <Target size={24} /> },
    { name: 'Time Management', icon: <Clock size={24} /> },
    { name: 'Problem Solving', icon: <BrainCircuit size={24} /> },
    { name: 'Creativity', icon: <Lightbulb size={24} /> }
];

const languages = [
    { name: 'Slovak', level: 'Native Language', code: 'SK' },
    { name: 'Czech', level: 'Fluent', code: 'CZ' },
    { name: 'English', level: 'B2', code: 'EN' },
    { name: 'German', level: 'A2', code: 'DE' },
];

const Skills: React.FC = () => {
    return (
        <section id="skills" className="skills section">
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <h2 className="section-title">My <span className="text-gradient">Skills.</span></h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="skills-content">
                    {/* Hard Skills */}
                    <motion.div
                        className="skills-category"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Hard Skills</h3>
                        <div className="skills-grid">
                            {hardSkills.map((skill, index) => (
                                <motion.div
                                    key={`hard-${index}`}
                                    className="skill-card glass-panel"
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="skill-icon">{skill.icon}</div>
                                    <span className="skill-name">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="skills-row">
                        {/* Other Skills */}
                        <motion.div
                            className="skills-category"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h3>Other Skills</h3>
                            <div className="skills-grid">
                                {otherSkills.map((skill, index) => (
                                    <motion.div
                                        key={`other-${index}`}
                                        className="skill-card glass-panel"
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="skill-icon">{skill.icon}</div>
                                        <span className="skill-name">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Languages */}
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
            </div>
        </section>
    );
};

export default Skills;
