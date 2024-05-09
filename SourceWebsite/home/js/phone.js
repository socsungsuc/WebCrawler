brand_now = "ALL";
category_now ="phone";
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
function openPanel(){
    document.getElementById("Containerpanel").style.display = "block";
}
function closePanel(){
    document.getElementById("Containerpanel").style.display = "none";
}
let Category = [
    {
        cate: "ALL"
    },
    {
        cate: "IPHONE",
        img: "./image/logo-iphone-220x48.png"
    },
    {
        cate: "SAMSUNG",
        img: "./image/samsungnew-220x48-1.png"
    },
    {
        cate: "OPPO",
        img: "./image/OPPO42-b_5.jpeg"
    },
    {
        cate: "XIAOMI",
        img: "./image/logo-xiaomi-220x48-5.png"
    },
    {
        cate: "VIVO",
        img: "./image/vivo-logo-220-220x48-3.png"
    },
    {
        cate: "REALME",
        img: "./image/Realme42-b_37.png"
    },
    {
        cate: "NOKIA",
        img: "./image/Nokia42-b_21.jpeg"
    },
    {
        cate: "MASSTEL",
        img: "./image/Masstel42-b0-200x48-1.png"
    },
    {
        cate: "ITEL",
        img: "./image/logo-itel-149x40.png"
    },
    {
        cate: "MOBELL",
        img: "./image/Mobell42-b_19.jpeg"
    }
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

    updateList({category: 'phone', name: brand_now});
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
function render_phoneItems(listData){
    const listItems = document.getElementById("list_product");
    let eleRender = "";

    listData.forEach((i) => {
        eleRender += `<div class = "phone"> 
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
  //  console.log("hello");
    var FilterEle = thisEle.textContent;
    FilterEle.trim();
    filter_now.trim();
    console.log(FilterEle, filter_now);
    removeClassActiveItemMenu();

    updateList({category: 'phone', [filter_now]: [FilterEle]});
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
            render_phoneItems(response);
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
console.log(filter_list);
filter_list.forEach(function (filter) {
    filter.addEventListener("click", render_FILTER);
});

render_brand();
updateList({category: 'phone', name:null});