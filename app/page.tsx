import { AppThreeColumnLayout } from "../components/layout/app-three-column-layout";
import RightSidebar from "../components/layout/right-sidebar";
import { HomeTimelineFeed } from "../components/timeline/home-timeline-feed";

export const revalidate = 0;

export default async function Home() {
  return (
    <AppThreeColumnLayout mainChildren={<HomeTimelineFeed />} rightSidebar={<RightSidebar />} />
  );
}
