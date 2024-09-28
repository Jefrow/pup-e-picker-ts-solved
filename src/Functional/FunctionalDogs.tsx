import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  allDogs,
  filter,
  isLoading,
  deleteDog,
  updateDog,
}: {
  allDogs: Dog[];
  filter: string;
  isLoading: boolean;
  deleteDog: (dog: Dog) => void;
  updateDog: (dog: Pick<Dog, "id" | "isFavorite">) => void;
}) => {
  const filteredDogs = allDogs.filter((dog) => {
    if (filter === "favorited") {
      return dog.isFavorite;
    } else if (filter === "unfavorited") {
      return !dog.isFavorite;
    } else {
      return dog;
    }
  });

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
              isFavorite: false 
            });
          }}
          onEmptyHeartClick={() => {
            updateDog({ 
              id: dog.id, 
              isFavorite: true 
            });
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
