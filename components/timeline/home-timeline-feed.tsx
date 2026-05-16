import { fetchHomeTimelinePosts, fetchViewerProfile } from "../../lib/dal/social";
import TimelineFeed from "./timeline-feed";

export async function HomeTimelineFeed() {
  const [posts, viewer] = await Promise.all([fetchHomeTimelinePosts(), fetchViewerProfile()]);

  return <TimelineFeed initialPosts={posts} viewer={viewer} />;
}
