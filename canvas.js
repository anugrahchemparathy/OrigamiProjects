/*
https://medium.com/@bretcameron/create-interactive-visuals-with-javascript-and-html5-canvas-5f466d0b26de
*/

const cvs = document.querySelector('canvas');
const c = cvs.getContext('2d');

cvs.width = Math.min(window.innerWidth,window.innerHeight);
cvs.height = cvs.width;


window.addEventListener('resize', function () {
    cvs.width = Math.min(window.innerWidth,window.innerHeight);
    cvs.height = cvs.width;
});

let mouse = {
    x: undefined,
    y: undefined
};


//https://riptutorial.com/html5-canvas/example/11659/detecting-mouse-position-on-the-canvas
cvs.addEventListener("mousemove", function(e) { 
    let cRect = cvs.getBoundingClientRect();        // Gets CSS pos, and width/height
    mouse.x = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    mouse.y = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
    c.clearRect(0, 0, cvs.width, cvs.height);  // (0,0) the top left of the canvas
    c.fillText("X: "+mouse.x+", Y: "+mouse.y, 10, 20);
    console.log("X: "+e.clientX+", Y: "+e.clientY);
    //console.log(e.clientX - cRect.left);
});


class Line {
    constructor(x, y, offset) {
        this.x = x;
        this.y = y;
        this.offset = offset;
        this.radians = 0;
        this.velocity = 0.01;
    }
    draw = () => {
        c.strokeStyle = 'black';
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(mouse.x, mouse.y);
        c.stroke();
        c.closePath();
        this.update();
    }
    update = () => {
    }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const line1 = new Line(100, 100, 0);
    const line2 = new Line(600, 100, 0);
    const line3 = new Line(100, 600, 0);

    folds = [line1,line2,line3];

    
    c.strokeStyle = 'black';
    c.strokeRect(100, 100, 500, 500);
    for (const line of folds){
        line.draw();
    }

};
animate();
