let CanvasImageData = []

function HoldData(data){
  console.log(data)
}

function ClickUpdate(ClickInfo,ClientWidth){
  PixelX = ClickInfo.offsetX
  PixelY = ClickInfo.offsetY
  console.log(ClickInfo,ClientWidth)
}

function Canvas(){
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function() {

      ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
      let CanvasImageObject = ctx.getImageData(0,0,canvas.width,canvas.height);

      CanvasImageData = Object.values(CanvasImageObject)[0]
      HoldData(CanvasImageData)

      //Click handler allows the passing of click object and canvas data to ClickUpdate
      const ClickHandler = (event) => ClickUpdate(event,canvas.clientWidth)

      const ClickEvent = ['click','contextmenu','dblclick']
      for (let i = 0; i < ClickEvent.length; i++){
        canvas.addEventListener(ClickEvent[i],ClickHandler)
      }

  };
  img.src = "assets/e.jpg";
}


Canvas();
