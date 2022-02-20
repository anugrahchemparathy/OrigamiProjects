const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth,window.innerHeight);
canvas.height = canvas.width;

window.addEventListener('resize', function () {
    canvas.width = Math.min(window.innerWidth,window.innerHeight);
    canvas.height = canvas.width;
});

let mouse = {x: undefined, y: undefined};
let left_boundary = canvas.width * 0.1
let edge_length = canvas.width * 0.4

canvas.addEventListener("mousemove", function(e) { 
    let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height

    let temp_x = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas 
    let temp_y = Math.round(e.clientY - cRect.top); // from the X/Y positions to make 
    if (temp_x < 100+10) temp_x = 110;
    else if (temp_x > 600-10) temp_x = 590;

    if (temp_y < 100+10) temp_y = 110;
    else if (temp_y > 600-10) temp_y = 590;

    mouse.x = temp_x;
    mouse.y = temp_y; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
    ctx.fillText("X: "+mouse.x+", Y: "+mouse.y, 10, 20);
    console.log("X: "+e.clientX+", Y: "+e.clientY);
});


class mouseLine {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw () {
        ctx.strokeStyle = 'black';
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

    const line1 = new mouseLine(100, 100);
    const line2 = new mouseLine(600, 100);
    const line3 = new mouseLine(100, 600);

    folds = [line1,line2,line3];

    
    ctx.strokeStyle = 'black';
    ctx.strokeRect(100, 100, 500, 500);
    for (const line of folds){
        line.draw();
    }

    let polygon1Points = [[100,100],[600,100],[mouse.x,mouse.y]];
    let polygon2Points = [[100,100],[100,600],[mouse.x,mouse.y]]

    const polygon1 = new Polygon(polygon1Points);
    const polygon2 = new Polygon(polygon2Points,'white');
    polygon1.draw();
    polygon2.draw();

};
animate();
