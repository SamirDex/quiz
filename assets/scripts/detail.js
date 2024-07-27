let id = new URLSearchParams(location.search).get("id");
let cards = document.querySelector(".cards");
let url = "http://localhost:3000/singers";
let url2 = "http://localhost:3000/meals"; 


fetch(url + "/" + id)
  .then((res) => res.json())
  .then((data) => {
    cards.innerHTML = `
                    <div class="card">
                      <i class="fa-regular fa-heart favIcon" name="${data.id}"></i>
                        <div class="card-image" style="width: 25rem; height: 25rem;">
                            <img src="${data.image}" class="card-img-top" alt="" style="height: 25rem;">
                        </div>
                        <div class="card-body" style="background-color: blueviolet; color:white;">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">${data.name} is <b>${data.nationality}</b></p>
                            <p>AGE: ${data.age}</p>
                            <p>GENRE: ${data.genre}</p>
                            <a href="./home.html" class="btn btn-primary">Home</a>
                        </div>
                        </div>`;
    let favIcons = document.querySelectorAll(".favIcon");

    let arr = [];
    let favIconArr = JSON.parse(localStorage.getItem("fav"));

    if (favIconArr) {
      arr = [...favIconArr];
    }
    for(let icon of favIcons){
        for (let elem of arr) {
            if (icon.getAttribute("name") == elem.id) {
              icon.classList.add("fa-solid");
              icon.classList.remove("fa-regular");
            }
        }
        icon.addEventListener("click", function (e) {
            // e.stopPropagation();
            // e.preventDefault();
            if (this.classList.contains("fa-solid")) {
                this.classList.add("fa-regular");
                this.classList.remove("fa-solid");

                arr = arr.filter((elem) => elem.id != this.getAttribute("name"));
                localStorage.setItem("fav", JSON.stringify(arr));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added to wishlist",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else {
                this.classList.remove("fa-regular");
                this.classList.add("fa-solid");

                arr.push(data[+this.getAttribute("name") - 1]);
                localStorage.setItem("fav", JSON.stringify(arr));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added to wishlist",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        });
    }
});



fetch(url2 + "/" + id)
  .then((res) => res.json())
  .then((data) => {
    cards.innerHTML = `
                    <div class="card" style="width: 25rem;">
                      <i class="fa-regular fa-heart favIcon" name="${data.id}"></i>
                        <div class="card-image" style="width: 25rem; height: 25rem;">
                            <img src="${data.imageLink}" class="card-img-top" alt="" style="height: 25rem;">
                        </div>
                        <div class="card-body" style="background-color: blueviolet; color:white; width="100%">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text" style="word-wrap:wrap;">${data.ingredients}</b></p>
                            <p>Price: ${data.price}</p>
                            <a href="./home.html" class="btn btn-primary">Home</a>
                            <a class="btn btn-primary basket" name="${data.id}">Add to Card</a>
                        </div>
                        </div>`;
    let favIcons = document.querySelectorAll(".favIcon");

    let arr = [];
    let favIconArr = JSON.parse(localStorage.getItem("fav"));

    if (favIconArr) {
      arr = [...favIconArr];
    }
    for(let icon of favIcons){
        for (let elem of arr) {
            if (icon.getAttribute("name") == elem.id) {
              icon.classList.add("fa-solid");
              icon.classList.remove("fa-regular");
            }
        }
        icon.addEventListener("click", function (e) {
            // e.stopPropagation();
            // e.preventDefault();
            if (this.classList.contains("fa-solid")) {
                this.classList.add("fa-regular");
                this.classList.remove("fa-solid");

                arr = arr.filter((elem) => elem.id != this.getAttribute("name"));
                localStorage.setItem("fav", JSON.stringify(arr));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added to wishlist",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else {
                this.classList.remove("fa-regular");
                this.classList.add("fa-solid");

                arr.push(data[+this.getAttribute("name") - 1]);
                localStorage.setItem("fav", JSON.stringify(arr));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added to wishlist",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        });
    }

    let basketBtns = document.querySelectorAll(".basket");

    let basketArr = [];

    let localBasketArr = JSON.parse(localStorage.getItem("basket"));

    if (localBasketArr) {
        basketArr = [...localBasketArr];
    }

    for (let basketBtn of basketBtns) {
        basketBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        console.log(this.name);
        if (basketArr.find((elem) => elem.id == this.getAttribute("name"))) {
            basketArr[+this.this.getAttribute("name")-1].count++;
            localStorage.setItem("basket", JSON.stringify(basketArr));
        } else {
            basketArr[+this.this.getAttribute("name") - 1] =1; 
            basketArr.push(data[+this.getAttribute("name") - 1]);
            localStorage.setItem("basket", JSON.stringify(basketArr));
        }
        });
    }
});