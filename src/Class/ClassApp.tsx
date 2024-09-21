import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog } from "../types";
import { Requests } from "../api";

type State = {
  allDogs: Dog[] | [];
  activeTab: string;
  isLoading: boolean;
};
export class ClassApp extends Component<State> {
  state: State = {
    allDogs: [],
    activeTab: "all",
    isLoading: false,
  };

  refetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dog) => {
        this.setState({ allDogs: dog });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount(): void {
    this.refetchData();
  }

  createDog = (dog: Omit<Dog, "id">) => {
    this.setState({ isLoadig: true });
    Requests.postDog(dog)
      .then(() => this.refetchData())
      .finally(() => this.setState({ isLoading: false }));
  };

  deleteDog = (dog: Dog) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(dog)
      .then(() => this.refetchData())
      .finally(() => this.setState({ isLoading: false }));
  };

  updateDog = (dog: Pick<Dog, "id" | "isFavorite">) => {
    this.setState({ isLoading: true });
    Requests.updateDog(dog)
      .then(() => this.refetchData())
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { activeTab, allDogs, isLoading } = this.state;
    const favorited = allDogs.filter((dog) => dog.isFavorite).length;
    const unfavorited = allDogs.length - favorited;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          setActiveTab={(tab) => this.setState({ activeTab: tab })}
          favorited={favorited}
          unfavorited={unfavorited}
          activeTab={activeTab}
        >
          {activeTab === "create" ? (
            <ClassCreateDogForm
              createDog={this.createDog}
              isLoading={isLoading}
            />
          ) : (
            <ClassDogs 
              allDogs={allDogs}
              filter={activeTab}
              isLoading={isLoading}
              deleteDog={this.deleteDog}
              updateDog={this.updateDog}
            />
          )}
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
