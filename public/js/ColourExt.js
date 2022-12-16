//Initalization and loading of canvas
function Canvas(){
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function() {
      //draw image to canvas size
      ctx.drawImage(img, 0, 0,canvas.width,canvas.height);//,canvas.width, canvas.height);
      let CanvasImageObject = ctx.getImageData(0,0,canvas.width,canvas.height+1);

      //setting CanvasImageData to the Array in GetImageData Object
      let CanvasImageData = CanvasImageObject["data"];

      //Click handler allows the passing of click object and canvas data to ClickUpdate
      const ClickHandler = (event) => PixelAdjust(
        event,
        canvas.clientWidth, //width of image in same scope as offset
        canvas.clientHeight, //height of image in same scope as offset
        canvas.width, // static canvas width : 300
        canvas.height, // static canvas height : 150
        CanvasImageData // GetImageData array for canvas
      )

      //click event, with a for loop to instance
      const ClickEvent = ['click','contextmenu','dblclick']
      for (let i = 0; i < ClickEvent.length; i++){
        canvas.addEventListener(ClickEvent[i],ClickHandler)
      }

  };

  // the button to change the photo in frame
  const SubmitPhoto = document.getElementById("SubmitPhoto");

  //function called from event listener
  function PhotoHandler(event){
    let  UploadedImage = "";
    //set up file reader to interpret user input file
    const reader = new FileReader();
    reader.readAsDataURL(SubmitPhoto.files[0])
    reader.addEventListener("load", () => {
      UploadedImage = reader.result;
      //re-draws the canvas with new image
      img.src = UploadedImage
    })

  }
  //event listener calls to photo handler on change to button
  SubmitPhoto.addEventListener("change",PhotoHandler)
  //original testing image, in rollout would be blank
  img.src = '/assets/TestImg.jpg';
}
//Combining All Elements needed to generate Pixel Location
function PixelAdjust(
  ClickInfo, //CLick Event Object
  ClientWidth, //canvas.clientWidth
  ClientHeight, //canvas.clientHeight
  CanvasWidth, //canvas.width
  CanvasHeight, //cavnas.height
  CanvasImageData
  ){
  ClientX = ClickInfo.offsetX // Pixel clicked X co-ord in client scope
  ClientY = ClickInfo.offsetY // Pixel Clicked Y co-ord in client scope

  PercentX = (ClientX / ClientWidth)  //percentage X position in client scope
  PercentY = (ClientY / ClientHeight) //percentage Y position in client scope

  PerCanvasX = Math.round(PercentX * CanvasWidth) //percentage X position applied to canvas
  PerCanvasY = Math.round(PercentY * CanvasHeight) //percentage Y position applied to canvas

  //call to assignment function with previously defined values
  PixelAssignment(PerCanvasX,PerCanvasY,CanvasWidth,CanvasImageData)
}
//function used to calculate, and display RGB value data
function PixelAssignment(X,Y,Width,CanvasImageData){
  PixelLocation = Y * Width + X
  PixelNum = PixelLocation * 4
  PixelR = CanvasImageData[PixelNum]
  PixelG = CanvasImageData[PixelNum+1]
  PixelB = CanvasImageData[PixelNum+2]
  PixelA = CanvasImageData[PixelNum+3]

  //Fetch API request to send RGB data to server


  //applying given values to the RGB box
  RgbBox(PixelR,PixelG,PixelB)
}
function RgbBox(r,g,b){
  let RgbBox = document.getElementById("RgbRect");
  RgbBox.innerHTML = (`${r},${g},${b}`);
  RgbBox.style.backgroundColor = `rgb(${r},${g},${b})`;
  if ((r + g + b) < 350){
    RgbBox.style.color = "#FFFFFF";
  } else {
    RgbBox.style.color = "#000000";
  }
}

//handling submit event
async function ResultsHandling(event){
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
    "R":`${PixelR}`,
    "G":`${PixelG}`,
    "B":`${PixelB}`
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

};

//Event listeners for changes to the form, and submittion of the form
GetRes = document.getElementById("GetResultsBtn")
GetRes.addEventListener("click",ResultsHandling)


Canvas();
