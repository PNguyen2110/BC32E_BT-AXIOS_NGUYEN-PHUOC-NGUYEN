var productList = [];
//post api

///get api
function getProduct() {
    axios({
        url:'http://svcy.myclass.vn/api/Product/GetAll',
        method:'GET',
    })
    .then(function (response) {
        productList = response.data
        render()
        console.log(productList)
    })
    .catch(function (error) {
        
        console.log(error)
    })
}
getProduct()


function render() {
    var html = '';
    for(var i=0; i<productList.length; i++) {
        var products = productList[i]
        html += 
        `
            <tr id="item-${products.id}">
                <td>${products.id}</td>
                <td>
                    <img class="w-30" src="${products.img}" alt=""> 
                </td>
                <td>${products.name}</td>
                <td>${products.price}</td>
                <td>${products.description}</td>
                <td>${products.type}</td>
                <td>
                    <button onclick="Delete(${products.id})" class="bg-danger "><i class="fa fa-trash"></i></button>
                    <button onclick="Edit(${products.id})" class="bg-primary "><i class="fa fa-edit"></i></button>

                </td>


            </tr>
        

        `
    }
    document.querySelector('.showTable').innerHTML = html;
}

// /// create 


document.getElementById('create').onclick = function (e){
    e.preventDefault();
    var id = document.querySelector('#id').value;
    var name = document.querySelector('#name').value;
    var price = document.querySelector('#price').value;
    var img = document.querySelector('#img').value;
    var type = document.querySelector('#type').value;
    var description = document.querySelector('#description').value;

  var  product = new Product(id, name, price, img, type, description);

  axios({
    url:'http://svcy.myclass.vn/api/Product/CreateProduct',
    method:'POST',
    data: product
  })
  .then(function (response) {
    getProduct()
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
    
  })

  document.querySelector('#reset').click();
}
// Delete product
function Delete(id){
    axios({
        url:`http://svcy.myclass.vn/api/Product/DeleteProduct/${id}`,
        method: 'DELETE'
    })
    .then(function(response) {
        // getProduct()
        var domItemDelete = document.querySelector('#item-'+ id);
        
        if(domItemDelete){
            domItemDelete.remove()
        }
        
        if(document.querySelector('.showTable').innerHTML.trim() === ''){
            getProduct()
           
        }
    })
    .catch(function(error) {
        console.log(error)
    })
    
};

// Edit Product

function Edit(ids){
    axios({
        url:`http://svcy.myclass.vn/api/Product/GetById/${ids}`,
        method:'GET',

    })
    .then(function(response) {
        document.querySelector('#id').value = response.data.id
        document.querySelector('#name').value = response.data.name
        document.querySelector('#price').value = response.data.price
        document.querySelector('#img').value = response.data.img
        document.querySelector('#type').value = response.data.type
        document.querySelector('#description').value = response.data.description

        document.querySelector('#id').disabled = true;
    })
    
}

// update Product 

document.querySelector('#update').onclick = function (e){
    
    e.preventDefault();
    var id = document.querySelector('#id').value;
    var name = document.querySelector('#name').value;
    var price = document.querySelector('#price').value;
    var img = document.querySelector('#img').value;
    var type = document.querySelector('#type').value;
    var description = document.querySelector('#description').value;

    var  productUpdate = new Product(id, name, price, img, type, description);

  axios({
    url: `http://svcy.myclass.vn/api/Product/UpdateProduct/${id}`,
    method:'PUT',
    data: productUpdate
  })
  .then(function (response) {
    getProduct()
   
  })
  .catch(function (error) {
    console.log(error)
    
  })

  document.querySelector('#reset').click();
  document.querySelector('#id').disabled = false;
}

///searchByName
function searchByName(){

    document.querySelector('#btnSearch').onclick = function (e){
        e.preventDefault();
        var search = document.querySelector('#search').value.trim();
        axios({
            url:`http://svcy.myclass.vn/api/Product/SearchByName?name=${search}`,
            method: 'GET',
        })
        .then(function(response){
            productList = response.data
            render()
            document.querySelector('#reset').click();
            // document.querySelector('#id').disabled = false;
        })
        .catch(function (error) {
            console.error(error)
        })
    }
}
searchByName()