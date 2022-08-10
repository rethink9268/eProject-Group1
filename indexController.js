document.addEventListener("mouseover", (e) => {
  const isDropdownBtn = e.target.matches("[data-dropdown-link]");
  if (!isDropdownBtn && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownBtn) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.add("active");
  }
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

document.addEventListener("mouseover", (e) => {
  const isShopDropdown = e.target.matches("[shop-dropdown-link]");
  if (!isShopDropdown && e.target.closest("[shop-dropdown]") != null) return;

  let currentShopDropdown;
  if (isShopDropdown) {
    currentShopDropdown = e.target.closest("[shop-dropdown]");
    currentShopDropdown.classList.add("active");
  }
  document.querySelectorAll("[shop-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentShopDropdown) return;
    dropdown.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  const isDropdownBtn = e.target.matches("[m-dropdown-arrow]");
  if (!isDropdownBtn && e.target.closest("[m-dropdown]") != null) return;

  let currentDropdown;
  let currentBtn;
  if (isDropdownBtn) {
    currentDropdown = e.target.closest("[m-dropdown]");
    currentDropdown.classList.toggle("active");
    currentBtn = e.target.closest("[m-dropdown-arrow]");
    currentBtn.classList.toggle("bxs-chevron-up");
  }
  document.querySelectorAll("[m-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });

  document
    .querySelectorAll("[m-dropdown-arrow].bxs-chevron-up")
    .forEach((i) => {
      if (i === currentBtn) return;
      i.classList.remove("bxs-chevron-up");
    });
});

document.addEventListener("click", (e) => {
  const isDropdownBtn = e.target.matches("[m-snd-btn]");
  if (!isDropdownBtn && e.target.closest("[m-snd-dropdown]") != null) return;

  let currentDropdown;
  let currentBtn;
  if (isDropdownBtn) {
    currentDropdown = e.target.closest("[m-snd-dropdown]");
    currentDropdown.classList.toggle("active");
    currentBtn = e.target.closest("[m-snd-btn]");
    currentBtn.classList.toggle("bxs-chevron-up");
  }
  document.querySelectorAll("[m-snd-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });

  document.querySelectorAll("[m-snd-btn].bxs-chevron-up").forEach((i) => {
    if (i === currentBtn) return;
    i.classList.remove("bxs-chevron-up");
  });
});
// form

document.addEventListener("click", (e) => {
  const isHeart = e.target.matches("[item-heart]");
  let currentHeart = e.target.closest("[item-heart]");
  if (!isHeart) return;
  if (isHeart) {
    currentHeart.classList.toggle("bxs-heart");
  }
});

// AngularJS-----------------------------------------/

const app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "home.html",
    })
    .when("/appraisal", {
      templateUrl: "appraisal.html",
    })
    .when("/shop", {
      templateUrl: "shop.html",
    })
    .when("/check-out", {
      templateUrl: "checkout.html",
    })
    .when("/watch", {
      templateUrl: "product.html",
    })
    .when("/repair", {
      templateUrl: "repair.html",
    });
});

app.controller("MyController", [
  "$scope",
  "$location",
  "$anchorScroll",
  "$http",
  "$filter",
  "$element",
  function ($scope, $location, $anchorScroll, $http, $filter, $element) {
    $scope.gotoCitizenCollection = function () {
      $location.hash("citizen_collection");
      $anchorScroll();
    };
    $scope.GotoEssence = function () {
      $location.hash("switch-essence-collection");
      $anchorScroll();
    };
    $scope.GotoBlog = function () {
      $location.hash("alberto-blog");
      $anchorScroll();
    };
    $scope.scrollTop = function () {
      window.scrollTo(0, 0);
    };
    $scope.GotoFooter = () => {
      $location.hash("footer");
      $anchorScroll();
    };
    // Links
    $scope.OpenWatch = (e) => {
      location.href = "#!shop";
      $scope.MyFilter(e);

      document.querySelectorAll("[filter-watch]").forEach((evt) => {
        if (evt.innerHTML.toLowerCase().includes(e)) {
          console.log(evt);
        }
      });
    };
    // Fetch Data

    $http.get("./watch.json").then((response) => {
      if (sessionStorage.getItem("sessionWatches") == null) {
        sessionStorage.setItem("sessionWatches", JSON.stringify(response.data));
        $scope.watches = JSON.parse(sessionStorage.getItem("sessionWatches"));
      } else {
        $scope.watches = JSON.parse(sessionStorage.getItem("sessionWatches"));
      }
      $scope.MyFilter = (value) => {
        $scope.dataFilter = [];
        $scope.watches.forEach((watch) => {
          if (
            watch.brand.toUpperCase().includes(value) ||
            watch.type.toUpperCase().includes(value) ||
            watch.gender.toUpperCase().includes(value)
          ) {
            $scope.dataFilter.push(watch);
          }
        });

        $scope.DisplayList = (page) => {
          let items_per_page = 8;
          page--;
          let start = items_per_page * page;
          let end = start + items_per_page;
          $scope.paginatedItems = $scope.dataFilter.slice(start, end);

          document.addEventListener("click", (event) => {
            const isSearch = event.target.matches("[filter-pagination]");
            if (!isSearch) {
              return;
            }
            let currentSearch;
            if (isSearch) {
              currentSearch = event.target.closest("[filter-pagination]");
              currentSearch.classList.add("active");
            }
            document
              .querySelectorAll("[filter-pagination].active")
              .forEach((search) => {
                if (search === currentSearch) {
                  return;
                }
                search.classList.remove("active");
              });
          });
        };
        $scope.DisplayList(1);

        $scope.SetupPagination = () => {
          $scope.buttons = [];
          let page_count = Math.ceil($scope.dataFilter.length / 8);
          for (let i = 1; i < page_count + 1; i++) {
            $scope.button = { no: i };
            $scope.buttons.push($scope.button);
          }
        };
        $scope.SetupPagination();
      };
      $scope.MyFilter("");
    });
    //

    //

    {
      document.addEventListener("click", (event) => {
        const isSearch = event.target.matches("[filter-watch]");
        if (!isSearch) {
          return;
        }
        let currentSearch;
        if (isSearch) {
          currentSearch = event.target.closest("[filter-watch]");
          currentSearch.classList.add("active");
        }
        document.querySelectorAll("[filter-watch].active").forEach((search) => {
          if (search === currentSearch) {
            return;
          }
          search.classList.remove("active");
        });
      });
    }
    //sidebar //
    $scope.sideBar = () => {
      const sidebar = document.querySelector("[side-bar]");
      sidebar.classList.add("active");
    };
    $scope.CloseBar = () => {
      const sidebar = document.querySelector("[side-bar]");
      sidebar.classList.remove("active");
    };
    // form;
    {
      const isSignInBtn = document.getElementById("alberto__form");

      $scope.MyForm = () => {
        isSignInBtn.classList.add("active");
        $scope.SignIn();
      };
      $scope.CloseForm = () => {
        isSignInBtn.classList.remove("active");
      };
      document.addEventListener("click", (e) => {
        const current = e.target.matches("#form-overlay");
        if (current) {
          isSignInBtn.classList.remove("active");
        }
      });

      const signIn = document.getElementById("alberto__form-signIN");
      const signUp = document.getElementById("alberto__form-register");
      const signInBtn = document.getElementById("alberto__form-buttons_signIn");
      const signUpBtn = document.getElementById("alberto__form-buttons_signUp");

      $scope.SignIn = () => {
        signIn.classList.add("active");
        signInBtn.classList.add("active");
        signUp.classList.remove("active");
        signUpBtn.classList.remove("active");
      };
      $scope.SignUp = () => {
        signUp.classList.add("active");
        signUpBtn.classList.add("active");
        signIn.classList.remove("active");
        signInBtn.classList.remove("active");
      };
    }
    $scope.watches = [];
    $scope.watch = {};
    $scope.carts = [];
    $scope.cart = {};
    $scope.total = 0;

    $scope.AddToCard = (add) => {
      $scope.watches.forEach((watch) => {
        if (watch.name === add) {
          let increment = 1;
          let fuck = 0;
          $scope.carts.forEach((c) => {
            if (c.name === add) {
              c.quantity += increment;
              c.subtotal = c.quantity * c.price;
              fuck = 1;
            }
          });
          if (fuck === 0) {
            let cart = {
              name: watch.name,
              img: watch.imgS,
              price: watch.price,
              quantity: increment,
              subtotal: watch.price,
            };
            $scope.carts.push(cart);
          }
        }
      });
      $scope.getTotal = () => {
        let a = 0;
        let b = 0;
        $scope.carts.forEach((c) => {
          a += c.price * c.quantity;
        });
        $scope.total = a;
      };
      $scope.getTotal();
    };

    //Remove cart//
    $scope.removeCart = (e) => {
      $scope.carts.forEach((c) => {
        if (c.name === e) {
          $scope.carts.splice(c, 1);
        }
      });
      $scope.getTotal();
    };

    // products //
    $scope.gotoProduct = (value) => {
      $scope.watches.forEach((w) => {
        if (w.name === value) {
          $scope.product = {
            name: w.name,
            img1: w.imgS,
            img2: w.imgB,
            img3: w.imgF,
          };
        }
      });
      location.href = "#!watch";
    };
    //
    function Misc() {
      const navbar = document.getElementById("m-navbar");
      const top = document.getElementById("scroll-top");

      $scope.MobileMenu = () => {
        navbar.classList.add("active");
      };
      $scope.CloseMenuMobile = () => {
        navbar.classList.remove("active");
      };
      window.onscroll = () => {
        if (window.pageYOffset >= 780) {
          top.style.display = "flex";
        } else {
          top.style.display = "none";
        }
        navbar.classList.remove("active");
      };
    }
    Misc();
  },
]);
