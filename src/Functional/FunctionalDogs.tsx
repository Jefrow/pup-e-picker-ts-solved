import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
// import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
   allDogs, 
   filter,
   isLoading,
   deleteDog,
 }: {
   allDogs: Dog[];
   filter: string; 
   isLoading: boolean;
   deleteDog:(dog: Dog) => void; 
  }
) => {

  const filteredDogs = allDogs.filter((dog) =>{
    if(filter === "favorited"){
      return dog.isFavorite
    }else if(filter === "unfavorited"){
      return !dog.isFavorite
    }else{
      return dog
    }   
  })
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
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
            deleteDog(dog)
          }}
          onHeartClick={() => {
            alert("clicked heart")
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
