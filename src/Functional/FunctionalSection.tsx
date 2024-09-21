// you can use this type for react children if you so choose

import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const FunctionalSection = ({
  children,
  setActiveTab,
  favorite, 
  unfavorite,
  activeTab, 
}: {
  setActiveTab: (tab: string) => void;
  children: ReactNode;
  favorite: number;
  unfavorite: number;
  activeTab: string;  
}) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === 'favorited' ? 'active' : '' }`}
            onClick={() => {
              setActiveTab("favorited");
            }}
          >
            favorited ( {favorite} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === 'unfavorited' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab("unfavorited");
            }}
          >
            unfavorited ( {unfavorite} )
          </div>
          <div
            className={`selector ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab("create");
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
