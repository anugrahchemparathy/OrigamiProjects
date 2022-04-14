function LOC(a,b,c){
    /*
    Computes the interior angle of a triangle between sides a,b and opposing side c
    */
    return Math.acos((a**2 + b**2 - c**2)/(2 * a * b));
}
function euclideanDistance(point1,point2){
    /*
    Computes the euclidean distance between two points represented as length 2 arrays
    */
    dx = point1[0] - point2[0];
    dy = point1[1] - point2[1];
    return (dx**2 + dy**2)**0.5;
}
function directionAngle(centerPoint){
    /*
    Given a center point in [[0,100],[0,100]], find the slope of the flat folding line generated from that point
    The square is scaled from [0,100] in the +x direction and [0,100] in the -y direction
    */
    const centerPoint_x = centerPoint[0];
    const centerPoint_y = centerPoint[1];
    
    const topEdge = euclideanDistance([0,0],centerPoint);
    const bottomEdge = euclideanDistance([0,100],centerPoint);
    const leftAngle = LOC(topEdge,bottomEdge,100);
    
    let opposingAngle = Math.PI - leftAngle;
    let topAngle = Math.atan((100-centerPoint_x)/centerPoint_y);
    console.log("opposing angle =", opposingAngle);
    console.log("top angle =", topAngle);
    console.log("left angle =", leftAngle);
    let slope = 1/Math.tan(topAngle+opposingAngle);

    if (topAngle + opposingAngle >= Math.PI){
        return [centerPoint_x + 100, centerPoint_y + slope * 100]
    }
    else {
        return [centerPoint_x + 100, centerPoint_y - slope * 100]
    }

}

