import { ExploreHeroCard } from "./explore-hero-card";
import { ExploreNewsList } from "./explore-news-list";
import { ExploreSearchHeader } from "./explore-search-header";
import { ExploreTopicTabs } from "./explore-topic-tabs";

export function ExploreMain() {
  return (
    <section className="min-h-0">
      <ExploreSearchHeader />
      <ExploreTopicTabs />
      <ExploreHeroCard />
      <ExploreNewsList />
    </section>
  );
}
