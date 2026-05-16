import type { Metadata } from "next";
import { AppThreeColumnLayout } from "../../components/layout/app-three-column-layout";
import { ExploreMain } from "../../components/explore/explore-main";
import { ExploreRightSidebar } from "../../components/explore/explore-right-sidebar";

export const metadata: Metadata = {
  title: "Explore | X Clone",
  description: "Explore timeline mock page",
};

export default function ExplorePage() {
  return (
    <AppThreeColumnLayout mainChildren={<ExploreMain />} rightSidebar={<ExploreRightSidebar />} />
  );
}
