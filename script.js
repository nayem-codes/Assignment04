let interviewList = [];
let rejectionList = [];

let total = document.getElementById("total");
let interviewCount = document.getElementById("interview-count");
let rejectionCount = document.getElementById("rejection-count");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectionFilterBtn = document.getElementById("rejection-filter-btn");
const filteredSection = document.getElementById("filtered-section");


const allCardsSection = document.getElementById("all-cards");

// get counts
function calculateCount() {
    total.innerText = allCardsSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectionCount.innerText = rejectionList.length;
}

calculateCount()

// toggle buttons
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

    if (id == 'interview-filter-btn') {
        allCardsSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');
    }
    else if (id == 'all-filter-btn') {
        allCardsSection.classList.remove('hidden');
        filteredSection.classList.add('hidden');
    }
}

allCardsSection.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText;
        const role = parentNode.querySelector('.role').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const note = parentNode.querySelector('.note').innerText;

        parentNode.querySelector('.status').innerText = "INTERVIEW";
        parentNode.querySelector('.status').classList.remove('bg-sky-100');
        parentNode.querySelector('.status').classList.add('bg-green-100', 'border-1', 'border-green-600', 'text-green-600');

        const cardInfo = {
            companyName,
            role,
            type,
            status,
            note
        }

        const jobExist = interviewList.find(item => item.companyName == cardInfo.companyName);


        // Problem Here------------------------------------------------
        if (!jobExist) {
            interviewList.push(cardInfo);
        }

        renderInterview();
    }
})

function renderInterview() {
    filteredSection.innerHTML = '';

    for (let interview of interviewList) {
        let section = document.createElement('section');
        section.className = 'card bg-white my-4 p-6 rounded-lg flex justify-between'

        section.innerHTML = `
        <div class="left">
                    <h2 class="company-name font-semibold text-lg">${interview.companyName}</h2>
                    <p class="role text-gray-600">${interview.role}</p>
                    <p class="type text-sm text-gray-600 my-4">${interview.type}</p>
                    <p class="status bg-green-100 border-1 border-green-600 text-gray-600 px-3 py-2 rounded inline-block font-medium text-sm">INTERVIEW</p>
                    <p class="note text-gray-700 mt-1 mb-4">${interview.note}</p>
                    <div class="flex gap-2">
                        <button
                            class="bg-white px-3 py-2 font-semibold text-sm rounded text-green-600 border-1 border-green-600 cursor-pointer hover:bg-green-600 hover:text-white active:scale-95">INTERVIEW</button>
                        <button
                            class="bg-white px-3 py-2 font-semibold text-sm rounded text-red-600 border-1 border-red-600 cursor-pointer hover:bg-red-600 hover:text-white active:scale-95">REJECTED</button>
                    </div>
                </div>

                <div class="right">
                    <button class="border-gray-300 border-1 p-1 rounded-full cursor-pointer active:scale-95"><i class="fa-regular fa-trash-can"></i></button>
                </div>
        `
        filteredSection.appendChild(section);
    }
}