package proc.FourierSeries;

import processing.core.PApplet;

import java.util.ArrayList;

public class AbsoluteSinWave extends PApplet {

    float radius;
    float time;
    ArrayList<Float> wave;
    int level = 1;

    public void settings() {
        fullScreen();
        //size(960, 640);
        wave = new ArrayList<>();
    }

    public void draw() {
        pushMatrix();
        background(0);
        translate((float) width / 3, (float) height / 2);
        //ellipse(0, 0, radius * 2, radius * 2);
        float x = HALF_PI;
        float y = -HALF_PI;
        for (int i = 0; i < level; i++) {
            float prevX = x;
            float prevY = y;
            int n = i + 1;
            radius = 700 * (4 / ((4 * n * n - 1) * PI));
            x -= radius * sin(2 * n * time);
            y += radius * cos(2 * n * time);

            stroke(255, 100);
            strokeWeight(2);
            noFill();
            ellipse(prevX - HALF_PI, prevY - HALF_PI, radius * 2, radius * 2);

            stroke(255);
            line(prevX, prevY, x, y);
        }
        wave.add(0, y);

        translate((float) width / 3, 0);
        line(x - (float) width / 3, y, 0, wave.get(0));
        beginShape();
        noFill();
        for (int i = 0; i < wave.size(); i++) {
            vertex(i, wave.get(i));
        }
        endShape();
        time += 0.01;

        if (wave.size() > 1000) {
            wave.remove(wave.size() - 1);
        }

        level = (int)(time / 3);
        level = constrain(level, 1, 100);

        popMatrix();
        textSize(32);
        String msg = "Current Level: " + level;
        fill(238);
        text(msg, 40, 40, 280, 40);
    }

    public static void main(String[] args) {
        PApplet.main(AbsoluteSinWave.class.getName());
    }
}
