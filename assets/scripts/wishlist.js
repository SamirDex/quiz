let cards = document.querySelector(".cards");

let datas = []; 
let arrLocaleFav = JSON.parse(localStorage.getItem("fav")); 
if(arrLocaleFav){
    datas = arrLocaleFav; 
}
console.log(datas);
datas.forEach(data => {
    cards.innerHTML+=`
        <div class="card" style="width: 18rem;">
        <i class="fa-solid fa-heart favIcon" name=${data.id  }></i>
            <div class="card-image">

                <img src="${data.image || data.imageLink}" class="card-img-top" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.name} is <b>${data.nationality}</b></p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-outline-primary">Details</a>
                <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash deleteBtn"></i></a>
            </div>
        </div>`;

        let arr = []

        let favIconArr= JSON.parse(localStorage.getItem("fav")); 
        if(favIconArr){
            arr = [...favIconArr]; 
        }
    
        favIcons = document.querySelectorAll(".favIcon"); 
        for(let icon of favIcons){
            for(let elem of arr){
                if(icon.getAttribute("name") == elem.id){
                    icon.classList.add("fa-solid"); 
                    icon.classList.remove("fa-regular"); 
                }
            } 
    
            icon.addEventListener("click",function() {
                arr = arr.filter(elem=> console.log(elem)); 
                    localStorage.setItem("fav", JSON.stringify(arr));
                    
                    console.log(icon.closest(".card").remove());

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Deleted to Wishlist",
                        showConfirmButton: false,
                        timer: 1500
                    });
            })
        }
});