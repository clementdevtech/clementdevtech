//link navigation
const nav_links = document.querySelectorAll('nav-link');
//console.log(nav_links);


// mode switch
    const modeSwitch = document.getElementById('mode-switch');
     function servicebackground(style){
    const services = document.querySelectorAll('.service');
    services.forEach(service=>{
        //console.log(style);
       	service.style.background= style;
    });
}
    const body = document.body;

    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      body.classList.add(savedMode);
      if(savedMode === 'bright-mode'){
      	modeSwitch.checked = savedMode === 'bright-mode'; 
      	servicebackground('silver');
      	}else{
      		body.classList.add('dark-mode');
      		servicebackground('#262626');
      		}
      	} else {
      		body.classList.add('dark-mode');
      		servicebackground('#262626');
    }

    modeSwitch.addEventListener('change', () => {
      if (modeSwitch.checked) {
        body.classList.remove('dark-mode');
        body.classList.add('bright-mode');
        localStorage.setItem('mode', 'bright-mode'); 
        servicebackground('silver');
      } else {
        body.classList.remove('day-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('mode', 'dark-mode');
        servicebackground('#262626');
      }
    });


// Toggle mobile menu
document.getElementById('openmenu').addEventListener('click',openmenu);
document.getElementById('closemenu').addEventListener('click',closeMenu);
function openmenu() {
    document.getElementById("sidemenu").style.right = "0";
    document.addEventListener('click', closeMenuOnClickOutside);
}

function closeMenu() {
    document.getElementById("sidemenu").style.right = "-250px";
    document.removeEventListener('click', closeMenuOnClickOutside);
}

// Function to close the menu when clicking outside of it
function closeMenuOnClickOutside(event) {
    const sidemenu = document.getElementById("sidemenu");
    const openButton = document.getElementById('openmenu');
    if (!sidemenu.contains(event.target) && !openButton.contains(event.target)) {
        closeMenu();
    }
}
//....about section 
let tablinks = document.getElementsByClassName('tab-links');
	let tabcontents = document.getElementsByClassName('tab-contents');
	function opentab(tabname) {
		for(tablink of tablinks){
			tablink.classList.remove("active-link");
		}
		for(tabcontent of tabcontents){
			tabcontent.classList.remove("active-tab");
		}
		event.currentTarget.classList.add('active-link');
		document.getElementById(tabname).classList.add('active-tab');
	}

	//...........blog section ...
const blogPostsContainer = document.getElementById('blog-posts');

function fetchMarkdownFiles() {
    const posts = [
        'https://raw.githubusercontent.com/clementdevtech/clementdevtech/main/posts/debugging-tips'
    ];

    posts.forEach(url => {
        fetch(url)
        .then(response => response.text())
        .then(markdown => {
            const blogPostDiv = document.createElement('div');
            blogPostDiv.classList.add('blog-post');
            const converter = new showdown.Converter();
            const htmlContent = converter.makeHtml(markdown);
            blogPostDiv.innerHTML = htmlContent;
            blogPostsContainer.appendChild(blogPostDiv);
        });
    });
}

document.addEventListener('DOMContentLoaded', fetchMarkdownFiles);


//toggle work
document.querySelector('.more').addEventListener('click',(event)=>{
	event.preventDefault();
	const worklist = document.querySelector('.work-list');
	const work_list_active = document.querySelector('.work-list-active');
	if (worklist) {
		worklist.classList.toggle('work-list-active');
		document.querySelector('.more').textContent='See less';
	}else{
        work_list_active.classList.toggle('.work-list');
        document.querySelector('.more').textContent='See More';
        work_list_active.scrollIntoView({ behavior: 'smooth' });
	}
});

// contact section 
  document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const responseMessage = document.getElementById('responseMessage');

    if (!name || !email || !message) {
      responseMessage.textContent = "All fields are required.";
      return;
    }

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Message', message);

    try {
      const response = await fetch('https://formspree.io/f/meojvann', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        responseMessage.textContent = "sent successfully, thank you for your message!";
        document.getElementById('contactForm').reset();
      } else {
        responseMessage.textContent = "Oops! There was a problem submitting your form please try again later.";
      }
    } catch (error) {
      responseMessage.textContent = "There was an error sending your message.";
    }
  });