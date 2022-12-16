
//initilize passed EJS variables to script
PaintRgb = (document.getElementById('PaintRgb').value);
RefRgb = (document.getElementById('RefRgbData').value);

//splitting TGB strings into RGB arrays
PaintRgb = PaintRgb.split(',').map(Number);
RefRgb = RefRgb.split(',').map(Number);

//setting RGB Text for each Reference and Database colours
let RgbTextPaint = document.getElementById("RgbTextPaint");
RgbTextPaint.innerHTML = (`${PaintRgb[0]},${PaintRgb[1]},${PaintRgb[2]}`);

let RgbTextRef = document.getElementById("RgbTextRef");
RgbTextRef.innerHTML = (`${RefRgb[0]},${RefRgb[1]},${RefRgb[2]}`);



//assignment of swatch boxes to the appropriate colours for paint and reference.
PaintDisplayBox.style.backgroundColor = `rgb(${PaintRgb[0]},${PaintRgb[1]},${PaintRgb[2]})`;
ReferenceDisplayBox.style.backgroundColor = `rgb(${RefRgb[0]},${RefRgb[1]},${RefRgb[2]})`;
