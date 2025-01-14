package Tutorials.Ep7;

import processing.core.PApplet;

public class NervousSquare {

    float x, y;
    int layer;
    private final NervousSquare inner;
    float dia;
    float sw;
    version2 operator;

    public NervousSquare(float x, float y, int layer, float dia, float sw, version2 operator) {
        this.operator = operator;
        this.x = x;
        this.y = y;
        this.layer = layer + 1;
        this.dia = (float) (dia * 0.92);
        this.sw = (float) (sw * 0.92);
        if (layer < 50) {
            this.inner = new NervousSquare(this.x, this.y, this.layer, this.dia, this.sw, operator);
        } else {
            this.inner = null;
        }
    }

    public void display() {
        operator.strokeWeight(sw);
        float colorIndex = (float) (layer * 1.2);
        operator.fill(colorIndex * 10, 255 - colorIndex * 25, 255 - colorIndex * 10);
        operator.rect(x, y, dia, dia);
        if (inner != null) inner.display();
    }

    public void update(float xpos, float ypos, float dia_) {
        x += operator.random(-sw, sw);
        y += operator.random(-sw, sw);

        if (layer == 1) {
            x = (float) operator.width /2;
            y = (float) operator.height /2;
        } else {
            x = PApplet.constrain(x, xpos - dia_ / 2 + dia / 2, xpos + dia_ / 2 - dia / 2);
            y = PApplet.constrain(y, ypos - dia_ / 2 + dia / 2, ypos + dia_ / 2 - dia / 2);
        }
        if (inner != null) inner.update(x, y, dia);
    }
}
