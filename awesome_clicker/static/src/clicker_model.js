/** @odoo-module **/

import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";
import { rewards } from "./clicker_rewards";


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
        this.clickMultiplier = 1;

        setInterval(() => {
            for (const bot in this.bots) {
                this.clicks += this.bots[bot].bought * this.bots[bot].increaseBy * this.clickMultiplier;
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

    buyClickMultiplier() {
        if (this.clicks < 50_000)
            throw new Error("Not enough clicks to buy this");

        this.clicks -= 50_000;
        this.clickMultiplier++;
    }

    winReward() {
        const possibleRewards = rewards.filter(reward => {
            return this.level >= reward.minLevel && this.level <= reward.maxLevel;
        });

        return possibleRewards.getRandomElement();
    }

    milestones() {
        return {
            0: {
                minClick: 1_000,
                event: "MILESTONE",
                gain: "normal bots",
            },
            1: {
                minClick: 5_000,
                event: "MILESTONE",
                gain: "big bots",
            },
            2: {
                minClick: 100_000,
                event: "MILESTONE",
                gain: "click multiplier",
            }
        }
    }
}
