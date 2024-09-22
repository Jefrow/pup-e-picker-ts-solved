import { DogCard } from '../Shared/DogCard';
import { Component } from 'react';
import { Dog } from '../types';

type Props = {
  allDogs: Dog[];
  filter: string;
  isLoading: boolean;
  deleteDog: (dog: Dog) => void;
  updateDog: (dog: Pick<Dog, 'id' | 'isFavorite'>) => void;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<Props> {
  filterDogs = (allDogs: Dog[], filter: string) => {
    return allDogs.filter((dog: Dog) => {
      if (filter === 'favorited') {
        return dog.isFavorite;
      } else if (filter === 'unfavorited') {
        return !dog.isFavorite;
      } else {
        return dog;
      }
    });
  };

  render() {
    const { allDogs, filter, isLoading, deleteDog, updateDog } = this.props;
    const filteredDogs = this.filterDogs(allDogs, filter);

    return (
      <>
        {filteredDogs.map((dog) => (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog);
            }}
            onHeartClick={() => {
              updateDog({
                id: dog.id,
                isFavorite: false,
              });
            }}
            onEmptyHeartClick={() => {
              updateDog({
                id: dog.id,
                isFavorite: true,
              });
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
