import React from "react";
import "./card.css"
import FormDialog from "../dialog/dialog";

export default function Card(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    };

    console.log("Props no Card:", props);

    return (
        <>
            <FormDialog
                open={open}
                setOpen={setOpen}
                id={props.id}
                name={props.name}
                poder={props.poder}
                listCard={props.listCard}
                setListCard={props.setListCard}
            />
            <div className="card--container" onClick={() => handleClickCard()}>
                <h1 className="card--title">Nome: {props.name}</h1>
                <p className="card--poder">Poder: {props.poder}</p>
            </div>
        </>
    );
}
