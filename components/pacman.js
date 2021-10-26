import { getRandomInt } from './helpers.js';
class Pacman {
    constructor(properties, className, velX = getRandomInt(7, 1), velY = getRandomInt(7, 1), posX = getRandomInt(450, 0), posY = getRandomInt(450, 0)) {
        this.properties = properties;
        this.velX = velX;
        this.velY = velY;
        this.posX = posX;
        this.posY = posY;
        this.element = document.createElement('img');
        this.mouth = 0; // 0 => opened, 1 => closed
        this.direction = 0; // 0 => right, 1 => left
        this.mouthSpeed = getRandomInt(45, 5);
        this.count = 0;

        this.pacmanImages = this.properties.pacmanImages;
        this.container = this.properties.project.container;
        this.maxEdge = this.properties.maxEdge;
        this.minEdge = this.properties.minEdge;

        this.element.className = className;
        this.element.src = this.pacmanImages[this.direction][this.mouth];
        this.element.style.left = `${this.posX}px`;
        this.element.style.top = `${this.posY}px`;
    }
    computeNewCoordinates(b) {
        // New X-coordinate
        b.posX += b.velX;

        // New Y-coordinate
        b.posY += b.velY;
    } 

    detectEdges(b) {
        if (b.posX < b.minEdge) {
            b.velX = -b.velX;
            b.posX = b.minEdge;
            b.direction = b.direction === 1 ? 0 : 1;
        }
        else if (b.posX > b.maxEdge) {
            b.velX = -b.velX;
            b.posX = b.maxEdge;
            b.direction = b.direction === 1 ? 0 : 1;
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
    changeMouthPosition(b) {
        if (b.count > b.mouthSpeed) {
            b.mouth = (b.mouth + 1) % 2;
            b.count = 0;
        }
        else {
            b.count++;
        }
    }
    move(b) {
        b.computeNewCoordinates(b);
        b.detectEdges(b);
        b.changeMouthPosition(b);

        // Update Pacman's Styles
        b.element.style.left = b.posX + 'px';
        b.element.style.top = b.posY + 'px';
        b.element.src = b.pacmanImages[b.direction][b.mouth];
    }
}
export { Pacman };