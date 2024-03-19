/** @odoo-module **/

import { FormController } from "@web/views/form/form_controller";
import { patch } from "@web/core/utils/patch";
import { useClick } from "../clicker_hook";

const FormControllerPatch = {
    setup() {
        super.setup(...arguments);
        const clicker = useClick();
        if (Math.random() < 1) {
            clicker.winReward();
        }
    },
};

patch(FormController.prototype, FormControllerPatch);