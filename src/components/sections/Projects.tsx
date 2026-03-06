import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import { Github, ArrowDown, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './Projects.css';

interface Project {
    id: string;
    title: string;
    description: string;
    details: string | React.ReactNode;
    image: string;
    video?: string;
    tags: string[];
    githubUrl?: string;
}

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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!import.meta.env.VITE_SUPABASE_URL) {
                console.warn("Supabase is not configured yet. Set VITE_SUPABASE_URL.");
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('display_order', { ascending: true });

                if (error) throw error;

                if (data) {
                    const mappedProjects = data.map(p => ({
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        details: p.details,
                        image: p.image,
                        video: p.video,
                        tags: p.tags || [],
                        githubUrl: p.github_url
                    }));
                    setProjects(mappedProjects);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const calculateScrollDistance = () => {
            if (galleryRef.current && projects.length > 0) {
                // Total scrollable width minus viewport width
                setScrollDistance(galleryRef.current.scrollWidth - window.innerWidth);
            }
        };

        calculateScrollDistance();

        // Recalculate slightly after projects load and render
        const timeout = setTimeout(calculateScrollDistance, 100);

        window.addEventListener('resize', calculateScrollDistance);
        return () => {
            window.removeEventListener('resize', calculateScrollDistance);
            clearTimeout(timeout);
        };
    }, [projects]);

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
                        {isLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '60vh' }}>
                                <p style={{ color: 'var(--text-secondary)' }}>Loading projects database...</p>
                            </div>
                        ) : projects.length === 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '60vh' }}>
                                <p style={{ color: 'var(--text-secondary)' }}>No projects found or missing Database connection credentials in .env.local file.</p>
                            </div>
                        ) : (
                            projects.map((project, index) => (
                                <ProjectCard
                                    key={project.id || index}
                                    project={project}
                                    index={index}
                                    total={projects.length}
                                    scrollYProgress={scrollYProgress}
                                    onOpen={() => setSelectedProject(project)}
                                />
                            ))
                        )}
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
                                        <div className="custom-details" dangerouslySetInnerHTML={{ __html: selectedProject.details }} />
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
