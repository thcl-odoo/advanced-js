/** @odoo-module **/

import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

const clickerService = {
    start() {
         const state = reactive({
             clicks: 0,
             level: 0,
             clickBots: 0,
         });

        setInterval(() => {
            state.clicks += state.clickBots * 10;
        }, 10 * 1000); // 10s

        function increaseCounter(inc) {
            state.clicks += inc;
            if (state.level === 0 && state.clicks >= 1000)
                state.level++;
        }

        function decreaseCounter(inc) {
            state.clicks -= inc;
            if (state.level === 1 && state.clicks < 1000)
                state.level--;
        }

        function buyClickBot() {
            const clickBotPrice = 1000;
            if (state.clicks < clickBotPrice)
                return;

            state.clicks -= clickBotPrice;
            state.clickBots++;
        }

        document.addEventListener("click", () => increaseCounter(1), { capture: true } );

        return {
            state,
            increaseCounter,
            decreaseCounter,
            buyClickBot,
        };
    }
}

registry.category("services").add("awesome_clicker.ClickerService", clickerService);
