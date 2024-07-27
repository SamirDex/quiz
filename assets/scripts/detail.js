let id = new URLSearchParams(location.search).get("id");
let cards = document.querySelector(".cards");
let url = "http://localhost:3000/singers";

fetch(url + "/" + id)
  .then((res) => res.json())
  .then((data) => {
    cards.innerHTML = `
                    <div class="card" style="width: 25rem;">
                        <div class="favicon"><i class="fa-regular fa-heart favIcon" name=${data.id}></i></div>
                        <div class="card-image">
                            <img src="${data.image}" class="card-img-top" alt="">
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
    for (let favIcon of favIcons) {
      for (let elem of arr) {
        if (favIcon.getAttribute("name") == elem.id) {
          console.log(elem.id);
          favIcon.classList.add("fa-solid");
          favIcon.classList.remove("fa-regular");
        }
      }
      favIcon.addEventListener("click", function () {
        if (this.classList.contains("fa-solid")) {
          this.classList.remove("fa-solid");
          this.classList.add("fa-regular");

          arr = arr.filter((elem) => elem.id != this.getAttribute("name"));
          localStorage.setItem("fav", JSON.stringify(arr));
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted to Wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.classList.add("fa-solid");
          this.classList.remove("fa-regular");

          arr.push(data[+this.getAttribute("name") - 1]);
          localStorage.setItem("fav", JSON.stringify(arr));
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added to Wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
    // for(let elem of arr){
    //     if(favIcon.getAttribute("name") == elem.id){
    //         console.log(elem.id);
    //         favIcon.classList.add("fa-solid");
    //         favIcon.classList.remove("fa-regular");
    //     }
    // }
  });
