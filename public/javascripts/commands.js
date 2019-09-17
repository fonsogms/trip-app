// SEARCH
setInterval(() => {
  setTimeout(() => {
    let command = document.getElementById("recognised").innerText;
    let str = command.split(" ");

    days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    cities = ["berlin", "london", "rome", "paris", "lisbon"];

    let day = false;
    for (let elOfDay of days) {
      day = str.includes(String(elOfDay));
      if (day) {
        console.log(elOfDay, day);
        break;
      }
    }

    let city = false;
    for (let elOfCities of cities) {
      city = str.includes(elOfCities);
      if (city) {
        console.log(elOfCities, city);
        break;
      }
    }

    console.log(str, city, day);

    if (day && city) {
      document.location.href = "/result";
    }
  }, 5000);
}, 1000);

// RESULT -> BACK TO SEARCH
setInterval(() => {
  setTimeout(() => {
    let command = document.getElementById("recognised").innerText;
    let str = command.split(" ");
    if (str.includes("destination") && str.includes("change")) {
      document.location.href = "/search";
    }
  }, 3000);
}, 1000);

// LOGOUT
setInterval(() => {
  setTimeout(() => {
    let command = document.getElementById("recognised").innerText;
    let str = command.split(" ");
    if (
      str.includes("logout") ||
      (str.includes("log") && str.includes("out"))
    ) {
      document.location.href = "/login";
    }
  }, 3000);
}, 1000);

// LOGIN
setInterval(() => {
  setTimeout(() => {
    let command = document.getElementById("recognised").innerText;
    let str = command.split(" ");
    if (
      (str.includes("login") && str.includes("facebook")) ||
      (str.includes("sign") && str.includes("up")) ||
      str.includes("login") ||
      (str.includes("log") && str.includes("in") && str.includes("google"))
    ) {
      document.location.href = "/search";
    }
  }, 3000);
}, 1000);
