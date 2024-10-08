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

    galaxiesContainer.innerHTML =""

    array.forEach(function (element, index) {
    galaxiesContainer.innerHTML += ` <div class="col-md-4">
    <div class="card">
         <img src="${element.links[0].href}" class="card-img-top" alt="${element.data[0].title}">
            <div class="card-body">
            <h5 class="card-title">${element.data[0].title}</h5>
            <p class="card-text">${element.data[0].description}</p>
            <small>${element.data[0].date_created}</small>
            </div>
        </div>
        `
});
    


};



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