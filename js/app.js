// Define the Global Elements
let sections = document.querySelectorAll("main section");
let ulElement = document.querySelector(".navbar_menu #navbar_list");
let btnUp = document.querySelector(".up");
let addSection = document.querySelector('.btns .add');
let delSection = document.querySelector('.btns .del');
let links;



// function to create Section
function createSection(){
    let sec = document.createElement('section');
    sec.id = document.getElementById('title').value;
    sec.dataset.nav = document.getElementById('title').value;
    sec.innerHTML =`<div class="landing_container">
    <h2>${document.getElementById('title').value}</h2>
    <p>${document.getElementById('description').value}</p>
    </div>`;

    document.querySelector('main').appendChild(sec);
}

// Add Section
addSection.onclick = function(){
    ulElement.innerHTML = '';
    document.getElementById('title').value='';
    document.getElementById('description').value='';
    



    document.querySelector('.add-section').style.display = 'block';
    addSection.style.opacity = '1';

    document.getElementById('title').focus();

    document.querySelector('.confirm').onclick = function (){
       if(document.getElementById('title').value =='' ||
       document.getElementById('description').value ==''){

        Swal.fire('Please Write the Title and Description', '' , 'warning')

       }else{
        createSection();

        document.querySelector('.add-section').style.display = 'none';
        addSection.style.opacity = '0.5';

        sections = document.querySelectorAll("main section");
        createLiNav();

        Swal.fire('You Add Section Successfully','','success');
       }
    }

    document.querySelector('.cancel').onclick = function (){
        document.querySelector('.add-section').style.display = 'none';
        addSection.style.opacity = '0.5';

        createLiNav();
        
        Swal.fire('You don\'t  Add  Section','You can Add Section Later','error');

    }
}



// Make Navigation and add li Elements Dynamic
createLiNav();
function createLiNav(){
for (let i = 0; i < sections.length; i++) {
    let liElement = document.createElement("li");

    let anchorElement = document.createElement("a");
    anchorElement.className = "menu_link";
    anchorElement.innerHTML = sections[i].dataset.nav;
    anchorElement.href = `#${sections[i].id}`;
    anchorElement.dataset.nav = `#${sections[i].id}`;

    liElement.appendChild(anchorElement);
    ulElement.appendChild(liElement);
}
 links = document.querySelectorAll("#navbar_list .menu_link");
}



window.onscroll = function() {
    // Set sections as active
    sections.forEach((e) => {
        if (
            e.getBoundingClientRect().top >= -400 &&
            e.getBoundingClientRect().top <= 150
        ) {
            // add active to current section in navbar
            handelActive(links, e);

            // Add class 'active' to section when near top of viewport
            e.classList.add("active");
        } else {
            e.classList.remove("active");
        }
    });

    // Call function to Start on Scrolling
    isScroll();

    // Show or Hide The btn on Scrolling
    this.scrollY >= 1000 ?
        btnUp.classList.add("show") :
        btnUp.classList.remove("show");
};

// Scroll to the Target Section or Scroll to section on link click
function scrollIntoSection(element) {
    element.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();

            // Scroll to anchor ID using scrollTO event
            document.querySelector(e.target.dataset.nav).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}
scrollIntoSection(links);

// check if the User Scrolling or Not
let isScrolling;

function isScroll() {
    ulElement.style.display = "block";

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
        ulElement.style.display = "none";
    }, 15000);
}

// click Go Up btn to go top
btnUp.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

// function to add an active class when the element is in the viewport
function handelActive(element, e) {
    element.forEach((ele) => {
        if (`#${e.id}` === ele.dataset.nav) {
            ele.classList.add("active");
        } else {
            ele.classList.remove("active");
        }
    });
}

// Delete Section
delSection.onclick = function (){

    document.querySelector('.del-section').style.display = 'block';
    delSection.style.opacity = '1';
    document.getElementById('del-title').focus();


    document.querySelector('.del-section .confirm').onclick = function (){
        sections.forEach(section =>{

            if(section.id == document.getElementById('del-title').value){
                section.remove();
                ulElement.innerHTML = '';
                sections = document.querySelectorAll("main section");
                createLiNav();

                document.getElementById('del-title').value ='';
                document.querySelector('.del-section').style.display = 'none';
                delSection.style.opacity = '0.5';

                Swal.fire('You Deleted Section Successfully','','success');
            }
        })
    }



    document.querySelector('.del-section .cancel').onclick = function (){
        document.querySelector('.del-section').style.display = 'none';
        delSection.style.opacity = '0.5';

        Swal.fire('You don\'t  Delete the Section','You can Delete Section Later','warning');
    }
}
