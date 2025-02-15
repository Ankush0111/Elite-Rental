import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();
  useEffect(() => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");

    if (menuBtn && navLinks) {
      const menuBtnIcon = menuBtn.querySelector("i");
      
      // Toggle menu event listener
      menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuBtnIcon.className = isOpen ? "ri-close-line" : "ri-menu-line";
      });

      navLinks.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtnIcon.className = "ri-menu-line";
      });
    }

    // ScrollReveal Animations
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };
    ScrollReveal().reveal(".header__container h1", { ...scrollRevealOption });
    ScrollReveal().reveal(".header__container form", { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal(".header__container img", { ...scrollRevealOption, delay: 1000 });
    ScrollReveal().reveal(".range__card", { duration: 1000, interval: 500 });
    ScrollReveal().reveal(".location__image img", { ...scrollRevealOption, origin: "right" });
    ScrollReveal().reveal(".location__content .section__header", { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal(".location__content p", { ...scrollRevealOption, delay: 1000 });
    ScrollReveal().reveal(".location__content .location__btn", { ...scrollRevealOption, delay: 1500 });
    ScrollReveal().reveal(".story__card", { ...scrollRevealOption, interval: 500 });
    ScrollReveal().reveal(".download__image img", { ...scrollRevealOption, origin: "right" });
    ScrollReveal().reveal(".download__content .section__header", { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal(".download__links", { ...scrollRevealOption, delay: 1000 });

    // Swiper Initialization
    const prices = ["225", "455", "275", "625", "395"];
    const selectCards = document.querySelectorAll(".select__card");
    const priceEl = document.getElementById("select-price");

    if (selectCards && selectCards.length > 0 && priceEl) {
      selectCards[0].classList.add("show__info");

      function updateSwiperImage(index) {
        priceEl.innerText = prices[index];
        selectCards.forEach((item, i) => {
          item.classList.toggle("show__info", i === index);
        });
      }

      const swiper = new Swiper(".swiper", {
        loop: true,
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          depth: 500,
          modifier: 1,
          scale: 0.75,
          slideShadows: false,
          stretch: -100,
        },
        on: {
          slideChangeTransitionStart() {
            updateSwiperImage(swiper.realIndex);
          }
        }
      });
    }
    
    // Duplicate banner content (if it exists)
    const banner = document.querySelector(".banner__wrapper");
    if (banner && banner.children.length > 0 && !banner.querySelector("[aria-hidden='true']")) {
      const bannerContent = Array.from(banner.children);
      bannerContent.forEach((item) => {
        const duplicateNode = item.cloneNode(true);
        duplicateNode.setAttribute("aria-hidden", true);
        banner.appendChild(duplicateNode);
      });
    }

    const checkLoginState = () => {
      const userLoggedIn = localStorage.getItem('isLoggedIn'); // Example: Get login state from localStorage
      setIsLoggedIn(userLoggedIn === 'true');
    };

    checkLoginState();  
    
  }, []);

  const handlesignin= () =>{
    navigate('/signin');
  }

  const handleProfileClick= () =>{
    navigate('/profile');
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include", // Include session cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        // Handle server errors
        const errorData = await response.json();
        console.error("Logout failed:", errorData.message || "Unknown error");
        alert(`Logout failed: ${errorData.message || "Please try again."}`);
        return;
      }
  
      // Clear user session on successful logout
      localStorage.removeItem("isLoggedIn"); // Clear local storage (if used for login state)
      setIsLoggedIn(false); // Update state
      alert("You have successfully logged out.");
      navigate("/signin"); // Redirect to the sign-in page or any other page
    } catch (error) {
      // Catch any network or other unexpected errors
      console.error("Error during logout:", error);
      alert("An error occurred while logging out. Please check your network connection.");
    }
  };
  
  
  return (
    <main>
    <header>  
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">ELITE RENTALS</a>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className="nav__links" id="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rent">Rent</Link></li>
          <li><Link to="/contact_us">Contact</Link></li>
        </ul>
        <div className="nav__btn">
          {isLoggedIn ? (
            <>
              {/* Profile button */}
              <button
                className="profile-icon"
                onClick={handleProfileClick}
                title="Profile"
              >
                <i className="ri-user-fill"></i>
              </button>
              {/* Logout button */}
              <button
                className="btn logout-btn"
                onClick={handleLogout}
                title="logout"
              >
                Logout
              </button>
          </>
          ) : (
            <button
              className="btn"
              value="signin"
              id="signin"
              onClick={handlesignin}
            >
              Get Started
            </button>
          )}
        </div>

      </nav>
      <div className="header__container" id="home">
        <h1>PREMIUM CAR RENTAL</h1>
        <img src={require("./header.png")} alt="header" />

      </div>
      <a href="#about" className="scroll__down">
        <i className="ri-arrow-down-line"></i>
      </a>
    </header>

    <section className="section__container range__container" id="about">
      <h2 className="section__header">WIDE RANGE OF VEHICLES</h2>
      <div className="range__grid">
      <a href="/rent">
    <div className="range__card">
      <a href="#~">
        <img src={require("./range-1.jpg")} alt="Sedan" />
      </a>
      <div className="range__details">
        <h4>SEDAN</h4>
        <a href="/sedan-details"><i className="ri-arrow-right-line"></i></a>
      </div>
    </div>
    </a>
    <a href="/rent">
    <div className="range__card">
        <img src={require("./range-2.jpg")} alt="SUVs" />
      <div className="range__details">
        <h4>SUVS</h4>
        <a href="/rent"><i className="ri-arrow-right-line"></i></a>
      </div>
      </div>
    </a>

        {/* <div className="range__card">
          <img src={require("./range-3.jpg")} alt="range" />
          <div className="range__details">
            <h4>VANS</h4>
            <a href="#"><i className="ri-arrow-right-line"></i></a>
          </div>
        </div>
        <div className="range__card">
          <img src={require("./range-4.jpg")} alt="range" />
          <div className="range__details">
            <h4>ELECTRIC</h4>
            <a href="#"><i className="ri-arrow-right-line"></i></a>
          </div>
        </div> */}
      </div>
    </section>

    {/* <section className="section__container location__container" id="rent">
      <div className="location__image">
        <img src={require("./location.png")} alt="location" />
      </div>
      <div className="location__content">
        <h2 class="section__header">FIND CAR IN YOUR LOCATIONS</h2>
        <p>
          Discover the perfect vehicle tailored to your needs, wherever you are.
          Our 'Find Car in Your Locations' feature allows you to effortlessly
          search and select from our premium fleet available near you. Whether
          you're looking for a luxury sedan, a spacious SUV, or a sporty
          convertible, our easy-to-use tool ensures you find the ideal car for
          your journey. Simply enter your location, and let us connect you with
          top-tier vehicles ready for rental.
        </p>
        <div className="location__btn">
          <button className="btn">Find a Location</button>
        </div>
      </div>
    </section> */}

    <section className="select__container" id="ride">
      <h2 className="section__header">PICK YOUR DREAM CAR TODAY</h2>
      <div className="swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="select__card">
              <img src={require("./select-1.png")} alt="select" />
              <div className="select__info">
                <div className="select__info__card">
                  <span><i className="ri-speed-up-line"></i></span>
                  <h4>200 <span>km/h</span></h4>
                </div>
                <div className="select__info__card">
                  <span><i class="ri-settings-5-line"></i></span>
                  <h4>6 <span>speed</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-roadster-line"></i></span>
                  <h4>5 <span>seats</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-signpost-line"></i></span>
                  <h4>15 <span>milage</span></h4>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="select__card">
              <img src={require("./select-2.png")} alt="select" />
              <div class="select__info">
                <div class="select__info__card">
                  <span><i class="ri-speed-up-line"></i></span>
                  <h4>215 <span>km/h</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-settings-5-line"></i></span>
                  <h4>6 <span>speed</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-roadster-line"></i></span>
                  <h4>5 <span>seats</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-signpost-line"></i></span>
                  <h4>16 <span>milage</span></h4>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="select__card">
              <img src={require("./select-3.png")} alt="select" />
              <div class="select__info">
                <div class="select__info__card">
                  <span><i class="ri-speed-up-line"></i></span>
                  <h4>306 <span>km/h</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-settings-5-line"></i></span>
                  <h4>6 <span>speed</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-roadster-line"></i></span>
                  <h4>5 <span>seats</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-signpost-line"></i></span>
                  <h4>12 <span>milage</span></h4>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="select__card">
              <img src={require("./select-4.png")} alt="select" />
              <div class="select__info">
                <div class="select__info__card">
                  <span><i class="ri-speed-up-line"></i></span>
                  <h4>350 <span>km/h</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-settings-5-line"></i></span>
                  <h4>6 <span>speed</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-roadster-line"></i></span>
                  <h4>2 <span>seats</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-signpost-line"></i></span>
                  <h4>08 <span>milage</span></h4>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="select__card">
              <img src={require("./select-5.png")} alt="select" />
              <div class="select__info">
                <div class="select__info__card">
                  <span><i class="ri-speed-up-line"></i></span>
                  <h4>254 <span>km/h</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-settings-5-line"></i></span>
                  <h4>6 <span>speed</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-roadster-line"></i></span>
                  <h4>5 <span>seats</span></h4>
                </div>
                <div class="select__info__card">
                  <span><i class="ri-signpost-line"></i></span>
                  <h4>10 <span>milage</span></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form action="/" class="select__form">
        <div class="select__price">
          <span><i class="ri-price-tag-3-line"></i></span>
          <div><span id="select-price">225</span> /day</div>
        </div>
        <div class="select__btns">
        <Link to="/rent"><button class="btn">Rent Now</button></Link>
        </div>
      </form>
    </section>

    <section class="section__container story__container">
      <h2 class="section__header">STORIES BEHIND THE WHEEL</h2>
      <div class="story__grid">
        <div class="story__card">
          <div class="story__date">
            <span>12</span>
            <div>
              <p>January</p>
              <p>2024</p>
            </div>
          </div>
          <h4>Adventures on the Open Road</h4>
          <p>
            Join us as we dive into the exhilarating stories of travelers who
            embarked on unforgettable journeys with PREMIUM CAR RENTAL.
          </p>
          <img src={require("./story-1.jpg")} alt="story" />
        </div>
        <div class="story__card">
          <div class="story__date">
            <span>04</span>
            <div>
              <p>March</p>
              <p>2024</p>
            </div>
          </div>
          <h4>Luxury and Comfort: Experiences</h4>
          <p>
            In this series, we highlight the luxurious touches, unparalleled
            comfort, and exceptional service that make every ride.
          </p>
          <img src={require("./story-2.jpg")} alt="story" />
        </div>
        <div class="story__card">
          <div class="story__date">
            <span>18</span>
            <div>
              <p>June</p>
              <p>2024</p>
            </div>
          </div>
          <h4>Cars that Adapt to Your Lifestyle</h4>
          <p>
            Read about how our versatile vehicles have seamlessly integrated
            into the lives of professionals and families alike.
          </p>
          <img src={require("./story-3.jpg")} alt="story" />
        </div>
      </div>
    </section>

    <section class="banner__container">
      <div class="banner__wrapper">
        <img src={require("./banner-1.png")} alt="banner" />
        <img src={require("./banner-2.png")} alt="banner" />
        <img src={require("./banner-3.png")} alt="banner" />
        <img src={require("./banner-4.png")} alt="banner" />
        <img src={require("./banner-5.png")} alt="banner" />
        <img src={require("./banner-6.png")} alt="banner" />
        <img src={require("./banner-7.png")} alt="banner" />
        <img src={require("./banner-8.png")} alt="banner" />
        <img src={require("./banner-9.png")} alt="banner" />
        <img src={require("./banner-10.png")} alt="banner" />
      </div>
    </section>

    <section class="download">
      <div class="section__container download__container">
        <div class="download__content">
          <h2 class="section__header">PREMIUM CAR RENTAL</h2>
          <div class="download__links">
            <a href="#">
              <img src={require("./apple.png")} alt="apple" />
            </a>
            <a href="#">
              <img src={require("./google.png")} alt="google" />
            </a>
          </div>
        </div>
        <div class="download__image">
          <img src={require("./download.png")} alt="download" />
        </div>
      </div>
    </section>

    {/* <section class="news" id="contact">
      <div class="section__container news__container">
        <h2 class="section__header">Stay up to date on all the latest news.</h2>
        <form action="/">
          <input type="text" placeholder="Your email" />
          <button class="btn">
            <i class="ri-send-plane-fill"></i>
          </button>
        </form> 
      </div>
    </section> */}

    <footer>
      <div class="section__container footer__container">
        {/* <div class="footer__col">
          <h4>Resources</h4>
          <ul class="footer__links">
            <li><a href="#">Release Note</a></li>
            <li><a href="#">Community Help</a></li>
          </ul>
        </div> */}
        <div class="footer__col">
          <h4>Company</h4>
          <ul class="footer__links">
            <li><a href="/#">About Us</a></li>
            <li><a href="/#">Support</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4>Product</h4>
          <ul class="footer__links">
            {/* <li><a href="#">Security</a></li> */}
            <li><a href="#">FAQ</a></li>
            <li><a href="#">T&C</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4>Follow Us</h4>
          <ul class="footer__socials">
            <li>
              <a href="#"><i class="ri-facebook-fill"></i></a>
            </li>
            <li>
              <a href="#"><i class="ri-twitter-fill"></i></a>
            </li>
            <li>
              <a href="#"><i class="ri-linkedin-fill"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__bar">
        Copyright © 2024 Elite Rentals. All rights reserved.
      </div>
    </footer>

    <script src="https://unpkg.com/scrollreveal"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="main.js"></script>
  </main>
  );
}

export default Index;
