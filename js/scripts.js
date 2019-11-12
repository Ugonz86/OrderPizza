// Business Logic for Order
//Object Constructor for Order
function Order() {
  this.pizzas = [];
  this.total = 0;
  this.currentId = -1;
  this.address = [];
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
    console.log("het");

    if(this.topping[i] === "Pepperoni") {
      price += 3;
    } else if (this.topping[i] === "Prosciutto") {
      price += 4;
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
  console.log(price);
  return price;
};

//User interface logic
//Global variables
var selectedSize;
var selectedTopping = [];
var order = new Order();
var newPizza;
var total;

function displayOrdersDetail(orderListToDisplay) {
  var orderList = $("ul#orders");
  var details = "";
  orderListToDisplay.pizzas.forEach(function(pizza) {
    details += "<li id=" + pizza.id + ">" + pizza.size + " " + "with" + " " +  pizza.topping + " " + "$" + pizza.price() + ".00" + "</li>";
  });
  orderList.html(details);
  $("#total").text(order.total);//Display Purchase Total
  $("#total2").text(order.total);
  $("#total3").text(order.total);

};

// var newContact = new Contact();
// $("#deliveryInfo").text(newContact.address);
// console.log(newContact);

// function Contact(firstName, lastName, phoneNumber, emailAddress, streetAddress, city, state, zipcode){
//   this.firstName = firstName,
//   this.lastName = lastName,
//   this.phoneNumber = phoneNumber,
//   this.emailAddress = emailAddress,
//   this.streetAddress = streetAddress,
//   this.city = city,
//   this.state = state,
//   this.zipcode = zipcode
// }
//
// Contact.prototype.fullContact = function() {
//   return this.firstName + " " + this.lastName + " " + this.phoneNumber + " " + this.emailAddress + " " + this.streetAddress + " " + this.city + " " + this.state + " " + this.zipcode;
// }
//
// function showContact(contact) {
//   $("#deliveryInfo").slideDown();
//   $("#.first-name").html(this.firstName);
//   console.log(showContact());
// }



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
    $("#subtotal").slideDown("slow");
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
    // displayOrdersDetail(order);
    // $("#total3").text(order.total);
    $("#displayDeliveryInfo").hide();
  });

  // $("#requestDelivery").click(function() {
  //   $("#delivery").fadeIn();
  //   $("#receipt").hide();
  // });

  $("#modifyOrderButton").click(function() {
    $("#modifyOrder").fadeIn();
    // displayOrdersDetail(order);
    // $("#total3").text(order.total);
    $("#subtotal").hide();
  });


  $("#cancelOrder").click(function() {
    location.reload();
  });

  $("#addPizza").click(function() {

    $("#sizeMenu").fadeIn();
    $("#subtotal").hide();
  });

  $("#thankYouButton").click(function() {
    location.reload();
  });

  $("#address").submit(function(event) {
    var firstNameInput = $("input#firstName").val();
    var lastNameInput = $("input#lastName").val();
    var phoneNumberInput = $("input#phoneNumber").val();
    // var firstName = $("input#firstName").val();
    // var firstName = $("input#firstName").val();
    // var firstName = $("input#firstName").val();
    // var firstName = $("input#firstName").val();
    $(".firstName").text(firstNameInput);
    $(".lastName").text(lastNameInput);
    $(".phoneNumber").text(phoneNumberInput);
    // $("#email").append();
    // $("#streetAddress").append();
    // $("#city").append();
    // $("#state").append();
    // $("#zipcode").append();

    $("#displayDeliveryInfo").show();
    event.preventDefault();
  });
  // $("form#address").submit(function(event) {
  //   event.preventDefault();
  //
  //   var inputtedFirstName = $("input#first-name").val();
  //   var inputtedLastName = $("input#last-name").val();
  //   var inputtedPhoneNumber = $("input#phone-number").val();
  //   var inputedEmailAddress = $("input#email-address").val();
  //   var inputedStreetAddress = $("input#street-address").val();
  //   var inputedCity = $("input#city").val();
  //   var inputedState = $("input#state").val();
  //   var inputedZipcode = $("input#zipcode").val();
  //
  //   $("input#first-name").val("");
  //   $("input#last-name").val("");
  //   $("input#phone-number").val("");
  //   $("input#email-address").val("");
  //   $("input#street-address").val("");
  //   $("input#city").val("");
  //   $("input#state").val("");
  //   $("input#zipcode").val("");
  //
  //   var fullContact = new Contact (inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedStreetAddress, inputtedCity, inputtedState, inputtedZipcode);
  //   console.log(fullContact);
  //
  // });
});
