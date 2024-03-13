/** @odoo-module **/

import { Component } from "@odoo/owl";
import { humanNumber } from "@web/core/utils/numbers";
import { useClick } from "../clicker_hook";

export class ClickerValue extends Component {
    static template = "awesome_clicker.ClickerValue";
    static props = {};

    setup() {
        this.clickService = useClick();
    }

    get humanizedCounterValue() {
        return humanNumber(this.clickService.clicks, {
            decimals: 1,
        });
    }
}
