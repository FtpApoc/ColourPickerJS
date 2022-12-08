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

  PixelConversion(PerCanvasX,PerCanvasY,CanvasWidth)
}
function PixelConversion(X,Y,Width){
  PixelLocation = Y * Width + X
  PixelNumGet(PixelLocation)
}

//Holds array Data
function PixelNumGet(PixelLocation){
  PixelNum = PixelLocation * 4
  PixelR = CanvasImageData[PixelNum]
  PixelG = CanvasImageData[PixelNum+1]
  PixelB = CanvasImageData[PixelNum+2]
  PixelA = CanvasImageData[PixelNum+3]
  console.log(PixelNum,PixelR,PixelG,PixelB,PixelA)
}
function rgbcanvas() {
  const RGBcanvas = document.getElementById('RGBcanvas');
  const ctx2 = RGBcanvas.getContext('2d');
  ctx2.beginPath();
  ctx2.rect(20, 20, 150, 100);
  ctx2.fillStyle = "red";
  ctx2.fill();
}


Canvas();
rgbcanvas();
