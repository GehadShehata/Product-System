var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCateg = document.getElementById("productCateg");
var productDesc = document.getElementById("productDesc");
var productCount = document.getElementById("productCount")
var productContainer;


if (localStorage.getItem("ourProducts") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("ourProducts"));
  displaypro();
}


function addproduct() {
  if (
    productName.value.trim() === "" ||
    productPrice.value.trim() === "" ||
    productCateg.value.trim() === "" ||
    productDesc.value.trim() === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  var product = {
    pName: productName.value,
    price: productPrice.value,
    categ: productCateg.value,
    desc: productDesc.value,
    count: productCount.value
  };

  var existingIndex = productContainer.findIndex(function (obj) {
    return obj.count === product.count;
  });

  if (existingIndex !== -1) {
    productContainer[existingIndex] = product;
  } else {
    productContainer.push(product);
  }

  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  displaypro();
  clear();
}


function updateCount() {
  var count = parseInt(productCount.value);
  if (!isNaN(count) && count >= 1) {
    var rowCount = document.getElementById("tBody").rows.length;
    if (rowCount < count) {
      for (var i = rowCount; i < count; i++) {
        productContainer.push({
          pName: "",
          price: "",
          categ: "",
          desc: "",
          count: 1
        });
      }
    } else if (rowCount > count) {
      productContainer.splice(count, rowCount - count);
    }

    localStorage.setItem("ourProducts", JSON.stringify(productContainer));
    displaypro();
  }
}


function displaypro() {
  var productList = "";
  for (var i = 0; i < productContainer.length; i++) {
    productList += `
    <tr data-index="${i}">
      <td>${i + 1}</td>
      <td>${productContainer[i].pName}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].categ}</td>
      <td>${productContainer[i].desc}</td>
      <td>${productContainer[i].count}</td>
      <td>
        <button class="btn btn-danger" onclick="deleterow(${i})">Delete</button>
      </td>
      <td>
        <button class="btn btn-warning" onclick="editProduct(${i})">EDIIT</button>
      </td>

    </tr>`;
  }
  document.getElementById("tBody").innerHTML = productList;
}

function deleterow(i) {
  if (productContainer[i].count > 1) {
    productContainer[i].count -= 1;
  } else {
    productContainer.splice(i, 1);
  }
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  displaypro();
}




function clear() {
  productName.value = "";
  productPrice.value = "";
  productCateg.value = "";
  productDesc.value = "";
}

function deleteAll() {
  productContainer.splice(0);
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  displaypro();
}


function searchProduct(kelma) {
  var productList2 =""
  for(var i = 0 ; i < productContainer.length ; i++ ){
     if( productContainer[i].pName.includes(kelma.trim().toLowerCase()) == true   ){
        productList2+= `
        <tr>
           <td>${i + 1}</td>
           <td>${productContainer[i].pName}</td>
           <td>${productContainer[i].price}</td>
           <td>${productContainer[i].categ}</td>
           <td>${productContainer[i].desc}</td>
           <td> <button class="btn btn-danger" onclick="deleteRow(${i})">Delete</button> </td>
           <td> <button class="btn btn-warning">Update</button> </td>
           </tr> `
     }
  }
  document.getElementById("tBody").innerHTML = productList2

}
function editProduct(i) {
  productName.value = productContainer[i].pName;
  productPrice.value = productContainer[i].price;
  productCateg.value = productContainer[i].categ;
  productDesc.value = productContainer[i].desc;
  productCount.value = productContainer[i].count;

  var editButton = document.getElementById("editButton" + i);
  editButton.textContent = "Save";
  editButton.className = "btn btn-success";
  editButton.onclick = function() {
    productContainer[i].pName = productName.value;
    productContainer[i].price = productPrice.value;
    productContainer[i].categ = productCateg.value;
    productContainer[i].desc = productDesc.value;
    productContainer[i].count = productCount.value;
    
    clear();
    displaypro();
    editButton.textContent = "Edit";
    editButton.className = "btn btn-warning";
    editButton.onclick = function() {
      editProduct(i);
    };
  };
}
