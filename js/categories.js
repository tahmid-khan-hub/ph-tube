function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = ""){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        document.getElementById('btn-all').classList.add('active')
        displayVideos(data.videos)
    });
}

function loadVideoDetails(videoId){
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        displayVideoDetails(data.video)
    })
}

function removeActiveClass(){
    const activeBtn = document.getElementsByClassName('active');

    for(let b of activeBtn){
        b.classList.remove('active');
    }
}

const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details-container');

    detailsContainer.innerHTML = `
        <div class="card bg-base-100 image-full shadow-sm">
        <figure>
            <img
            src="${video.thumbnail}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${video.title}</h2>
            <p>${video.description}</p>
        </div>
        </div>
    `;

}

const loadCategoryVideos = (id) => {
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    // console.log(url);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {

        removeActiveClass();
        const clickedBtn = document.getElementById(`btn-${id}`)
        clickedBtn.classList.add('active');
        displayVideos(data.category)

    })
}

function displayCategories(categories){
    // get the container
    const categoryContainer = document.getElementById('category-cntainer');
    //  loop operation on arr of obj
    for(let cat of categories){
        // create element
        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <button id = "btn-${cat.category_id}" onclick = "loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] p-3 hover:text-white">${cat.category}</button>
        `;
        // append the element
        categoryContainer.appendChild(categoryDiv);
    }
    
}

const displayVideos = (videos) => {
    const videoConatiner = document.getElementById('video-container')

    videoConatiner.innerHTML = "";

    if(videos.length === 0){
        videoConatiner.innerHTML = `
        <div class="col-span-full text-center flex flex-col justify-center items-center py-20">
            <img class="w-[150px]" src="./Icon.png" alt="">
            <p class="text-3xl font-bold p-9">Oops!! Sorry, There is no <br> content here</p>
        </div>
        `
        return;
    }

    videos.forEach((video) => {
        console.log(video);

        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
            <div class="card bg-base-100 shadow-sm mb-6">
                <figure class="relative">
                    <img class="w-full h-[240px]"
                    src="${video.thumbnail}"
                    alt="images" />
                    <span class = "text-white font-bold rounded p-1 bg-black absolute bottom-2 right-2">${video.others.posted_date} </span>
                </figure>
                <div class="flex gap-3 px-0 mt-6">
                    <div class="">
                        <div class="avatar">
                            <div class="w-14 h-14 rounded-full ">
                              <img class = "w-full" src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="ml-2">
                        <h2 class="font-bold text-xl mb-3">${video.title}</h2>
                        <div class="flex">
                            <p class="text-gray-400 mb-3">${video.authors[0].profile_name}</p>
                            ${
                                video.authors[0].verified == true ? 
                                `<img class="w-5 h-5" src="./Group 3.png" alt=""/>` : ``
                            }
                        </div>
                        <p class="text-gray-400 mb-8">${video.others.views} Views</p>
                    </div>
                </div>
                <button onclick = "loadVideoDetails('${video.video_id}')" class="btn btn-block bg-slate-200">Show Details</button>
            </div>
        `;

        videoConatiner.appendChild(videoCard);
    })

}

document.getElementById('search-input')
.addEventListener('keyup', (event) => {

    const input = event.target.value;
    loadVideos(input)
})

loadCategories();

