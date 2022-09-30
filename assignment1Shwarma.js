const Order = require('./assignment1Order');

const OrderState = Object.freeze({
  WELCOMING: Symbol('welcoming'),
  ITEM: Symbol('items'),
  SIZE: Symbol('size'),
  TOPPINGS: Symbol('toppings'),
  REORDER: Symbol('reorder'),
  ICECREAM: Symbol('icecream'),
});

module.exports = class ShwarmaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = null;
    this.item1Size = null;
    this.item2Size = null;
    this.item1topping = null;
    this.item2topping = null;
    this.item3Size = null;
    this.sIcecream = null;

    this.sitem1 = null;
    this.sitem2 = null;
    this.sitem3 = null;

    this.SmallPrice = 5;
    this.MediumPrice = 10;
    this.LargePrice = 20;
    this.toppingPrice = 5;
    this.IcecreamPrice = 7;
    this.amount = 0;
    this.itemname;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.ITEM;
        aReturn.push('Welcome to Oshan Fast Food Service.');
        aReturn.push('List of Item to Order');
        aReturn.push('1. Noddles\n 2. Kababs\n (Type 1/2)');
        break;

      case OrderState.ITEM:
        this.stateCur = OrderState.SIZE;

        if (sInput == `1`) {
          this.itemname = 'Noddles';
        } else if (sInput == `2`) {
          this.itemname = 'Kababs';
        }
        if (this.sitem1 == null) {
          this.sitem1 = this.itemname;
        } else if (this.sitem2 == null) {
          this.sitem2 = this.itemname;
        }
        aReturn.push('What size would you like?');
        aReturn.push('1. Small \n 2. Medium\n 3. Large\n (Type 1/2/3)');
        break;

      case OrderState.SIZE:
        if (sInput == `1`) {
          this.sSize = 'Small';
          this.amount += this.SmallPrice;
        } else if (sInput == `2`) {
          this.sSize = 'Medium';
          this.amount += this.MediumPrice;
        } else if (sInput == `3`) {
          this.sSize = 'Large';
          this.amount += this.LargePrice;
        }

        if (this.item1Size == null) {
          this.item1Size = this.sSize;
        } else if (this.item2Size == null) {
          this.item2Size = this.sSize;
        } else if (this.item3Size == null) {
          this.item3Size = this.sSize;
        }
        this.stateCur = OrderState.TOPPINGS;
        // this.sSize = sInput;
        aReturn.push('What toppings would you like to add?');
        this.amount += this.toppingPrice;
        break;

      case OrderState.TOPPINGS:
        this.stateCur = OrderState.REORDER;
        if (this.item1topping == null) {
          this.item1topping = sInput;
        } else if (this.item2topping == null) {
          this.item2topping = sInput;
        }
        aReturn.push('Would you like Add another item\n?(Type: Yes/No)');
        break;

      case OrderState.REORDER:
        if (sInput.toLowerCase() == 'yes') {
          if (this.item2 == null) {
            this.stateCur = OrderState.ITEM;
            aReturn.push('List of Item to Order');
            aReturn.push('1. Noddles\n 2. Kababs\n (Type 1/2)');
          } else {
            this.stateCur = OrderState.ICECREAM;
            aReturn.push('What flavor icecream you would like to have?');
          }
        } else if (sInput.toLowerCase() == 'no') {
          aReturn.push('What flavor icecream you would like to have?');
          this.stateCur = OrderState.ICECREAM;
        }
        break;

      case OrderState.ICECREAM:
        this.isDone(true);
        if (sInput.toLowerCase() != 'no') {
          this.sIcecream = sInput;
          this.amount += this.IcecreamPrice;
        }
        aReturn.push('Thank-you for your order of');

        if (this.sitem2 != null) {
          aReturn.push(`${this.item1Size} ${this.sitem1} with ${this.item1topping}`);
          aReturn.push(`${this.item2Size} ${this.sitem2} with ${this.item2topping}`);
        } else {
          aReturn.push(`${this.item1Size} ${this.sitem1} with ${this.item1topping}`);
        }

        if (this.sIcecream) {
          aReturn.push(`Icecream flavour: ${this.sIcecream}`);
          aReturn.push(`Total Bill: $${this.amount}`);
        }

        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
