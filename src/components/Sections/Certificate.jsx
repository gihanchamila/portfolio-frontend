import { useCallback, useEffect, useState, useRef } from 'react'
import CertificateCard from '../utils/CertificateCard'
import axios from '../../axios/axios'
import { useToast } from '../../context/ToastContext'
import { useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AnimatedCertificate = ({ certificate, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5, rootMargin: '0px 0px -100px 0px' })

  const variants = {
    hidden: { opacity: 0, y: 20, scale: 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      <CertificateCard
        certificate={certificate}
        certificateName={certificate.title}
        organization={certificate.organization}
        credentialUrl={certificate.credentialURL}
      />
    </motion.div>
  )
}

const Certificate = () => {
  const { toast } = useToast()
  const showToast = useCallback(toast, [])
  const navigate = useNavigate()

  const [certificates, setCertificates] = useState([])
  const [totalCount, setTotalCount] = useState([])

  const getCertificateDetails = useCallback(async () => {
    try {
      const response = await axios.get('/certificate/get-certificates?size=4')
      const data = response.data.data.certifications
      const total = response.data.data.total
      setTotalCount(total)
      setCertificates(data)
      showToast(`${response.data.message}`)
    } catch (error) {
      const response = error?.response
      const data = response?.data
      showToast(`${data?.message || 'Failed to load certificates'}`, 'error')
    }
  }, [showToast])

  useEffect(() => {
    getCertificateDetails()
  }, [getCertificateDetails])

  return (
    <section
      id="certification"
      className="sm-col-span-4 scroll-mt-14 pb-20 sm:col-start-1 sm:col-end-5"
    >
      <header className="pb-8">
        <motion.h2
          className="xs:text-3xl font-primary font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="">Certifications</span> and Achievements
        </motion.h2>
      </header>

      <div className="xs:gap-6 xs:flex xs:flex-col sm:col-span-2 sm:grid sm:grid-cols-2">
        {certificates.length > 0 &&
          certificates.map((cert, index) => (
            <AnimatedCertificate key={cert._id} certificate={cert} index={index} />
          ))}
        {totalCount > 3 && (
          <span className="cursor-pointer" onClick={() => navigate('certificates')}>
            Show more
          </span>
        )}
      </div>
    </section>
  )
}

export default Certificate
