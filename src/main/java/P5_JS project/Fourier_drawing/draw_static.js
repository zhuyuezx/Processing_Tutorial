function drawVectorsStatic() {
    var lastPoint = createVector(windowWidth / rate / 2, windowHeight / rate / 2);
    //var lastPoint = createVector(0, 0);
    
    for (var n = 1; n < numVectors; n++) {
        fill(255);
        strokeWeight(2);
        stroke(255);
        drawArrowStatic(lastPoint.x * rate, lastPoint.y * rate,
            (lastPoint.x + vectors[n].x) * rate,
            (lastPoint.y + vectors[n].y) * rate);
        var r = 2 * sqrt(vectors[n].x * vectors[n].x * rate * rate +
            vectors[n].y * vectors[n].y * rate * rate);
        //print("r: " + r);
        noFill();
        strokeWeight(1);
        stroke(135, 206, 235, 150);
        ellipse(lastPoint.x * rate, lastPoint.y * rate, r, r);

        lastPoint.add(vectors[n]);

        fill(255);
        strokeWeight(2);
        stroke(255);
        drawArrowStatic(lastPoint.x * rate, lastPoint.y * rate,
            (lastPoint.x + nVectors[n].x) * rate,
            (lastPoint.y + nVectors[n].y) * rate);

        noFill();
        strokeWeight(1);
        stroke(135, 206, 235, 150);
        r = 2 * sqrt(nVectors[n].x * nVectors[n].x * rate * rate +
            nVectors[n].y * nVectors[n].y * rate * rate);
        ellipse(lastPoint.x * rate, lastPoint.y * rate, r, r);

        lastPoint.add(nVectors[n]);
    }
    pen.set(lastPoint);
}

function drawPathStatic() {
    if (lastRate != rate) {
        route = [];
        lastRate = rate;
    }
    if (route.length > TWO_PI / rotateSpeed + 1) {
        route.shift();
    }
    route.push(p5.Vector.mult(this.pen, rate));
    stroke(255, 255, 0);
    strokeWeight(swSlider.value());
    beginShape();
    route.forEach(function (v) {
        vertex(v.x, v.y);
    });
    endShape();
}

/**
 * 
 * @param {float} xStart 
 * @param {float} yStart 
 * @param {float} xEnd 
 * @param {float} yEnd 
 */
 function drawArrowStatic(xStart, yStart, xEnd, yEnd) {
    var len = dist(xStart, yStart, xEnd, yEnd);
    var sw = len / 50;
    sw = max(sw, 1);
    strokeWeight(sw);
    line(xStart, yStart, xEnd, yEnd);
    var angle = atan2(yEnd - yStart, xEnd - xStart);
    var complementAngle = HALF_PI - angle;
    beginShape();
    vertex(xEnd + 2 * sw * cos(angle), yEnd + 2 * sw * sin(angle));
    var newX = xEnd - 2 * sw * cos(angle);
    var newY = yEnd - 2 * sw * sin(angle);
    vertex(newX - 2 * sw * cos(complementAngle), newY + 2 * sw * sin(complementAngle));
    vertex(newX + 2 * sw * sin(angle), newY - 2 * sw * cos(angle));
    vertex(xEnd + 2 * sw * cos(angle), yEnd + 2 * sw * sin(angle));
    endShape();
  }