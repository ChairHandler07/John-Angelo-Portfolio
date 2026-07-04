import { useEffect, useRef } from 'react';

const CERTIFICATIONS = [
  {
    id: '3cc79060-6acf-48d6-a970-ea006c4f342e',
    title: 'CCNAv7: Introduction to IoT',
    issuer: 'Cisco',
  },
  {
    id: '95cf73e0-9a83-4803-8ee3-66e4e87e4177',
    title: 'CCNAv7: Python Essentials 2',
    issuer: 'Cisco',
  },
];

export default function CertificationPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">certifications</h1>
        <p className="page-subtitle">Professional certifications and credentials I've earned.</p>
      </div>

      <div className="certs-grid">
        {CERTIFICATIONS.map((cert) => (
          <CredlyBadge key={cert.id} cert={cert} />
        ))}
      </div>
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
    <div className="cert-card">
      <h3>{cert.title}</h3>
      <p>Click to verify on Credly</p>
      <div className="cert-embed" ref={containerRef} />
    </div>
  );
}
