/** @odoo-module **/

import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

const clickerService = {
    start() {
         const state = reactive({ clicks: 0 });

        function increaseCounter(inc) {
            state.clicks += inc;
        }

        function decreaseCounter(inc) {
            state.clicks -= inc;
        }

        document.addEventListener("click", () => increaseCounter(1), { capture: true } );

        return {
            state,
            increaseCounter,
            decreaseCounter,
        };
    }
}

registry.category("services").add("awesome_clicker.ClickerService", clickerService);
