document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts');
    const converter = new showdown.Converter();

    // List of blog post URLs from GitHub in raw format
    const blogPosts = [
        'https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/posts/post1.md',
        'https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/posts/post2.md'
        // Add more blog posts here
    ];

    blogPosts.forEach(postUrl => {
        fetch(postUrl)
            .then(response => response.text())
            .then(markdown => {
                const htmlContent = converter.makeHtml(markdown);
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = htmlContent;
                blogPostsContainer.appendChild(postElement);
            })
            .catch(error => console.error('Error fetching blog post:', error));
    });
});
