PaintRgb = (document.getElementById('PaintRgb').value);
RefRgb = (document.getElementById('RefRgbData').value);

PaintRgb = PaintRgb.split(',').map(Number);
RefRgb = RefRgb.split(',').map(Number);

let RgbTextPaint = document.getElementById("RgbTextPaint");
RgbTextPaint.innerHTML = (`${PaintRgb[0]},${PaintRgb[1]},${PaintRgb[2]}`);

let RgbTextRef = document.getElementById("RgbTextRef");
RgbTextRef.innerHTML = (`${RefRgb[0]},${RefRgb[1]},${RefRgb[2]}`);




PaintDisplayBox.style.backgroundColor = `rgb(${PaintRgb[0]},${PaintRgb[1]},${PaintRgb[2]})`;
ReferenceDisplayBox.style.backgroundColor = `rgb(${RefRgb[0]},${RefRgb[1]},${RefRgb[2]})`;
