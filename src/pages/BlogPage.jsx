import { useEffect, useRef } from 'react';
import Reveal from '../components/Reveal';

const BLOG_POST = {
  id: 'my-tech-journey',
  title: '',
  subtitle: 'From first line of code to building systems that matter',
  author: 'John Angelo Concepcion',
  tag: 'journal',
  date: '2026',
  readTime: '8 min read',
  sections: [
    {
      id: 'intro',
      number: '01',
      label: 'where it started',
      image: '/MIRC.jpg',
      imageAlt: 'John Angelo Concepcion - Software Engineer',
      caption: 'Manila International Research Conference | MIRC',
      position: 'left',
      content: `
        <p>My journey into technology didn't start with a grand vision. It started with curiosity — the kind that makes you stay up until 3 AM figuring out why a semicolon broke everything.</p>
        <p>Now here I am, presenting my project design system internationally, who would have thought that a simple idea turns out to be a product of systems that helps for the people and serve for those that needs it. Furthermore, with the help of Manila International Research Conference (MIRC), I managed to highlight the essence of automation which shows a quintessence of how technology can be leveraged to create meaningful impact.</p>
      `
    },
    {
      id: 'embedded-systems',
      number: '02',
      label: 'systems under pressure',
      image: '/airlink.jpg',
      imageAlt: 'Airlink Defense System hardware prototype',
      caption: 'airlink defense system — hardware prototype',
      position: 'right',
      content: `
        <p><strong>Airlink Defense System</strong> was my first real taste of building something that mattered beyond a classroom. Commissioned by the Armed Forces of the Philippines, this encrypted communication system taught me that engineering isn't just about making things work — it's about making things work under pressure, with constraints, with real stakes.</p>
        <p>Leading the hardware-software integration meant bridging two worlds that often speak different languages. Firmware timing issues, encryption latency, PCB layout constraints — every decision rippled across the stack. I learned to think in systems, not components.</p>
      `
    },
    {
      id: 'iot-safety',
      number: '03',
      label: 'bits protecting atoms',
      image: '/GasolveTeam.jpg',
      imageAlt: 'GaSolve IoT LPG Safety System architecture',
      caption: 'gasolve — iot lpg safety system',
      position: 'left',
      content: `
        <p>With <strong>GaSolve</strong>, the challenge shifted from defense to domestic safety. An IoT-enabled LPG leak detection system designed for households — because technology should protect families, not just institutions.</p>
        <p>This project pushed me into the full product lifecycle: sensor calibration, MQTT broker architecture, mobile app development, cloud infrastructure, regulatory compliance. I wore every hat — embedded engineer, backend developer, mobile dev, project manager. The system now monitors gas levels in real-time, sends instant alerts, and can automatically shut off valves. It's engineering with immediate, tangible impact.</p>
      `
    },
    {
      id: 'full-stack-growth',
      number: '04',
      label: 'crafting the stack',
      image: '',
      imageAlt: 'Hotellium admin dashboard interface',
      caption: '',
      position: 'right',
      content: `
        <p>Parallel to hardware, I've spent years crafting web applications — <strong>blood bank management systems</strong> for the Red Cross, <strong>hotel management platforms</strong> with real-time booking engines, <strong>habit trackers</strong> with behavioral psychology baked in.</p>
        <p>React, Laravel, Node.js, Python — the stack matters less than the architecture. Clean APIs, thoughtful database design, authentication that doesn't frustrate users, deployments that don't wake you at 2 AM. I've learned that the best code is the code your future self (or another developer) can read six months later without cursing.</p>
      `
    },
    {
      id: 'philosophy',
      number: '05',
      label: 'the approach',
      image: null,
      imageAlt: null,
      caption: null,
      position: 'center',
      content: `
        <p>Today, I sit at the intersection of software and hardware — comfortable in both worlds, fluent in the translation layer between them. My toolkit spans embedded C, Python, JavaScript/TypeScript, PHP, SQL, and the cloud platforms that glue it all together.</p>
        <p>But tools change. What stays constant is the approach: <strong>understand the problem deeply, design for the constraints you have, build for the humans who'll use it.</strong></p>
        <p>This blog is where I'll share the lessons, the failures, the "aha" moments, and the code that didn't make it to production but taught me something anyway. If you're building at the intersection of bits and atoms — or just curious about the journey — stick around.</p>
      `
    }
  ]
};

const PARALLAX_AMPLITUDE = 12;

export default function BlogPage() {
  const parallaxRefs = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia?.('(min-width: 901px)').matches;
    if (reduced || !desktop) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight || 1;

      for (const el of parallaxRefs.current) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) continue;

        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const clamped = Math.min(1, Math.max(-1, progress));
        el.style.setProperty('--parallax-y', `${(-clamped * PARALLAX_AMPLITUDE).toFixed(2)}px`);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="page-container page-container--wide">
      <div className="page-header">
        <h1 className="page-title">blog</h1>
        <p className="page-subtitle">thoughts on engineering, building, and the space between</p>
      </div>

      <article className="blog-post">
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-date">{BLOG_POST.date}</span>
            <span className="blog-meta-dot" aria-hidden="true"></span>
            <span className="blog-read-time">{BLOG_POST.readTime}</span>
            <span className="blog-meta-dot" aria-hidden="true"></span>
            <span className="blog-post-tag">{BLOG_POST.tag}</span>
          </div>
          <h2 className="blog-post-title">{BLOG_POST.title}</h2>
          <p className="blog-post-subtitle">{BLOG_POST.subtitle}</p>
          <p className="blog-post-byline">
            by <span className="blog-author">{BLOG_POST.author}</span>
          </p>
        </header>

        <div className="blog-post-content">
          {BLOG_POST.sections.map((section, index) => (
            <Reveal key={section.id} inView delay={Math.min(index * 70, 330)}>
              <section id={section.id} className={`blog-section blog-section--${section.position}`}>
                <div className="blog-text-wrapper">
                  <p className="blog-section-label">
                    <span className="blog-section-number">{section.number}</span>
                    <span className="blog-section-dash" aria-hidden="true">—</span>
                    <span className="blog-section-label-text">{section.label}</span>
                  </p>
                  <div
                    className={`blog-text-content${index === 0 ? ' blog-text-content--lead' : ''}`}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>

                {section.image && (
                  <figure className="blog-figure">
                    <div
                      className="blog-image-wrapper"
                      ref={(el) => { parallaxRefs.current[index] = el; }}
                    >
                      <div className="blog-image-parallax">
                        <img
                          src={section.image}
                          alt={section.imageAlt}
                          className="blog-image"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <figcaption className="blog-caption">{section.caption}</figcaption>
                  </figure>
                )}
              </section>
            </Reveal>
          ))}

          <Reveal inView>
            <div className="blog-cta">
              <hr className="blog-divider" />
              <p className="blog-cta-text">more posts coming soon — follow the journey on <a href="https://github.com/ChairHandler07" target="_blank" rel="noreferrer">GitHub</a> or connect on <a href="https://www.linkedin.com/in/john-angelo-concepcion-09051b381" target="_blank" rel="noreferrer">LinkedIn</a></p>
            </div>
          </Reveal>
        </div>
      </article>
    </div>
  );
}
