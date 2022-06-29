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
      url: 'https://genius-song-lyrics1.p.rapidapi.com/search',
      params: {q: 'Alan Walker', per_page: '10', page: '1'},
      headers: {
        'X-RapidAPI-Key': '4b544470eemsha6cb3176c9530e2p1425c4jsn406add2a21e6',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
      }
    };
axios.request(options).then(function (response) {
  console.log(response.data.response.hits)
setTracksContainer(response.data.response.hits)
}).catch(function (error) {
	console.error(error);
});

}

const onChangeHandleInput = (e) => {
setEndPoints(e.target.value)
 } 
// to prevent page refreshing every time we click search
const submitHandler = (e) => {
  e.preventDefault()
}

  return (
<div className="App">
<form className="input-group" onSubmit={submitHandler}>
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" 
  value={endPoint}
  onChange={onChangeHandleInput}/>
  <input type="submit" className="btn btn-outline-primary" placeholder="Search" />
</form>
<div class="card-group">
  <div class="row">
{trackscontainer.map((item) => 
(<div class="col=xl-2 col-lg-3 col-md-6 col-sm-12">
<div class="card" key={item.id}>
<img src={item.result.song_art_image_thumbnail_url}/>
    <div class="card-body">
      <h5 class="card-title">{item.result.title}</h5>
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
};



export default App;
