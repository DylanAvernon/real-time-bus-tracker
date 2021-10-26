import { Header3 } from './header3.js';
import { NavigationBar } from './navigationbar.js';
import { Container } from './container.js';

class Grid {
    constructor(structure) {
        // Create project div
        this.element = document.createElement('div');
        this.ids = structure.ids;
        this.classList = structure.classList;

        this.header3 = new Header3(structure.ids.header3, structure.classList.header3, structure.title);
        this.navigationBar = new NavigationBar(structure.ids.navigationBar, structure.classList.navigationBar, structure.buttons);
        this.container = new Container(structure.ids.container, structure.classList.container);
    }

    render() {
        this.element.id = this.ids.grid;

        this.header3.render();
        this.navigationBar.render();
        this.container.render();

        this.element.appendChild(this.header3.element);
        this.element.appendChild(this.navigationBar.element);
        this.element.appendChild(this.container.element);
    }

    style() {
        this.element.classList.add(...this.classList.grid);
        this.header3.style();
        this.navigationBar.style();
        this.container.style();
    }

    activate() {
        this.navigationBar.activate();
    }
}

export { Grid };