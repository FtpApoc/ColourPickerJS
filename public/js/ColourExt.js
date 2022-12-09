//Initalization Of Canvas Data for handling later
let CanvasImageData = []

//Initalization and loading of canvas
function Canvas(){
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function() {

      //draw image to canvas size
      ctx.drawImage(img, 0, 0,canvas.width,canvas.height);//,canvas.width, canvas.height);
      let CanvasImageObject = ctx.getImageData(0,0,canvas.width,canvas.height+1);
      console.log(canvas.width,canvas.height)

      //setting CanvasImageData to the Array in GetImageData Object
      CanvasImageData = Object.values(CanvasImageObject)[0]
      console.log(CanvasImageData.length)

      //Click handler allows the passing of click object and canvas data to ClickUpdate
      const ClickHandler = (event) => PixelAdjust(
        event,
        canvas.clientWidth,
        canvas.clientHeight,
        canvas.width,
        canvas.height,
      )

      //click event, with a for loop to instance
      const ClickEvent = ['click','contextmenu','dblclick']
      for (let i = 0; i < ClickEvent.length; i++){
        canvas.addEventListener(ClickEvent[i],ClickHandler)
      }

  };
  img.src = "assets/e.jpg";
}
//Combining All Elements needed to generate Pixel Location
function PixelAdjust(
  ClickInfo, //CLick Event Object
  ClientWidth, //canvas.clientWidth
  ClientHeight, //canvas.clientHeight
  CanvasWidth, //canvas.width
  CanvasHeight //cavnas.height
  ){
  ClientX = ClickInfo.offsetX // Pixel clicked X co-ord in client scope
  ClientY = ClickInfo.offsetY // Pixel Clicked Y co-ord in client scope

  PercentX = (ClientX / ClientWidth)  //percentage X position in client scope
  PercentY = (ClientY / ClientHeight) //percentage Y position in client scope

  PerCanvasX = Math.round(PercentX * CanvasWidth) //percentage X position applied to canvas
  PerCanvasY = Math.round(PercentY * CanvasHeight) //percentage Y position applied to canvas

  //call to assignment function with previously defined values
  PixelAssignment(PerCanvasX,PerCanvasY,CanvasWidth)
}
//function used to calculate, and display RGB value data
function PixelAssignment(X,Y,Width){
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
  let RgbBox = document.getElementById("rectangle");
  RgbBox.innerHTML = (`${r},${g},${b}`);
  RgbBox.style.backgroundColor = `rgb(${r},${g},${b})`;
  if ((r + g + b) < 350){
    RgbBox.style.color = "#FFFFFF";
  } else {
    RgbBox.style.color = "#000000";
  }
}


Canvas();
