//establishing form element in Script JS
const form = document.getElementById('RgbForm');

//Established to hold passable array data about RGB form inputs
let PassArray = [0,0,0]

function PassToJSON(){
  //creation of RGB array
  const RGBlist = [RgbFormR,RgbFormG,RgbFormB];

  for (let i = 0; i < RGBlist.length; i++){
    L = RGBlist[i] // L for letter for RGB purposes
    if ((L.value != "") && (parseInt(L.value) <= 255) && (parseInt(L.value) >= 0)){ // validation of data inputs, coupled with front end type-setting
      PassArray[i] = RGBlist[i].value; //assinging form data into manipulable and vetted array
      } else {
        PassArray[i] = 0 //always establishing 0s for incorrect data, if it somehow passed through front end
      }
      RgbDisplayBox.style.backgroundColor = `rgb(${PassArray[0]},${PassArray[1]},${PassArray[2]})`; //assignment of RGB swatch box to live update for accepted data
    }
};



//handling submit event
async function SubmitHandling(event){
  //sending through colour result routing
  const url = "/ColourRes";
  try{
    //async function to complete Data querying
    const responseData = await postFormDataAsJson(url)
  } catch (error) {
    console.log(error);
  }
};

//turns RGB inputs into JSON data
async function postFormDataAsJson(url){
  const PassArrayJson = JSON.stringify({
    //using the PassToJSON array
    "R":`${PassArray[0]}`,
    "G":`${PassArray[1]}`,
    "B":`${PassArray[2]}`
  });
  const FetchOptions = {method:"POST",headers:{
    "Content-Type":"application/json",
    "Accept":"application/json"
  },
    //JSONified Array
    body: PassArrayJson
  };
  const response = await fetch(url, FetchOptions);
  return response.json();
}

//Event listeners for changes to the form, and submittion of the form
form.addEventListener("change", PassToJSON);
form.addEventListener("submit", SubmitHandling);
