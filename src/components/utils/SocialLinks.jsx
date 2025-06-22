import { motion } from "framer-motion"; // Note: It's "framer-motion", not "motion/react"

const SocialLinks = ({ links, variant }) => {
  return (
    <motion.div className="flex gap-4 mt-2" variants={variant}>
      {links.map((link, index) => (
        <motion.a
          key={index}
          href={link.to}
          role="link"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="hover:text-gray-500 transition"
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
