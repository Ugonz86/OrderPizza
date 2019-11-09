// Business Logic
//Object Constructor for Pizza
function Order(size, topping) {
  this.size = size;
  this.topping = topping;
};

//Prototype Method for the price
Order.prototype.price = function() {
  var price = 10.00;

  if(this.size === "Per Due") {
    price += 5.00;
  } else if (this.size === "Per Quattro") {
    price += 10.00;
  } else if (this.size === "Per Otto") {
    price += 15.00;
  }

  for (var i = 0; i < this.topping.length; i++) {
    console.log("het");

    if(this.topping[i].value === "Pepperoni") {
      price += 3;
    } else if (this.topping[i].value === "Prosciutto") {
      price += 4;
    } else if (this.topping[i].value === "Sausage") {
      price += 2;
    } else if (this.topping[i].value === "Basil") {
      price += 1;
    }
  }
  console.log(price);
  return price;
};


//Front end user logic
var selectedSize;
var selectedTopping = [];
var newOrder;
var total;

$(document).ready(function() {

  $("#introButton").click(function() {
    $("#sizeMenu").fadeIn();
    $("#intro").hide();
  });

  $("#sizeMenuButton").click(function() {
    $("#toppingMenu").fadeIn();
    $("#sizeMenu").hide();

    selectedSize = $("input:checkbox[name=size]:checked").val();

  });

  $("#toppingMenuButton").click(function() {
    $("#subtotal").fadeIn();
    $("#toppingMenu").hide();

    $("#size").append(selectedSize);
    selectedTopping = $("input:checkbox[name=topping]:checked").each(function() {
      var multipleSelection = $(this).val();
      $("#toppingList").append(multipleSelection + "<br>");
    });

    newOrder = new Order(selectedSize, selectedTopping); //Total
    $("#total").text("$" + newOrder.price());
  });

  $("#subtotalButton").click(function() {

    console.log(newOrder.price());
    $("#receipt").fadeIn();
    $("#subtotal").hide();
  });

  $("#receiptButton").click(function() {
    location.reload();
  });
});
