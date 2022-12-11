const form = document.getElementById('RgbForm');

console.log("RgbInput.js Connected")

function RgbBoxUpdate(){
  console.log("form has changed");
  };

console.log(form);
let PassArray = [0,0,0]

function PassToBox(){
  const RGBlist = [RgbFormR,RgbFormG,RgbFormB];
  let FormEntry = false;

  for (let i = 0; i < RGBlist.length; i++){
    L = RGBlist[i] // L for letter for RGB purposes
    if ((L.value != "") && (parseInt(L.value) < 255)){
      PassArray[i] = RGBlist[i].value;
      }
      RgbDisplayBox.style.backgroundColor = `rgb(${PassArray[0]},${PassArray[1]},${PassArray[2]})`;
    }
};

form.addEventListener("change", PassToBox);
