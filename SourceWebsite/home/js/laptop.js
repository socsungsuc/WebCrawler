brand_now = "ALL";
category_now ='laptop';
var filter_now = null;
var FilterEle_now = null;
let minVal = 0;
let maxVal = 100000000;
var tabSearch = document.getElementById("twotabsearchtextbox");
tabSearch.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) { // kiểm tra nếu phím nhấn là Enter
    event.preventDefault(); // ngăn chặn trang web chuyển đến URL khác
    var textSearch = tabSearch.value.trim(); 
    tabSearch.value = ''; // đặt lại giá trị của phần tử input thành một xâu rỗng
    updateList({category: category_now, name:textSearch});
  }
});


let Category = [
    {
        cate: "ALL",
    },
    {
        cate: "MacBook",
        img: "./image/logo-macbook-149x40.png"
    },
    {
        cate: "ASUS",
        img: "./image/logo-asus-149x40.png"
    },
    {
        cate: "HP",
        img: "./image/logo-hp-149x40-1.png"
    },
    {
        cate: "LENOVO",
        img: "./image/logo-lenovo-149x40.png"
    },
    {
        cate: "ACER",
        img: "./image/logo-acer-149x40.png"
    },
    {
        cate: "DELL",
        img: "./image/logo-dell-149x40.png"
    },
    {
        cate: "MSI",
        img: "./image/logo-msi-149x40.png"
    },
    {
        cate: "SURFACE",
        img: "./image/logo-surface-149x40-1.png"
    },
    {
        cate: "ITEL",
        img: "./image/logo-itel-149x40.png"
    },
    {
        cate: "MASSTEL",
        img: "./image/Masstel42-b0-200x48-1.png"
    },
    {
        cate: "CHUWI",
        img: "./image/logo-chuwi-149x40.png"
    },
    {
        cate: "LG",
        img: "./image/logo-lg-149x40.png"
    },
]

function render_brand(){
    const categoryEle = document.getElementById("product-category");
    let eleRender = "";

    Category.forEach((i) => {
        if (i.cate === "ALL"){
            eleRender += 
            `
                <li class = "" onclick="cateFilter(this)">
                    <p class = "all">${i.cate}</p>
                </li>
            `;
        } else{
            eleRender += 
            `
                <li class = "" onclick="cateFilter(this)">
                    <p>${i.cate}</p>
                    <img src = "${i.img}">
                </li>
            `;
        }
    });

    if (categoryEle) categoryEle.insertAdjacentHTML("beforeend", eleRender);
}
function cateFilter(thisEle){
    removeClassActiveItemMenu();
    brand_now = thisEle.textContent.trim();
    updateList({category: [category_now], name: brand_now});
}
function convertToThousandSeparator(number) {

    let numberStr = number.toString();
  
    const length = numberStr.length;
    const insertIndex = length % 3 > 0 ? length % 3 : 0;
  
    let result = numberStr.slice(0, insertIndex);
    let i = insertIndex;
    while (i < length) {
      if (result.length > 0) {
        result += ",";
      }
      result += numberStr.slice(i, i + 3);
      i += 3;
    }
  
    result += "đ";
  
    return result;
}
  

function render_LaptopItems(listData){
    const listItems = document.getElementById("list_product");
    let eleRender = "";

    listData.forEach((i) => {

        eleRender += `<div class = "Laptop"> 
            <a href = "${i.url}">
                <img src = "${i.image_urls}">
                <div class = "infor-lap">
                    <p class = "name-product">${i.name}</p>
                    <p class = "price-product">${convertToThousandSeparator(i.price)}</p>
                </div>
            </a>
        </div>
        `;
    });
    if (listItems) listItems.innerHTML = eleRender;
}


function removeClassActiveItemMenu(){
    const brandEle = document.getElementById("product-category");
    for (let i of brandEle.children){
        i.removeAttribute("class");
    }
}

function Filter(thisEle){
    FilterEle_now = thisEle.textContent;
    FilterEle_now.trim();
    filter_now.trim();
    removeClassActiveItemMenu();

    updateList({category: category_now,name:brand_now, [filter_now]: [FilterEle_now], minVal:[minVal], maxVal:[maxVal]});
}
function updateNumProduct(numProduct) {
    var productsDiv = document.getElementById("num_products");
    productsDiv.innerHTML = "Có " + numProduct + " sản phẩm";
}
function updateList(dataType){
    // Gửi dữ liệu lên server
    $.ajax({
        url: '/update',
        type: 'POST',
        data: dataType,
        success: function(response) {
            render_LaptopItems(response);
            updateNumProduct(response.length);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
function render_FILTER(event) {
    // Lấy thẻ FILTER tương ứng với thẻ li được click
    var filter = event.currentTarget.querySelector(".FILTER");
    
    var filter_list = document.querySelectorAll(".FILTER");
    for (var i = 0; i < filter_list.length; i++) {
      if (filter_list[i] !== filter) {
        filter_list[i].style.display = "none";
      }
    }
    // var prop = filter.querySelector("p").innerHTML;
    // console.log(prop);
    
    // Kiểm tra trạng thái của thuộc tính display
    if (filter.style.display === "none") {
      // Nếu đang ẩn, hiển thị thẻ FILTER
      filter.style.display = "block";
    } else {
      // Nếu đang hiển thị, ẩn thẻ FILTER
      filter.style.display = "none";
    }
    filter_now = event.currentTarget.classList[0];
    
    
}
var filter_list = document.querySelectorAll(".PRODUCT-FILTER li");
filter_list.forEach(function (filter) {
    filter.addEventListener("click", render_FILTER);
});

render_brand();
updateList({category: category_now, name:null});

function openPanel(){
    document.getElementById("Containerpanel").style.display = "block";
}
function closePanel(){
    document.getElementById("Containerpanel").style.display = "none";
}