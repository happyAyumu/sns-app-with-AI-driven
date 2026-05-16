import type { ReactNode } from "react";

interface UserSegmentLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function UserSegmentLayout({ children, modal }: UserSegmentLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
