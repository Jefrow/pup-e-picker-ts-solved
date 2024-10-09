import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({
  allDogs,
  isLoading,
  deleteDog,
  updateDog,
}: {
  allDogs: Dog[];
  isLoading: boolean;
  deleteDog: (dog: Dog) => void;
  updateDog: (dog: Pick<Dog, "id" | "isFavorite">) => void;
}) => {
  return (
    <>
      {allDogs.map((dog) => (
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
};
