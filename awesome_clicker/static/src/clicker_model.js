/** @odoo-module **/

import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {
    constructor() {
        super();
        this.clicks = 0;
        this.level = 0;
        this.bots = {
            normal: {
                minLevel: 1,
                price: 1000,
                bought: 0,
                increaseBy: 10,
            },
            big: {
                minLevel: 2,
                price: 5000,
                bought: 0,
                increaseBy: 100,
            }
        }
        this.eventBus = new EventBus();

        setInterval(() => {
            for (const bot in this.bots) {
                this.clicks += this.bots[bot].bought * this.bots[bot].increaseBy;
            }
        }, 10 * 1000); // 10s

        document.addEventListener("click", () => this.increaseCounter(1), { capture: true } );

    }

    increaseCounter(inc) {
        this.clicks += inc;
        const milestones = this.milestones();
        const currentMillestone = milestones[this.level];
        if (currentMillestone && this.clicks >= currentMillestone.minClick) {
            this.level++;
            if (currentMillestone.event !== null)
                this.eventBus.trigger(currentMillestone.event, currentMillestone.gain);
        }
    }

    decreaseCounter(inc) {
        this.clicks -= inc;
        if (this.level === 1 && this.clicks < 1000)
            this.level--;
    }

    buyBot(botName) {
        if (!(botName in this.bots))
            throw new Error("Invalid bot name");

        if (this.clicks < this.bots[botName].price)
            throw new Error("Not enough clicks to buy this");

        this.clicks -= this.bots[botName].price;
        this.bots[botName].bought += 1;
    }

    milestones() {
        return {
            0: {
                minClick: 1000,
                event: "MILESTONE",
                gain: "normal bots",
            },
            1: {
                minClick: 5000,
                event: "MILESTONE",
                gain: "big bots",
            },
        }
    }
}