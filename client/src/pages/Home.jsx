import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const easeCurve = [0.22, 1, 0.36, 1];

// Hero staggered text animations
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easeCurve,
    },
  },
};

// Cards Grid staggered reveal
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeCurve,
    },
  },
};

const FEATURES = [
  ['Expert Support', 'Answers from engineers who work in the field.'],
  ['Fast Responses', 'High-priority queries are picked up first.'],
  ['Developer Friendly', 'Ask in code, logs or plain language.'],
  ['Learning Focused', 'Replies explain the why, not just the fix.']
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero relative overflow-hidden">
        {/* Gentle pulsing ambient glow in background */}
        <motion.div
          aria-hidden="true"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute -top-24 right-10 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
        />

        <div className="wrap relative z-10">
          {/* Staggered text block */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={heroItemVariants}>
              Have a Question? Let's Find the Answer.
            </motion.h1>

            <motion.p variants={heroItemVariants}>
              Worried about your future in IT? Get expert guidance from the TechMax team.
            </motion.p>

            <motion.div variants={heroItemVariants} className="row">
              <Link className="btn" to="/ask">
                Ask a Query
              </Link>
              <a
                className="btn ghost"
                style={{ color: '#fff', borderColor: '#35487a' }}
                href="#about"
              >
                Explore TechMax
              </a>
            </motion.div>
          </motion.div>

          {/* Gentle floating / pulsing animation for hero visual */}
          <motion.div
            className="term shadow-xl"
            animate={{
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <i>$</i> techmax ask "Which path: ML or web?"
            <br />
            <em>✓ Query TMQ-8F2K1A created</em>
            <br />
            <i>$</i> techmax status
            <br />
            Status: <em>Resolved</em> · reply from TechMax team
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="sec wrap overflow-hidden" id="about">
        {/* Scroll-triggered fade-in & slide-in from left to right */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.75,
            ease: easeCurve,
          }}
        >
          <h2>About TechMax</h2>
          <p className="mute" style={{ maxWidth: 620 }}>
            TechMax is a technology-focused platform designed to help students, developers, and users get answers to their technical questions.
          </p>
        </motion.div>

        {/* Cards Section / Grid with Stagger & Hover */}
        <motion.div
          className="grid"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ marginTop: 24 }}
        >
          {FEATURES.map(([t, d]) => (
            <motion.div
              key={t}
              variants={cardItemVariants}
              whileHover={{
                scale: 1.03,
                y: -4,
                transition: { type: 'spring', stiffness: 350, damping: 22 },
              }}
              className="card transition-colors duration-200 hover:border-blue-500/60 hover:shadow-xl cursor-pointer"
            >
              <h3>{t}</h3>
              <p>{d}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
