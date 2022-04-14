class Point {
    constructor(x,y){
        this.X = x;
        this.Y = y;
    }
    copy(){
        return new Point(this.X,this.Y);
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
        this.numVertices = points.length; 
        this.color = color;
    }
    copy() {
        const copiedPoints = this.points.map(point => point.copy());
        return new Polygon(copiedPoints, this.color);
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.points[this.numVertices-1].X,this.points[this.numVertices-1].Y);
        for (const point of this.points){
            ctx.lineTo(point.X,point.Y);
        }
        ctx.fill();
    }
}

