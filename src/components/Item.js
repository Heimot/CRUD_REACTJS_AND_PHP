import { useEffect, useState } from 'react';
import './item.css'

export default function Item({ items, del }) {
    const [Values, setValues] = useState({ astunnus: items.astunnus, asnimi: items.asnimi, yhteyshlo: items.yhteyshlo, postinro: items.postinro, postitmp: items.postitmp, asvuosi: items.asvuosi })
    let URL = "http://localhost/CRUD-harjoitustyo/";

    function changeValue(e) {
        const { value, name } = e.target;
        setValues({ ...Values, [name]: value })
    }

    async function saveChanges() {
        await fetch(URL + 'update.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                astunnus: Values.astunnus,
                asnimi: Values.asnimi,
                yhteyshlo: Values.yhteyshlo,
                postinro: Values.postinro,
                postitmp: Values.postitmp,
                asvuosi: Values.asvuosi
            })
        })
    }



    return (
        <div className="items">
            <label htmlFor={Values.astunnus + "/1"}>Astunnus: </label>
            <div name="astunnus" id={Values.astunnus + "/1"}>{Values.astunnus}</div>
            <label htmlFor={Values.astunnus + "/2"}>Asnimi: </label>
            <input maxLength={20} name="asnimi" onChange={(e) => changeValue(e)} id={Values.astunnus + "/2"} value={Values.asnimi}></input>
            <label htmlFor={Values.astunnus + "/3"}>Yhteyshenkilö: </label>
            <input maxLength={10} name="yhteyshlo" onChange={(e) => changeValue(e)} id={Values.astunnus + "/3"} value={Values.yhteyshlo}></input>
            <label htmlFor={Values.astunnus + "/4"}>Postinumero: </label>
            <input maxLength={6} name="postinro" onChange={(e) => changeValue(e)} id={Values.astunnus + "/4"} value={Values.postinro}></input>
            <label htmlFor={Values.astunnus + "/5"}>Postitoimipaikka: </label>
            <input maxLength={20} name="postitmp" onChange={(e) => changeValue(e)} id={Values.astunnus + "/5"} value={Values.postitmp}></input>
            <label htmlFor={Values.astunnus + "/6"}>Asvuosi: </label>
            <input maxLength={4} name="asvuosi" onChange={(e) => changeValue(e)} id={Values.astunnus + "/6"} value={Values.asvuosi}></input>
            <div><button onClick={() => saveChanges()}>Save</button><button onClick={() => del(Values.astunnus)}>Delete</button></div>
        </div>
    )
}