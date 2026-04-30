export function ExploreHeroCard() {
  return (
    <article className="relative border-b border-[#eff3f4]">
      <div className="relative h-[290px] overflow-hidden bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.8), transparent 35%), radial-gradient(circle at 85% 25%, rgba(255,255,255,0.65), transparent 30%), linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
        </div>
        <div className="absolute bottom-4 left-4 text-white drop-shadow">
          <p className="text-[24px] font-black leading-none">誕生アサヒゴールド</p>
          <p className="mt-1 text-[18px] font-bold leading-none">ゴールドなうまさ解禁。コクとキレの黄金比。</p>
          <p className="mt-2 text-[12px] font-medium">Promoted by サンプル広告</p>
        </div>
      </div>
    </article>
  );
}
