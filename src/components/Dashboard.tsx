
import { useState } from "react";
import { LandingPage } from "./LandingPage";
import { MainApp } from "./MainApp";

export function Dashboard() {
  const [showLanding, setShowLanding] = useState(true);
  const [discussions, setDiscussions] = useState<Array<{
    id: string;
    title: string;
    author: string;
    replies: number;
    lastActivity: string;
    category: string;
  }>>([]);

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onEnterApp={handleEnterApp} discussions={discussions} />;
  }

  return <MainApp onDiscussionsUpdate={setDiscussions} />;
}
