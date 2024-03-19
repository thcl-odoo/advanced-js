/** @odoo-module **/

export const rewards = [
   {
      description: "Get 1 click bot",
      apply(clicker) {
            clicker.increaseCounter(1);
      },
      maxLevel: 3,
   },
   {
      description: "Get 10 click bot",
      apply(clicker) {
            clicker.increaseCounter(10);
      },
      minLevel: 3,
      maxLevel: 4,
   },
   {
      description: "Increase bot power!",
      apply(clicker) {
            clicker.clickMultiplier += 1;
      },
      minLevel: 3,
   },
];
