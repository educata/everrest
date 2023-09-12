const productForm = document.querySelector('#productForm');
const imageAddBtn = document.querySelector('#imageAddBtn');
const imageInputs = document.querySelector('#imageInputs');
const signInForm = document.querySelector('#signInForm');

const baseURL = 'https://everrest.educata.dev';
let imageCount = 0;

if (localStorage.getItem('creds')) {
  const data = JSON.parse(localStorage.getItem('creds'));
  document.querySelector('#email').value = data.email;
  document.querySelector('#password').value = data.password;
}

signInForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const email = formData.get('email');
  const password = formData.get('password');
  sendRequest('POST', `${baseURL}/auth/sign_in`, {
    email,
    password,
  })
    .then((result) => {
      console.log(result);
      localStorage.setItem('creds', JSON.stringify({ email, password }));
    })
    .catch((err) => [console.log(err)]);
});

productForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const images = [];
  document.querySelectorAll('.images').forEach((image) => {
    if (image.value) {
      images.push(image.value);
    }
  });
  const data = {
    title: formData.get('title'),
    description: formData.get('title'),
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
    category: {
      id: formData.get('categoryId'),
      name: formData.get('categoryName'),
      image: formData.get('categoryImage'),
    },
    images,
  };
  console.log(data);
});

imageAddBtn.addEventListener('click', () => {
  imageCount++;
  imageInputs.innerHTML += `
    <div class="form-group col-12">
      <label for="images-${imageCount}" class="form-label">images ${imageCount}</label>
      <input type="text" placeholder="Enter images" name="images-${imageCount}" id="images-${imageCount}" class="form-control images">
    </div>
  `;
});

function sendRequest(METHOD, url, body = {}) {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open(METHOD, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    xhr.onloadend = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(JSON.parse(xhr.responseText));
      }
    };
  });
}
