 export let menu = document.querySelector("#menu-btn");
 export let profileheader = document.querySelector(".header");

 export const img_inputloader = document.querySelector('#input_img');
 export let img_outputDisplay = document.querySelector('#output');
 export const profileLogoutLink = document.querySelector('#signOut');
 export const btnSignout = document.querySelector('#sign_Out1');



 export const menuOnclick = () => {

     menu.classList.toggle("fa-times");
     profileheader.classList.toggle("active");
 }

 //  let themeToggler = document.querySelector("#theme-toggler");
 //  if (themeToggler) {
 //      themeToggler.onclick = () => {
 //          themeToggler.classList.toggle("fa-sun");
 //          if (themeToggler.classList.contains("fa-sun")) {
 //              document.body.classList.add("active");
 //          } else {
 //              document.body.classList.remove("active");
 //          }
 //      };

 //  }