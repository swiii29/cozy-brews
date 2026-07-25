// ======================================
// COZY BREWS
// PART 1
// MENU DATA + CARD GENERATION
// ======================================

const drinks = [

{
    id:1,
    name:"Classic Cold Coffee",
    category:"coffee",
    image:"images/classic.jpg",
    small:40,
    large:50,
    bestseller:true,
    ingredients:[
        "Milk",
        "Coffee",
        "Sugar",
        "Ice"
    ]
},

{
    id:2,
    name:"Butterscotch Coffee",
    category:"coffee",
    image:"images/butterscotch.jpg",
    small:40,
    large:50,
    bestseller:true,
    ingredients:[
        "Milk",
        "Coffee",
        "Butterscotch Syrup",
        "Ice"
    ]
},

{
    id:3,
    name:"Vanilla Coffee",
    category:"coffee",
    image:"images/vanilla.jpg",
    small:40,
    large:50,
    bestseller:false,
    ingredients:[
        "Milk",
        "Coffee",
        "Vanilla Syrup",
        "Ice"
    ]
},

{
    id:4,
    name:"Hazelnut Coffee",
    category:"coffee",
    image:"images/hazelnut.jpg",
    small:40,
    large:50,
    bestseller:false,
    ingredients:[
        "Milk",
        "Coffee",
        "Hazelnut Syrup",
        "Ice"
    ]
},

{
    id:5,
    name:"Hot Chocolate",
    category:"hot",
    image:"images/hot-chocolate.jpg",
    small:50,
    large:65,
    bestseller:true,
    ingredients:[
        "Milk",
        "Chocolate",
        "Cocoa Powder"
    ]
},

{
    id:6,
    name:"Black Coffee",
    category:"hot",
    image:"images/black-coffee.jpg",
    small:30,
    large:40,
    bestseller:false,
    ingredients:[
        "Coffee",
        "Hot Water"
    ]
},

{
    id:7,
    name:"Green Tea",
    category:"hot",
    image:"images/green-tea.jpg",
    small:30,
    large:40,
    bestseller:false,
    ingredients:[
        "Green Tea",
        "Hot Water"
    ]
},

{
    id:8,
    name:"Hot Oreo Shake",
    category:"hot",
    image:"images/oreo.jpg",
    small:65,
    large:75,
    bestseller:true,
    ingredients:[
        "Milk",
        "Oreo",
        "Chocolate"
    ]
}

];


// ======================================
// SELECT MENU CONTAINER
// ======================================

const products =
document.querySelector(".products");


// ======================================
// CREATE CARDS
// ======================================

function loadMenu(list){

products.innerHTML="";

list.forEach(drink=>{

products.innerHTML+=`

<div class="card">

${drink.bestseller ?

'<div class="badge">Best Seller</div>'

: ''}

<img src="${drink.image}" alt="${drink.name}">

<div class="card-content">

<h3>

${drink.name}

</h3>

<p>

Small ₹${drink.small}

<br>

Large ₹${drink.large}

</p>

<button

class="details-btn"

data-id="${drink.id}"

>

View Details

</button>

<button

class="order-card-btn"

data-id="${drink.id}"

>

Order Now

</button>

</div>

</div>

`;

});

}


// ======================================
// LOAD WEBSITE
// ======================================

loadMenu(drinks);
// ======================================
// PART 2
// POPUP + PRICE CALCULATION
// ======================================

const popup = document.getElementById("popup");

const popupImage = document.getElementById("popupImage");
const popupTitle = document.getElementById("popupTitle");
const popupIngredients = document.getElementById("popupIngredients");

const smallPrice = document.getElementById("smallPrice");
const largePrice = document.getElementById("largePrice");

const kitkat = document.getElementById("kitkat");
const chocolate = document.getElementById("chocolate");
const customerName =
document.getElementById("customerName");

const roomNumber =
document.getElementById("roomNumber");
const quantityText = document.getElementById("quantity");
const totalText = document.getElementById("total");

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");

const closePopup = document.querySelector(".close");

let selectedDrink = null;
let quantity = 1;

// ======================================
// OPEN POPUP
// ======================================

document.addEventListener("click", function(e){

    if(e.target.classList.contains("details-btn") ||
       e.target.classList.contains("order-card-btn")){

        const id = Number(e.target.dataset.id);

        selectedDrink = drinks.find(item => item.id === id);

       popup.classList.add("show");

        popupImage.src = selectedDrink.image;

        popupTitle.textContent = selectedDrink.name;

       popupIngredients.innerHTML = `
<h4>Ingredients</h4>
<ul>
${selectedDrink.ingredients
.map(item=>`<li>${item}</li>`)
.join("")}
</ul>
`;

        smallPrice.textContent = "₹" + selectedDrink.small;

        largePrice.textContent = "₹" + selectedDrink.large;

        quantity = 1;

        quantityText.textContent = quantity;

        document.querySelector(
        'input[name="size"][value="small"]'
        ).checked = true;

        kitkat.checked = false;

        chocolate.checked = false;

        calculateTotal();

    }

});

// ======================================
// CLOSE POPUP
// ======================================

closePopup.onclick = function(){

    popup.classList.remove("show");

}

window.onclick = function(e){

    if(e.target === popup){

        popup.classList.remove("show");

    }

}

// ======================================
// QUANTITY
// ======================================

plus.onclick = function(){

    quantity++;

    quantityText.textContent = quantity;

    calculateTotal();

}

minus.onclick = function(){

    if(quantity > 1){

        quantity--;

        quantityText.textContent = quantity;

        calculateTotal();

    }

}

// ======================================
// UPDATE WHEN OPTIONS CHANGE
// ======================================

document.querySelectorAll('input[name="size"]').forEach(radio=>{

radio.addEventListener("change",calculateTotal);

});
document.querySelectorAll('input[name="delivery"]').forEach(radio=>{

radio.addEventListener("change",calculateTotal);

});
kitkat.addEventListener("change",calculateTotal);

chocolate.addEventListener("change",calculateTotal);

// ======================================
// TOTAL
// ======================================

function calculateTotal(){

    if(!selectedDrink) return;

    let size =
    document.querySelector(
    'input[name="size"]:checked'
    ).value;

    let total =
    size === "small"
    ?
    selectedDrink.small
    :
    selectedDrink.large;

    if(kitkat.checked){

        total += 15;

    }

    if(chocolate.checked){

        total += 20;

    }
const delivery =
document.querySelector(
'input[name="delivery"]:checked'
).value;

if(delivery==="room"){

    total += 10;

}
    total *= quantity;

    totalText.textContent = total;

}
// ======================================
// PART 3
// SEARCH + FILTER + WHATSAPP
// MOBILE MENU + TOP BUTTON + LOADER
// ======================================

const searchInput = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".category");
const orderBtn = document.getElementById("orderBtn");

// ======================================
// SEARCH
// ======================================
searchInput.addEventListener("input", filterMenu);

categoryButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

categoryButtons.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

filterMenu();

});

});

function filterMenu(){

const search=searchInput.value.toLowerCase();

const category=document.querySelector(".category.active").dataset.category;

const filtered=drinks.filter(drink=>{

const matchSearch=drink.name.toLowerCase().includes(search);

const matchCategory=
category==="all"||
drink.category===category;

return matchSearch&&matchCategory;

});

loadMenu(filtered);

}

// ======================================
// WHATSAPP ORDER
// ======================================

orderBtn.addEventListener("click",()=>{

if(!selectedDrink) return;
const name =
customerName.value.trim();

const room =
roomNumber.value.trim();

if(name===""){

alert("Please enter your Full Name.");

return;

}

if(room===""){

alert("Please enter your Room Number.");

return;

}

const delivery =
document.querySelector(
'input[name="delivery"]:checked'
).value;
const size =
document.querySelector(
'input[name="size"]:checked'
).value;

let toppings=[];

let total =
size==="small"
?
selectedDrink.small
:
selectedDrink.large;

if(kitkat.checked){

toppings.push("KitKat");

total+=15;

}

if(chocolate.checked){

toppings.push("Extra Chocolate");

total+=20;

}
if(delivery==="room"){

total+=10;

}
total*=quantity;

const toppingText =
toppings.length
?
toppings.join(", ")
:
"None";

const message = `Hi Cozy Brews! ☕%0A%0A

Name: ${name}%0A

Room Number: ${room}%0A

Delivery: ${delivery==="room" ? "Room Delivery (+₹10)" : "Pickup"}%0A%0A

Drink: ${selectedDrink.name}%0A

Cup Size: ${size.charAt(0).toUpperCase()+size.slice(1)}%0A

Toppings: ${toppingText}%0A

Quantity: ${quantity}%0A

Total: ₹${total}%0A%0A

Thank you! 😊`;

popup.classList.remove("show");

window.open(
`https://wa.me/918866463771?text=${message}`,
"_blank"
);

});

// ======================================
// MOBILE MENU
// ======================================

const menuBtn =
document.querySelector(".menu-btn");

const navLinks =
document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});
document.querySelectorAll(".nav-links a")
.forEach(link=>{

link.onclick=()=>{

navLinks.classList.remove("active");

}

});

// ======================================
// BACK TO TOP
// ======================================

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ======================================
// LOADER
// ======================================

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

setTimeout(()=>{

loader.classList.add("hide");

},800);

});

// ======================================
// DARK MODE
// ======================================

const themeBtn =
document.querySelector(".theme-btn");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

// ======================================
// END
// ======================================
