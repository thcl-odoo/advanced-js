/** @odoo-module **/

import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {
    constructor() {
        super();
        this.clicks = 0;
        this.level = 0;
        this.clickBots = 0;
        this.eventBus = new EventBus();

        setInterval(() => {
            this.clicks += this.clickBots * 10;
        }, 10 * 1000); // 10s

        document.addEventListener("click", () => this.increaseCounter(1), { capture: true } );

    }

    increaseCounter(inc) {
        this.clicks += inc;
        if (this.level === 0 && this.clicks >= 1000) {
            this.level++;
            this.eventBus.trigger("MILESTONE_1k");
        }
    }

    decreaseCounter(inc) {
        this.clicks -= inc;
        if (this.level === 1 && this.clicks < 1000)
            this.level--;
    }

    buyClickBot() {
        const clickBotPrice = 1000;
        if (this.clicks < clickBotPrice)
            return;

        this.clicks -= clickBotPrice;
        this.clickBots++;
    }
}