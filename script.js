// FRACTALS: are infinitely complex patterns that are self-similar
// across different scales. They are created by repeating a simple
// process over and over in an ongoing feedback loop

// PROCEDURAL PROGRAMMING: declaring variables and funcitiones line by line
// as we create our projects. It is the most basic way to write code.

// CONSTRUCTOR: contains a blueprint and when we call the class using the "new" keyword,
// constructor will create one new blank JS object and it will assign it values and properties
// based on the blueprint inside

// RECURSION: is a process in which a function call itself

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 600;
  // canvas settings
  console.log(ctx);
  ctx.lineWidth = 50;
  ctx.lineCap = "round";
  ctx.strokeStyle = "pink";
  ctx.fillStyle = "pink";

  // Render a complex mathematical shape for us: The, we will take that shape and use
  // JS to convert it into pixels.

  class Fractal {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.size = this.canvasWidth * 0.3;
      this.sides = 1;
      this.maxLevel = 1;
    }
    draw(context) {
      // save() method will create a snapchot of the current canvas state
      context.save();
      context.translate(this.canvasWidth / 2, this.canvasHeight / 2);
      context.scale(1, 1);
      for (let i = 0; i < this.sides; i++) {
        this.#drawLine(context, 0);
        context.rotate((Math.PI * 2)/ this.sides);
      }
      // restore() method will look for its associated save call and it will
      // reset canvas state back to what back to what it was at the point save was called
      context.restore();
    }
    // This is a private method. Private methods are declared with hash names.
    // Private methods are only accessible from within the class they are declaared in.
    // Hiding internal functionality from the outside is a good example of the second principle
    // of OOP called Abstraction. Abstraction means we are giding unnecessary details of the inner
    // workings of our objects from the outside and only exposing the essentials.
    #drawLine(context, level) {
        if (level > this.maxLevel) return;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(this.size, 0);
      context.stroke();
      context.save();
      context.translate(this.size, 0)
      context.scale(0.7, 0.7)
      context.rotate(0.9);
      this.#drawLine(context, level + 1)
      context.restore();
    }
  }

  const fractal1 = new Fractal(canvas.width, canvas.height);
  fractal1.draw(ctx);

  // We will use Particle class to assign these pixels as a particle shape. Here, we will
  // also deal with motion. We can do floating, raining or spinning particles if we want to.
  // This class will contain a blueprint to define properties and behaviors of individual particles.
  //
  class Particle {}

  // This class will handle the entire effect. It will define things like number of particles
  // and so on.
  class Rain {}
});
