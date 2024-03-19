/** @odoo-module **/

import { registry } from "@web/core/registry";
import {ClickerModel} from "./clicker_model";

const clickerService = {
    dependencies: ["action", "effect", "notification"],
    start(env, { action, effect, notification }) {
       const clickerModel = new ClickerModel();
       clickerModel.eventBus.addEventListener("MILESTONE", (event) => {
            effect.add({
                type: "rainbow_man",
                message: `GGWP! You can now buy ${event.detail}`,
            });
       });

       clickerModel.eventBus.addEventListener("WIN_REWARD", (data) => {
           const reward = data?.detail;
           if (reward) {
               const closeNotification = notification.add(
                   `GG, you won a reward : "${reward.description}"`,
                   {
                       type: "success",
                       sticky: true,
                       buttons: [
                           {
                               name: "Collect",
                               onClick: () => {
                                   reward.apply(clickerModel);
                                   closeNotification();
                                   action.doAction({
                                       type: "ir.actions.client",
                                       tag: "awesome_clicker.ClickerClientAction",
                                       target: "new",
                                       name: "Clicker Game"
                                   });
                               },
                           },
                       ],
                   }
               );
           }
       })

       return clickerModel;
    }
}

registry.category("services").add("awesome_clicker.ClickerService", clickerService);
