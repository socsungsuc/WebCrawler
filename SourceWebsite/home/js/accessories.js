brand_now = "ALL";
category_now ='other';
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


function render_AccessoryItems(listData){
    const listItems = document.getElementById("list_product");
    let eleRender = "";

    listData.forEach((i) => {
        eleRender += `<div class = "Accessories"> 
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
            render_AccessoryItems(response);
            updateNumProduct(response.length);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

updateList({category: 'Other'});

function openPanel(){
    document.getElementById("Containerpanel").style.display = "block";
}
function closePanel(){
    document.getElementById("Containerpanel").style.display = "none";
}