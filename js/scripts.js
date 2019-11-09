// Business Logic
//Object Constructor for Pizza
function Order(size, topping) {
  this.size = size;
  this.topping = topping;
};

//Prototype Method for the price
Order.prototype.price = function() {
  var price = 10;

  if(this.size === "Per Due") {
    price += 5;
  } else if (this.size === "Per Quattro") {
    price += 10;
  } else if (this.size === "Per Otto") {
    price += 15;
  }

  if(this.topping === "Pepperoni") {
  price += 3;
  } else if (this.topping === "Prosciutto") {
    price += 4;
  } else if (this.topping === "Sausage") {
    price += 2;
  } else if (this.topping === "Basil") {
    price += 1;
  }
  console.log(price);
  return price;
};


//Front end user logic
var selectedSize;
var selectedTopping;
var newOrder;

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
    $("#subtotal").fadeIn();
    $("#toppingMenu").hide();

    selectedTopping = $("input:radio[name=topping]:checked").val();
    newOrder = new Order(selectedSize, selectedTopping);
    console.log(newOrder.price());
  });

  $("#subtotalButton").click(function() {
    $("#subtotal").text(newOrder.price());
    console.log(newOrder.price());
    $("#receipt").fadeIn();
    $("#subtotal").hide();
  });

  $("#receiptButton").click(function() {
    location.reload();
  });
});
