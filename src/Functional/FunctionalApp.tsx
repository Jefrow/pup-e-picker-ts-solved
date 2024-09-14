import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from '../types'
import { Requests } from '../api'
//Everything will live up here, from the fectch calls to the functions. 
//Fetch calls should exist here. 
export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([])
  const [activeTab, setActiveTab] = useState("all"); 

  const refetchData = () => {
    return Requests.getAllDogs().then((dog) => {
      setAllDogs(dog); 
    }); 
  }

  useEffect(() => {
    refetchData()
  },[]); 

  /*
  Things to figure out list. 
    - filter out allDogs to show dogs that are favorited and that are not. 
  */
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection setActiveTab={setActiveTab} >
        {/*filter the dog data to show all, favorited or unfavorited??? */}
      {activeTab === "all" && <FunctionalDogs allDogs={allDogs} />}
      {/* {activeTab === "favorite" && <FunctionalDogs allDogs={favoriteDogs} />}
      {activeTab === "unfavorite" && <FunctionalDogs allDogs={unfavorited} />} */}
      {activeTab === "create" &&  <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
