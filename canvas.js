// import {directionAngle} from './tools.js';


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth; //Math.min(window.innerWidth,window.innerHeight);
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = Math.min(window.innerWidth,window.innerHeight);
    canvas.height = canvas.width;
});

let mouse = {x: 150, y: 150};
let left_padding = canvas.width * 0.05;
let top_padding = canvas.width * 0.05;
let edge_length = canvas.width * 0.4;
let interior_padding = edge_length * 0.02;


function getCursorPosition (canvas, event) {
    const cRect = canvas. getBoundingClientRect();

    let temp_x = Math.round(event.clientX - cRect.left); // Subtract the 'left' of the canvas 
    let temp_y = Math.round(event.clientY - cRect.top); // from the X/Y positions to make 
    
    if (temp_x < left_padding+interior_padding) return;
    else if (temp_x > left_padding+edge_length-interior_padding) return;

    if (temp_y < top_padding+interior_padding) return;
    else if (temp_y > top_padding+edge_length-interior_padding) return;

    mouse.x = temp_x;
    mouse.y = temp_y; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
    console.log("X: "+event.clientX+", Y: "+event.clientY);
}

/*
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
})
*/
// /*
canvas.addEventListener("mousemove", function(e) { 
    getCursorPosition(canvas, e);
});
// */


class mouseLine {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw () {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
}
class Polygon {
    constructor (points,color = 'black'){
        this.points = points;
        this.vertices = points.length; 
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.points[this.vertices-1][0],this.points[this.vertices-1][1]);
        for (const point of this.points){
            ctx.lineTo(point[0],point[1]);
        }
        ctx.fill();
    }

}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const line1 = new mouseLine(left_padding, top);
    const line2 = new mouseLine(left_padding + edge_length, top_padding);
    const line3 = new mouseLine(left_padding, top_padding+edge_length);

    folds = [line1,line2,line3];

    
    ctx.strokeStyle = 'black';
    ctx.strokeRect(left_padding, top_padding, edge_length, edge_length);
    for (const line of folds){
        line.draw();
    }

    let polygon1Points = [[left_padding,top_padding],[left_padding+edge_length,top_padding],[mouse.x,mouse.y]];
    let polygon2Points = [[left_padding,top_padding],[left_padding,top_padding+edge_length],[mouse.x,mouse.y]]

    const polygon1 = new Polygon(polygon1Points);
    const polygon2 = new Polygon(polygon2Points,'white');
    polygon1.draw();
    polygon2.draw();

    let mouse_point = [(mouse.x - left_padding)*100/edge_length, (mouse.y - top_padding)*100/edge_length];
    let new_point = directionAngle(mouse_point);
    const foldLine = new mouseLine(left_padding + new_point[0]*edge_length/100,top_padding + new_point[1]*edge_length/100);
    foldLine.draw()

};
animate();
