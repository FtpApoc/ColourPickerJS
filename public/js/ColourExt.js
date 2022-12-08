//Initalization Of Canvas Data for handling later
let CanvasImageData = []

//Holds array Data
function PixelNumGet(PixelLocation){
  PixelNum = PixelLocation * 4
  PixelR = CanvasImageData[PixelNum]
  PixelG = CanvasImageData[PixelNum+1]
  PixelB = CanvasImageData[PixelNum+2]
  PixelA = CanvasImageData[PixelNum+3]
  console.log(CanvasImageData,PixelNum,PixelR,PixelG,PixelB,PixelA)
}

//Combining All Elements needed to generate Pixel Location
function PixelLocate(ClickInfo,ClientWidth){ //Params(pixel clicked object, Pixel Width of canvas img)
  PixelX = ClickInfo.offsetX // Pixel clicked X co-ord
  PixelY = ClickInfo.offsetY // Pixel Clicked Y co-ord
  PixelLocation = (PixelY * ClientWidth) + PixelX
  PixelNumGet(PixelLocation)
}

//Initalization and loading of canvas
function Canvas(){
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function() {

      //draw image to canvas size
      ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
      let CanvasImageObject = ctx.getImageData(0,0,canvas.clientWidth,canvas.clientHeight);

      //
      CanvasImageData = Object.values(CanvasImageObject)[0]
      console.log(CanvasImageData.length)

      //Click handler allows the passing of click object and canvas data to ClickUpdate
      const ClickHandler = (event) => PixelLocate(event,canvas.clientWidth)

      const ClickEvent = ['click','contextmenu','dblclick']
      for (let i = 0; i < ClickEvent.length; i++){
        canvas.addEventListener(ClickEvent[i],ClickHandler)
      }

  };
  img.src = "assets/e.jpg";
}


Canvas();
