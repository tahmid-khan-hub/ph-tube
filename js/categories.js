function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
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

const displayVideos = (videos) => {
    const videoConatiner = document.getElementById('video-container')

    videos.forEach((video) => {
        console.log(video);

        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
            <figure>
                <img
                src="${video.thumbnail}"
                alt="videos" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
        `;

        videoConatiner.appendChild(videoCard);
    })

}

loadCategories();
loadVideos();