import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;
export const FunctionalCreateDogForm = ({
  createDog,
  isLoading,
}: {
  createDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
}) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [imageInput, setImageInput] = useState(defaultSelectedImage);
  const isValidName = (nameInput.length > 3); 
  const isValidDescription = (descriptionInput.length > 3); 
  const isValidDog = (isValidName && isValidDescription);  

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({
          name: nameInput,
          image: imageInput,
          description: descriptionInput,
          isFavorite: false,
        })
        setNameInput(""), setDescriptionInput(""), setImageInput(defaultSelectedImage);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        name="name"
        id="name"
        type="text"
        disabled={isLoading}
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id="description"
        cols={80}
        rows={10}
        disabled={isLoading}
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        name="picture"
        id="picture"
        value={imageInput}
        onChange={(e) => setImageInput(e.target.value)}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading || !isValidDog} />
    </form>
  );
};
