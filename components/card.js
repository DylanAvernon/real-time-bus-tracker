class Card {
    constructor(classList, textContent) {
        this.classList = classList;
        this.element = document.createElement('div');
        this.body = document.createElement('div');
        this.text = document.createElement('p');
        this.textContent = textContent;
    }

    build() {
        this.text.textContent = this.textContent;
        this.body.appendChild(this.text);
        this.element.appendChild(this.body);
    }

    style() {
        this.element.classList.add(...this.classList.card);
        this.body.classList.add(...this.classList.body);
        this.text.classList.add(...this.classList.text);
    }
}
export { Card };