import React from "react";
import logo from "../assets/Cluxtercoin Logo3.png";
import expert from "../assets/expert1.png";
import badge from "../assets/badge1.png";
import slide1 from "../assets/slide1.jpg";
import pc from "../assets/computers.jpg";
import staff1 from "../assets/staff1.jpg";
import staff2 from "../assets/staff2.jpeg";
import staff3 from "../assets/staff3.jpg";
import staff4 from "../assets/staff4.jpeg";
import { useNavigate } from "react-router";

function contactPage() {
  const navigator = useNavigate();

  const redirectToHome = () => navigator("/");
  const redirectToAbout = () => navigator("/about");
  const redirectToDepo = () => navigator("/signup");
  const redirectToSignup = () => navigator("/signup");
  const redirectToSignin = () => navigator("/signin");
  const redirectToContact = () => navigator("/contact");

  const handleSubmit = () => {};

  return (
    <div className="flex flex-col font-home">
      <header className="w-full">
        <section
          id="top"
          className="flex flex-row justify-between w-full px-8 py-2 bg-indigo-900"
        >
          <p className="flex flex-row items-center gap-1 text-sm text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
              />
            </svg>
            info@cluxtercoin.com
          </p>
          <span className="flex flex-row items-center gap-4 text-sm text-gray-100"></span>
        </section>

        <section
          id="flat"
          className="w-full h-[130px] flex flex-row justify-between bg-stone-50 px-8"
        >
          <span className="[60%] flex flex-row items-center gap-2">
            <img src={logo} alt="cluxter_logo" className="w-[50%] h-[50%]" />
            <h1 className="text-3xl font-bold">CLUXTERCOIN</h1>
          </span>
          <span className="w-[30%] flex flex-row items-center justify-between">
            <a
              onClick={redirectToHome}
              className="border-orange-500 hover:border-b"
              href=""
            >
              Home
            </a>
            <a
              onClick={redirectToAbout}
              className="border-orange-500 hover:border-b"
              href=""
            >
              About us
            </a>
            {/* <a className="border-orange-500 hover:border-b" href="">Faq</a> */}
            <a
              onClick={redirectToContact}
              className="border-orange-500 hover:border-b"
              href=""
            >
              Contact
            </a>
            <a
              onClick={redirectToSignin}
              className="border-orange-500 hover:border-b"
              href=""
            >
              Sign-In
            </a>
            <a
              onClick={redirectToSignup}
              className="border-orange-500 hover:border-b"
              href=""
            >
              Sign-Up
            </a>
          </span>
          <span className="w-[12%] flex flex-row items-center justify-around">
            <ion-icon
              class="text-orange-500 bg-stone-200 p-2 rounded-full"
              name="logo-facebook"
            ></ion-icon>
            <ion-icon
              class="text-orange-500 bg-stone-200 p-2 rounded-full"
              name="logo-twitter"
            ></ion-icon>
            <ion-icon
              class="text-orange-500 bg-stone-200 p-2 rounded-full"
              name="logo-linkedin"
            ></ion-icon>
            <ion-icon
              class="text-orange-500 bg-stone-200 p-2 rounded-full"
              name="logo-instagram"
            ></ion-icon>
          </span>
        </section>
      </header>

      <section className="w-full h-[350px] relative flex flex-col items-center justify-center">
        <div id="hue-mid"></div>
        <div className="w-[50%] flex flex-col items-center gap-4 relative z-20">
          <h3 className="text-3xl font-semibold text-white">Contact Us</h3>
          <span className="flex flex-row justify-between gap-9">
            <a
              onClick={redirectToHome}
              className="text-lg font-semibold text-stone-200 hover:text-orange-500"
            >
              Home
            </a>
            <a
              onClick={redirectToContact}
              className="text-lg font-semibold text-orange-500"
            >
              Contact
            </a>
            <a
              onClick={redirectToAbout}
              className="text-lg font-semibold text-stone-200 hover:text-orange-500"
            >
              About
            </a>
          </span>
        </div>
      </section>

      <section id="mid" className="flex items-center justify-center w-full py-5">
        <div className="flex flex-col items-center gap-3 w-[70%] ">
          <h3 className="text-4xl font-bold text-center text-indigo-900">If You Have Any Query, Please Contact Us</h3>
          <span className="flex flex-row font-light text-stone-800">
            Cluxtercoin is a registered investment platform providing digital
            asset investment management services to individuals. 
            <p onClick={redirectToSignup} className="text-orange-500 cursor-pointer">
              Signup Now.
            </p>
          </span>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col py-4 gap-5 md:w-[450px] h-[350px] "
          >
            <span className="flex flex-row justify-between w-full gap-5">
              <input type="text" placeholder="Your Name" className="w-[48%] p-3" />
              <input type="text" placeholder="Your Email" className="w-[48%] p-3" />
            </span>

            <input type="text" placeholder="Subject" className="w-full p-3" />
            <textarea name="" placeholder="Message" className="px-3 py-5"></textarea>

            <button className="w-[140px] h-[70px] bg-orange-500 text-stone-100">Send Message</button>
          </form>
        </div>
      </section>

      <footer className="h-[600px] flex flex-col items-center gap-5 bg-indigo-900 py-5">
        <section id="top" className="w-[80%] flex flex-row justify-between">
          <div className="w-[50%] flex flex-col gap-3">
            <span className="flex flex-row items-center gap-2 ">
              <img
                src={logo}
                alt="cluxter_logo"
                className="w-[80px] h-[80px]"
              />
              <h1 className="text-3xl font-bold text-stone-100">CLUXTERCOIN</h1>
            </span>
            <p className="font-light text-stone-300">
              Cluxtercoin is a registered investment platform providing digital
              asset investment management services to individuals. We provide a
              dynamic investment solution to clients in need of a self-operating
              portfolio, as well as a smart fund with flexible time and
              investment amount.
            </p>
          </div>

          <div className="w-[40%] flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-stone-100">Newsletter</h3>
            <p>For update about our investment. Please subscribe</p>
            <span className="h-[50px] border">
              <input
                type="text"
                className="w-[80%] h-full bg-transparent text-stone-200 px-5"
              />
              <button className="w-[16%] h-[80%] text-sm rounded-md p-1 ml-3 bg-yellow-500 text-stone-100">
                Sign Up
              </button>
            </span>
          </div>
        </section>

        <section id="mid" className="w-[80%] flex flex-row gap-5">
          <span className="flex flex-col gap-5">
            <h3 className="text-2xl font-bold text-stone-100">Get In Touch</h3>
            <p className="flex flex-row text-sm font-light text-stone-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              25 High St. Coventry CV! 5RE, United Kingdom
            </p>
            <p className="flex flex-row items-center text-sm font-light text-stone-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              info@cluxtercoin.com
            </p>
          </span>
          <span className="w-[30%] flex flex-col gap-5">
            <h3 className="text-2xl font-bold text-stone-100">Quick Links</h3>
            <span className="flex flex-col gap-4">
              <p className="text-sm font-light text-stone-300">About Us</p>
              <p className="text-sm font-light text-stone-300">Contact Us</p>
              <p className="text-sm font-light text-stone-300">Blog</p>
              <p className="text-sm font-light text-stone-300">
                Terms & Condition
              </p>
            </span>
          </span>
          <div className="w-[40%] flex flex-col gap-5">
            <h3 className="text-2xl font-bold text-stone-100">Follow Us</h3>
            <span className="flex flex-row items-center gap-3">
              <ion-icon
                class="bg-transparent p-3 text-stone-200 rounded-full border border-gray-200 hover:border-amber-500"
                name="logo-facebook"
              ></ion-icon>
              <ion-icon
                class="bg-transparent p-3 text-stone-200 rounded-full border border-gray-200 hover:border-amber-500"
                name="logo-twitter"
              ></ion-icon>
              <ion-icon
                class="bg-transparent p-3 text-stone-200 rounded-full border border-gray-200 hover:border-amber-500"
                name="logo-linkedin"
              ></ion-icon>
              <ion-icon
                class="bg-transparent p-3 text-stone-200 rounded-full border border-gray-200 hover:border-amber-500"
                name="logo-instagram"
              ></ion-icon>
            </span>
          </div>
        </section>

        <section
          id="flat"
          className="w-[80%] flex flex-row justify-between py-2 border-t-gray-400"
        >
          <p className="flex flex-row items-center text-sm font-light">
            © <span className="text-yellow-600">Cluxtercoin</span>, All Right
            Reserved.
          </p>

          <p className="text-sm font-light">
            {" "}
            Designed By Cluxtercoin Distributed by cluxtercoin Marketer{" "}
          </p>
        </section>
      </footer>
    </div>
  );
}

export default contactPage;
