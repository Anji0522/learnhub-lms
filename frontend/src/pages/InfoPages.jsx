import { ArrowLeft, ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function About() {
  return (
    <section className="info-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={15} /> Back home
      </Link>
      <span className="eyebrow">
        <span className="eyebrow-dot" /> A NOTE FROM US
      </span>
      <h1>
        Learning should
        <br />
        feel like <span className="serif-word">opening a door.</span>
      </h1>
      <p className="info-lede">
        LearnHub is a little corner of the internet for people who are still
        curious about what they could become.
      </p>
      <div className="info-panel">
        <Sparkles size={22} />
        <div>
          <h2>Less pressure. More possibility.</h2>
          <p>
            We bring thoughtful courses and good teachers together so your next
            idea has somewhere to grow. Start small, go at your own pace, and
            see where a little curiosity can take you.
          </p>
        </div>
      </div>
      <Link className="button button-dark" to="/courses">
        Find your next thing <ArrowUpRight size={15} />
      </Link>
    </section>
  );
}

export function Contact() {
  return (
    <section className="info-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={15} /> Back home
      </Link>
      <span className="eyebrow">
        <span className="eyebrow-dot" /> THE DOOR IS OPEN
      </span>
      <h1>
        Say hello.
        <br />
        <span className="serif-word">We’re listening.</span>
      </h1>
      <p className="info-lede">
        Questions, ideas, course suggestions, a small victory you want to share
        — we’d love to hear it.
      </p>
      <div className="contact-card">
        <Heart size={20} />
        <div>
          <h2>Drop us a note</h2>
          <p>We’ll get back to you as soon as we can.</p>
          <a className="text-link" href="mailto:hello@learnhub.example">
            hello@learnhub.example <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
