import { useEffect, useState } from 'react';
import { FunctionalCreateDogForm } from './FunctionalCreateDogForm';
import { FunctionalDogs } from './FunctionalDogs';
import { FunctionalSection } from './FunctionalSection';
import { Dog } from '../types';
import { Requests } from '../api';
import { toast } from 'react-hot-toast';

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dog) => {
        setAllDogs(dog);
      })
      .finally(() => setIsLoading(false));
  };

  const handleRequest = (request: Promise<any>, successMessage: string) => {
    setIsLoading(true);
    return request
      .then(() => refetchData())
      .then(() => toast.success(successMessage))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchData();
  }, []);

  const createDog = (dog: Omit<Dog, 'id'>) => {
    handleRequest(Requests.postDog(dog), 'You have created a dog!');
  };

  const deleteDog = (dog: Dog) => {
    handleRequest(Requests.deleteDog(dog), 'You have deleted a dog!');
  };

  const updateDog = (dog: Pick<Dog, 'id' | 'isFavorite'>) => {
    handleRequest(
      Requests.updateDog(dog),
      dog.isFavorite ? 'You have liked a dog' : 'You have un-liked a dog'
    );
  };

  const favorited = allDogs.filter((dog) => dog.isFavorite).length;
  const unFavorited = allDogs.length - favorited;

  return (
    <div className="App" style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        setActiveTab={(tab) => setActiveTab(tab)}
        favorite={favorited}
        unfavorite={unFavorited}
        activeTab={activeTab}
      >
        {activeTab === 'create' ? (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
          />
        ) : (
          <FunctionalDogs
            allDogs={allDogs}
            filter={activeTab}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
