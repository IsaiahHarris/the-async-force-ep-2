'use strict'
let reqButton = document.getElementById('requestResourceButton');
let resourceButton = document.getElementById('resourceType');
let input = document.getElementById('resourceId');
reqButton.addEventListener('click', function () {
  if (resourceButton.value === 'people') {
    console.log('person clicked')
    let peoples = new XMLHttpRequest();
    peoples.open('GET', 'https://swapi.co/api/people/' + input.value +'/')
    peoples.send();
    peoples.addEventListener('load', function () {
      const peopleObj = JSON.parse(this.responseText);
      if (input.value > -1 || typeof input.value === 'number') {
        let nameHeader = document.createElement('h2')
        nameHeader.innerHTML = peopleObj.name;
        document.body.appendChild(nameHeader);
        let genderPTag = document.createElement('p');
        genderPTag.innerHTML = 'gender: ' + peopleObj.gender;
        document.body.appendChild(genderPTag);

        let getSpecies = new XMLHttpRequest();
        getSpecies.open('GET', peopleObj.species[0]);
        getSpecies.send();
        getSpecies.addEventListener('load', function(){
          const speciesObj = JSON.parse(this.responseText);

          let species = document.createElement('p');
          species.innerHTML = 'species: ' + speciesObj.name;
          document.body.appendChild(species);
        })
      } else {
        alert('input must be positive number');
      }
    })
  } else if (resourceButton.value === 'planets') {
    console.log('planet clicked');
    let planets = new XMLHttpRequest();
    planets.open('GET', 'https://swapi.co/api/planets/')
    planets.send();
    planets.addEventListener('load', function () {
      const planetsObj = JSON.parse(this.responseText)
      if(input.value > -1 || typeof input.value === 'number'){
        let planetNameHeader = document.createElement('h2');
        planetNameHeader.innerHTML = planetsObj.results[input.value].name;
        document.body.appendChild(planetNameHeader);
        let terrainName = document.createElement('p');
        terrainName.innerHTML= 'terrain: ' + planetsObj.results[input.value].terrain;
        document.body.appendChild(terrainName);
        let populationCount = document.createElement('p');
        populationCount.innerHTML = 'population:' + planetsObj.results[input.value].population;
        document.body.appendChild(populationCount);

        let planetFilms = new XMLHttpRequest();
        planetFilms.open('GET', planetsObj.films);
        planetFilms.send();
        planetFilms.addEventListener('load', function(){
          const filmsObj = JSON.parse(this.responseText);
          let filmsUl = document.createElement('ul');
          let filmsLiElements = document.createElement('li');
          filmsLiElements.innerHTML = filmsObj.name;
          filmsLiElements.appendChild(filmsUl);
          filmsUl.appendChild(filmsLiElements);
          document.body.appendChild(filmsLiElements);
        })

      }else {
        alert('input must be a positive number');
      }
    })
  }


})