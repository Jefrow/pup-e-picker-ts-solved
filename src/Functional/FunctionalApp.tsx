import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";
//Everything will live up here, from the fectch calls to the functions.
//Fetch calls should exist here.
export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const refetchData = () => {
    return Requests.getAllDogs().then((dog) => {
      setAllDogs(dog);
    });
  };

  useEffect(() => {
    refetchData();
  }, []);

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
        {activeTab === "all" && <FunctionalDogs allDogs={allDogs} />}
        {activeTab === "favorited" && <FunctionalDogs allDogs={favorited} />}
        {activeTab === "unfavorited" && (
          <FunctionalDogs allDogs={unFavorited} />
        )}
        {activeTab === "create" && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
