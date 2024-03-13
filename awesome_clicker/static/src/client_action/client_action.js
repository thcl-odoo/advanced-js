/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useState, useService } from "@odoo/owl";

export class ClickerClientAction extends Component {
    static template = "awesome_clicker.ClickerClientAction";
    static props = ['*']; // Prevents "Component 'ClickerSystrayItem' does not have a static props description" warning message

    setup() {
        this.clickService = useState(useService("awesome_clicker.ClickerService"));
    }
}

registry.category("actions").add("awesome_clicker.ClickerClientAction", ClickerClientAction);
