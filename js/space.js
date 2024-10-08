document.getElementById('btnBuscar').addEventListener('click', function(){
    let searchInput = document.getElementById('inputBuscar').value
    if (searchInput != ""){
        let galaxiesJSON = `https://images-api.nasa.gov/search?q=${searchInput}`
        getJSONData(galaxiesJSON).then(function(respObj){
            if(respObj.status=="ok"){
                galaxiesArray=respObj.data.collection.items;
                showGalaxies(galaxiesArray);
            }
        });

    }
    else {
        alert("Debe ingresar parámetro de búsqueda.")
    }

    
}); 

let galaxiesContainer = document.getElementById('contenedor')

function showGalaxies (array) {
let imgJSONArray = [];
array.forEach(element => { 
    let imgJSON = element.href
    imgJSONArray.push(imgJSON)
});
let galaxiesImgArray = [];

let promises = imgJSONArray.map(element => {
    return getJSONData(element).then(function (respObj) {
        if (respObj.status == "ok") {
            galaxiesImgArray.push(respObj.data);
        }
    });
})
//Verifico primero que se completen todas las promesas antes de utilizar galaxiesImgArray.
    Promise.all(promises).then(() => { 
        galaxiesContainer.innerHTML =""

        array.forEach(function (element, index) {
        galaxiesContainer.innerHTML += ` <div class="col-md-4">
        <div class="card" style="width: 18rem;">
            <div id="carouselExampleControls${index}" class="carousel slide" data-ride="carousel" data-interval="1000">
            <div class="carousel-inner">
            ${galaxiesCarousel(galaxiesImgArray,index)}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="card-body">
            <h5 class="card-title">${element.data[0].title}</h5>
            <p class="card-text">${element.data[0].description}</p>
            <small>${element.data[0].date_created}</small>
        </div>
        </div>
        </div>
        `
        });
    })


};

function galaxiesCarousel (array, index){
    let carousel = ""
    let  currentArray = array[index]
    for(i=0; i < currentArray.length; i++){
        if (i==0){
            carousel += `<div class="carousel-item active">
        <img src=${currentArray[i]} class="d-block w-100" alt="NASA img">
        </div>`
        }
        else {
            carousel += `<div class="carousel-item">
        <img src=${currentArray[i]} class="d-block w-100" alt="NASA img">
        </div>`
        }
    }
    return carousel
}


let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
};