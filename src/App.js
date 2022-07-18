import React from "react";
import axios from "axios";
import {useState, useEffect} from 'react';
function App(){
//  the container is the data we get from the api
const [searchresults,setSearchResults] = useState([])
// The endpoint is the value we get from the input 
const [endPoint, setEndPoints] = useState("")
// const [finalPoint, setFinalPoint]= useState("")
useEffect(() => {
    fetchsearchData()
  },[endPoint])
function fetchsearchData() {
const optionsendPoint = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/search',
  params: {q: endPoint =="" ? "Kendrick Lamar" : {endPoint}},
    headers: {
      'X-RapidAPI-Key': '5b5555a166msh1b6aac54714b238p16c4b8jsnd3a5d085a16d',
      'X-RapidAPI-Host': 'genius.p.rapidapi.com'
    }
  };
  axios.request(optionsendPoint, {timeout: 500}).then(function (response) {
    console.log(response.data.response.hits)
  setSearchResults(response.data.response.hits)
  }).catch(function (error) {
      console.error(error);
  });    
}  

function onChangeHandleInput(e) {
    setEndPoints(e.target.value);
    console.log(endPoint)
} 
  
// to prevent page refreshing every time we click search
function submitHandler(e) {
    e.preventDefault();
    // setFinalPoint(endPoint)
}

return (
<div className="App">
<form className="input-group" >
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" 
  value={endPoint}
  onChange={onChangeHandleInput}/>
</form>
<div class="card-group">
  <div class="row">      
        {searchresults.map((item) => 
            (<div class="col=xl-2 col-lg-3 col-md-6 col-sm-12">
            <div class="card" key={item.id}>
            <img src={item.result.song_art_image_thumbnail_url}/>
                <div class="card-body">
                  <h5 class="card-title">{item.result.full_title}</h5>
                  <p class="card-text">{item.result.artist_names}</p>
                </div>
                <div class="card-footer">
                <a href={item.result.url}>Check out the lyrics on Genius</a>
                </div>
              </div>
              </div>
        ))}
 </div>
</div> 
</div>             
    )
}

export default App;