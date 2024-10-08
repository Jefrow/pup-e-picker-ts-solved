// you can use this type for react children if you so choose

import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TactiveTab } from "../types";

export const FunctionalSection = ({
  children,
  setActiveTab,
  favorite,
  unfavorite,
  activeTab,
}: {
  setActiveTab: (tab: TactiveTab) => void;
  children: ReactNode;
  favorite: number;
  unfavorite: number;
  activeTab: string;
}) => {
  const toggleTab = (tab: TactiveTab) => {
    const tabValue = activeTab === tab ? "all" : tab;
    setActiveTab(tabValue);
  };
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={() => {
              toggleTab("favorited");
            }}
          >
            favorited ( {favorite} )
          </div>

          <div
            className={`selector ${
              activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              toggleTab("unfavorited");
            }}
          >
            unfavorited ( {unfavorite} )
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => {
              toggleTab("create");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
