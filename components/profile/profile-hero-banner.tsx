interface ProfileHeroBannerProps {
  headerUrl?: string | null;
}

export function ProfileHeroBanner({ headerUrl }: ProfileHeroBannerProps) {
  if (headerUrl) {
    return (
      <div className="relative h-[170px] w-full overflow-hidden bg-neutral-200">
        {/* eslint-disable-next-line @next/next/no-img-element -- Supabase Storage public URL */}
        <img src={headerUrl} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="relative h-[170px] w-full overflow-hidden bg-gradient-to-b from-sky-400 via-sky-500 to-sky-700">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 120% 80% at 50% 120%, rgba(30,58,138,0.45), transparent), linear-gradient(180deg, rgba(255,255,255,0.15), transparent 40%)",
        }}
      />
      <div className="absolute right-4 top-3 text-2xl text-white/90 drop-shadow" aria-hidden>
        ☁
      </div>
      <div className="absolute bottom-4 left-4 max-w-[85%] space-y-1 drop-shadow-md">
        <p className="text-[15px] font-bold leading-tight text-red-600">英語で自分を変える</p>
        <p className="text-[22px] font-black leading-tight text-red-600 sm:text-[26px]">ワーホリで新たな自分</p>
      </div>
      <div
        className="absolute bottom-0 left-1/2 h-24 w-[85%] max-w-md -translate-x-1/2 translate-y-1/3 opacity-30"
        aria-hidden
      >
        <svg viewBox="0 0 400 120" className="h-full w-full text-white" fill="currentColor">
          <path d="M20 90 L120 40 L200 35 L280 42 L360 55 L380 75 L380 95 L20 95 Z" opacity="0.35" />
          <path d="M140 50 L260 48 L300 52 L320 60 L310 70 L150 72 Z" />
        </svg>
      </div>
    </div>
  );
}
