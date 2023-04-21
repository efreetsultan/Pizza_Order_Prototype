const mammaMiaButton = document.getElementById('menu-show-allergens');
const hideButton = document.getElementById('hide-checkboxes-button');
const checkboxContainer = document.getElementById('menu-allergen-container-checkboxes');

const allergenContainer = document.getElementById('menu-allergen-container');
const addToCartButton = document.querySelectorAll('.add-to-cart');

addToCartButton.forEach(cartButton => {
  cartButton.addEventListener('click', () => {
    alert('The selected pizza(s) is added to your cart!');
  })
});

async function fetchMenuJson() {
  let response = await fetch('http://127.0.0.1:9001/api/allergens')
  return response.json();
}

mammaMiaButton.addEventListener('click', () => {
  mammaMiaButton.style.display = 'none';
  hideButton.style.display = 'block';
  checkboxContainer.style.display = 'block'
  checkBoxListener();
});

hideButton.addEventListener('click', () => {
  mammaMiaButton.style.display = 'block';
  hideButton.style.display = 'none';
  checkboxContainer.style.display = 'none';
})

function checkBoxListener() {
  checkboxContainer.addEventListener('click', (event) => {
    const allergens = document.querySelectorAll('.checkbox-class');
    const pizzas = document.querySelectorAll('.menu-item-container');
    for (let i = 0; i < allergens.length; i++) {
      if (pizzas[i].innerText.includes(event.target.id)) {
        pizzas[i].style.display = event.target.checked ? 'none' : 'flex';
      }
    }
  })
}