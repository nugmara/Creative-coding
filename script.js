// FRACTALS: are infinitely complex patterns that are self-similar 
// across different scales. They are created by repeating a simple 
// process over and over in an ongoing feedback loop

// PROCEDURAL PROGRAMMING: declaring variables and funcitiones line by line
// as we create our projects. It is the most basic way to write code.

// CONSTRUCTOR: contains a blueprint and when we call the class using the "new" keyword, 
// constructor will create one new blank JS object and it will assign it values and properties 
// based on the blueprint inside

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 600;

    // Render a complex mathematical shape for us: The, we will take that shape and use
    // JS to convert it into pixels.

    class Fractal {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
        }
        draw(context) {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(canvas.width, canvas.height);
            context.stroke();
        }
    }

    const fractal1 = new Fractal(canvas.width, canvas.height);
    fractal1.draw(ctx);

    // We will use Particle class to assign these pixels as a particle shape. Here, we will
    // also deal with motion. We can do floating, raining or spinning particles if we want to.
    // This class will contain a blueprint to define properties and behaviors of individual particles.
    // 
    class Particle {

    }

    // This class will handle the entire effect. It will define things like number of particles
    // and so on.
    class Rain {

    }
});