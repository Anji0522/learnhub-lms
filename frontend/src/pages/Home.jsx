import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, BookOpenCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard.jsx";
import Loader from "../components/Loader.jsx";
import { api } from "../services/api.js";

const notes = [
  { number: "01", title: "Learn by doing", text: "Thoughtful lessons take you from curious to capable, one small win at a time." },
  { number: "02", title: "Made by makers", text: "Learn from people who are out there practicing what they teach." },
  { number: "03", title: "Your pace, your path", text: "Pick up where you left off. Progress that fits the shape of your life." }
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/courses").then(({ courses: items }) => setCourses(items.slice(0, 3)))
      .catch(() => setError("Connect the API and MongoDB to browse published courses."))
      .finally(() => setLoading(false));
  }, []);

  return <>
    <section className="hero-section">
      <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> A little room to grow</span>
        <h1>Make room<br />for <span className="serif-word">what’s</span><br /><span className="hero-last">next<span className="hero-period">.</span></span></h1>
        <p className="hero-description">Good things happen when you stay curious. Find your next skill, your next idea, your next little bit of momentum.</p>
        <div className="hero-actions"><Link className="button button-dark" to="/courses">Find your next thing <ArrowUpRight size={16} /></Link><Link className="text-link" to="/about">Get to know us <ArrowRight size={15} /></Link></div>
        <div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><div className="proof-stars">★★★★★</div><small>A community that keeps showing up</small></div></div>
      </div>
      <div className="hero-art">
        <div className="hero-image"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85" alt="A learner working on a creative project" /><div className="image-note"><span className="note-icon"><Sparkles size={16} /></span><span><strong>Small steps count.</strong><small>Especially the first one.</small></span></div></div>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="float-card float-card-top"><span className="float-icon"><BookOpenCheck size={17} /></span><div><strong>Learn something new</strong><small>On your own terms</small></div></div>
        <div className="float-card float-card-bottom"><span className="mini-check"><BadgeCheck size={17} /></span><div><strong>Progress, not pressure</strong><small>One lesson at a time</small></div></div>
        <div className="hero-caption"><span>01 — YOUR NEXT CHAPTER</span><span>TAKE A LOOK <ArrowDown size={12} /></span></div>
      </div>
    </section>

    <section className="marquee-strip"><span>STAY CURIOUS</span><i>✳</i><span>KEEP MAKING</span><i>✳</i><span>GROW YOUR WAY</span><i>✳</i><span>STAY CURIOUS</span><i>✳</i><span>KEEP MAKING</span></section>

    <section className="featured-section section-pad">
      <div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-dot" /> A good place to begin</span><h2>Find your <span className="serif-word">next</span><br />favorite thing.</h2></div><Link className="text-link" to="/courses">Explore every course <ArrowRight size={15} /></Link></div>
      {loading ? <Loader label="Finding your next course" /> : error ? <div className="empty-note">{error} <Link to="/courses">Browse courses <ArrowRight size={14} /></Link></div> : courses.length ? <div className="course-grid">{courses.map((course, index) => <CourseCard key={course._id} course={course} index={index} />)}</div> : <div className="empty-note">The course shelf is getting ready. Check back soon. <Link to="/courses">Explore LearnHub <ArrowRight size={14} /></Link></div>}
    </section>

    <section className="manifesto-section"><div className="manifesto-art"><div className="manifesto-circle"><span>MAKE</span><span>IT</span><span>YOURS<span className="brand-dot">.</span></span><i>✳</i></div><div className="manifesto-sticker">A NOTE<br />TO SELF<br /><span>keep going ↗</span></div></div><div className="manifesto-copy"><span className="eyebrow"><span className="eyebrow-dot" /> A different kind of classroom</span><h2>Progress isn’t<br />a straight line.<br /><span className="serif-word">Good.</span></h2><p>We think learning should feel less like another box to tick and more like opening a door. No perfect plan needed. Just a little curiosity and somewhere good to start.</p><Link className="button button-outline" to="/about">A bit more about us <ArrowUpRight size={15} /></Link></div></section>

    <section className="approach-section section-pad"><div className="approach-intro"><span className="eyebrow"><span className="eyebrow-dot" /> The LearnHub way</span><h2>Built for the<br /><span className="serif-word">in-between.</span></h2><p>Between the idea and the first try. Between “someday” and “I did it.”</p></div><div className="approach-list">{notes.map((item) => <div className="approach-item" key={item.number}><span className="approach-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight className="approach-arrow" size={18} /></div>)}</div></section>

    <section className="cta-section"><div className="cta-spark cta-spark-left">✳</div><span className="eyebrow"><span className="eyebrow-dot" /> Your next chapter is yours</span><h2>Start with a<br /><span className="serif-word">little curiosity.</span></h2><p>No big plan. No pressure. Just something that catches your eye.</p><Link className="button button-light" to="/courses">See what’s out there <ArrowUpRight size={16} /></Link><div className="cta-spark cta-spark-right">✳</div></section>
  </>;
}
