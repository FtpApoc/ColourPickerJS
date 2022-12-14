//establishing form element in Script JS
const form = document.getElementById('RgbForm');

//Established to hold passable array data about RGB form inputs
let PassArray = [0,0,0]

function PassToJSON(){
  const RGBlist = [RgbFormR,RgbFormG,RgbFormB];

  for (let i = 0; i < RGBlist.length; i++){
    L = RGBlist[i] // L for letter for RGB purposes
    if ((L.value != "") && (parseInt(L.value) <= 255) && (parseInt(L.value) >= 0)){
      PassArray[i] = RGBlist[i].value;
      } else {
        PassArray[i] = 0
      }
      RgbDisplayBox.style.backgroundColor = `rgb(${PassArray[0]},${PassArray[1]},${PassArray[2]})`;
    }
};



//handling submit event
async function SubmitHandling(event){
  const url = "/ColourRes";
  try{
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
