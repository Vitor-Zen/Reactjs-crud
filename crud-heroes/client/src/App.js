import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";
import Card from "./components/cards/card";

function App() {
  const [values, setValues] = useState();
  const [listHeroes, setListHeroes] = useState();

  console.log("Lista de heróis antes de carregar:", listHeroes);

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }))
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      poder: values.poder,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards")
      .then((response) => {
        setListHeroes(response.data);
        console.log("Lista de heróis após carregar:", response.data);
      });
  }, [])

  return (
    <div className="app--container">
      <div className="register--container">
        <h1 className="register--title">Heroes</h1>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="poder"
          placeholder="Poder"
          className="register--input"
          onChange={handleChangeValues}
        />
        <button className="register--button" onClick={() => handleClickButton()}>Cadastrar</button>
      </div>
      {console.log(listHeroes)}
      {typeof listHeroes !== "undefined" &&
        listHeroes.map((value) => {
          return (
            <Card
              key={value.id}
              listCard={listHeroes}
              setListCard={setListHeroes}
              id={value.idheroes}
              name={value.name}
              poder={value.poder}
            ></Card>);
        })}
    </div>
  );
}

export default App;
