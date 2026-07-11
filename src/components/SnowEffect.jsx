import { useMemo } from 'react';

const SNOWFLAKES = 40;
const BIG_COUNT = 3;

export default function SnowEffect() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const isBerMonths = month >= 9 && month <= 12;

  const flakes = useMemo(() => {
    if (!isBerMonths) return [];
    return Array.from({ length: SNOWFLAKES }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      isBig: i < BIG_COUNT,
      size: i < BIG_COUNT ? 20 + Math.random() * 10 : 3 + Math.random() * 4,
      delay: Math.random() * 10,
      duration: 5 + Math.random() * 7,
      sway: 20 + Math.random() * 40,
      opacity: 0.4 + Math.random() * 0.5,
    }));
  }, [isBerMonths]);

  if (!isBerMonths) return null;

  return (
    <div className="snow-effect" aria-hidden="true">
      {flakes.map((f) =>
        f.isBig ? (
          <span
            key={f.id}
            className="snowflake snowflake-big"
            style={{
              left: `${f.left}%`,
              fontSize: f.size,
              opacity: f.opacity,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
              '--sway': `${f.sway}px`,
            }}
          >
            ❄
          </span>
        ) : (
          <span
            key={f.id}
            className="snowflake"
            style={{
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
              '--sway': `${f.sway}px`,
            }}
          />
        )
      )}
    </div>
  );
}
