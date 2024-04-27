const btnBox = document.querySelector(".btn-box");
const searchInput = document.querySelector("#search");
const listItem = document.querySelector(".container-center");
const all = document.querySelector(".container");
const price = document.querySelector(".list-price")
const time = document.querySelector(".list-time")

let allProductsData = [];

// const app = axios.create({
//   baseURL: "http://localhost:3000/transactions",
// });

document.addEventListener("DOMContentLoaded", async() => {
  const {data} = await  axios
    .get("http://localhost:3000/transactions")
    .then((res) => res)
    .catch((err) => console.log(err));
    renderProducts(data)
});

function renderProducts(products) {
 
  listItem.innerHTML = "";
  let result = "";
  products.forEach((item) => {
    const productDiv = document.createElement("table");
    productDiv.classList.add("list");
    result += `
      <p class="list-id">${item.id}</p>
      <p class="list-type" style="color:var(--color-success)">${item.type}</p>
      <p class="list-price">${item.price}</p>
      <p class="list-refId">${item.refId}</p>
      <p class="list-time">${new Date().toLocaleDateString(
        "fa-IR"
      )}</p>`;
    listItem.appendChild(productDiv);
  });
  listItem.innerHTML= result
}

searchInput.addEventListener("input", async(e) => {
  // console.log(e.target.value);
  const item = e.target.value;
   const {data} = await axios
    .get(`http://localhost:3000/transactions?_refid_+like=${item}`)
    .then((res) => res)
    .catch((err) => console.log(err));
    
  renderProducts(data);
}
);
price.addEventListener("click",async(e)=>{
  const price = e.target.value;
  const {data} = await axios
  .get(`http://localhost:3000/transactions?_sort=price&_order=asc${price}`)
  .then((res) => res)
  .catch((err) => console.log(err));
  renderProducts(data);
})
time.addEventListener("click",async(e)=>{
  const price = e.target.value;
  const {data} = await axios
  .get(`http://localhost:3000/transactions?_sort=price&_order=asc${price}`)
  .then((res) => res)
  .catch((err) => console.log(err));
  renderProducts(data);

  // const {_data} = await axios
  // .get(`http://localhost:3000/transactions?_sort=price&_order=dasc${price}`)
  // .then((res) => res)
  // .catch((err) => console.log(err));
  // renderProducts(_data);
})

