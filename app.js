
const product_add_form = document.querySelector('#product_add_form');
const product_add = document.querySelector('#product_add');
const msg = document.querySelector('.msg');
const view_product_body = document.querySelector('.view_product_body');
const product_edit_form = document.querySelector('#product_edit_form');





// get all product form localstorage
const gellAllproduct = () => {
   

    let data = readLsData('product');

    if(!data){

        product_add.innerHTML = `

        <tr>
        <td colspan = "7" class = "text-center">Product is not found!</td>
        
        </tr>
        
        
        
        `

    }

    
    if(data){


        let list = '';
        let total_amount = 0;
        data.map((item,index) => {
            total_amount += (item.price * item.quantity)

            list += `


            <tr>
            <td>${index + 1}</td>
            <td><img id="alovera" src="${item.photo}" alt=""></td>
            <td>${item.name}</td>
            <td>${item.price} BDT</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity} BDT</td>
            <td>
                <a class="btn btn-info btn-sm  product_view"      product_index = ${index} data-bs-toggle = "modal" href="#view_product_modal"><i class="fas fa-eye"></i></a>
                <a class="btn btn-warning btn-sm  product_edit"   product_index = ${index} data-bs-toggle = "modal" href="#edit_product_modal"><i class="fas fa-edit"></i></a>
                <a class="btn btn-danger btn-sm  product_delete"  product_index = ${index} href=""><i class="fas fa-trash"></i></a>
            </td>
        </tr>
            
            
            
            
            
            `
        })

        list += `

        <tr>
        <td colspan = "6" class = "text-end">Total : ${total_amount} BDT</td>
        
        </tr>
        
        
        
        `

        

        product_add.innerHTML = list;






    }

   






}

gellAllproduct();








product_add_form.onsubmit = (e) => {
    e.preventDefault();

   

// get element

    let form_data = new FormData(e.target);
    let prodata = Object.fromEntries(form_data.entries());
    let {name,price,quantity,photo} = Object.fromEntries(form_data.entries());

    

    //form-validation ========>

    if(!name || !price || !quantity || !photo){
        msg.innerHTML = setalert('Field must not be empty!');

    }else{

        createLsData('product',prodata)
        msg.innerHTML = setalert('Data Stable!','success');
        e.target.reset();
        gellAllproduct();

    }

    






}





// view product list=====================>


product_add.onclick = (e) => {
    e.preventDefault();


    if(e.target.classList.contains('product_view')){

        
    let index = e.target.getAttribute('product_index');
    let data = readLsData('product');

    const {name,price,photo,quantity} = data[index];


    view_product_body.innerHTML = `

    <div class="row">
    <div class="col-lg-6">
        <img class = "photo" src="${photo}" alt="">
    </div>
    <div class="col-lg-6">
        <h2>Product Name : ${name} </h2>
        <h3>Price: ${price} BDT</h3>
        
    </div>
   </div>
    
    
    
    
    `

    }else if(e.target.classList.contains('product_edit')){

        let index = e.target.getAttribute('product_index');
        let data = readLsData('product');
        
        const {name,price,quantity,photo} = data[index];


        product_edit_form.innerHTML = `



        
        <div class="my-3">
            <label for="">Name</label>
            <input value = ${name} name="name" class="form-control" type="text">
        </div>
        <div class="my-3">
            <label for="">Price</label>
            <input value = ${price}  name="price" class="form-control" type="text">
        </div>
        <div class="my-3">
            <label for="">Quantity</label>
            <input value = ${quantity}  name="quantity" class="form-control" type="text">
        </div>
        <div class="my-3">
            <label for="">Index</label>
            <input value = ${index}  name="index" class="form-control" type="text">
        </div>
        <div class="my-3">
            <label for="">Previous Photo</label>
            <img class = "photos"  src="${photo}" alt="">
        </div>
        <div class="my-3">
            <label for="">Photo</label>
            <input value = ${photo} name="photo" class="form-control" type="text">
        </div>
        <div class="my-3">
            <input  value="Update Now" class="w-100 btn btn-primary" type="submit">
        </div>
        
        
        
        
        `

 }else if(e.target.classList.contains('product_delete')){

    // get index 
    let index = e.target.getAttribute('product_index');

    //get product from localstorage
    let data = readLsData('product');

    // delete index data
    data.splice (index, 1);

    updatedata('product',data);
    gellAllproduct();

   



 }

}    









///===================update now product================>


product_edit_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const {name,price,quantity,photo,index} = Object.fromEntries(form_data.entries());
    let data = Object.fromEntries(form_data.entries());
   


    let allproduct = readLsData('product');

   allproduct[index] = {


        name : name,
        price : price,
        photo : photo,
        quantity : quantity,
        index : index






    }

    updatedata('product',allproduct);
    gellAllproduct();

   

}























