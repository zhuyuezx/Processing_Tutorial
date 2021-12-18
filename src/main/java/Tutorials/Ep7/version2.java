package Tutorials.Ep7;

import processing.core.PApplet;

public class version2 extends PApplet {

    float x, y;
    float dia = (float) (1000 / 0.93);
    float sw = 5;
    NervousSquare nervousSquare;

    public void settings() {
        size(1000, 1000);
        x = (float) width / 2;
        y = (float) height / 2;
        nervousSquare = new NervousSquare(x, y, 0, dia, sw, this);
    }

    public void draw() {
        fill(40, 40, 40);
        stroke(255);
        rectMode(CENTER);
        strokeWeight(sw);

        background(238, 238, 238);
        nervousSquare.display();
        nervousSquare.update(width, height, 700);
    }


    public static void main(String[] args) {
        PApplet.main("Tutorials.Ep7.version2");
    }
}