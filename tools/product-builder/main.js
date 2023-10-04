const productForm = document.querySelector('#productForm');
const imageAddBtn = document.querySelector('#imageAddBtn');
const imageInputs = document.querySelector('#imageInputs');
const signInForm = document.querySelector('#signInForm');

const prevTitle = document.getElementById('prev-title');
const prevDescription = document.getElementById('prev-description');
const prevThumbnail = document.getElementById('prev-thumbnail');
const prevBrand = document.getElementById('prev-brand');
const prevIssueDate = document.getElementById('prev-issue-date');
const prevStock = document.getElementById('prev-stock');
const prevWarranty = document.getElementById('prev-warranty');
const prevPriceCurrent = document.getElementById('prev-price-current');
const prevCurrency = document.getElementById('prev-currency');
const prevBeforeDiscount = document.getElementById('prev-before-discount');
const prevDiscountPercentage = document.getElementById(
  'prev-discount-percentage',
);
const prevCategoryName = document.getElementById('prev-category-name');
const prevCategoryImage = document.getElementById('prev-category-image');
const prevImages = document.getElementById('prev-images');

const CATEGORIES = {
  laptops: {
    id: '1',
    name: 'laptops',
    image:
      'https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png',
  },
  phones: {
    id: '2',
    name: 'phones',
    image: 'https://cdn-icons-png.flaticon.com/512/0/191.png',
  },
};

const baseURL = 'https://api.everrest.educata.dev';
let imageCount = 0;

if (localStorage.getItem('creds')) {
  const data = JSON.parse(localStorage.getItem('creds'));
  document.querySelector('#email').value = data.email;
  document.querySelector('#password').value = data.password;
}

if (localStorage.getItem('data')) {
  const data = JSON.parse(localStorage.getItem('data'));
  document.querySelector('#title').value = data.title;
  document.querySelector('#description').value = data.description;
  document.querySelector('#brand').value = data.brand;
  document.querySelector('#issueDate').value = data.issueDate;
  document.querySelector('#stock').value = data.stock;
  document.querySelector('#warranty').value = data.warranty;
  document.querySelector('#thumbnail').value = data.thumbnail;
  document.querySelector('#priceCurrent').value = data.price.current;
  document.querySelector('#priceCurrency').value = data.price.currency;
  document.querySelector('#priceBeforeDiscount').value =
    data.price.beforeDiscount;
  document.querySelector('#priceDiscountPercentage').value =
    data.price.discountPercentage;
  document.querySelector('#category').value = data.category.name;

  data.images.forEach((image, index) => {
    appendImageInput(image, index);
  });

  renderPreview();
}

signInForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const email = formData.get('email');
  const password = formData.get('password');
  sendRequest('POST', `${baseURL}/auth/sign_in`, {
    email,
    password,
  }).then((res) => {
    console.log(res);
    if (res.errorKeys && res.errorKeys.length) {
      displayError(signInForm, res.errorKeys);
    } else {
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
    }
  });
});

productForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(productForm);
  const images = [];
  document.querySelectorAll('.images').forEach((image) => {
    if (image.value) {
      images.push(image.value);
    }
  });
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    brand: formData.get('brand'),
    issueDate: new Date(
      formData.get('issueDate') || '2023-09-08',
    ).toISOString(),
    stock: Number(formData.get('stock')),
    warranty: Number(formData.get('warranty')),
    thumbnail: formData.get('thumbnail'),
    price: {
      current: Number(formData.get('priceCurrent')),
      currency: formData.get('priceCurrency'),
      beforeDiscount: Number(formData.get('priceBeforeDiscount')),
      discountPercentage: Number(formData.get('priceDiscountPercentage')),
    },
    category: CATEGORIES[formData.get('category')],
    images,
  };
  sendRequest('POST', `${baseURL}/shop/products`, data).then((res) => {
    localStorage.removeItem('data');

    if (res.errorKeys && res.errorKeys.length) {
      localStorage.setItem('data', JSON.stringify(data));
      displayError(productForm, res.errorKeys);
    } else {
      localStorage.removeItem('data');
      location.reload();
    }
  });
});

imageAddBtn.addEventListener('click', () => {
  imageCount++;
  appendImageInput('', imageCount);
});

function appendImageInput(image, id) {
  const control = document.createElement('div');
  control.classList.add('form-group', 'col-12');

  control.innerHTML = `
    <label for="images-${id}" class="form-label">image ${id}</label>
    <input type="text" placeholder="Enter images" value="${image}" name="images-${id}" id="images-${id}" class="form-control images">
  `;

  imageInputs.appendChild(control);
}

async function sendRequest(method, url, body = {}) {
  const errorMsg = document.getElementById('error-message');
  if (errorMsg) errorMsg.remove();

  const token = localStorage.getItem('access_token');

  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
      Authorization: token ? `Bearer ${token}` : '',
    },
  }).then((res) => res.json());
}

productForm.addEventListener('input', renderPreview);

function renderPreview() {
  const formData = new FormData(productForm);
  prevTitle.textContent = formData.get('title');
  prevDescription.textContent = formData.get('description');
  prevThumbnail.setAttribute('src', formData.get('thumbnail') || '');
  prevBrand.textContent = formData.get('brand');
  prevIssueDate.textContent = new Date(
    formData.get('issueDate'),
  ).toLocaleDateString();
  prevStock.textContent = formData.get('stock');
  prevWarranty.textContent = formData.get('warranty');
  prevPriceCurrent.textContent = formData.get('priceCurrent');
  prevCurrency.textContent = formData.get('priceCurrency');
  prevBeforeDiscount.textContent = formData.get('priceBeforeDiscount');
  prevDiscountPercentage.textContent = formData.get('priceDiscountPercentage');

  const category = CATEGORIES[formData.get('category')];
  if (category) {
    prevCategoryName.textContent = category.name;
    prevCategoryImage.setAttribute('src', category.image);
  }

  prevImages.innerHTML = '';

  document.querySelectorAll('.images').forEach((image) => {
    if (image.value) {
      prevImages.innerHTML += `
      <img
        src="${image.value}"
        width="80"
        height="80"
      />
      `;
    }
  });
}

function displayError(element, messages) {
  const existing = document.getElementById('error-message');
  if (existing) existing.remove();

  const box = document.createElement('div');
  box.setAttribute('id', 'error-message');
  box.classList.add('p-2', 'bg-danger', 'text-light');
  messages.forEach((message) => {
    box.innerHTML += `<p>${message}</p>`;
  });
  element.appendChild(box);
}
