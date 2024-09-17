import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";

//Everything will live up here, from the fectch calls to the functions.
//Fetch calls should exist here.
/*
  ToDo: Be able to delete a dog card (Delete Request). 
  ToDo: Be able to favorite and unfavorite a dog. (Patch Request). 
  ToDo: Be able to create the dogs in the functionalCreateDogForm. (Post Request).
  ToDo: Refactor when everything is working so It follows SRP and Dry, pass 

  Files that need to be refactored: 
  -FunctionalApp.tsx
  -FunctionalCreateDogForm.tsx
  -api.tsx
*/

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const refetchData = () => {
    setIsLoading(true) 
    return Requests.getAllDogs().then((dog) => {
      setAllDogs(dog);
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchData();
  }, []);

  //Create dog function that will passed down to the Functional dog form. 
  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true)
    Requests.postDog(dog).then(() => refetchData()).finally(() => setIsLoading(false)); 
  }

  //filter the favorited vs the unfavorited dogs.
  const favorited = allDogs.filter((dog) => dog.isFavorite).map((dog) => dog);
  const unFavorited = allDogs
    .filter((dog) => !dog.isFavorite)
    .map((dog) => dog);


  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        setActiveTab={setActiveTab}
        favorite={favorited.length}
        unfavorite={unFavorited.length}
        activeTab={activeTab}
      >

        {/*Refacotr later that that I wouldn't need to repeat the <FunctionalDogs/> */}
        {activeTab === "all" && <FunctionalDogs allDogs={allDogs} />}
        {activeTab === "favorited" && <FunctionalDogs allDogs={favorited} />}
        {activeTab === "unfavorited" && (
          <FunctionalDogs allDogs={unFavorited} />
        )}
        {activeTab === "create" && <FunctionalCreateDogForm createDog={createDog} isLoading={isLoading}/>}
      </FunctionalSection>
    </div>
  );
}
