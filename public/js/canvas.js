  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.onload = function() {

      ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
      let CanvasImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      console.log(CanvasImageData)

  };
  img.src = "assets/e.jpg";
