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
  toggleTab = (tab: string) => {
    if( this.props.activeTab === tab) {
      this.props.setActiveTab(''); 
    }else{
      this.props.setActiveTab(tab); 
    }
  }
  render() {
    const { favorited, unfavorited, children, activeTab} =
      this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <div
              className={`selector ${
                activeTab === "favorited" ? "active" : ""
              } `}
              onClick={() => {
                this.toggleTab("favorited");
              }}
            >
              favorited ({favorited})
            </div>
            <div
              className={`selector ${
                activeTab === "unfavorited" ? "active" : ""
              }`}
              onClick={() => {
                this.toggleTab("unfavorited");
              }}
            >
              unfavorited ({unfavorited})
            </div>
            <div
              className={`selector ${activeTab === "create" ? "active" : ""} `}
              onClick={() => {
                this.toggleTab("create");
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
