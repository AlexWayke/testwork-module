"use strict"
// Containers =========================
const productContainer = document.querySelector('.catalog-template');
const categoriesContainer = document.querySelector('.catalog-categories');


// Tab handler ========================

categoriesContainer.addEventListener('click', (event)=> {
    if (event.target.tagName !== 'LI') return false;

    let filterClass = event.target.dataset['id'];

    productContainer.innerHTML = '';

    getProducts(filterClass);
    
    removeActive()
    addActive(event.target)
})

// Functions ==========================

const addActive = function(e){
    e.classList.add('active');
}


const removeActive = function() {
    categoriesContainer.querySelector('.active').classList.remove('active');
}


const getCategories = async function() {
    const response = await fetch('./bd.json');
    const productArray = await response.json();
    renderCategories(productArray.categories);
};


const renderCategories = function(obj){
    obj.forEach(function(item) {
        const categoryHTML = `
            <li data-id="${item.categoryId}" class="catalog-category--item">${item.categoryName}</li>
        `
        categoriesContainer.insertAdjacentHTML('beforeend', categoryHTML);
    });
    document.querySelector('.catalog-category--item').classList.add('active');
}


const getProducts = async function(i) {
    const response = await fetch('./bd.json');
    const productArray = await response.json();
    renderProducts(productArray.products, i);
};


const renderProducts = function(obj,i) {
    obj.forEach(function(item) {
        if (item.categoryId == i){
            const productHTML = `
            <div class="product">
                <div class="product-img">
                    <img src="//rrstatic.retailrocket.net/test_task/tovar.jpg" alt="product image">
                </div>
                <p class="product-title">${item.productName}</p>
            </div>
            `
            productContainer.insertAdjacentHTML('beforeend', productHTML);
        }
    });
};

// Functions page onload ==============

getCategories();
getProducts(1);