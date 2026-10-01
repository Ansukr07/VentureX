
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
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
            <span className="social-icon social-icon--circle">◉</span>
            <span className="social-icon social-icon--circle">◌</span>
            <span className="social-icon social-icon--in">in</span>
            <span className="social-icon social-icon--mail">✉</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
