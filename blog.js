document.addEventListener('DOMContentLoaded', function() {
    // Simulación: Supongamos que obtienes estas entradas desde tu backend
    const blogPosts = [
        { title: "Post 1", content: "Contenido del post 1..." },
        { title: "Post 2", content: "Contenido del post 2..." }
        // Agrega más posts aquí
    ];

    const postsContainer = document.getElementById('blog-posts');
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
});
