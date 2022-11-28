import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  let modal = document.getElementById("myModal");
  //let span = document.getElementsById("close");
  let [names, setName] = useState(null);

  useEffect(() => {
    fetch("https://youngstartup.io/api/cwebsite/get_speakers_dyn")
      .then(response => response.json())
      .then(data => setName(data.speakers))
  }, []);

  function handleClick(fnprop, lnprop, cprop, iprop, bprop) {
    modal.style.display = "block";
    document.getElementById('name').innerHTML = fnprop + " " + lnprop;
    document.getElementById('company').innerHTML = cprop;
    document.getElementById('image').src = iprop;
    document.getElementById('bio').innerText = bprop;
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  return (
    <div className="App">
      <h2>MEET OUR FEATURED INVESTORS</h2>
      <div class="row">
        { }{names && names.map(name => (
          <div class="column">
            <div class="card" onClick={() => handleClick(name.firstname, name.lastname, name.company, name.speaker_head_shot_to_display, name.bio)}>
              <img src={name.speaker_head_shot_to_display} width="100%" height="100%" />
              <h3>{name.firstname} {name.lastname}</h3>
            </div>
          </div>
        ))}
      </div>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <h3 id='name'>name</h3>
          <h3 id='company'>company</h3>
          <img id='image' src='' width="100" height="100" />
          <p id='bio'>bio</p>
        </div>
      </div>
    </div>
  );
}

export default App;
