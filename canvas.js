const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth; //Math.min(window.innerWidth,window.innerHeight);
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = Math.min(window.innerWidth,window.innerHeight);
    canvas.height = canvas.width;
});

let mouse = {X: 150, Y: 150};
let leftPadding = canvas.width * 0.05;
let topPadding = canvas.width * 0.05;
let edgeLength = canvas.width * 0.4;
let interior_padding = edgeLength * 0.02;


/*
================================================================================
Canvas Animation
================================================================================
*/

function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeRect(leftPadding, topPadding, edgeLength, edgeLength);
    
    const mousePoint = new Point(mouse.X, mouse.Y);
    const topLeft = new Point(leftPadding, topPadding);
    const topRight = new Point(leftPadding + edgeLength, topPadding);
    const bottomLeft = new Point(leftPadding, topPadding + edgeLength);


    const line1 = new Line(mousePoint, topLeft);
    const line2 = new Line(mousePoint, topRight);
    const line3 = new Line(mousePoint, bottomLeft);
    const folds = [line1,line2,line3];

    let polygon1 = new Polygon([topLeft,topRight, mousePoint]);
    let polygon2 = new Polygon([topLeft, bottomLeft, mousePoint], 'white');
    
    const foldedShape = [];

    foldLine = generateLine(mousePoint, topLeft);
    let folded = fold(polygon1,foldLine[0],foldLine[1]);
    foldLine = generateLine(mousePoint, bottomLeft);
    foldedShape.push(fold(folded,foldLine[0],foldLine[1]));
    foldedShape.push(fold(polygon2,foldLine[0],foldLine[1]));


    //Begin flat folding computations
    const mouseCentered = new Point((mouse.X - leftPadding)*100/edgeLength, (mouse.Y - topPadding)*100/edgeLength);
    const flatFoldEnd = directionAngle(mouseCentered, leftPadding, topPadding, edgeLength);
    const flatFoldLine = new Line(mousePoint, flatFoldEnd);
    //new mouseLine(leftPadding + flatFoldSlope.X*edgeLength/100, topPadding + flatFoldSlope.Y*edgeLength/100);
    folds.push(flatFoldLine);


    for (const fold of folds){
        fold.draw();
    }
    // for (const polygon of foldedShape){
    //     polygon.draw();
    // }

};

/*
================================================================================
Mousedown tools
================================================================================
*/


function getCursorPosition (canvas, event) {
    const cRect = canvas. getBoundingClientRect();

    let tempX = Math.round(event.clientX - cRect.left); // Subtract the 'left' of the canvas 
    let tempY = Math.round(event.clientY - cRect.top); // from the X/Y positions to make 
    
    if (tempX < leftPadding+interior_padding) return;
    else if (tempX > leftPadding+edgeLength-interior_padding) return;

    if (tempY < topPadding+interior_padding) return;
    else if (tempY > topPadding+edgeLength-interior_padding) return;

    mouse.X = tempX;
    mouse.Y = tempY; 
    //console.log("X: "+event.clientX+", Y: "+event.clientY);
}

// canvas.addEventListener('mousedown', function(e) {
//     getCursorPosition(canvas, e);
//     animate();
// })

canvas.addEventListener("mousemove", function(e) { 
    getCursorPosition(canvas, e);
    animate();
});

animate();