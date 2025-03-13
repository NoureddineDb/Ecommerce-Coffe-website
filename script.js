
let search = document.querySelector(".search-box");
let links=document.querySelector(".links")
document.querySelector('#search-icon').onclick = () => {  
    search.classList.toggle('active');
    links.classList.remove('active');
}

document.querySelector("#menu-icon").onclick = () =>{
   links.classList.toggle('active');
   search.classList.remove('active');

}
window.onscroll= () => {
    links.classList.remove('active');
    search.classList.remove('active');
}

// slider :
const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})
/* add to card */
document.addEventListener("DOMContentLoaded", function () {
    let iconcard = document.querySelector(".bx-cart-alt");
    let body = document.querySelector("body");
    let listCartHTML = document.querySelector(".listCart");
    let closeCart = document.querySelector(".close");
    let iconCartSpan = document.querySelector(".icon-cart span");
    let listProductHTML = document.querySelector(".product-container");
    let listProducts = []; // Assume this will be populated with product data
    let cart = [];

    // Toggle cart visibility
    iconcard.addEventListener("click", () => {
        body.classList.toggle("Showcart");
    });

    closeCart.addEventListener("click", () => {
        body.classList.remove("Showcart");
    });

    // Add product to cart
    listProductHTML.addEventListener("click", (event) => {
        const positionClick = event.target;
        if (positionClick.classList.contains("card-btn")) {
            const id_product = positionClick.closest(".add-to-card").getAttribute("data-id");
            addToCart(id_product);
        }
    });

    // Add item to cart
    const addToCart = (product_id) => {
        const existingItemIndex = cart.findIndex(item => item.product_id === product_id);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push({ product_id, quantity: 1 });
        }
        updateCartUI();
    };

    // Update cart UI
    const updateCartUI = () => {
        listCartHTML.innerHTML = "";
        let totalQuantity = 0;
        cart.forEach((item) => {
            totalQuantity += item.quantity;
            const product = listProducts.find(p => p.id === item.product_id);
            if (product) {
                const newItem = document.createElement("div");
                newItem.classList.add("item");
                newItem.innerHTML = `
                    <div class="image" >
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="totalPrice">$${product.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus">+</span>
                    </div>`;
                listCartHTML.appendChild(newItem);
            }
        });
        iconCartSpan.innerText = totalQuantity;
    };

    // Event listener for cart item quantity change
   listCartHTML.addEventListener("click", (event) => {
        const positionClick = event.target;
        if (positionClick.classList.contains("minus") || positionClick.classList.contains("plus")) {
            const product_id = positionClick.closest(".item").getAttribute("data-id");
            const type = positionClick.classList.contains("plus") ? "plus" : "minus";
            changeQuantityCart(product_id, type);
        }
    });


    // Change quantity of cart item
    const changeQuantityCart = (product_id, type) => {
        const itemIndex = cart.findIndex(item => item.product_id === product_id);
        if (itemIndex !== -1) {
            if (type === "plus") {
                cart[itemIndex].quantity++;
            } else {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1);
                }
            }
            updateCartUI();
        }
    };

    // Initialize app
    const initApp = () => {
        // Fetch product data from JSON file or API
        fetch("product.json")
            .then((response) => response.json())
            .then((data) => {
                listProducts = data; // Assuming product data is an array of objects
                // Populate product HTML
                addDataToHTML();
                // Get cart data from local storage if available
                const storedCart = JSON.parse(localStorage.getItem("cart"));
                if (storedCart) {
                    cart = storedCart;
                    updateCartUI();
                }
            })
            .catch((error) => console.error("Error loading products:", error));
    };

    // Populate product HTML
const addDataToHTML = () => {
        listProductHTML.innerHTML = '';
        listProducts.forEach((product) => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('product-card');
            newProduct.dataset.name = product.name;
            newProduct.innerHTML = `
                <div class="product-image" >
                    <img src="${product.image}" class="product-thumb" alt="">
                    <div class="add-to-card" data-id="${product.id}"><button class="card-btn">add to cart</button></div>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">${product.name}</h2>
                    <span class="price">$20</span><span class="actual-price">$${product.price}</span>
                </div>`;
               
            listProductHTML.appendChild(newProduct);
            console.log( listProductHTML);
        });
    };

    // Initialize the application
    initApp();


});



// Function to derive category from product name :

const filrerButtons = document.querySelectorAll(".buttons button ");
// Define the filter Boxx function :
const filtrerboxx = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    // iterate over each filterable Boxx :
   }
// Add click event listner to each filtrer button :
filrerButtons.forEach(button => button.addEventListener("click" , filtrerboxx ))


function filterProducts(category) {
    console.log("Filtering for category:", category); 

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const cardCategory = card.dataset.name;
        console.log("Card category:", cardCategory); 

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Log dataset.name attribute values of filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    console.log("Filter button dataset.name:", button.dataset.name);
    button.addEventListener('click', () => {
        const filterName = button.dataset.name;
        filterProducts(filterName);
    });
});

// Code search :
document.addEventListener("DOMContentLoaded", function() {
    
    const productList = document.querySelectorAll('.BOXX');

    search.addEventListener('input', function(event) {
        const searchTerm = event.target.value.toLowerCase().trim();

        productList.forEach(function(product) {
            const productText = product.textContent.toLowerCase();
            
            if (productText.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});









