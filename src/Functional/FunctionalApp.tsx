import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, TactiveTab } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TactiveTab>("all");
  const [isLoading, setIsLoading] = useState(false);

  const refetchData = () => {
    return Requests.getAllDogs().then((dog) => {
      setAllDogs(dog);
    });
  };

  const handleRequest = (request: Promise<unknown>, successMessage: string) => {
    setIsLoading(true);
    return request
      .then(() => refetchData())
      .then(() => toast.success(successMessage))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchData();
  }, []);

  //Create dog function that will passed down to the Functional dog form.
  const createDog = (dog: Omit<Dog, "id">): Promise<unknown> => {
    return handleRequest(Requests.postDog(dog), "You have created a dog!");
  };

  const deleteDog = (dog: Dog): Promise<unknown> => {
    return handleRequest(Requests.deleteDog(dog), "You have deleted a dog!");
  };

  const updateDog = (dog: Pick<Dog, "id" | "isFavorite">): Promise<any> => {
    return handleRequest(
      Requests.updateDog(dog),
      dog.isFavorite ? "You have liked a dog" : "You have un-liked a dog"
    );
  };

  const favorited = allDogs.filter((dog) => dog.isFavorite);
  const unfavorited = allDogs.filter((dog) => !dog.isFavorite);

  const dogList: Record<string, Dog[]> = {
    all: allDogs,
    favorited,
    unfavorited,
    create: [],
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        setActiveTab={(tab) => setActiveTab(tab)}
        favorite={favorited.length}
        unfavorite={unfavorited.length}
        activeTab={activeTab}
      >
        {activeTab === "create" ? (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
          />
        ) : (
          <FunctionalDogs
            allDogs={dogList[activeTab]}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
