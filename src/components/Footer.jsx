import './Footer.css'
import {
  FaDiscord,
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>

          <ul className="footer-list">
            <li>Campus Map</li>
            <li>Code of Conduct</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Contact Us</h3>

          <ul className="footer-list footer-list--contact">
            <li>Vaibhav B – 9141194259</li>
            <li>Gagan – 7975959500</li>
            <li>Deepthi Jain – 9606295562</li>
          </ul>
        </div>

        <div className="footer-column footer-column--address">
          <h3 className="footer-title">
            BMS Institute of Technology &amp; Management
          </h3>

          <p className="footer-address">
            Doddaballapur Main Road, Avalahalli, Yelahanka,
            <br />
            Bengaluru, Karnataka 560064
          </p>

          <div className="social-row" aria-label="Social links">
            <a
              className="social-icon"
              href="https://www.instagram.com/ecell.bmsit?igsh=dW56aGtuY3pnNTBl"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram aria-hidden="true" />
            </a>
            <a
              className="social-icon"
              href="https://discord.com/invite/FTSdVUku6Y"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
            >
              <FaDiscord aria-hidden="true" />
            </a>
            <a
              className="social-icon"
              href="https://www.linkedin.com/company/ecellbmsit/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a className="social-icon" href="mailto:hello@venturex.example" aria-label="Email">
              <FaEnvelope aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
