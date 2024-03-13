/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class SystrayCounter extends Component {
    // Same behavior
    // SystrayCounter.template = "awesome_clicker.ClickerSystray";
    static template = "awesome_clicker.ClickerSystray";
    setup() {
        this.state = useState({
            counter: 0,
        });
    }

    increaseCounter() {
        this.state.counter++;
    }

    decreaseCounter() {
        this.state.counter--;
    }
}

export const systrayItem = {
    Component: SystrayCounter,
};
registry.category("systray").add("awesome_clicker.user_menu", systrayItem, { sequence: 0 });