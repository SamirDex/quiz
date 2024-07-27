let tbody = document.querySelector(".tbody"); 
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
        <td>${element.image}</td>
        <td class="productCount">
            <div class="increment">
                <i class="fa-solid fa-minus btn"></i>
            </div>
            <span class="count">0</span>
            <div class="decrement">
                <i class="fa-solid fa-plus  btn"></i>
            </div>
        </td>
        <td>$${element.price}</td>
        <td></td>
        <td>
            <a href="#">Remove</a>
        </td>
    </tr>`
})


