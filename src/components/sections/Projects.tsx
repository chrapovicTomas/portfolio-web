import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, MotionValue } from 'framer-motion';
import { Github, ArrowDown, X } from 'lucide-react';
import './Projects.css';

const projects = [
    {
        title: "Dynamic Liquid Morph",
        description: "Interactive web application focused on real-time soft body physics simulation",
        details: (
            <>
                <p>This project is an interactive web application focused on real-time soft body physics simulation. The program utilizes the Three.js library and implements a physical model based on a Mass-Spring System. The aim of the work is to demonstrate the numerical simulation of physical forces—such as elasticity, damping, and surface tension—within a WebGL environment.</p>
                <h4 style={{ marginTop: '1.2rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>Key Features</h4>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Physics Simulation:</strong> Real-time calculation of deformations using Hooke's Law with an integrated damping factor.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Dynamic Morphing:</strong> An algorithm for smooth transformation of vertex rest positions between sphere, cube, cylinder, and pyramid shapes.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>PBR Rendering:</strong> Physically Based Rendering using HDR maps (Image-Based Lighting) for realistic material simulation.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Interactive Deformation:</strong> Implementation of raycasting for local geometry manipulation using the mouse cursor.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Simulation Stability:</strong> Use of a Fixed Time Step with an accumulator to ensure consistent physics behavior regardless of frame rate.</li>
                </ul>
            </>
        ),
        image: "/dym_photo.png",
        video: "/dyn_video.mp4",
        tags: ["Three.js", "JavaScript", "Vite"],
        githubUrl: "https://github.com/chrapovicTomas/dynamic-liquid-morph"
    },
    {
        title: "Poke-tracker",
        description: "Web application for tracking Pokemon TCG collections.",
        details: (
            <>
                <p>PokeTracker is a modern web application built with Next.js that allows collectors and investors to effortlessly track the value of their Pokémon TCG (Trading Card Game) collections. Rather than manually checking prices, PokeTracker lets you add your cards or sealed products, and uses an automated web scraper to fetch real-time market prices directly from TCGPlayer.</p>
                <h4 style={{ marginTop: '1.2rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>Key Features</h4>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Portfolio Dashboard:</strong> View your total collection value, total investment (buy price), and calculate your overall profit or loss.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Automated Price Scraping:</strong> Built-in web scraper using Puppeteer and Cheerio to fetch the latest market prices from TCGPlayer URLs.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Price History Charts:</strong> Visualizes the price trend of your tracked items over time using Recharts.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Categorization:</strong> Group items by type (Single Cards, Booster Packs, Elite Trainer Boxes, Booster Bundles, etc.).</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>User Authentication:</strong> Secure user login and registration powered by NextAuth.js.</li>
                </ul>
            </>
        ),
        image: "/poke.png",
        video: "/poke_video.mp4",
        tags: ["Next.js", "Prisma", "SQLite", "NextAuth.js", "Cheerio", "Puppeteer", "Recharts"],
        githubUrl: "https://github.com/chrapovicTomas/poketracker"
    },
    {
        title: "Website for Pizza Restaurant",
        description: "Informational website for a pizza restaurant.",
        details: "A high-performance, visually striking web presentation for Pizzeria Heyday located in Snina, Slovakia. This project focuses on a premium aesthetic, seamless user experience, and mobile-first conversion.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "HTML", "TypeScript", "Next.js", "Tailwind CSS"],
        githubUrl: "https://github.com/chrapovicTomas/heyday_web"
    },

    {
        title: "Optimizing the HQC Post-Quantum Cipher - Bachelor Thesis",
        description: "Bachelor thesis repository",
        details: "Cryptography faces a major challenge: the rapid development of quantum computers. Modern encryption algorithms, such as RSA, do not provide sufficient protection against quantum attacks. This issue is being addressed by the NIST, which is responsible for the standardization process of post-quantum cryptographic algorithms. One of these algorithms is HQC, which is the focus of this thesis. The aim of this thesis is to optimize the HQC cipher with the goal of improving its time and memory efficiency. We describe the basic concepts of postquantum cryptography and the HQC scheme, focus on its implementation and optimization of key operations, and perform measurements of time and memory complexity and evaluate the success of the optimization.",
        image: "/TUKE.png",
        tags: ["LaTeX", "C++"],
        githubUrl: "https://github.com/chrapovicTomas/thesis"
    }
];

interface ProjectCardProps {
    project: any;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
    onOpen: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, total, scrollYProgress, onOpen }) => {
    // Pridáme "padding" – 15% na začiatku a na konci sa karty nehýbu, aby mal užívateľ čas
    const padding = 0.15;
    const span = (1 - 2 * padding) / (total - 1);
    const center = padding + index * span;

    // Vstupné body: [karta je vľavo mimo stred, karta je v strede, karta je vpravo mimo stred]
    const inputRange = [center - span, center, center + span];

    // Mapovanie hodnôt:
    // Scale: na krajoch menšia (0.85), v strede normálna (1) - vyrieši to problém s orezávaním
    const scale = useTransform(scrollYProgress, inputRange, [0.85, 1, 0.85]);

    // RotateY: natočenie. Keď je napravo, natočí sa k tebe dovnútra (-25deg). V strede je rovno (0deg).
    const rotateY = useTransform(scrollYProgress, inputRange, [25, 0, -25]);

    // Z: 3D hĺbka. Na krajoch je potlačená dozadu (-150px), v strede vystúpi (20px)
    const z = useTransform(scrollYProgress, inputRange, [-150, 20, -150]);

    // Opacity: Na krajoch mierne priehľadná, v strede jasná
    const opacity = useTransform(scrollYProgress, inputRange, [0.4, 1, 0.4]);

    // Z-index: Stredná (aktívna) karta musí byť najvyššie, aby nebola prekrytá
    const zIndex = useTransform(scrollYProgress, inputRange, [0, 10, 0]);

    // Zablokovať klikanie na karty, ktoré nie sú blízko stredu (zrýchli a sprehľadní to UX)
    const pointerEvents = useTransform(scrollYProgress, (v) => {
        return Math.abs(v - center) <= span * 0.7 ? "auto" : "none";
    });

    // Podsvietenie (glow) a border pre aktívnu kartu
    const boxShadow = useTransform(scrollYProgress, inputRange, [
        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "0 15px 40px -10px rgba(59, 130, 246, 0.5)",
        "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    ]);

    const borderColor = useTransform(scrollYProgress, inputRange, [
        "rgba(255, 255, 255, 0.05)",
        "rgba(59, 130, 246, 0.6)",
        "rgba(255, 255, 255, 0.05)"
    ]);

    return (
        <motion.div
            className="project-card glass-panel"
            // Použijeme priamo štýly z useTransform pre plynulý efekt
            style={{
                scale,
                rotateY,
                z,
                opacity,
                zIndex,
                boxShadow,
                borderColor,
                pointerEvents: pointerEvents as any
            }}
            whileHover={{ y: -10 }} // Jemné posunutie nahor pri hoveri stále funguje
        >            <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-links">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        <Github size={20} />
                    </a>
                </div>
            </div>

            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="project-tag">{tag}</span>
                    ))}
                </div>

                <div className="project-footer">
                    <button
                        className="expand-button"
                        onClick={onOpen}
                        aria-label="Viac info o projekte"
                    >
                        <span className="expand-text">About project</span>
                        <ArrowDown size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Projects: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [scrollDistance, setScrollDistance] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const calculateScrollDistance = () => {
            if (galleryRef.current) {
                // Total scrollable width minus viewport width
                setScrollDistance(galleryRef.current.scrollWidth - window.innerWidth);
            }
        };

        calculateScrollDistance();
        window.addEventListener('resize', calculateScrollDistance);
        return () => window.removeEventListener('resize', calculateScrollDistance);
    }, []);

    // Plynulý posun, ale aplikujeme ho iba medzi 0.15 a 0.85 (15% padding)
    const x = useTransform(scrollYProgress, [0.15, 0.85], [0, -scrollDistance]);
    const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedProject]);

    return (
        <section id="projects" className="projects-section-wrapper" ref={targetRef}>
            <div className="projects-sticky-container">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="section-header center"
                    >
                        <h2 className="section-title">My <span className="text-gradient">Projects.</span></h2>
                        <p className="section-subtitle">A selection of my recent work and experiments.</p>
                    </motion.div>

                    {/* Horizontal Progress Timeline */}
                    <div className="track-wrapper">
                        <div className="project-track"></div>
                        <motion.div
                            className="project-track-glow"
                            style={{ width: lineWidth }}
                        ></motion.div>
                    </div>
                </div>

                <div className="projects-scroll-window">
                    <motion.div style={{ x }} className="projects-gallery" ref={galleryRef}>
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                project={project}
                                index={index}
                                total={projects.length}
                                scrollYProgress={scrollYProgress} // <--- Tu podávame progress do kariet
                                onOpen={() => setSelectedProject(project)}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="project-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="project-modal-content glass-panel"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close-btn"
                                onClick={() => setSelectedProject(null)}
                            >
                                <X size={24} />
                            </button>

                            <div className="modal-image">
                                {selectedProject.video ? (
                                    <video
                                        src={selectedProject.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        onCanPlay={(e) => { e.currentTarget.playbackRate = 1.5; }}
                                    />
                                ) : (
                                    <img src={selectedProject.image} alt={selectedProject.title} />
                                )}
                            </div>

                            <div className="modal-body">
                                <h2>{selectedProject.title}</h2>
                                <p className="modal-desc">{selectedProject.description}</p>

                                <div className="modal-details">
                                    <h3>About project</h3>
                                    {typeof selectedProject.details === 'string' ? (
                                        <p>{selectedProject.details}</p>
                                    ) : (
                                        <div className="custom-details">{selectedProject.details}</div>
                                    )}
                                </div>

                                <div className="modal-tags project-tags">
                                    {selectedProject.tags.map((tag: string) => (
                                        <span key={tag} className="project-tag">{tag}</span>
                                    ))}
                                </div>

                                <div className="modal-actions">
                                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        <Github size={18} style={{ marginRight: '8px' }} />
                                        Source code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
