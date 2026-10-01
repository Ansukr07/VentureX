import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './FaqSection.css'

const faqs = [
  {
    number: 'Q.001',
    question: 'What is VentureX?',
    answer:
      'VentureX is a national-level startup and investor pitching platform organized by E-Cell, BMSIT&M. It provides startups with an opportunity to present their ventures before investors, mentors, and industry experts.',
  },
  {
    number: 'Q.002',
    question: 'Who can participate in VentureX?',
    answer:
      'Student startups, incubated ventures, early-stage startups, and emerging founders with innovative business ideas are eligible to apply.',
  },
  {
    number: 'Q.003',
    question: 'How does the selection process work?',
    answer:
      'All registered ventures undergo an online evaluation based on innovation, problem-solution fit, market opportunity, business model, traction, scalability, and team potential. The top 30 ventures are shortlisted for the final pitching round.',
  },
  {
    number: 'Q.004',
    question: 'What happens after shortlisting?',
    answer:
      'The top 30 ventures will be invited to participate in the offline VentureX event at BMSIT&M, where they will pitch directly to investors and ecosystem leaders.',
  },
  {
    number: 'Q.005',
    question: 'Will startups receive funding?',
    answer:
      'Funding is not guaranteed. However, participating investors may independently explore investment opportunities, mentorship, partnerships, or further discussions with selected startups.',
  },
  {
    number: 'Q.006',
    question: 'Is there any registration fee?',
    answer:
      'Registration details and eligibility criteria will be shared through the official VentureX registration portal.',
  },
  {
    number: 'Q.007',
    question: 'What should be included in the pitch deck?',
    answer:
      'The pitch deck should clearly explain the problem statement, solution, product, market opportunity, business model, traction, team, scalability, and funding requirements.',
  },
  {
    number: 'Q.008',
    question: 'Why should founders participate?',
    answer:
      'VentureX offers exposure to investors, mentorship opportunities, strategic networking, validation from experts, and potential pathways to funding and growth.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">
        <div className="faq-header-block">
          <h2 className="faq-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.number}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-number">{item.number}</span>
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-toggle">{isOpen ? '—' : '+'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.p
                        className="faq-answer"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 8, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {item.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
