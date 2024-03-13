/** @odoo-module **/

import { Component, useState, useExternalListener } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class SystrayCounter extends Component {
    // Same behavior
    // SystrayCounter.template = "awesome_clicker.ClickerSystray";
    static template = "awesome_clicker.ClickerSystray";
    setup() {
        this.state = useState({
            counter: 0,
        });
        useExternalListener(document.body, "click", () => this.state.counter++, { capture: true });
    }

    increaseCounter() {
        this.state.counter += 9;
    }

    decreaseCounter() {
        this.state.counter -= 11;
    }
}

export const systrayItem = {
    Component: SystrayCounter,
};
registry.category("systray").add("awesome_clicker.user_menu", systrayItem, { sequence: 0 });