// import Artyom from "../node_modules/artyom.js/build/artyom";

const artyom = new Artyom();
const recognised = document.getElementById("recognised");

// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
function startContinuousArtyom() {
  artyom.fatality();
  setTimeout(function() {
    artyom
      .initialize({
        lang: "en-US",
        continuous: true, // Artyom will listen forever
        listen: true, // Start recognizing
        debug: true, // Show everything in the console
        speed: 1 // talk normally
      })
      .then(function() {
        console.log("Ready to work!");
      })
      .catch(err => console.log(err));
    artyom.redirectRecognizedTextOutput(function(text, isFinal) {
      recognised.innerText = text;
      // console.log(text);
    });
  }, 250);
}

const thingsToSay = {
  "where am i": "Camp JS",
  "what day is it": "Sunday",
  "who am i": "you tell me"
};

artyom.on("*", true).then((i, wildcard) => {
  recognised.innerText = wildcard;
  var commands = Object.keys(thingsToSay);
  for (let cmd of commands) {
    if (wildcard.toLowerCase().indexOf(cmd) > -1) {
      artyom.say(thingsToSay[wildcard]);
    }
  }
});

startContinuousArtyom();
