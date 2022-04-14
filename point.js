class Point {
    constructor(x,y){
        this.X = x;
        this.Y = y;
    }
    toString(){
        return "Point(" + this.X + "," + this.Y + ")";
    }
}

class mouseLine {
    constructor(startX, startY, color = 'black') {
        this.startX = startX;
        this.startY = startY;
        this.color = color;
    }
    draw () {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(mouse.X, mouse.Y);
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
        ctx.moveTo(this.points[this.vertices-1].X,this.points[this.vertices-1].Y);
        for (const point of this.points){
            ctx.lineTo(point.X,point.Y);
        }
        ctx.fill();
    }
}

