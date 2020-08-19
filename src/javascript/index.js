import { homeSwiper } from "./components/swiper";

document.addEventListener("DOMContentLoaded", function() {
  const select = document.querySelector.bind(document);
  const selectAll = document.querySelectorAll.bind(document);

  const headerContainer = select(
    ".span12.widget-span.widget-type-custom_widget.c-header"
  );
  const form = document.getElementById("amirForm");
  const formText = select(".c-contact__submitted");
  let cookie;
  function headerHandler() {
    if (headerContainer) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 30) {
          headerContainer.classList.add("c-header--fixed");
        } else {
          headerContainer.classList.remove("c-header--fixed");
        }
      });
    }
  }

  function animateScroll() {
    if (window.innerWidth <= 900) {
      $('a[href*="#"]').on("click", function(e) {
        e.preventDefault();
        if (this.getAttribute("href").charAt(0) === "#") {
          $("html, body").animate(
            {
              scrollTop: $($(this).attr("href")).offset().top - 140,
            },
            500,
            "linear"
          );
        }
      });
    } else {
      $('a[href*="#"]').on("click", function(e) {
        if (this.getAttribute("href").charAt(0) === "#") {
          e.preventDefault();

          $("html, body").animate(
            {
              scrollTop: $($(this).attr("href")).offset().top - 250,
            },
            500,
            "linear"
          );
        }
      });
    }
  }

  function hamburgerNav() {
    const hamburger = select(".c-hamburger");
    const menu = select(".c-header__list");
    if (headerContainer) {
      hamburger.addEventListener("click", () => {
        if (!headerContainer.classList.contains("c-header--active")) {
          headerContainer.classList.add("c-header--active");
          menu.classList.add("c-header__list--active");
        } else {
          headerContainer.classList.remove("c-header--active");
          menu.classList.remove("c-header__list--active");
        }
      });
    }
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  form.addEventListener("submit", function(e) {
    var fields = $("#amirForm").serializeArray();
    cookie = getCookie("hubspotutk");
    var data = {
      submittedAt: Date.now(),
      fields,
      context: {
        hutk: cookie,
        pageUri: "http://www.amirreiter.com/",
        pageName: "Amir Reiter Landing Page",
      },
    };

    if (this.checkValidity() === false) {
      return false;
    }

    e.preventDefault();
    formSubmit(data);
  });

  function formSubmit(data) {
    // Create the new request
    let xhr = new XMLHttpRequest();
    let url =
      "https://api.hsforms.com/submissions/v3/integration/submit/1709048/15e30d8e-3b7d-4d68-9093-6a93fb332ee4";
    xhr.open("POST", url);
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader("Content-type", "application/json");
    let finalData = JSON.stringify(data);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.style.display = "none";
        formText.innerText =
          "Thanks for contacting me :) I’ll get back to you within the next 24 working hours";
      } else if (xhr.readyState === 4 && xhr.status === 400) {
        console.log(xhr.responseText); // Returns a 400 error the submission is rejected.
      } else if (xhr.readyState === 4 && xhr.status === 403) {
        console.log(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
      } else if (xhr.readyState === 4 && xhr.status === 404) {
        console.log(xhr.responseText); // Returns a 404 error if the formGuid isn't found
      }
    };

    // Sends the request

    xhr.send(finalData);
  }

  hamburgerNav();
  headerHandler();
  animateScroll();
  homeSwiper();

  let links = selectAll("a");
  Array.prototype.slice.call(links).forEach((link) => {
    if (/^#/.test(link.href)) {
      console.log(link.href);
    }
  });
});
