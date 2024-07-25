let id = new URLSearchParams(location.search).get("id"); 
let cards = document.querySelector(".cards"); 

console.log(id);
let url = "http://localhost:3000/singers"; 

fetch(url).then(res=>res.json()).then(data=>{

    let element = data.find(elem=> elem.id == id); 
    cards.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <div class="favIcon"><i class="fa-regular fa-heart"></i></div>
                        <div class="card-image">
                            <img src="${element.image}" class="card-img-top" alt="">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.name} is <b>${element.nationality}</b></p>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="btn btn-outline-primary">Detail</a>
                            <a href="./home.html?id=${element.id}" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></a>
                        </div>
                    </div>`; 

})