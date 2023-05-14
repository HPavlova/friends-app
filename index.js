const cardsContainer = document.querySelector(".cards");
const filterNameInput = document.getElementById("filter-name");
const filterMinAgeInput = document.getElementById("filter-min-age");
const filterMaxAgeInput = document.getElementById("filter-max-age");
const sort = document.getElementById("sort");
const search = document.getElementById("search");

async function loadCards() {
  cardsContainer.innerHTML = "";

  const response = await fetch("https://randomuser.me/api/?results=50");
  const data = await response.json();

  const filteredData = data.results.filter((user) => {
    if (
      filterNameInput.value &&
      !user.name.first
        .toLowerCase()
        .includes(filterNameInput.value.toLowerCase()) &&
      !user.name.last
        .toLowerCase()
        .includes(filterNameInput.value.toLowerCase())
    ) {
      return false;
    }

    if (filterMinAgeInput.value && user.dob.age < filterMinAgeInput.value) {
      return false;
    }

    if (filterMaxAgeInput.value && user.dob.age > filterMaxAgeInput.value) {
      return false;
    }
    return true;
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sort.value === "name") {
      return a.name.first.localeCompare(b.name.first);
    } else if (sort.value === "age") {
      return a.dob.age - b.dob.age;
    } else {
      return 0;
    }
  });

  sortedData.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = user.picture.medium;
    image.alt = `${user.name.first} ${user.name.last}`;
    card.appendChild(image);

    const name = document.createElement("h3");
    name.innerText = `${user.name.first} ${user.name.last}`;
    card.appendChild(name);

    const email = document.createElement("p");
    email.innerText = user.email;
    card.appendChild(email);

    const age = document.createElement("p");
    age.innerText = `Age: ${user.dob.filterMaxAgeInput}`;
    card.appendChild(age);

    cardsContainer.appendChild(card);
  });
}

loadCards();
