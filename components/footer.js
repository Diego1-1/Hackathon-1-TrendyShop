import { links } from "./const.js";
class Footer extends HTMLElement {

    links = links;


    async connectedCallback() {
        await this.loadTemplate();
        this.renderLinks();
        this.setCurrentYear();
    }

    async loadTemplate() {
        try {
            const response = await fetch('../components/footer.html');
            const html = await response.text();
            this.innerHTML = html;
        } catch (error) {
            console.error('Error cargando el footer:', error);
        }
    }

   renderLinks() {
    const footerNav = this.querySelector('#footerNav');
    if (!footerNav) return;

    footerNav.innerHTML = this.links.map(
        (link) => `
        <li>
          <a href="${link.href}" class="text-white-50 text-decoration-none">${link.text}</a>
        </li>
        `
    ).join('');
}

    setCurrentYear() {
        const yearSpan = this.querySelector('#footerYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }


}

customElements.define('app-footer', Footer);