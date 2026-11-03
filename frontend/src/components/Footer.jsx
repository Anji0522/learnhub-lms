import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand" to="/">
            <span className="brand-icon">
              <BookOpen size={19} />
            </span>
            learnhub<span className="brand-dot">.</span>
          </Link>
          <p>Curiosity, meet your next chapter.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-label">DISCOVER</span>
            <Link to="/courses">All courses</Link>
            <Link to="/about">Our story</Link>
          </div>
          <div>
            <span className="footer-label">SAY HELLO</span>
            <a href="mailto:hello@learnhub.example">
              Get in touch <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} LearnHub. Keep growing.</span>
        <span>
          Made for the curious <span className="heart">✳</span>
        </span>
      </div>
    </footer>
  );
}
