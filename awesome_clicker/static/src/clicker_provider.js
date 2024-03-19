/** @odoo-module **/

import { registry } from "@web/core/registry";

const commandProviderRegistry = registry.category("command_provider");

commandProviderRegistry.add("awesome_clicker", {
    provide: (env, options) => {
        return [
            {
                name: "AwEsOmE cLiCkEr",
                action() {
                    console.log("Rickroll!")
                }
            },
            {
                name: "Open Clicker Game",
                action() {
                    env.services.action.doAction({
                        type: "ir.actions.client",
                        tag: "awesome_clicker.ClickerClientAction",
                        target: "new",
                        name: "Clicker Game"
                    });
                }
            },
            {
                name: "Buy 1 click bot",
                action() {
                    env["awesome_clicker.ClickerService"].buyBot("normal")
                }
            }
        ];
    }
});