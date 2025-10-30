//cart map containing the infos about product selected

//let cart = new Map(JSON.parse(localStorage.getItem("cart")) || []);

async function selectCategory(category) {

    document.getElementById('selected-category').textContent = 'Selected Category: ' + category;

    //retreive data
    //const res = await fetch('/getData');
    //data = await res.json();

    //const categ = data.categories.find(cat => cat.name.toLowerCase() === category.toLowerCase());


    const productDivs = document.querySelectorAll(".product");

    //retreive products
    const res = await fetch(`/getProducts/${category}`);
    categProducts = await res.json();


    /*we assume there is always 5 elements*/
    categProducts.forEach((product, index) => {

        const img = productDivs[index].querySelector(".product-image");
        const label = productDivs[index].querySelector("p");

        img.src = `images/${product.image}`;
        img.alt = product.name;
        label.textContent = `${category} - ${product.name}`;
        
    });
    updateData();

}

async function addToCart(productName) {
  try {
    const response = await fetch(`/cart/add/${encodeURIComponent(productName)}`, {
      method: 'POST'
    });

    if (!response.ok) throw new Error('Erreur lors de l\'ajout au panier');

    // Facultatif : tu peux récupérer le panier mis à jour depuis le serveur
    const updatedCart = await response.json();
    console.log("Panier mis à jour :", updatedCart);

    updateData(); // ou updateCartDisplay() si tu as une fonction pour mettre à jour l'affichage

  } catch (error) {
    console.error('Erreur:', error);
  }
}

async function removeFromCart(productName) {
  const response = await fetch(`/cart/remove/${encodeURIComponent(productName)}`, {
    method: 'POST'
  });

  const updatedCart = await response.json();
  updateData();
}




/*for cart.html*/

document.querySelectorAll(".product").forEach(product => {
    product.addEventListener("click", function () {
        let productName = product.querySelector("p").innerText;
        if(productName != "Choose a category"){
            // Update the count for the product in the map
            addToCart(productName);
            //let currentCount = cart.get(productName) || 0;
            //cart.set(productName, currentCount + 1);
            //updateData();
        }
    });
});

function updateData(){
    //cart.forEach((quantity, productName) => {
    //    if (quantity <= 0) { cart.delete(productName);}
    //});

    //localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
    updateCartCount();
    updateCartDisplay();
}

async function updateCartCount() {
    //recover cart from server
    const response = await fetch('/cart/getAll');
    const cartObj = await response.json(); 
    //transform it into Map
    const cart = new Map(Object.entries(cartObj));


    //modify the first instance of cart-count in the html file
    const cartCount = document.querySelector(".cart-count"); 
    // Sum all the quantities in the map and update the cart count
    let totalItems = 0;
    cart.forEach((val) => {totalItems += val;});
    cartCount.innerText = totalItems;

    //modify the next occurences of cart-count
    document.querySelectorAll(".product").forEach(product => {
        const productName = product.querySelector("p").innerText;
        const cartCountElement = product.querySelector(".cart-count");

        if (cart.has(productName)) {
            cartCountElement.innerText = cart.get(productName);
            cartCountElement.style.display = 'inline';
        } else {
            cartCountElement.style.display = 'none'; 
        }
    });
}



/*--------------------for updating cart.html--------------------------*/

async function updateCartDisplay() {
    //recover cart from server
    const response = await fetch('/cart/getAll');
    const cartObj = await response.json(); 
    //transform it into Map
    const cart = new Map(Object.entries(cartObj));


    const cartItemsContainer = document.querySelector(".cart-items");

    if(cartItemsContainer != null){
        // Clear previous cart items (if any)
        cartItemsContainer.innerHTML = "";

        // Loop through the cart array and display each product
        cart.forEach((quantity, productName) => {
            //each cart category
            const cartItem = document.createElement("div");
            cartItem.classList.add("item");

            //name of the category
            const productNameElement = document.createElement("span");
            productNameElement.innerText = productName;
            
            //container of the - + buttons and amount of the category
            const amountWrapper = document.createElement("div");
            amountWrapper.classList.add("amount-wrapper");

            //amount of the category
            const productAmountElement = document.createElement("span");
            productAmountElement.innerText = quantity;

            //- button
            const decrementButton = document.createElement("button");
            decrementButton.innerText = "-";
            decrementButton.addEventListener("click", function() {
                removeFromCart(productName);
                //cart.set(productName, quantity - 1); // Decrease the quantity in the cart
                //updateData();
            });

            //+ button
            const incrementButton = document.createElement("button");
            incrementButton.innerText = "+";
            incrementButton.addEventListener("click", function() {
                addToCart(productName);
                //cart.set(productName, quantity + 1); // Increase the quantity in the cart
                //updateData();
            });


            amountWrapper.appendChild(decrementButton);
            amountWrapper.appendChild(productAmountElement);
            amountWrapper.appendChild(incrementButton);
            cartItem.appendChild(productNameElement);
            cartItem.appendChild(amountWrapper);
            cartItemsContainer.appendChild(cartItem);
        });
    }
}

updateData();   /* so it updates every time the page is loaded*/

