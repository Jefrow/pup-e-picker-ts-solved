// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode; 
  favorited: number;
  unfavorited: number; 
  activeTab: string; 
  setActiveTab: (tab: string) => void; 
}

export class ClassSection extends Component<Props> {
  render() {
    const { favorited, unfavorited, children, activeTab, setActiveTab } =
      this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                activeTab === "favorited" ? "active" : ""
              } `}
              onClick={() => {
                setActiveTab("favorited");
              }}
            >
              favorited ({favorited})
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                activeTab === "unfavorited" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("unfavorited");
              }}
            >
              unfavorited ({unfavorited})
            </div>
            <div
              className={`selector ${activeTab === "create" ? "active" : ""} `}
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
  }
}
