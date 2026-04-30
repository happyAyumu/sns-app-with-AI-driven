interface ExploreNewsItem {
  id: string;
  title: string;
  meta: string;
  posts: string;
}

const exploreNews: ExploreNewsItem[] = [
  {
    id: "n1",
    title: "Body Found in Search for Missing Boy Yuki Adachi",
    meta: "1 day ago · News",
    posts: "43K posts",
  },
  {
    id: "n2",
    title: "Trump Orders Naval Blockade of Iranian Ports",
    meta: "2 days ago · News",
    posts: "447.8K posts",
  },
  {
    id: "n3",
    title: "Péter Magyar's Tisza Party Wins Supermajority",
    meta: "2 days ago · News",
    posts: "1.4M posts",
  },
];

export function ExploreNewsList() {
  return (
    <section className="border-b border-[#eff3f4]">
      <h2 className="px-4 pb-1 pt-3 text-[24px] font-black leading-none text-neutral-900">Today&apos;s News</h2>
      <ul>
        {exploreNews.map((item) => (
          <li key={item.id} className="border-t border-[#eff3f4] px-4 py-3 hover:bg-black/[0.02]">
            <p className="text-[18px] font-black leading-tight text-neutral-900">{item.title}</p>
            <p className="mt-1 text-[13px] text-[#536471]">
              {item.meta} · {item.posts}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
