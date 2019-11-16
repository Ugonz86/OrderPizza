// Business Logic for Order
//Object Constructor for Order
function Order() {
  this.pizzas = [];
  this.total = 0;
  this.currentId = -1;
  // this.address = [];
};
//Order prototype methods
Order.prototype.addPizza = function (pizza) {
  pizza.id = this.assignId();
  this.pizzas.push(pizza);
  this.total += pizza.price();
}
Order.prototype.assignId = function() {
  this.currentId ++;
  return this.currentId;
}
// Business Logic for Pizza
//Object Constructor for Pizza
function Pizza (size, topping) {
  this.size = size;
  this.topping = topping;
}
//Price prototype Method
Pizza.prototype.price = function() {
  var price = 10.00;

  if(this.size === "Per Due") {
    price += 5.00;
  } else if (this.size === "Per Quattro") {
    price += 10.00;
  } else if (this.size === "Per Otto") {
    price += 15.00;
  }

  for (var i = 0; i < this.topping.length; i++) {

    if(this.topping[i] === "Prosciutto") {
      price += 4;
    } else if (this.topping[i] === "Pepperoni") {
      price += 3;
    } else if (this.topping[i] === "Sausage") {
      price += 2;
    } else if (this.topping[i] === "Basil") {
      price += 1;
    } else if (this.topping[i] === "Arugula") {
      price += 1;
    } else if (this.topping[i] === "Blue Cheese") {
      price += 1;
      }
    }
  return price;
};

Order.prototype.deletePizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        this.total -= this.pizzas[i].price();
        delete this.pizzas[i];
        return true;
      }
    }
  };
  return false;
}

//User interface logic
//Global variables
var selectedSize;
var selectedTopping = [];
var order = new Order();
var newPizza;
var total;
var orderList = $("ul#orders");
var details = "";
var selectedPizzas = [];

function displayOrdersDetail(orderListToDisplay) {
  var orderList = $("ul#orders");
  var details = "";
  orderListToDisplay.pizzas.forEach(function(pizza) {
    details += "<li id=" + pizza.id + ">" + pizza.size + " " + "-" + " " +  pizza.topping + " " + "$" + pizza.price() + ".00" + "</li>";
  });
  orderList.html(details);
  $("#total").text(order.total);//Display Purchase Total
  $("#total2").text(order.total);//Display Purchase Total in different location
  $("#total3").text(order.total);//Display Purchase Total in different location
};

function displayOrdersRemove(orderListToDisplay) {
  var orderList = $("ul#ordersRemove");
  var details = "";
  orderListToDisplay.pizzas.forEach(function(pizza) {
    details += "<li id=" + pizza.id + "><input type='checkbox' name='pizzas' value=" + pizza.id + ">" + pizza.size + " " + "-" + " " +  pizza.topping + " " + "$" + pizza.price() + ".00" + "</li>";
  });

  orderList.html(details);
  $("#total").text(order.total);//Display Purchase Total
  $("#total2").text(order.total);//Display Purchase Total in different location
  $("#total3").text(order.total);//Display Purchase Total in different location
};

$(document).ready(function() {
  $("#introButton").click(function() {
    $("#sizeMenu").fadeIn();
    $("#intro").hide();
  });

  $("#sizeMenuButton").click(function() {
    $("#toppingMenu").fadeIn();
    $("#sizeMenu").hide();
    selectedSize = $("input:radio[name=size]:checked").val();
  });

  $("#toppingMenuButton").click(function() {
    $("#subtotal").slideDown();
    $("#toppingMenu").hide();
//Subtotal Display
    $("input:checkbox[name='topping']:checked").each(function(){
      selectedTopping.push($(this).val());
    });
    newPizza = new Pizza(selectedSize, selectedTopping);
    selectedTopping = [];//Clear array for next pizza
    order.addPizza(newPizza);
    displayOrdersDetail(order);
  });

  $("#subtotalButton").click(function() {
    $("#receipt").slideDown("slow");
    $("#subtotal").hide();
  });

  $("#addPizza").click(function() {

    $("#sizeMenu").fadeIn();
    $("#subtotal").hide();
  });

  $("#receiptButton").click(function() {
    $("#thankYou").fadeIn();
    $("#receipt").hide();
  });

  $("#requestDelivery").click(function() {
    $("#delivery").fadeIn();
    $("#receipt").hide();
  });

  $("#addressButton").click(function() {
    $("#displayDeliveryInfo").fadeIn();
    $("#delivery").hide();
  });

  $("#deliveryInfoButton").click(function() {
    $("#thankYou").fadeIn();
    $("#displayDeliveryInfo").hide();
  });

  $("#removePizzaButton").click(function() {
    displayOrdersRemove(order);//Displays order with checkbox in order to be removed.
    $("#remove").fadeIn();
    $("#subtotal").hide();
  });

  $("#removeNowButton").click(function() {
    $("input:checkbox[name='pizzas']:checked").each(function(){
      selectedPizzas.push(parseInt($(this).val()));
    });
    console.log(selectedPizzas[0]);
    for(var i=0;i<selectedPizzas.length;i++){
      order.deletePizza(selectedPizzas[i]);
    }
    displayOrdersDetail(order);//Displays updated order list.
    console.log(order.pizzas);
    $("#subtotal").slideDown();
    $("#remove").hide();
  });
  $("#goBack").click(function() {
    $("#subtotal").slideDown();
    $("#remove").hide();
  });

  $("#cancelOrder").click(function() {
    location.reload();
  });

  $("#thankYouButton").click(function() {
    location.reload();
  });

  $("#address").submit(function(event) {
    var firstNameInput = $("input#firstName").val();
    var lastNameInput = $("input#lastName").val();
    var phoneNumberInput = $("input#phoneNumber").val();
    var emailAddressInput = $("input#emailAddress").val();
    var streetAddressInput = $("input#streetAddress").val();
    var cityInput = $("input#city").val();
    var stateInput = $("input#state").val();
    var zipcodeInput = $("input#zipcode").val();

    $(".firstName").text(firstNameInput);
    $(".lastName").text(lastNameInput);
    $(".phoneNumber").text(phoneNumberInput);
    $(".emailAddress").text(emailAddressInput);
    $(".streetAddress").text(streetAddressInput);
    $(".city").text(cityInput);
    $(".state").text(stateInput);
    $(".zipcode").text(zipcodeInput);

    $("#displayDeliveryInfo").show();
    event.preventDefault();
  });
});
