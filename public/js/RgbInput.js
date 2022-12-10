const form = document.getElementById('RgbForm');

console.log("RgbInput.js Connected")

function RgbBoxUpdate(){
  console.log("form has changed");
  };

console.log(form);

function Test(){
  const RGBlist = [RgbFormR,RgbFormG,RgbFormB];
  let FormEntry = false;

  for (let i = 0; i < RGBlist.length; i++){
    L = RGBlist[i] // L for letter for RGB purposes
    if ((L.value === "")){ //&& (parseInt(L.value) < 255)){
      FormEntry = true;

    }
  }

  if (FormEntry === true){
    console.log("test")
  }

  let BoxR = 0
  let BoxG = 0
  let BoxB = 0
};


form.addEventListener("change", Test);
