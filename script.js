
let interviewList = [];
let rejectionList = [];
let currentStatus = 'all';

let total = document.getElementById("total");
let interviewCount = document.getElementById("interview-count");
let rejectionCount = document.getElementById("rejection-count");


const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectionFilterBtn = document.getElementById("rejection-filter-btn");

const cardsContainer = document.getElementById("cards-container");
const filteredSection = document.getElementById("filtered-section");
const allCardsSection = document.getElementById("all-cards");

const jobCount = document.getElementById("job-count");
const availableCount = document.getElementById("available-count");
const showingCount = document.getElementById("showing-count");
const totalCount = document.getElementById("total-count");

const deleteBtns = document.querySelectorAll(".delete-btn");

cardsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        console.log("clicked")
        const parentNode = event.target.parentNode.parentNode;
        console.log(parentNode);
        parentNode.remove();
        calculateCount();
    }
})


// get counts
function calculateCount() {
    total.innerText = allCardsSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectionCount.innerText = rejectionList.length;

    jobCount.innerText = `${allCardsSection.children.length} jobs`;
    if (currentStatus === "all-filter-btn") {
        showingCount.innerText = allCardsSection.children.length;
    } else if (currentStatus === "interview-filter-btn") {
        showingCount.innerText = interviewList.length;
    } else {
        showingCount.innerText = rejectionList.length;
    }
    totalCount.innerText = allCardsSection.children.length;
}

calculateCount();
function toggleStyle(id) {
    allFilterBtn.classList.remove('bg-blue-500', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
    rejectionFilterBtn.classList.remove('bg-blue-500', 'text-white');

    allFilterBtn.classList.add('bg-white');
    interviewFilterBtn.classList.add('bg-white');
    rejectionFilterBtn.classList.add('bg-white');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white');
    selected.classList.add('bg-blue-500', 'text-white');

    // show and hide sections based on the clicked button
    currentStatus = id;
    if (id == 'interview-filter-btn') {
        allCardsSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        jobCount.classList.add('hidden');
        availableCount.classList.remove('hidden');
        showingCount.innerText = interviewList.length;
        renderInterview();
    }
    else if (id == 'all-filter-btn') {
        allCardsSection.classList.remove('hidden');
        filteredSection.classList.add('hidden');
        jobCount.classList.remove('hidden');
        availableCount.classList.add('hidden');
    }
    else if (id == 'rejection-filter-btn') {
        allCardsSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        jobCount.classList.add('hidden');
        availableCount.classList.remove('hidden');
        showingCount.innerText = rejectionList.length;
        renderReject();
    }
    console.log(currentStatus);
}

cardsContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode.parentNode;

        console.log(event.target.parentNode.parentNode.parentNode)
        const companyName = parentNode.querySelector('.company-name').innerText;
        const role = parentNode.querySelector('.role').innerText;
        const type = parentNode.querySelector('.type').innerText;
        parentNode.querySelector('.status').innerText = "INTERVIEW";
        const status = parentNode.querySelector('.status').innerText;
        const note = parentNode.querySelector('.note').innerText;

        const cardInfo = {
            companyName,
            role,
            type,
            status,
            note
        }

        const jobExist = interviewList.find(item => item.companyName == cardInfo.companyName);

        if (!jobExist) {
            interviewList.push(cardInfo);
        }

        rejectionList = rejectionList.filter(item => item.companyName != cardInfo.companyName);

        calculateCount();
        updateAllCardsStatus(cardInfo.companyName, "INTERVIEW");

        if (currentStatus == "rejection-filter-btn") {
            renderReject();
        }

    }
    else if (event.target.classList.contains('rejection-btn')) {
        const parentNode = event.target.parentNode.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText;
        const role = parentNode.querySelector('.role').innerText;
        const type = parentNode.querySelector('.type').innerText;

        parentNode.querySelector('.status').innerText = "REJECTED";
        const status = parentNode.querySelector('.status').innerText;
        const note = parentNode.querySelector('.note').innerText;

        const cardInfo = {
            companyName,
            role,
            type,
            status,
            note
        }

        const jobExist = rejectionList.find(item => item.companyName == cardInfo.companyName);

        if (!jobExist) {
            rejectionList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);

        updateAllCardsStatus(cardInfo.companyName, "REJECTED");

        calculateCount();

        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
    }
})


// render list based on the status
function renderList(list, status) {
    filteredSection.innerHTML = '';
    for (let item of list) {
        let section = document.createElement('section');
        section.className = 'card bg-white my-4 p-6 rounded-lg flex justify-between'
        section.innerHTML = `
       <div class="left">
                <h2 class="company-name font-semibold text-lg">${item.companyName}</h2>
                <p class="role text-gray-600">${item.role}</p>
                <p class="type text-sm text-gray-600 my-4">${item.type}</p>  
               <p class="status bg-green-100 border-1 border-green-600 text-green-600 px-3 py-2 rounded inline-block font-medium text-sm">${item.status}</p>
                <p class="note text-gray-700 mt-1 mb-4">${item.note}</p>
                <div class="flex gap-2">
                    <button
                        class="interview-btn bg-white px-3 py-2 font-semibold text-sm rounded text-green-600 border-1 border-green-600 cursor-pointer hover:bg-green-600 hover:text-white active:scale-95">INTERVIEW</button>
                   <button
                        class="rejection-btn bg-white px-3 py-2 font-semibold text-sm rounded text-red-600 border-1 border-red-600 cursor-pointer hover:bg-red-600 hover:text-white active:scale-95">REJECTED</button>
                </div>
            </div>
            <div class="right">
                <button class="border-gray-300 border-1 p-1 rounded-full cursor-pointer active:scale-95 delete-btn"><i class="fa-regular fa-trash-can"></i></button>
            </div>
    `
        filteredSection.appendChild(section);
    }
    checkEmpty();
    console.log(list, status);
}

// render interview list and rejection list based on the status
function renderInterview() {
    renderList(interviewList, "INTERVIEW");
}
function renderReject() {
    renderList(rejectionList, "REJECTED");
}


// Delete button 
filteredSection.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const card = event.target.closest('.card');
        const companyName = card.querySelector('.company-name').innerText;

        // remove the card from the filteredSection
        card.remove();

        // remove the card from the interviewList and rejectionList
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectionList = rejectionList.filter(item => item.companyName !== companyName);

        // also remove the card from the allCardsSection
        const allCards = allCardsSection.querySelectorAll('.card');
        allCards.forEach(allCard => {
            const allCardCompanyName = allCard.querySelector('.company-name').innerText;
            if (allCardCompanyName === companyName) {
                allCard.remove();
            }
        });
        calculateCount();

        if (currentStatus === "all-filter-btn") {
            checkEmpty();
        }
    }
})


// Status update 
function updateAllCardsStatus(companyName, newStatus) {
    const allCards = allCardsSection.querySelectorAll('.card');
    allCards.forEach(allCard => {
        const allCardCompanyName = allCard.querySelector('.company-name').innerText;
        if (allCardCompanyName === companyName) {
            const statusElement = allCard.querySelector('.status');
            statusElement.innerText = newStatus;
            // update the style of the status element based on the new status
            if (newStatus === "INTERVIEW") {
                statusElement.classList.remove('bg-sky-100', 'bg-red-100', 'border-red-600', 'text-red-600');
                statusElement.classList.add('bg-green-100', 'border-1', 'border-green-600', 'text-green-600');
            } else if (newStatus === "REJECTED") {
                statusElement.classList.remove('bg-sky-100', 'bg-green-100', 'border-green-600', 'text-green-600');
                statusElement.classList.add('bg-red-100', 'border-1', 'border-red-600', 'text-red-600');
            }
        }
    });
}

// when any tab is empty, show "No jobs available" message
function checkEmpty() {
    if (currentStatus === "all-filter-btn" && allCardsSection.children.length === 0) {
        allCardsSection.innerHTML = `<section
                    class="max-w-6xl mx-auto px-10 py-12 rounded-lg bg-white flex flex-col items-center justify-center mt-4">
                    <img src="./jobs.png" alt="">
                    <h1 class="font-semibold text-2xl mt-4">No jobs available</h1>
                    <p class="text-gray-600">Check back soon for new job opportunities</p>
                </section>`;
    } else if (currentStatus === "interview-filter-btn" && interviewList.length === 0) {
        filteredSection.innerHTML = `<section
                    class="max-w-6xl mx-auto px-10 py-12 rounded-lg bg-white flex flex-col items-center justify-center mt-4">
                    <img src="./jobs.png" alt="">
                    <h1 class="font-semibold text-2xl mt-4">No jobs available</h1>
                    <p class="text-gray-600">Check back soon for new job opportunities</p>
                </section>`;;
    } else if (currentStatus === "rejection-filter-btn" && rejectionList.length === 0) {
        filteredSection.innerHTML = `<section
                    class="max-w-6xl mx-auto px-10 py-12 rounded-lg bg-white flex flex-col items-center justify-center mt-4">
                    <img src="./jobs.png" alt="">
                    <h1 class="font-semibold text-2xl mt-4">No jobs available</h1>
                    <p class="text-gray-600">Check back soon for new job opportunities</p>
                </section>`;;
    }
}
// call checkEmpty function after rendering the lists
cardsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-filter-btn') || event.target.classList.contains('rejection-filter-btn') || event.target.classList.contains('all-filter-btn')) {
        checkEmpty();
    }
})

// checkEmpty function after deleting a card
cardsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        checkEmpty();
    }
})

