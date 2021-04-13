import { useEffect, useState } from 'react';
import './App.css';
import Item from './components/Item';

function App() {
  const [values, setValues] = useState([]);
  const [newData, setNewData] = useState({ astunnus: "", asnimi: "", yhteyshlo: "", postinro: "", postitmp: "", asvuosi: "" })

  let URL = "http://localhost/CRUD-harjoitustyo/";


  useEffect(() => {
    async function getValues() {
      let val = await fetch(URL + 'get.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      let json = await val.json();
      setValues(json);
    }
    getValues();
  }, [])

  async function deleteA(id) {
    let val = await fetch(URL + 'delete.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        astunnus: id
      })
    })
    setValues(values.filter((item) => item.astunnus !== id));
  }

  function changeValue(e) {
    const { value, name } = e.target;
    setNewData({ ...newData, [name]: value })
  }

  async function addNew() {
    console.log(newData)
    let val = await fetch(URL + "post.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        astunnus: newData.astunnus,
        asnimi: newData.asnimi,
        yhteyshlo: newData.yhteyshlo,
        postinro: newData.postinro,
        postitmp: newData.postitmp,
        asvuosi: newData.asvuosi
      })
    })
    let json = await val.json();
    setValues([...values, json]);
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="addNewData">
          <h3>Add new customer</h3>
          <label htmlFor={newData.astunnus + "/1"}>Astunnus: </label>
          <input maxLength={10} required name="astunnus" onChange={(e) => changeValue(e)} id={newData.astunnus + "/1"} value={newData.astunnus}></input>
          <label htmlFor={newData.astunnus + "/2"}>Asnimi: </label>
          <input maxLength={20} name="asnimi" onChange={(e) => changeValue(e)} id={newData.astunnus + "/2"} value={newData.asnimi}></input>
          <label htmlFor={newData.astunnus + "/3"}>Yhteyshenkilö: </label>
          <input maxLength={10} name="yhteyshlo" onChange={(e) => changeValue(e)} id={newData.astunnus + "/3"} value={newData.yhteyshlo}></input>
          <label htmlFor={newData.astunnus + "/4"}>Postinumero: </label>
          <input maxLength={6} name="postinro" onChange={(e) => changeValue(e)} id={newData.astunnus + "/4"} value={newData.postinro}></input>
          <label htmlFor={newData.astunnus + "/5"}>Postitoimipaikka: </label>
          <input maxLength={20} name="postitmp" onChange={(e) => changeValue(e)} id={newData.astunnus + "/5"} value={newData.postitmp}></input>
          <label htmlFor={newData.astunnus + "/6"}>Asvuosi: </label>
          <input maxLength={4} name="asvuosi" onChange={(e) => changeValue(e)} id={newData.astunnus + "/6"} value={newData.asvuosi}></input>
          <div><button onClick={() => addNew()}>Add new</button></div>
        </div>
        {values.map((item) => {
          return (
            <Item key={item.astunnus} items={item} del={(id) => deleteA(id)} />
          )
        })}
      </header>
    </div >
  );
}

export default App;
