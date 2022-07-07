import './App.css';
import axios from "axios";
import {useState, useEffect} from 'react';
function App(){
// The endpoint is the value we get from the input 
const [endPoint, setEndPoints] = useState("")
//  the container is the data we get from the api
const [trackscontainer,setTracksContainer] = useState([])
// whenever i type something this will call the fetchMe function

useEffect(() => {
  fetchData()
},[])

  function fetchData() {
    const options = {
      method: 'GET',
      url: 'https://genius.p.rapidapi.com/artists/16775/songs',
      headers: {
        'X-RapidAPI-Key': '5b5555a166msh1b6aac54714b238p16c4b8jsnd3a5d085a16d',
        'X-RapidAPI-Host': 'genius.p.rapidapi.com'
      }
    };
axios.request(options, {timeout: 500}).then(function (response) {
  console.log(response.data.response.songs)
setTracksContainer(response.data.response.songs)
}).catch(function (error) {
	console.error(error);
});
}

const onChangeHandleInput = (e) => {
setEndPoints(e.target.value)
 } 
 const optionsendPoint = {
  method: 'GET',
  url: 'https://genius.p.rapidapi.com/search',
params: {q:  {endPoint}},
  headers: {
    'X-RapidAPI-Key': '5b5555a166msh1b6aac54714b238p16c4b8jsnd3a5d085a16d',
    'X-RapidAPI-Host': 'genius.p.rapidapi.com'
  }
};
// to prevent page refreshing every time we click search
const submitHandler = (e) => {
  e.preventDefault()
axios.request(optionsendPoint, {timeout: 500}).then(function (response) {
  console.log(response.data.response.hits)
setTracksContainer(response.data.response.hits)
}).catch(function (error) {
	console.error(error);
});
}

  return (
<div className="App">
<form className="input-group" >
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" 
  value={endPoint}
  onChange={onChangeHandleInput}/>
  <input type="submit" className="btn btn-outline-primary" placeholder="Search" onClick={submitHandler}/>
</form>
<div class="card-group">
  <div class="row">
{trackscontainer.map((item) => 


(<div class="col=xl-2 col-lg-3 col-md-6 col-sm-12">
<div class="card" key={item.id}>
<img src={item.song_art_image_thumbnail_url}/>
    <div class="card-body">
      <h5 class="card-title">{item.full_title}</h5>
      <p class="card-text">{item.artist_names}</p>
    </div>
    <div class="card-footer">
    <a href={item.url}>Check out the lyrics on Genius</a>
    </div>
  </div>
  </div>
    ))}
</div>
</div>
</div>
)
};



export default App;
