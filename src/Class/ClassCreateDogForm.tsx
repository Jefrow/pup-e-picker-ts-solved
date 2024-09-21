import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

type State = {
  nameInput: string;
  descriptionInput: string;
  imageInput: string;
};

type Props = {
  isLoading: boolean;
  createDog: (dog: Omit<Dog, "id">) => void;
};

export class ClassCreateDogForm extends Component<Props, State> {
  state: State = {
    nameInput: "",
    descriptionInput: "",
    imageInput: `${dogPictures.BlueHeeler}`,
  };

  isValidName = () => (this.state.nameInput.length > 3); 
  isValidDescrtiption = () => (this.state.descriptionInput.length > 3); 
  isValidDog = () => (this.isValidName() && this.isValidDescrtiption());

  render() {
    const { isLoading, createDog } = this.props;
    const { nameInput, descriptionInput, imageInput } = this.state;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          createDog({
            name: nameInput,
            description: descriptionInput,
            image: imageInput,
            isFavorite: false,
          });
          this.setState({
            nameInput: "",
            descriptionInput: "",
            imageInput: `${dogPictures.BlueHeeler}`,
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          name="nameInput"
          id="nameInput"
          value={nameInput}
          onChange={(e) => {
            this.setState({ nameInput: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="description"
          value={descriptionInput}
          cols={80}
          rows={10}
          onChange={(e) => {
            this.setState({ descriptionInput: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          name="picture"
          id="picture"
          value={imageInput}
          onChange={(e) => {
            this.setState({ imageInput: e.target.value });
          }}
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
        <input type="submit" value="submit" disabled={isLoading || !this.isValidDog()} />
      </form>
    );
  }
}
