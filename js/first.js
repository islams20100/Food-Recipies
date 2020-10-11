// let req = new XMLHttpRequest();
let allRecepes = [];
let theRecipe = [];
let alertMessage = document.getElementById('alertMessage');
let recipesRow = document.getElementById('recipesRow');
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');
let recipes = document.getElementById('recipes');
let myRecipe = document.getElementById('myRecipe');


// req.open('GET', 'https://forkify-api.herokuapp.com/api/search?&q=pizza');
// req.send();
// req.addEventListener('readystatechange', function () {
//     if (req.readyState == 4 && req.status == 200) {
//         allRecepes = JSON.parse(req.response).recipes;
//         console.log(allRecepes);
//         displayRecepes();
//     }
// });


async function getRecipe(term) {
  let req = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
  req = await req.json();
  allRecepes = req.recipes;
  displayRecepes();
}

async function getOneRecipe(recipeId) {
  let req = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
  req = await req.json();
  theRecipe = req.recipe;
  displayOneRecipe();
}

searchBtn.addEventListener('click', function () {
  let regex = /(pizza|pasta|salad)/;
  let input = searchInput.value;
  input = input.toLowerCase();
  console.log(input);
  if (regex.test(input) == true) {
    getRecipe(input);
    alertMessage.classList.replace('d-block', 'd-none');
  } else {
    alertMessage.classList.replace('d-none', 'd-block');
  }

});

function displayOneRecipe() {
  let content = `<img src="${theRecipe.image_url}" class="w-100">
  <h5 class="text-left py-2">${theRecipe.publisher}</h5>
  <ul class="text-left font-weight-bolder">`;
  for (let i = 0; i < theRecipe.ingredients.length; i++) {
    content += `<i class='font-weight-bolder py-2'>${theRecipe.ingredients[i]}</i>`
  }
  content += `</ul>`;
  // ---------------------------------------------------------------
  myRecipe.innerHTML = content;
}

function displayRecepes() {
  let dis = ``;
  for (let i = 0; i < allRecepes.length; i++) {
    let myId = "'" + allRecepes[i].recipe_id + "'";
    dis += ` 
        <div class="recipe px-3 text-left col-lg-3 col-md-4 col-sm-6 col-8 m-auto" data-toggle="modal" data-target="#exampleModal" onclick="getOneRecipe(${myId})">
          <img  class="w-100" src="${allRecepes[i].image_url}">
          <h5 class="font-weight-bolder py-2 color-mine">${allRecepes[i].title}</h5>
          <p>${allRecepes[i].publisher}</p>
        </div>      
      `
  }
  recipes.innerHTML = dis;

}