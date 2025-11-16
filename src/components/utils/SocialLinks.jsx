import { motion } from 'framer-motion' // Note: It's "framer-motion", not "motion/react"
import { Github, Linkedin, Instagram } from 'lucide-react'

const socialLinks = [
  {
    icon: <Github className="footerIconSize" />,
    to: 'https://github.com/gihanchamila',
  },
  {
    icon: <Linkedin className="footerIconSize" />,
    to: 'https://www.linkedin.com/in/algihanchamila',
  },
  {
    icon: <Instagram className="footerIconSize" />,
    to: 'https://www.instagram.com/zander_xz',
  },
]

const SocialLinks = ({ variant }) => {
  return (
    <motion.div className="mt-2 flex gap-4" variants={variant}>
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.to}
          role="link"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="transition hover:text-gray-500"
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  )
}

export default SocialLinks
