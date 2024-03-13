/** @odoo-module **/

import { registry } from "@web/core/registry";
import {ClickerModel} from "./clicker_model";

const clickerService = {
    dependencies: ["effect"],
    start(env, { effect }) {
       const clickerModel = new ClickerModel();
       clickerModel.eventBus.addEventListener("MILESTONE_1k", () => {
            effect.add({
                type: "rainbow_man",
                message: "GGWP! You can buy clickbots",
            });
       });
       return clickerModel;
    }
}

registry.category("services").add("awesome_clicker.ClickerService", clickerService);
