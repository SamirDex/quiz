let tbody = document.querySelector(".tbody"); 
let sum = 0; 
let totalPrice = document.querySelector(".totalPrice"); 
let removeAllBtn = document.querySelector(".removeAllBtn"); 
let totalSum = 0; 

let url = `http://localhost:3000/meals`;

let arr=[]; 
let basketArr =JSON.parse(localStorage.getItem("basket"))

if(basketArr){
    arr = [...basketArr]; 
}

arr.forEach(element=>{
    tbody.innerHTML += `
    <tr>
        <th scope="row">${element.name}</th>
        <td>
            <div class="image">
                <img src="${element.imageLink}" alt=""/>
            </div>
        </td>
        <td class="productCount">
            <i class="fa-solid fa-minus btn btn-secondary Increment" name="${element.id}"></i>
            <span class="count">${element.count}</span>
            <i class="fa-solid fa-plus btn btn-secondary Decrement" name="${element.id}"></i>
        </td>
        <td>$${element.price}</td>
        <td>$${element.price}x${element.count}=$${sum =element.count * element.price}</td>
        <td>
            <button style="color:red;" class="removeBtn">Remove</button>
        </td>
    </tr>`
})
totalPrice.innerHTML = `$${totalSum.toFixed(2)}`;
updateTotal()
// Toplam fiyatı güncelleyici fonksiyon
function updateTotal() {
    totalSum = 0; // Toplamı sıfırla
    tbody.querySelectorAll('tr').forEach(row => {
        let count = parseInt(row.querySelector('.count').textContent);
        let price = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('$', ''));
        totalSum += count * price;
    });
    totalPrice.innerHTML = `$${totalSum.toFixed(2)}`;
}

let Decrement =document.querySelectorAll(".Decrement"); 
let Increment =document.querySelectorAll(".Increment"); 

for(let btn of Decrement){
    btn.addEventListener("click",function(){
        console.log(this.previousElementSibling.textContent++);

        basketArr[this.getAttribute("name") - 1].count = this.previousElementSibling.textContent; 
        localStorage.setItem("basket", JSON.stringify(basketArr)); 
        updateTotal();
    }) 
}

for(let btn of Increment){
    btn.addEventListener("click",function(){
        if(this.nextElementSibling.textContent> 1){
            console.log(this.nextElementSibling.textContent--);

            basketArr[this.getAttribute("name") - 1].count = this.nextElementSibling.textContent; 
            localStorage.setItem("basket", JSON.stringify(basketArr))
            updateTotal();

        }
        else{
            console.log(this.parentElement.parentElement.remove());
            // console.log(this.getAttribute("name"));
            basketArr = basketArr.filter(item => item.id !=this.getAttribute("name"));
            localStorage.setItem("basket",JSON.stringify(basketArr)); 
            console.log(basketArr);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your product has been removed",
                showConfirmButton: false,
                timer: 1500
            });
            updateTotal();

        }
        
    })
}
let removeBtns = document.querySelectorAll(".removeBtn"); 
for(let btn of removeBtns){
    btn.addEventListener("click", function() {
        console.log(this.parentElement.parentElement.remove());
        basketArr = basketArr.slice(basketArr.splice(this.getAttribute("name"), 1) ); 
        localStorage.setItem("basket", JSON.stringify(basketArr)); 
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your product has been removed",
            showConfirmButton: false,
            timer: 1500
          });
        updateTotal();
    }) 

}

removeAllBtn.addEventListener("click", function() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            tbody.innerHTML= ''; 
            localStorage.clear();
            updateTotal(); 
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });

})
