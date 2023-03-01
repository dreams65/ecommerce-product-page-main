import './pages/index.scss';

import {
  productPreviewImg,
  productPreviewItems,
  parentThumnails,
  lightBoxPopup,
  lightBoxPopupCloseBtn,
  sliderPreviewItems,
  sliderItems,
  sliderNextBtn,
  sliderPrevBtn,
  lightBoxPreview,
  counter,
  cartCounter,
  productQuantity,
  productImg,
  productName,
  cartPopup,
  cartMain,
  addProductBtn,
  cartPopupBtn,
} from "./utils/constants.js";

const headerBurgerBtn = document.querySelector('.header__burger-btn');
const headerBurgerLine = document.querySelector('.header__burger-btn_line');
const mobileMenu = document.querySelector('.header__mobile-side-bar');

headerBurgerBtn.addEventListener('click', mobileMenuHandler)

function mobileMenuHandler() {
  headerBurgerLine.classList.toggle('header__burger-btn_line_active');
  mobileMenu.classList.toggle('header__mobile-side-bar_active')
}

let productObj = {
  itemImg: productImg,
  itemName: productName,
};

class CalculationPrice {
  static sumCalculation() {
    let count = 1;
    let price = document.querySelector('.product__price-value').textContent;
    counter.addEventListener('click', (e) => {
      if (e.target.classList.contains('counter__btn_plus')) {
        count++;
        if (count > 9) {
          return count = 9;
        }
        let sum = price * count;
        productQuantity.textContent = count;
        document.querySelector('.product__price-value').textContent = sum + '.00';
        productObj.productQuantity = count;
        productObj.total = sum;
      }
      if (e.target.classList.contains('counter__btn_minus')) {
        count--;
        if (count < 1) {
          return count = 0;
        }
        let sum = price * count;
        productQuantity.textContent = count;
        document.querySelector('.product__price-value').textContent = sum + '.00';
        productObj.productQuantity = count;
        productObj.total = sum;
      }
    })
    if (count == 0) productObj.productQuantity = 1;
  }
}

CalculationPrice.sumCalculation();

class Cart {
  static renderCartItem() {
    let acc = '';
    for (const key in productObj) {
      let item = `<div class="cart-item">
      <img class="cart-item__img" src="${productObj.itemImg}" alt="product-thumbnail">
      <h2 class="cart-item__title">${productObj.itemName}</h2>
      <p class="cart-item__price">$125.00<span> x ${productObj.productQuantity}</span></p>
      <p class="cart-item__total-price">$${productObj.total}.00</p>
      <button class="cart-item__remove-btn"></button>
      </div>
      </div>`
      acc = item;
      if (productObj.productQuantity > 0) {
        cartCounter.style.visibility = 'visible';
      }
      cartCounter.textContent = productObj.productQuantity;
    }
    cartMain.innerHTML = acc;
  }

  static removeCartItem() {
    cartMain.addEventListener('click', (e) => {
      if (e.target.classList.contains('cart-item__remove-btn')) {
        e.target.parentElement.remove();
        productObj.productQuantity = 0;
        cartCounter.textContent = productObj.productQuantity;
        cartMain.innerHTML = `<p class='cart-popup__main-empty'>Your cart is empty</p>`
      }
    })
  }

}

addProductBtn.onclick = () => { Cart.renderCartItem() }
Cart.removeCartItem();
cartPopupBtn.onclick = () => {
  cartPopup.classList.toggle('_active');
}

class LightBox {
  constructor(sellectorPreview, sellectorPreviewItms, parentThumnails, popup, popupCloseBtn, ligthBoxPreview) {
    this.sellectorPreview = sellectorPreview;
    this.sellectorPreviewItms = sellectorPreviewItms;
    this.parentThumnails = parentThumnails;
    this.popup = popup;
    this.popupCloseBtn = popupCloseBtn;
    this.lightBoxPreview = ligthBoxPreview;
    this.srcImg = '';
  }

  changePreview() {
    this.sellectorPreviewItms.addEventListener('click', (e) => {
      this.parentThumnails.forEach(element => {
        element.classList.remove('product__preview-item_active')
      });

      if (e.target.classList.contains('product__preview-thumbnail')) {
        this.sellectorPreview.style.backgroundImage = `url('${e.target.dataset.src}')`;
        e.target.parentElement.classList.add('product__preview-item_active');
        this.srcImg = e.target.dataset.src;
        this.lightBoxPreview.style.backgroundImage = `url('${this.srcImg}')`
      }

    })
  }

  open() {
    this.sellectorPreview.onclick = () => {
      this.popup.classList.add('popup_active');
    }
  }

  close() {
    this.popupCloseBtn.onclick = () => {
      this.popup.classList.remove('popup_active');
    }
  }

}

class Slider extends LightBox {
  constructor(sellectorPreview, sellectorPreviewItms, parentThumnails, sliderNextBtn, sliderPrevBtn) {
    super(sellectorPreview, sellectorPreviewItms, parentThumnails)
    this.sliderNextBtn = sliderNextBtn;
    this.sliderPrevBtn = sliderPrevBtn;
    this.count = 0;
  }

  changePreview() {
    return super.changePreview();
  }

  next() {
    this.sliderNextBtn.onclick = () => {
      if (this.count + 1 < this.parentThumnails.length) {
        this.count++;
      } else {
        this.count = 0;
      }

      for (let i = 0; i < this.parentThumnails.length; i++) {
        this.parentThumnails[i].classList.remove('product__preview-item_active');
      }

      this.parentThumnails[this.count].classList.add('product__preview-item_active');

      this.sellectorPreview.style.backgroundImage =
        `url('${this.parentThumnails[this.count].querySelector('.popup__lightbox-item_thumbnail').dataset.src}')`
    }

  }

  prev() {
    this.sliderPrevBtn.onclick = () => {
      if (this.count - 1 < this.parentThumnails.length) {
        this.count--;
      }
      if (this.count <= -1) {
        this.count = this.parentThumnails.length - 1;
      }

      for (let i = 0; i < this.parentThumnails.length; i++) {
        this.parentThumnails[i].classList.remove('product__preview-item_active');
      }

      this.parentThumnails[this.count].classList.add('product__preview-item_active');
      this.sellectorPreview.style.backgroundImage =
        `url('${this.parentThumnails[this.count].querySelector('.popup__lightbox-item_thumbnail').dataset.src}')`
    }
  }

}

const lightBox = new LightBox
  (
    productPreviewImg,
    productPreviewItems,
    parentThumnails,
    lightBoxPopup,
    lightBoxPopupCloseBtn,
    lightBoxPreview
  );

lightBox.changePreview();
lightBox.open();
lightBox.close();

const slider = new Slider
  (lightBoxPreview,
    sliderPreviewItems,
    sliderItems,
    sliderNextBtn,
    sliderPrevBtn
  );

slider.changePreview();
slider.next();
slider.prev();