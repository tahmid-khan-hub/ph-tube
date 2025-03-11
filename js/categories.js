function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories){
    // get the container
    const categoryContainer = document.getElementById('category-cntainer');
    //  loop operation on arr of obj
    for(let cat of categories){
        // create element
        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] p-3 hover:text-white">${cat.category}</button>
        `;
        // append the element
        categoryContainer.appendChild(categoryDiv);
    }
    
}

loadCategories();