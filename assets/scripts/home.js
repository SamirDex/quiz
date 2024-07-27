let cards = document.querySelector(".cards");
let url = `http://localhost:3000/singers`;
let sortByName = document.querySelector(".sortByName");
let SearchInput = document.querySelector(".SearchInput");

sortByName.addEventListener("click", function () {
  cards.innerHTML = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("object");
      console.log(data);

      const sortedData = data.sort((x, y) => x.name.localeCompare(y.name));
      sortedData.forEach((element) => {
        cards.innerHTML += `
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
                <a href="./detail.html?id=${element.id}" class="btn btn-outline-primary">Details</a>
                <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></a>
            </div>
        </div>`;
      });
    });
});

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

                <img src="${element.image}" class="card-img-top" alt="">
            </div>
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.name} is <b>${element.nationality}</b></p>
            </div>
            <div class="card-footer">
                <a href="detail.html?id=${element.id}" class="btn btn-outline-primary">Details</a>
                <a href="#" class="btn btn-outline-danger"><i class="fa-solid fa-trash deleteBtn"></i></a>
            </div>
        </div>`;
    });

    SearchInput.addEventListener("input", function () {
      cards.innerHTML = "";
      data.forEach((element) => {
        if (element.name.toLowerCase().includes(SearchInput.value)) {
          let newCard = `
                    <div class="card" style="width: 18rem;">
                        <i class="fa-regular fa-heart favIcon"></i>
                        <div class="card-image">

                            <img src="${element.image}" class="card-img-top" alt="">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.name} is <b>${element.nationality}</b></p>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="btn btn-outline-primary">Detail</a>
                            <a href="./detail.html?id=${element.id}" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></a>
                        </div>
                    </div>`;
          cards.innerHTML += newCard;
        }
      });
    });

    let deleteBtns = document.querySelectorAll(".deleteBtn");
    for (let btn of deleteBtns) {
      btn.addEventListener("click", function () {
        console.log(this.parentElement.parentElement.parentElement.remove());
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Succesfull deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }

    let favIcons = document.querySelectorAll(".favIcon");

    let arr = [];

    let favIconArr = JSON.parse(localStorage.getItem("fav"));
    //   console.log(favIconArr);

    if (favIconArr) {
      arr = [...favIconArr];
    }

    for (let icon of favIcons) {
        for (let elem of arr) {

            if (icon.getAttribute("name") == elem.id) {
                icon.classList.add("fa-solid");
                icon.classList.remove("fa-regular");
            }
        }
        icon.addEventListener("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (this.classList.contains("fa-solid")) {
                this.classList.add("fa-regular");
                this.classList.remove("fa-solid");

                arr = arr.filter((elem) => elem.id != this.getAttribute("name"));
                localStorage.setItem("fav", JSON.stringify(arr));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Deleted From wishlist",
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
