import { links } from "./const.js";

export class Navbar extends HTMLElement {
    static get observedAttributes(){
        return ['active', 'cart-count'];
    }

    links = links;

    async connectedCallback(){
        await this.loadTemplate();
        this.renderMenu();
        this.bindEvents();
        this.updateCar();

        this._onCartUpdated = () => this.updateCar();
        window.addEventListener('cart-updated', this._onCartUpdated);
        window.addEventListener('storage',this._onCartUpdated);
    }

    disconectedCallback(){
     window.removeEventListener('cart-updated',this._onCartUpdated);
     window.removeEventListener('storage', this._onCartUpdated)
    }

    attributeChangedCallback(names, oldValue, newValue) {
        if (!this.isConnected || oldValue === newValue) return;
        if(names === 'cart-count') this.updateCar();
        else this.renderMenu();
    }

    get logo(){
        return this.getAttribute('logo') || '../assets/img/trendy.jpeg';
    }

    get amount(){
        return amountItems();
    }

    async loadTemplate() {
        // Cargar el archivo HTML externo
        const response = await fetch('../components/navbar.html');
        const html = await response.text();
        this.innerHTML = html;
        
        // Asignar dinámicamente el logo al cargar el HTML
        const imgLogo = this.querySelector('#navLogo');
        if (imgLogo) imgLogo.src = this.logo;
    }

    renderMenu() {
        const navMenu = this.querySelector('#navMenu');
        if (!navMenu) return;

        const active = this.getAttribute('active');
        navMenu.innerHTML = this.links.map(
            (l) => `
            <li>
              <a href="${l.href}" class="${l.id === active ? 'activo' : ''}"
                 ${l.id === active ? 'aria-current="page"' : ''}>${l.text}</a>
            </li>
            `
        ).join('');
    }

    bindEvents() {
        const menuToggle = this.querySelector('#menuToggle');
        const navMenu = this.querySelector('#navMenu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const open = navMenu.classList.toggle('activo');
                menuToggle.classList.toggle('activo');
                menuToggle.setAttribute('aria-expanded', open);
            });
        }

        const cartBtn = this.querySelector('#cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('cart-click', {bubbles: true}));
            });
        }
    }

    updateCar(){
        const badge = this.querySelector('#cartBadge');
        if(!badge) return;
        badge.textContent = this.amount > 99 ? '99+' : this.amount;
        badge.hidden = this.amount === 0;
    }
}

customElements.define('app-navbar', Navbar);