// SEARCH

const searchInterval = setInterval(() => {
  let day = "";
  let city = "";

  // const searchTime = setTimeout(() => {
  let command = document.getElementById("recognised").innerText;
  let str = command.split(" ");

  days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "weekend", "week-end"];
  // cities = ["berlin", "london", "rome", "paris", "lisbon", "vienna", "venice"];
  cities = [];
  axios
    .get(
      "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
    )
    .then(response => {
      for (const city of response.data) {
        cities.push(city.name);
      }
      // console.log(cities);
      // let day = "";
      for (let elOfDay of days) {
        if (str.includes(String(elOfDay))) {
          day = String(elOfDay);
          break;
        }
      }

      // let city = "";
      for (let elOfCities of cities) {
        // city = str.includes(elOfCities);
        if (str.includes(elOfCities)) {
          city = elOfCities;
          // console.log(elOfCities, city);
          break;
        }
      }

      // console.log(str, city, day);

      if (day.length && city.length) {
        console.log("DAY :", day);
        console.log("CITY :", city);
        if (day === "weekend") {
          let day = 2;
          document.location.href = `/result?city=${city}&days=${day}`;
        } else {
          document.location.href = `/result?city=${city}&days=${day}`;
        }
        // clearTimeout(searchTime);
      }
      // }, 5000);
      if (day.length && city.length) {
        clearInterval(searchInterval);
      }
    })
    .catch(err => {
      console.log(err);
    });
}, 50);
// const stopInterval = setInterval(searchInterval, 250);

// RESULT -> BACK TO SEARCH
setInterval(() => {
  // setTimeout(() => {
  let command = document.getElementById("recognised").innerText;
  let str = command.split(" ");
  if (
    (str.includes("destination") ||
      str.includes("plan") ||
      str.includes("city")) &&
    str.includes("change")
  ) {
    document.location.href = "/search";
  }
  // }, 3000);
}, 1000);

// LOGOUT
setInterval(() => {
  // setTimeout(() => {
  let command = document.getElementById("recognised").innerText;
  let str = command.split(" ");
  if (str.includes("logout") || (str.includes("log") && str.includes("out"))) {
    document.location.href = "/";
  }
  // console.log(str);
  // }, 3000);
}, 1000);

// LOGIN
setInterval(() => {
  // setTimeout(() => {
  let command = document.getElementById("recognised").innerText;
  let str = command.split(" ");
  if ((str.includes("log") && str.includes("in")) || str.includes("login")) {
    document.querySelector(".log-in").click();
  }
  if (
    (str.includes("login") || (str.includes("log") && str.includes("in"))) &&
    str.includes("facebook")
  ) {
    document.querySelector(".log-fb").click();
  }
  if ((str.includes("sign") && str.includes("up")) || str.includes("signup")) {
    document.querySelector(".sign-up").click();
  }
  // console.log(str);
  // }, 3000);
}, 1000);
