// script.js
const breadcrumbContainer = document.querySelector('.breadcrumb');
const path = window.location.pathname.split('/').filter(Boolean);
const baseUrl = window.location.origin;

breadcrumbContainer.innerHTML = '';

path.forEach((part, index) => {
    const breadcrumbItem = document.createElement('li');
    breadcrumbItem.classList.add('breadcrumb-item');
    
    const url = `${baseUrl}/${path.slice(0, index + 1).join('/')}`;
    if (index < path.length - 1) {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = part.charAt(0).toUpperCase() + part.slice(1);
        breadcrumbItem.appendChild(link);
    } else {
        breadcrumbItem.textContent = part.charAt(0).toUpperCase() + part.slice(1);
        breadcrumbItem.classList.add('active');
        breadcrumbItem.setAttribute('aria-current', 'page');
    }
    
    breadcrumbContainer.appendChild(breadcrumbItem);
});