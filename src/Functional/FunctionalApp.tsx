import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";

//Everything will live up here, from the fectch calls to the functions.
//Fetch calls should exist here.
/*
  ✔️ToDo: Be able to delete a dog card (Delete Request). 
  ✔️ToDo: Be able to favorite and unfavorite a dog. (Patch Request). 
  ✔️ToDo: Refactor when everything is working so It follows SRP and Dry
  ✔️ToDo: Be able to create the dogs in the functionalCreateDogForm. (Post Request).
*/

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dog) => {
        setAllDogs(dog);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchData();
  }, []);

  //Create dog function that will passed down to the Functional dog form.
  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => refetchData())
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (dog: Dog) => {
    setIsLoading(true);
    Requests.deleteDog(dog)
      .then(() => refetchData())
      .finally(() => setIsLoading(false));
  };

  const updateDog = (dog: Pick<Dog, "id" | "isFavorite">) => {
    setIsLoading(true);
    Requests.updateDog(dog)
      .then(() => refetchData())
      .finally(() => setIsLoading(false));
  };

  //filter the favorited vs the unfavorited dogs.
  const favorited = allDogs.filter((dog) => dog.isFavorite).length;
  const unFavorited = allDogs.length - favorited;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        setActiveTab={(tab) => setActiveTab(tab)}
        favorite={favorited}
        unfavorite={unFavorited}
        activeTab={activeTab}
      >
        {activeTab === "create" ? (
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
