let products = JSON.parse(localStorage.getItem('products')) || [];
let currentIndex = -1;

function displayProducts() {
    let cartona = '';
    products.forEach((product, index) => {
        cartona += `
            <div class="card my-3" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="Product Image">
                <div class="card-body">
                    <h5 class="card-title" style="color: blue;">${product.name}</h5>
                    <p class="card-text"><strong>Type:</strong> ${product.type}</p>
                    <p class="card-text" style="color: green;"><strong>Price:</strong> $${product.price}</p>
                    <p class="card-text"><strong>Description:</strong> ${product.description}</p>
                    <button class="btn btn-warning" onclick="setFormUpdate(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
                </div>
            </div>
        `;
    });
    document.getElementById('productContainer').innerHTML = cartona;
}

function addProduct() {
    let productName = document.getElementById('productName').value;
    let productPrice = document.getElementById('productPrice').value;
    let productDescription = document.getElementById('productDescription').value;

    if (!/^[\w\s]{4,}$/.test(productName)) {
        alert("Product name must be at least 4 characters.");
        return;
    }

    if (!/^\d+$/.test(productPrice)) {
        alert("Price must contain numbers only.");
        return;
    }

    if (!/^.{20,}$/.test(productDescription)) {
        alert("Description must be at least 20 characters.");
        return;
    }

    let reader = new FileReader();
    let imageFile = document.getElementById('productImage').files[0];

    reader.onloadend = function () {
        let product = {
            name: productName,
            type: document.getElementById('productType').value,
            price: productPrice,
            description: productDescription,
            image: reader.result
        };

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        clearForm();
        displayProducts();
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productType').value = 'iPhone';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productImage').value = '';
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

function setFormUpdate(index) {
    currentIndex = index;
    let product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productType').value = product.type;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;

    document.getElementById('submitBtn').classList.add('d-none');
    document.getElementById('updateBtn').classList.remove('d-none');
}

function updateProduct() {
    let reader = new FileReader();
    let imageFile = document.getElementById('productImage').files[0];

    reader.onloadend = function () {
        let product = {
            name: document.getElementById('productName').value,
            type: document.getElementById('productType').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDescription').value,
            image: imageFile ? reader.result : products[currentIndex].image
        };

        products[currentIndex] = product;
        localStorage.setItem('products', JSON.stringify(products));
        clearForm();
        displayProducts();

        document.getElementById('submitBtn').classList.remove('d-none');
        document.getElementById('updateBtn').classList.add('d-none');
        currentIndex = -1;
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        reader.onloadend();
    }
}

function searchProducts() {
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    let cartona = '';
    filteredProducts.forEach((product, index) => {
        cartona += `
            <div class="card my-3">
                <div class="card-body">
                    <h5 class="card-title" style="color: blue;">${product.name}</h5>
                    <p class="card-text"><strong>Type:</strong> ${product.type}</p>
                    <p class="card-text" style="color: green;"><strong>Price:</strong> $${product.price}</p>
                    <p class="card-text"><strong>Description:</strong> ${product.description}</p>
                    <img src="${product.image}" class="img-fluid mb-3" alt="Product Image">
                    <button class="btn btn-warning" onclick="setFormUpdate(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
                </div>
            </div>
        `;
    });
    document.getElementById('productContainer').innerHTML = cartona;
}

document.getElementById('submitBtn').addEventListener('click', addProduct);
document.getElementById('updateBtn').addEventListener('click', updateProduct);
document.getElementById('searchInput').addEventListener('keydown', searchProducts);

displayProducts();
