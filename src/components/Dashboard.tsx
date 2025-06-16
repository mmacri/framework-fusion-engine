
import { useState } from "react";
import { LandingPage } from "./LandingPage";
import { MainApp } from "./MainApp";

export function Dashboard() {
  const [showLanding, setShowLanding] = useState(true);

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  return <MainApp />;
}
