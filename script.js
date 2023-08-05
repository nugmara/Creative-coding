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
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.fillStyle = "pink";
  ctx.shadowColor = "black";
  ctx.shadowOffSetY = 10;
  ctx.shadowOffSetX = 5;
  ctx.shadowBlur = 10;

  const canvas2 = document.getElementById("canvas2");
  const ctx2 = canvas2.getContext("2d");
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
  

  // Render a complex mathematical shape for us: The, we will take that shape and use
  // JS to convert it into pixels.

  class Fractal {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.size = this.canvasWidth * 0.25;
      this.sides = 6;
      this.maxLevel = 4;
      this.scale = 0.5;
      this.spread = Math.random() * 2.8 + 0.1;
      this.branches = 2;
      this.color = "hsl("+ Math.random() * 360 +", 100%, 50%)";
    }
    draw(context) {
      // save() method will create a snapchot of the current canvas state
      context.strokeStyle = this.color;
      context.save();
      context.translate(this.canvasWidth / 2, this.canvasHeight / 2);
      context.scale(1, 1);
      for (let i = 0; i < this.sides; i++) {
        this.#drawLine(context, 0);
        context.rotate((Math.PI * 2) / this.sides);
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

      for (let i = 0; i < this.branches; i++) {
        context.save();

        context.translate(this.size - (this.size / this.branches) * i, 0);
        context.scale(this.scale, this.scale);

        context.save();
        context.rotate(this.spread);
        this.#drawLine(context, level + 1);
        context.restore();

        context.save();
        context.rotate(-this.spread);
        this.#drawLine(context, level + 1);
        context.restore();
        context.restore();

      }
    }
  }

  // We will use Particle class to assign these pixels as a particle shape. Here, we will
  // also deal with motion. We can do floating, raining or spinning particles if we want to.
  // This class will contain a blueprint to define properties and behaviors of individual particles.
  //
  class Particle {
    constructor(canvasWidth, canvasHeight, image) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.image = image;
      this.x = Math.random() * this.canvasWidth;
      this.y = Math.random() * this.canvasHeight;
      this.siezeModifier = Math.random() * 0.5 + 0.1
      this.width = this.image.width * this.siezeModifier;
      this.height = this.image.height * this.siezeModifier;
      this.speed = Math.random() * 1 + 0.2;
    }
    update() {
      this.x += this.speed;
      if (this.x > this.canvasWidth + this.width) this.x = -this.width
      this.y += this.speed;
      if (this.y > this.canvasHeight + this.height) this.y = -this.height
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  // This class will handle the entire effect. It will define things like number of particles
  // and so on.
  class Rain {
    constructor(canvasWidth, canvasHeight, image) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.image = image;
      this.numberOfParticles = 20;
      this.particles = [];
      this.#initiaize()
    }
    #initiaize() {
      for ( let i = 0; i < this.numberOfParticles; i++) {
        this.particles.push(new Particle(this.canvasWidth, this.canvasHeight, this.image));
      }
    }
    run(context) {
      this.particles.forEach((particle) => {
        particle.draw(context)
        particle.update()
      })
    }
  }
  const fractal1 = new Fractal(canvas.width, canvas.height);
  fractal1.draw(ctx);
  const fractalImage = new Image();
  fractalImage.src = canvas.toDataURL();

  fractalImage.onload = function() {
    const rainEffect = new Rain(canvas2.width, canvas2.height, fractalImage)
    function animate() {
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
      rainEffect.run(ctx2);
      requestAnimationFrame(animate);
    }
    animate()
  }

});
