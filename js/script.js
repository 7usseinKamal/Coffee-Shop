let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
const showBars = () => {

    document.querySelector('#menu-btn').addEventListener('click', () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
    });
};
showBars();

let navLinks = [...document.querySelectorAll('.navbar a')];
let sections = Array.from(document.querySelectorAll('section'));

const smoothScroll = () => {
    sections.forEach(section => {
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                if (section.classList.contains(e.target.textContent)) {
                    section.scrollIntoView({
                        behavior: 'smooth'
                    });
                };
            });
        });
    });
};
smoothScroll();

const changeActiveClass = () => {
    window.addEventListener('scroll', () => {
        let sectionId = '';
        sections.forEach(section => {
            let sectionTop = section.offsetTop
            if (scrollY > sectionTop - 100) {
                sectionId = section.className;
            }
        })
        navLinks.forEach(link => {
            link.classList.remove('active')
            if (sectionId === link.textContent) {
                link.classList.add('active')
            }
        })
    })
}
changeActiveClass();

const showSearch = () => {

        document.querySelector('#search-btn').onclick = () =>{
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        cartItem.classList.remove('active');
    }
}
showSearch();

saveData();
(function() {
    let btns = [...document.querySelectorAll(".box .btn")];
    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const data = {};
            data.name = e.target.previousElementSibling.previousElementSibling.textContent;
            let price = e.target.previousElementSibling.textContent;
            data.finalPrice = +price.slice(1, 6);
            data.image = e.target.previousElementSibling.previousElementSibling.previousElementSibling.src;
            data.id = e.target.parentElement.id;

            let getLocalStorage = localStorage.getItem("cartItem");
            if (getLocalStorage == null) {
                listArr = [];
            } else {
                listArr = JSON.parse(getLocalStorage);
            }
            
            for (let i = 0; i < listArr.length; i++) {
                if (listArr[i].id === data.id) {
                    alert("Your item has added to the cart once before!");
                    return;
                }
            }

            listArr.push(data);

            localStorage.setItem("cartItem", JSON.stringify(listArr));
            saveData();
            alert("Your item has added to the cart");
        })
    })
    let cartIcon = [...document.querySelectorAll('.box .icons .fa-shopping-cart')];
    console.log(cartIcon);
    cartIcon.forEach(icon => {
        icon.addEventListener('click', e => {
            e.preventDefault();
            const data = {}
            data.name = e.target.parentElement.nextElementSibling.nextElementSibling.children[0].textContent;
            let price = e.target.parentElement.nextElementSibling.nextElementSibling.children[2].textContent;
            data.finalPrice = +price.slice(1, 6);
            data.image = e.target.parentElement.nextElementSibling.children[0].src;
            data.id = e.target.parentElement.id;

            let getLocalStorage = localStorage.getItem("cartItem");
            if (getLocalStorage == null) {
                listArr = [];
            } else {
                listArr = JSON.parse(getLocalStorage);
            };

            for (let i = 0; i < listArr.length; i++) {
                if (listArr[i].id === data.id) {
                    alert("Your item has added to the cart once before!");
                    return;
                }
            }

            listArr.push(data);

            localStorage.setItem("cartItem", JSON.stringify(listArr));
            saveData();
            alert("Your item has added to the cart");
        })
    })
})()

function saveData() {
    let cartContainer = document.querySelector('.cart-items-container');
    let checkBtn = document.querySelector('.check')
    
    let getLocalStorage = localStorage.getItem("cartItem");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }

    let result = ''
    listArr.forEach(elm => {
        result += `
            <div class="cart-item">
                <span class="fas fa-times" id=${elm.id}></span>
                <img src=${elm.image} alt="">
                <div class="content">
                    <h3>${elm.name}</h3>
                    <div class="price">$${elm.finalPrice}/-</div>
                </div>
            </div>
        `
    })
    cartContainer.innerHTML = `
        ${result}
        <a href="#" class="btn check">checkout now</a>
    `;
}

function removeItem() {
    document.addEventListener('click', e => {
        if (e.target.classList.contains('fa-times')) {
            let getLocalStorage = localStorage.getItem("cartItem");
            if (getLocalStorage == null) {
                listArr = [];
            } else {
                listArr = JSON.parse(getLocalStorage);
            }

            let singleItem = listArr.findIndex(item => item.id === e.target.getAttribute('id'));

            // Remove Item from local storage
            listArr.splice(singleItem, 1);
            localStorage.setItem("cartItem", JSON.stringify(listArr));

            e.target.parentElement.remove();
        }
    })
}
removeItem();

const showCart = () => {
    let cartItem = document.querySelector('.cart-items-container');

    document.querySelector('#cart-btn').addEventListener('click', () => {
        cartItem.classList.toggle('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    })
}
showCart();