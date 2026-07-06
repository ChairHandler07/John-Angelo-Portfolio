import { useEffect, useRef } from 'react';

const CATEGORIES = [
  {
    number: '01',
    label: 'Engineering',
    certs: [
      {
        id: '3cc79060-6acf-48d6-a970-ea006c4f342e',
        title: 'Introduction to IoT',
        issuer: 'Cisco',
      },
      {
        id: '95cf73e0-9a83-4803-8ee3-66e4e87e4177',
        title: 'Python Essentials 2',
        issuer: 'Cisco',
      },
      {
        id: '2b4c6bc7-8053-4852-ba5c-cd555126b138',
        title: 'JavaScript Essentials 2',
        issuer: 'Cisco',
      },
    ],
  },
  {
    number: '02',
    label: 'AI',
    certs: [
      {
        id: 'cbbc015f-f1a4-4101-831e-3c7d385babd9',
        title: 'AI for Engineering',
        issuer: 'Credly',
      },
    ],
  },
];

export default function CertificationPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">certifications</h1>
        <p className="page-subtitle">Professional certifications and credentials I've earned.</p>
      </div>

      {CATEGORIES.map((cat) => (
        <section key={cat.number} className="content-section">
          <h2 className="section-title">
            <span className="section-number">{cat.number}</span>
            {cat.label}
          </h2>
          <div className="certs-row">
            {cat.certs.map((cert) => (
              <CredlyBadge key={cert.id} cert={cert} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function CredlyBadge({ cert }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.innerHTML = `
      <div
        data-iframe-width="150"
        data-iframe-height="270"
        data-share-badge-id="${cert.id}"
        data-share-badge-host="https://www.credly.com"
      ></div>
    `;

    const existing = document.querySelector(
      'script[src*="credly.com/assets/utilities/embed.js"]'
    );
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, [cert.id]);

  return (
    <div className="cert-item">
      <div className="cert-embed" ref={containerRef} />
      <h3>{cert.title}</h3>
      <p>{cert.issuer}</p>
    </div>
  );
}
