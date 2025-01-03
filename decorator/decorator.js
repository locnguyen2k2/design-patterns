/*
* 1) Khai báo IPizza (interface)
* -> Dùng chung cho wrappers và wrapped objects
* */
class IPizza {
    constructor(size, form) {
        this.size = size;
        this.form = form;
    }

    orderInfo() {
        console.log(`Order info: size - ${this.size}, form: ${this.form}`);
    }
}

/*
* 2) Khai báo Concrete Component(một giao diện Component)
* -> Các wrapped objects của một Class
* -> Định nghĩa basic behavior có thể được thay đổi bởi decorator
* */
class TomatoPizza extends IPizza {
    constructor(size, form) {
        super(size, form);
    }

    orderInfo() {
        console.log(`Type: Totamo Pizza`)
        super.orderInfo();
    }
}

class CheesePizza extends IPizza {
    constructor(size, form) {
        super(size, form);
    }

    orderInfo() {
        console.log(`Order: Cheese Pizza`)
        super.orderInfo();
    }
}

/*
* 3) Khai báo Base decorator chứa Concrete Component & Decorators
* -> Đại diện cho tất cả operations của wrapped object
* */
class BaseDecorator extends IPizza {
    constructor(pizzaInfo) {
        super(pizzaInfo.size, pizzaInfo.form);
        this.pizzaInfo = pizzaInfo;
    }

    orderInfo() {
        this.pizzaInfo.orderInfo();
    }
}

/*
* 4) Khai báo Concrete decorator định nghĩa extra behaviors
* -> Override methods của Base decorator
* -> Sau đó execute behaviors của Concrete decorator này
* */
class IngredientDecorator extends BaseDecorator {
    constructor(pizzaInfo, ingredient) {
        super(pizzaInfo);
        this.ingredient = ingredient;
    }

    orderInfo() {
        super.orderInfo();
        console.log(`+ Ingredient: ${this.ingredient}`)
    }
}

class SaucesDecorator extends BaseDecorator {
    constructor(pizzaInfo, sauces) {
        super(pizzaInfo);
        this.sauces = sauces;
    }

    orderInfo() {
        super.orderInfo();
        console.log(`+ Sauces: ${this.sauces}`)
    }
}

const orderTomatoPizza = new TomatoPizza('medium', 'thin')
const addIngredientToOrder = new IngredientDecorator(orderTomatoPizza, 'Peppers')
const addSaucesToOrder = new SaucesDecorator(addIngredientToOrder, 'chilies sauces')
addSaucesToOrder.orderInfo()

const orderCheesePizza = new CheesePizza('large', 'thick')
const addIngredientToCheesePizza = new IngredientDecorator(orderCheesePizza, 'Onions')
const addSaucesToCheesePizza = new SaucesDecorator(addIngredientToCheesePizza, 'Mayone sauces')
addSaucesToCheesePizza.orderInfo()