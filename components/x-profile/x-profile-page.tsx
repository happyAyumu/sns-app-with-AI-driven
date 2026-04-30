import type { ReactNode } from "react";
import {
  IconArrowLeft,
  IconBarChart,
  IconBell,
  IconBookmark,
  IconBriefcase,
  IconCalendar,
  IconChatBubble,
  IconDotsHorizontal,
  IconHeart,
  IconHome,
  IconLink,
  IconList,
  IconMail,
  IconPin,
  IconRepost,
  IconSearch,
  IconShare,
  IconSparkles,
  IconStar,
  IconUser,
  IconUsers,
  IconVerified,
  IconXLogo,
} from "./icons";

const xBlue = "text-[#1D9BF0]";
const borderX = "border-[#EFF3F4]";
const muted = "text-[#536471]";

interface NavItemConfig {
  label: string;
  href: string;
  icon: ReactNode;
  active?: boolean;
  badge?: string;
}

const navItems: NavItemConfig[] = [
  { label: "ホーム", href: "#", icon: <IconHome className="h-[26px] w-[26px]" /> },
  { label: "話題を検索", href: "#", icon: <IconSearch className="h-[26px] w-[26px]" /> },
  { label: "通知", href: "#", icon: <IconBell className="h-[26px] w-[26px]" />, badge: "3" },
  { label: "メッセージ", href: "#", icon: <IconMail className="h-[26px] w-[26px]" /> },
  { label: "Grok", href: "#", icon: <IconSparkles className="h-[26px] w-[26px]" /> },
  { label: "リスト", href: "#", icon: <IconList className="h-[26px] w-[26px]" /> },
  { label: "ブックマーク", href: "#", icon: <IconBookmark className="h-[26px] w-[26px]" /> },
  { label: "求人", href: "#", icon: <IconBriefcase className="h-[26px] w-[26px]" /> },
  { label: "コミュニティ", href: "#", icon: <IconUsers className="h-[26px] w-[26px]" /> },
  { label: "プレミアム", href: "#", icon: <IconStar className="h-[26px] w-[26px]" /> },
  { label: "認証済み組織", href: "#", icon: <IconVerified className="h-[22px] w-[22px]" /> },
  { label: "プロフィール", href: "#", icon: <IconUser className="h-[26px] w-[26px]" />, active: true },
  { label: "もっと見る", href: "#", icon: <IconDotsHorizontal className="h-[22px] w-[22px]" /> },
];

interface SuggestedUser {
  name: string;
  handle: string;
  avatarLetter: string;
  avatarBg: string;
}

const suggestedUsers: SuggestedUser[] = [
  { name: "Udemy Japan", handle: "UdemyJapan", avatarLetter: "U", avatarBg: "bg-violet-600" },
  { name: "Udemy", handle: "udemy", avatarLetter: "U", avatarBg: "bg-purple-700" },
  { name: "Udemy Instructor", handle: "UdemyInstructor", avatarLetter: "U", avatarBg: "bg-fuchsia-600" },
];

interface TrendItem {
  category: string;
  title: string;
  posts: string;
}

const trends: TrendItem[] = [
  { category: "日本のトレンド", title: "#プログラミング学習", posts: "1.2万件のポスト" },
  { category: "テクノロジー · トレンド", title: "Udemy", posts: "8,920件のポスト" },
  { category: "ビジネスとファイナンス · トレンド", title: "#エンジニア", posts: "2,341件のポスト" },
];

function NavLinkRow({ item }: { item: NavItemConfig }) {
  return (
    <a
      href={item.href}
      className={`group flex items-center gap-5 rounded-full px-3 py-2.5 text-[20px] leading-6 text-neutral-950 transition-colors hover:bg-black/[0.04] ${
        item.active ? "font-bold" : "font-normal"
      }`}
    >
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
        {item.icon}
        {item.badge ? (
          <span
            className={`absolute -right-2 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#1D9BF0] px-1 text-[11px] font-bold leading-none text-white`}
          >
            {item.badge}
          </span>
        ) : null}
      </span>
      <span className="hidden xl:inline">{item.label}</span>
    </a>
  );
}

function PostEngagement() {
  return (
    <div className={`mt-3 flex max-w-md items-center justify-between ${muted}`}>
      <button type="button" className="group flex items-center gap-2 text-[13px] transition-colors hover:text-[#1D9BF0]">
        <span className="rounded-full p-2 group-hover:bg-[#1D9BF0]/10">
          <IconChatBubble className="h-[18px] w-[18px]" />
        </span>
        <span>12</span>
      </button>
      <button type="button" className="group flex items-center gap-2 text-[13px] transition-colors hover:text-emerald-600">
        <span className="rounded-full p-2 group-hover:bg-emerald-500/10">
          <IconRepost className="h-[18px] w-[18px]" />
        </span>
        <span>48</span>
      </button>
      <button type="button" className="group flex items-center gap-2 text-[13px] transition-colors hover:text-pink-600">
        <span className="rounded-full p-2 group-hover:bg-pink-500/10">
          <IconHeart className="h-[18px] w-[18px]" />
        </span>
        <span>256</span>
      </button>
      <button type="button" className="group flex items-center gap-2 text-[13px] transition-colors hover:text-[#1D9BF0]">
        <span className="rounded-full p-2 group-hover:bg-[#1D9BF0]/10">
          <IconBarChart className="h-[18px] w-[18px]" />
        </span>
        <span>1.2万</span>
      </button>
      <button
        type="button"
        className="rounded-full p-2 text-[#536471] transition-colors hover:bg-[#1D9BF0]/10 hover:text-[#1D9BF0]"
      >
        <IconShare className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

export function XProfilePage() {
  return (
    <div className="min-h-screen bg-white text-[15px] text-neutral-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[1265px] justify-center">
        {/* Left nav */}
        <aside className="sticky top-0 flex h-screen w-[72px] shrink-0 flex-col items-end px-2 py-1 xl:w-[275px] xl:items-stretch xl:px-3 xl:pr-4">
          <div className="flex h-full w-full max-w-[275px] flex-col">
            <div className="flex justify-center py-2 xl:justify-start xl:pl-3">
              <a href="#" className="inline-flex rounded-full p-3 transition-colors hover:bg-black/[0.04]" aria-label="X">
                <IconXLogo className="h-[26px] w-[26px]" />
              </a>
            </div>
            <nav className="mt-0 flex flex-1 flex-col gap-0.5">
              {navItems.map((item) => (
                <NavLinkRow key={item.label} item={item} />
              ))}
            </nav>
            <div className="mt-3 px-3 pb-4">
              <button
                type="button"
                className="hidden w-full rounded-full bg-neutral-950 py-[15px] text-center text-[17px] font-bold text-white transition-opacity hover:opacity-90 xl:block"
              >
                ポストする
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white xl:hidden"
                aria-label="ポストする"
              >
                <IconXLogo className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-auto hidden pb-4 xl:block">
              <button
                type="button"
                className="flex w-full max-w-[260px] items-center gap-3 rounded-full p-3 text-left transition-colors hover:bg-black/[0.04]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-amber-100 text-lg">
                  🐕
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-bold leading-5">Shin@プログラミングチュートリアル</span>
                  <span className={`block truncate text-[15px] ${muted}`}>@Shin_Engineer</span>
                </span>
                <IconDotsHorizontal className={`h-5 w-5 shrink-0 ${muted}`} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <main className={`min-h-screen w-full max-w-[600px] shrink-0 border-x ${borderX}`}>
          {/* Sticky profile header */}
          <header
            className={`sticky top-0 z-20 flex cursor-pointer items-center gap-5 bg-white/85 px-4 py-2 backdrop-blur-md ${borderX} border-b`}
          >
            <button type="button" className="-ml-2 rounded-full p-2 transition-colors hover:bg-black/[0.04]" aria-label="戻る">
              <IconArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-[20px] font-bold leading-6">Shin@プログラミングチュートリアル</h1>
              <p className={`text-[13px] leading-4 ${muted}`}>1,749 件のポスト</p>
            </div>
          </header>

          {/* Banner */}
          <div className="relative h-[200px] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
              }}
            />
            <p className="absolute bottom-4 left-4 text-xl font-bold tracking-wide text-white/90 drop-shadow-sm">
              ShinCode_Camp
            </p>
          </div>

          {/* Avatar + actions */}
          <div className="relative px-4 pb-3">
            <div className="absolute -top-[68px] left-4">
              <div className="h-[134px] w-[134px] overflow-hidden rounded-full border-4 border-white bg-amber-50 shadow-sm">
                <div className="flex h-full w-full items-center justify-center text-5xl">🐕‍💻</div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                className={`flex h-9 w-9 items-center justify-center rounded-full border ${borderX} transition-colors hover:bg-black/[0.04]`}
                aria-label="その他"
              >
                <IconDotsHorizontal className={`h-5 w-5 ${muted}`} />
              </button>
              <button
                type="button"
                className={`rounded-full border border-neutral-950 bg-white px-4 py-1.5 text-[15px] font-bold transition-colors hover:bg-black/[0.04]`}
              >
                プロフィールを編集
              </button>
            </div>
            <div className="mt-12 space-y-3">
              <div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[20px] font-bold leading-7">Shin@プログラミングチュートリアル</span>
                  <IconVerified className="h-[22px] w-[22px] text-[#1D9BF0]" />
                </div>
                <p className={`text-[15px] ${muted}`}>@Shin_Engineer</p>
              </div>
              <p className="text-[15px] leading-5">
                🎓 YouTube・Udemyでプログラミングを教えています
                <br />
                📺 YouTube 登録者 16万人 / Udemy 受講生 18万人
                <br />
                <a href="#" className={`${xBlue} hover:underline`}>
                  youtube.com/@ShinCode_Camp
                </a>{" "}
                <a href="#" className={`${xBlue} hover:underline`}>
                  udemy.com/user/shi...
                </a>
              </p>
              <div className={`flex flex-wrap gap-x-4 gap-y-1 text-[15px] ${muted}`}>
                <span className="inline-flex items-center gap-1">
                  <IconLink className="h-[18px] w-[18px]" />
                  <a href="#" className={`${xBlue} hover:underline`}>
                    youtube.com/@ShinCode_...
                  </a>
                </span>
                <span className="inline-flex items-center gap-1">
                  <IconCalendar className="h-[18px] w-[18px]" />
                  2020年11月からXを利用しています
                </span>
              </div>
              <p className="text-[15px]">
                <span className="font-bold text-neutral-950">23</span>
                <span className={muted}> フォロー中</span>
                <span className="mx-3 inline-block" />
                <span className="font-bold text-neutral-950">6,380</span>
                <span className={muted}> フォロワー</span>
              </p>
            </div>
          </div>

          {/* Tabs */}
          <nav
            className={`sticky top-[53px] z-10 flex border-b ${borderX} bg-white/85 backdrop-blur-md`}
            aria-label="プロフィールタブ"
          >
            {["ポスト", "返信", "ハイライト", "記事", "メディア", "いいね"].map((tab, i) => (
              <a
                key={tab}
                href="#"
                className={`relative min-w-0 flex-1 py-4 text-center text-[15px] transition-colors hover:bg-black/[0.04] ${
                  i === 0 ? "font-bold" : `font-medium ${muted}`
                }`}
              >
                <span className="inline-block truncate px-1">{tab}</span>
                {i === 0 ? (
                  <span className="absolute bottom-0 left-1/2 h-1 w-[56px] max-w-[80%] -translate-x-1/2 rounded-full bg-[#1D9BF0]" />
                ) : null}
              </a>
            ))}
          </nav>

          {/* Pinned post */}
          <article className={`border-b ${borderX} px-4 py-3 hover:bg-black/[0.02]`}>
            <div className={`mb-2 flex items-center gap-2 text-[13px] font-bold ${muted}`}>
              <IconPin className="h-4 w-4" />
              固定されたポスト
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-amber-50 text-center text-xl leading-10">
                🐕‍💻
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-1 text-[15px]">
                  <span className="font-bold">Shin@プログラミングチュートリアル</span>
                  <IconVerified className="inline h-[18px] w-[18px] text-[#1D9BF0]" />
                  <span className={muted}>@Shin_Engineer</span>
                  <span className={muted}>·</span>
                  <span className={muted}>1月13日</span>
                </div>
                <p className="mt-1 text-[15px] leading-5">
                  🚀 新コース公開しました！
                  <br />
                  初心者向け React + TypeScript 完全ガイドはこちら 👇
                  <br />
                  <a href="#" className={`${xBlue} hover:underline`}>
                    udemy.com/course/shin-react-ts
                  </a>
                </p>
                <div className="mt-3 overflow-hidden rounded-2xl border border-black/5 bg-slate-900">
                  <div className="flex aspect-[16/9] flex-col items-center justify-center gap-2 px-6 py-10 text-center">
                    <p className="text-2xl font-black tracking-tight text-fuchsia-400 sm:text-3xl">ShinCode_Camp</p>
                    <p className="text-sm text-slate-400">新コース — React &amp; TypeScript</p>
                  </div>
                </div>
                <PostEngagement />
              </div>
            </div>
          </article>

          {/* Second post (dummy) */}
          <article className={`border-b ${borderX} px-4 py-3 hover:bg-black/[0.02]`}>
            <div className="flex gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-amber-50 text-center text-xl leading-10">
                🐕‍💻
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-1 text-[15px]">
                  <span className="font-bold">Shin@プログラミングチュートリアル</span>
                  <IconVerified className="inline h-[18px] w-[18px] text-[#1D9BF0]" />
                  <span className={muted}>@Shin_Engineer</span>
                  <span className={muted}>·</span>
                  <span className={muted}>1月10日</span>
                </div>
                <p className="mt-1 text-[15px] leading-5">
                  Next.js App Router で SNS UI を組むなら、まずはレイアウト3カラムから固めるのがおすすめです。
                </p>
                <PostEngagement />
              </div>
            </div>
          </article>
        </main>

        {/* Right widgets */}
        <aside className="sticky top-0 hidden h-screen w-[350px] shrink-0 overflow-y-auto py-2 pl-6 pr-4 lg:block">
          <div className="w-[350px] max-w-full space-y-3">
            <div className="relative">
              <IconSearch className={`pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 ${muted}`} />
              <input
                type="search"
                placeholder="検索"
                className={`w-full rounded-full border-0 bg-[#EFF3F4] py-3 pl-12 pr-4 text-[15px] outline-none ring-0 placeholder:text-[#536471] focus:bg-white focus:ring-2 focus:ring-[#1D9BF0]`}
              />
            </div>

            <section className={`overflow-hidden rounded-2xl ${borderX} border`}>
              <h2 className="px-4 pb-1 pt-3 text-[20px] font-extrabold leading-6">おすすめ</h2>
              <ul>
                {suggestedUsers.map((u) => (
                  <li key={u.handle} className="flex items-center gap-3 px-4 py-3 hover:bg-black/[0.03]">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${u.avatarBg}`}
                    >
                      {u.avatarLetter}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-0.5 truncate text-[15px] font-bold">
                        {u.name}
                        <IconVerified className="h-[18px] w-[18px] shrink-0 text-[#1D9BF0]" />
                      </div>
                      <p className={`truncate text-[15px] ${muted}`}>@{u.handle}</p>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-full bg-neutral-950 px-4 py-1.5 text-[14px] font-bold text-white hover:bg-neutral-800"
                    >
                      フォロー
                    </button>
                  </li>
                ))}
              </ul>
              <a href="#" className={`block px-4 py-3 text-[15px] ${xBlue} hover:bg-black/[0.03]`}>
                さらに表示
              </a>
            </section>

            <section className={`overflow-hidden rounded-2xl ${borderX} border`}>
              <h2 className="px-4 pb-1 pt-3 text-[20px] font-extrabold leading-6">「いま」を見つけよう</h2>
              <ul>
                {trends.map((t) => (
                  <li key={t.title} className="flex items-start justify-between gap-2 px-4 py-3 hover:bg-black/[0.03]">
                    <div className="min-w-0">
                      <p className={`text-[13px] leading-4 ${muted}`}>{t.category}</p>
                      <p className="mt-0.5 text-[15px] font-bold leading-5">{t.title}</p>
                      <p className={`mt-0.5 text-[13px] ${muted}`}>{t.posts}</p>
                    </div>
                    <button type="button" className="shrink-0 rounded-full p-1 hover:bg-[#1D9BF0]/10" aria-label="メニュー">
                      <IconDotsHorizontal className={`h-[18px] w-[18px] ${muted}`} />
                    </button>
                  </li>
                ))}
              </ul>
              <a href="#" className={`block px-4 py-3 text-[15px] ${xBlue} hover:bg-black/[0.03]`}>
                さらに表示
              </a>
            </section>

            <footer className={`flex flex-wrap gap-x-3 gap-y-1 px-2 text-[13px] ${muted}`}>
              <a href="#" className="hover:underline">
                利用規約
              </a>
              <a href="#" className="hover:underline">
                プライバシーポリシー
              </a>
              <a href="#" className="hover:underline">
                Cookie
              </a>
              <a href="#" className="hover:underline">
                アクセシビリティ
              </a>
              <a href="#" className="hover:underline">
                広告情報
              </a>
              <span>© 2026 X Corp.</span>
            </footer>
          </div>
        </aside>
      </div>

      {/* Floating messages */}
      <div className="pointer-events-none fixed bottom-0 right-4 z-30 flex justify-end lg:right-8">
        <button
          type="button"
          className="pointer-events-auto flex items-center gap-2 rounded-t-2xl border border-b-0 border-[#EFF3F4] bg-white px-4 py-3 text-[15px] font-bold text-neutral-950 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-colors hover:bg-neutral-50"
        >
          <IconMail className="h-5 w-5" />
          <span className="leading-none">メッセージ</span>
        </button>
      </div>
    </div>
  );
}
