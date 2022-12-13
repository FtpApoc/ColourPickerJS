const form = document.getElementById('RgbForm');

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

async function postFormDataAsJson(url){
  const PassArrayJson = JSON.stringify({
    "R":`${PassArray[0]}`,
    "G":`${PassArray[1]}`,
    "B":`${PassArray[2]}`
  });
  const FetchOptions = {method:"POST",headers:{
    "Content-Type":"application/json",
    "Accept":"application/json"
  },
    body: PassArrayJson
  };
  const response = await fetch(url, FetchOptions);
  return response.json();
}

async function SubmitHandling(event){
  event.preventDefault();
  const url = "/ColourRes"; // send to Results instead
  try{
    const responseData = await postFormDataAsJson(url)
  } catch (error) {
    console.log(error);
  }
  console.log(event);
  form.submit();
};


form.addEventListener("change", PassToJSON);
form.addEventListener("submit", SubmitHandling);
