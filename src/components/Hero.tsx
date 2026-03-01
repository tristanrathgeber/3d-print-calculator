import { Cuboid } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="text-center pt-12 pb-8 animate-in relative">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 animate-pulse-glow"
        style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)' }}>
        <Cuboid className="w-8 h-8 text-white" />
      </div>

      <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-3"
        style={{ color: 'var(--color-text-heading)' }}>
        3D Print Cost
        <span className="block" style={{ color: 'var(--color-accent)' }}>Calculator</span>
      </h1>

      <p className="text-sm md:text-base max-w-lg mx-auto" style={{ color: 'var(--color-text-muted)' }}>
        Professional cost estimation for FDM & resin prints.
        Upload STL or enter dimensions. Get instant pricing.
      </p>
    </div>
  );
};
