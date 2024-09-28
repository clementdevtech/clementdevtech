//link navigation
const nav_links = document.querySelectorAll('nav-link');
console.log(nav_links);


// mode switch
    const modeSwitch = document.getElementById('mode-switch');
    const body = document.body;

    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      body.classList.add(savedMode);
      modeSwitch.checked = savedMode === 'bright-mode'; 
    } else {
      body.classList.add('dark-mode');
    }

    modeSwitch.addEventListener('change', () => {
    	console
      if (modeSwitch.checked) {
        body.classList.remove('dark-mode');
        body.classList.add('bright-mode');
        localStorage.setItem('mode', 'bright-mode'); 
      } else {
        body.classList.remove('day-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('mode', 'dark-mode');
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
