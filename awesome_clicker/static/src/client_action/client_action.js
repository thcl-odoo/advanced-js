/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useClick } from "../clicker_hook";

export class ClickerClientAction extends Component {
    static template = "awesome_clicker.ClickerClientAction";
    static props = ['*']; // Prevents "Component 'ClickerSystrayItem' does not have a static props description" warning message

    setup() {
        this.clickService = useClick();
    }
}

registry.category("actions").add("awesome_clicker.ClickerClientAction", ClickerClientAction);
