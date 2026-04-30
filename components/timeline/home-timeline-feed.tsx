import { fetchHomeTimelinePosts } from "../../lib/dal/social";
import TimelineFeed from "./timeline-feed";

export async function HomeTimelineFeed() {
  const posts = await fetchHomeTimelinePosts();

  return <TimelineFeed initialPosts={posts} />;
}
