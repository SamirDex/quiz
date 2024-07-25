let cards = document.querySelector(".cards");
let url = `http://localhost:3000/meals`;
let sortByName = document.querySelector(".sortByName");
let SearchInput = document.querySelector(".SearchInput");




sortByName.addEventListener("click",function(){
    cards.innerHTML =''
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
    console.log("object");
    console.log(data);

    const sortedData = data.sort((x,y)=> x.name.localeCompare(y.name))
    sortedData.forEach((element) => {
        cards.innerHTML += `
        <div class="card" style="width: 18rem;">
        <i class="fa-regular fa-heart favIcon" name=${element.id}></i>
            <div class="card-image">

                <img src="${element.imageLink}" class="card-img-top" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">Price: $${element.price}</p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-primary">Add to card</a>
                <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash deleteBtn"></i></a>
                <a href="detail.html?=${element.id}" class="btn btn-outline-primary">Details</a>
            </div>
        </div>`;
    });
    });
})


fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log("object");
    console.log(data);
    data.forEach((element) => {
      cards.innerHTML += `
        <div class="card" style="width: 18rem;">
        <i class="fa-regular fa-heart favIcon" name=${element.id}></i>
            <div class="card-image">

                <img src="${element.imageLink}" class="card-img-top" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">Price: $${element.price}</p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-primary basket" name="element.id">Add to card</a>
                <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash deleteBtn"></i></a>
                <a href="detail.html?=${element.id}" class="btn btn-outline-primary">Details</a>
            </div>
        </div>`;
        
    });
    
    SearchInput.addEventListener("input",function(){
        cards.innerHTML=''; 
        data.forEach(element=>{
            if(element.name.toLowerCase().includes(SearchInput.value)){
                let newCard = `
                    <div class="card" style="width: 18rem;">
                        <i class="fa-regular fa-heart favIcon" name=${element.id}></i>
                            <div class="card-image">

                                <img src="${element.imageLink}" class="card-img-top" alt="">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${element.name}</h5>
                                <p class="card-text">Price: $${element.price}</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="btn btn-primary">Add to card</a>
                                <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash deleteBtn"></i></a>
                                <a href="detail.html?=${element.id}" class="btn btn-outline-primary">Details</a>
                            </div>
                        </div>`;
                    cards.innerHTML+= newCard; 
            }
        })
    })

    let deleteBtns = document.querySelectorAll(".deleteBtn"); 
    for(let btn of deleteBtns){
        btn.addEventListener("click", function() {
            console.log(this.parentElement.parentElement.parentElement.remove());
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Succesfull deleted",
                showConfirmButton: false,
                timer: 1500
              });

        })
    }



    let basketBtns = document.querySelectorAll(".basket");
    let arr = [];
    let basketArr = JSON.parse(localStorage.getItem("basket"));
    
    if (basketArr) {
        arr = [...basketArr];
    }
    for (let btn of basketBtns) {
        btn.addEventListener("click", function() {
            let itemName = this.getAttribute("name");
            console.log(itemName);
            arr.push(data[+itemName - 1]);
            localStorage.setItem("basket", JSON.stringify(arr));
            console.log(arr);
        });
    }
    
});



