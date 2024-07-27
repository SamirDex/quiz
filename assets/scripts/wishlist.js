let cards = document.querySelector(".cards");

let datas = [];
let arrLocaleFav = JSON.parse(localStorage.getItem("fav"));

let datas2 = [];
let arrLocaleFavMeal = JSON.parse(localStorage.getItem("favmeal"));

if (arrLocaleFav) {
  datas = arrLocaleFav;
}
if (arrLocaleFavMeal) {
  datas2 = arrLocaleFavMeal;
}
console.log(datas);
datas.forEach((data) => {
  cards.innerHTML += `
        <div class="card" style="width: 18rem;">
        <i class="fa-solid fa-heart favIcon" name=${data.id}></i>
            <div class="card-image">

                <img src="${
                  data.image || data.imageLink
                }" class="card-img-top" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.name} is <b>${
    data.nationality
  }</b></p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-outline-primary">Details</a>
                <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash deleteBtn"></i></a>
            </div>
        </div>`;

    let favIcons = document.querySelectorAll(".favIcon");

    let arr = [];

    let localFavArr = JSON.parse(localStorage.getItem("fav"));

    if (localFavArr) {
        arr = localFavArr;
    }
    console.log(arr);

    for (let icon of favIcons) {
        console.log(icon.getAttribute("name"));
        console.log(icon.classList);

        icon.addEventListener("click", function () {
        console.log(this.getAttribute("name"));

        console.log(this.classList.contains("fa-solid"));

        console.log(
            icon.parentElement.remove()
        );
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted form wishlist",
            showConfirmButton: false,
            timer: 1500
          });

        arr = arr.filter((elem) => elem.id != this.getAttribute("name"));
        localStorage.setItem("fav", JSON.stringify(arr));
        });
    }
});




datas2.forEach((data) => {
  cards.innerHTML += `
        <div class="card" style="width: 18rem;">
        <i class="fa-solid fa-heart favIcon" name=${data.id}></i>
            <div class="card-image">

                <img src="${
                  data.image || data.imageLink
                }" class="card-img-top" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.name} is <b>${
    data.nationality
  }</b></p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-outline-primary">Details</a>
                <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash deleteBtn"></i></a>
            </div>
        </div>`;

    let favIcons = document.querySelectorAll(".favIcon");

    let arr = [];

    let localFavArr = JSON.parse(localStorage.getItem("favmeal"));

    if (localFavArr) {
        arr = localFavArr;
    }
    console.log(arr);

    for (let icon of favIcons) {
        console.log(icon.getAttribute("name"));
        console.log(icon.classList);

        icon.addEventListener("click", function () {
        console.log(this.getAttribute("name"));

        console.log(this.classList.contains("fa-solid"));

        console.log(
            icon.parentElement.remove()
        );
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted form wishlist",
            showConfirmButton: false,
            timer: 1500
          });

        arr = arr.filter((elem) => elem.id != this.getAttribute("name"));
        localStorage.setItem("favmeal", JSON.stringify(arr));
        });
    }
});