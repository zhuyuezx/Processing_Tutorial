package proc.FourierSeries;

import processing.core.PApplet;

public class fx_x3 extends PApplet {

    int level = 0;
    float l = TWO_PI;
    boolean initialized = false;
    float[] wave;
    float[] after;
    int count;

    public void settings() {
        fullScreen();
        //size(960, 640);
        count = 0;
    }

    public void draw() {
        if (!initialized) {
            background(0);
            wave = new float[height];
            after = new float[height];
            stroke(200);
            strokeWeight(3);
            initialized = true;
        }
        pushMatrix();
        background(0);
        line(width - height, 0, width - height, height);
        line(width - height, height, width, height);
        translate(width - height, height);
        if (count == 50) {
            wave = after.clone();
            calculate_after(level);
            count = 0;
            level++;
        }
        calculate_one_term();
//        calculate_wave();
        beginShape();
        strokeWeight(1);
        noFill();
        for (int i = 0; i < height; i++) {
            vertex(i, wave[i]);
        }
        endShape();
        popMatrix();
        count++;

        textSize(32);
        String msg = "Current Layer: " + level;
        fill(238);
        text(msg, 40, 40, 400, 40);
    }

    public void calculate_after(int level) {
        int n = level + 1;
        int sign = (n % 2 == 0) ? 1 : -1;
        float radius = (height / l / l / l) * (2 * l * l * l / (n * n * n * PI * PI * PI));
        radius *= (n * n * PI * PI - 6);
        for (int curr = 0; curr < height; curr++) {
            //after[curr] = wave[curr];
            after[curr] += sign * radius * sin(n * PI * (0.0058f * curr) / l);
        }
    }

    public void calculate_one_term() {
        for (int curr = 0; curr < height; curr++) {
            wave[curr] = lerp(wave[curr], after[curr], 0.05f);
        }
    }

    public static void main(String[] args) {
        PApplet.main(fx_x3.class.getName());
    }
}
