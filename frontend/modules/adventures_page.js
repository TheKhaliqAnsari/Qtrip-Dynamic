import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=").pop();
  // console.log(search.split("=").pop())
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // let city_name = getCityFromURL(city);
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures?city=` + getCityFromURL(city)
    );
    let data = response.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.map((element) => {
    // console.log(element)
    // console.log(element.id + " " + element.name + " " + element.costPerHead + " " + element.currency + " " + element.image);

    // Test code Start Here

    const cardEle = document.createElement("div");
    cardEle.classList.add("col-6", "col-md-4", "col-lg-3", "mb-4");
    const card = `<div class="card tile" style="width: 18rem;">
    <a href="detail/?adventure=${element.id}" id=${element.id}>
    <img class="card-img-top activity-card-image" style="height: 200px; width: 300px" src="${element.image}" alt="Card image cap">
    <div class="category-banner">${element.category}</div>
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <p>${element.name}</p>
        <p> &#8377; ${element.costPerHead}</p>
      </div>
      <div class="d-flex justify-content-between">
        <p>Duration</p>
        <p>${element.duration} Hour</p>
      </div>
     </div></a>
    </div>`;
    cardEle.innerHTML = card;
    data.appendChild(cardEle);

    // Test code Ends here
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  const filteredByDuration = list.filter((item) => {
    return item.duration >= low && item.duration <= high;
  });
  console.log(filterByDuration);
  return filteredByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  list.filter(function (e) {
    if (categoryList.includes(e.category)) filteredList.push(e);
  });

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs

  let filteredlist = [];
  let arr = filters["duration"].split("-");

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters["category"].length > 0 && filters["duration"].length > 0) {
    filteredlist = filterByCategory(list, filters.category);
    filteredlist = filterByDuration(
      filteredlist,
      parseInt(arr[0]),
      parseInt(arr[1])
    );
  } else if (filters["category"].length > 0) {
    filteredlist = filterByCategory(list, filters.category);
  } else if (filters["duration"].length > 0) {
    filteredlist = filterByDuration(list, parseInt(arr[0]), parseInt(arr[1]));
  } else {
    return list;
  }
  // Place holder for functionality to work in the Stubs
  return filteredlist;
}e

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  const filters = JSON.parse(localStorage.getItem("filters"));
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  let categoryList=filters["category"];
   let li=[];
  for(let i=0;i<categoryList.length;i++)
  {
   // console.log(categoryList[i]);
    li.push(categoryList[i]);
  }
  for(let i=0;i<li.length;i++)
  {
    var div=document.createElement("div");
    div.setAttribute("class","category-filter");
    div.innerText=li[i];
    document.getElementById("category-list").append(div);
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
