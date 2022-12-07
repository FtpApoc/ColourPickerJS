  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.onload = function() {

      ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
      let CanvasImageObject = ctx.getImageData(0,0,canvas.width,canvas.height);

      const CanvasImageData = Object.values(CanvasImageObject)[0]
      console.log(CanvasImageData[0])
  };
  img.src = "assets/e.jpg";
