const IMAGES = [
  { src: '/Gallery1.png', alt: 'Project Gallery 1' },
  { src: '/Gallery2.png', alt: 'Project Gallery 2' },
  { src: '/Gallery3.png', alt: 'Project Gallery 3' },
  { src: '/sumobot.jpg', alt: 'Sumobot' },
  { src: '/airlink.jpg', alt: 'Airlink' },
  { src: '/GasolveTeam.jpg', alt: 'Gasolve Team' },
  { src: '/AFP.jpg', alt: 'afp' },
  { src: '/GaSolve_app.png', alt: 'GaSolve App' },
  { src: '/airlink_hardware.jpg', alt: 'Airlink Hardware' }
];

export default function VisualArchivePage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">archive</h1>
        <p className="page-subtitle">A curated collection of photos and visuals from projects and events.</p>
      </div>

      <div className="gallery-masonry">
        {IMAGES.map((img, i) => (
          <div key={i} className="masonry-item">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
