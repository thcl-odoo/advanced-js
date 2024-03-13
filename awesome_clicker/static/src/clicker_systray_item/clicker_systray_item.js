/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class ClickerSystrayItem extends Component {
    // Same behavior
    // ClickerSystrayItem.template = "awesome_clicker.ClickerSystray";
    static template = "awesome_clicker.ClickerSystray";
    static props = {}; // Prevents "Component 'ClickerSystrayItem' does not have a static props description" warning message

    setup() {
        this.state = useState({
            counter: 0,
        });
        this.action = useService("action");
        this.clickService = useState(useService("awesome_clicker.ClickerService"));
    }

    openClientAction() {
        this.action.doAction({
            type: "ir.actions.client",
            tag: "awesome_clicker.ClickerClientAction",
            target: "new",
            name: "Clicker Game"
        });
    }
}

export const systrayItem = {
    Component: ClickerSystrayItem,
};
registry.category("systray").add("awesome_clicker.ClickerSystray", systrayItem, { sequence: 0 });
