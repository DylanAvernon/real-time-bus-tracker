import { getRandomInt, getRandomColor } from './helpers.js';
class Ball {
    constructor(properties, className, velX = getRandomInt(7, 1), velY = getRandomInt(7, 1), posX = getRandomInt(450, 0), posY = getRandomInt(450, 0)) {
      this.element = document.createElement('div');
      this.color = getRandomColor();
      this.originalVelX = velX;
      this.originalVelY = velY;
      this.velX = velX;
      this.velY = velY;
      this.posX = posX;
      this.posY = posY;
      this.properties = properties;
      this.container = this.properties.project.container;
      this.maxEdge = this.properties.maxEdge;
      this.minEdge = this.properties.minEdge;

      this.element.className = className;
      this.element.style.left = `${this.posX}px`;
      this.element.style.top = `${this.posY}px`;
      this.element.style.background = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
    }
    computeNewCoordinates(b) {
        // New X-coordinate
        b.posX += b.velX;

        // apply gravity
        b.velY += b.properties.gravity;

        // New Y-coordinate
        b.posY += b.velY;
    } 

    detectEdges(b) {
        if (b.posX < b.minEdge) {
            b.velX = -b.velX;
            b.posX = b.minEdge;
        }
        else if (b.posX > b.maxEdge) {
            b.velX = -b.velX;
            b.posX = b.maxEdge;
        }
        if (b.posY > b.maxEdge) {
            b.velY = -b.velY;

            /*  The value assigned to posY when the bottom edge
                is detected must be equal to the minEdge.
             */

            b.posY = b.maxEdge;
        }
        else if (b.posY < b.minEdge) {
            b.velY = -b.velY;
            b.posY = b.minEdge;
        }
    }
    moveRandomly(b) {
        b.posX += getRandomInt(b.properties.stepSize, -b.properties.stepSize) + b.properties.windSpeed;
        b.posY += getRandomInt(b.properties.stepSize, -b.properties.stepSize) + b.properties.gravity;
        
        b.detectEdges(b);

        b.element.style.left = b.posX + 'px';
        b.element.style.top = b.posY + 'px';
    }
    move(b) {
        b.computeNewCoordinates(b);
        b.detectEdges(b);

        // Move the ball
        b.element.style.left = b.posX + 'px';
        b.element.style.top = b.posY + 'px';
    }
}
export { Ball };