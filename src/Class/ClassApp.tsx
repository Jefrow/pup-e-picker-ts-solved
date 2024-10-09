import { Component } from 'react';
import { ClassSection } from './ClassSection';
import { ClassDogs } from './ClassDogs';
import { ClassCreateDogForm } from './ClassCreateDogForm';
import { Dog } from '../types';
import { Requests } from '../api';
import { toast } from 'react-hot-toast';

type State = {
  allDogs: Dog[] | [];
  activeTab: string;
  isLoading: boolean;
};
export class ClassApp extends Component<State> {
  state: State = {
    allDogs: [],
    activeTab: 'all',
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

  handleRequest = (request: Promise<any>, successMessage: string) => {
    this.setState({ isLoading: true });
    return request
      .then(() => this.refetchData())
      .then(() => toast.success(successMessage))
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount(): void {
    this.refetchData();
  }

  createDog = (dog: Omit<Dog, 'id'>) => {
    this.handleRequest(Requests.postDog(dog), 'You have created a dog!');
  };

  deleteDog = (dog: Dog) => {
    this.handleRequest(Requests.deleteDog(dog), 'You have deleted a dog!');
  };

  updateDog = (dog: Pick<Dog, 'id' | 'isFavorite'>) => {
    this.handleRequest(
      Requests.updateDog(dog),
      dog.isFavorite ? 'You have liked a dog' : 'You have un-liked a dog'
    );
  };

  render() {
    const { activeTab, allDogs, isLoading } = this.state;
    const favorited = allDogs.filter((dog) => dog.isFavorite).length;
    const unfavorited = allDogs.length - favorited;

    return (
      <div className="App" style={{ backgroundColor: 'goldenrod' }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          setActiveTab={(tab) => this.setState({ activeTab: tab })}
          favorited={favorited}
          unfavorited={unfavorited}
          activeTab={activeTab}
        >
          {activeTab === 'create' ? (
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
      </div>
    );
  }
}
