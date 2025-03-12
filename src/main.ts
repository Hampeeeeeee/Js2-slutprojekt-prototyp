import { addMember } from "./modules/member.ts";
import { addAssignment, Assignment } from "./modules/assignment.ts";
import { getAllTasks } from "./modules/URL.ts";
import { assignTaskToMember, getMembers } from "./modules/member.ts";
import { sortByTimestamp, sortByTitle } from "./modules/sorting.ts";
import { filterByMember, filterByCategory } from "./modules/filter.ts";
import { renderAllTasks } from "./modules/render.ts";

document.addEventListener("DOMContentLoaded", () => {

    const memberform = document.querySelector('#addMemberForm') as HTMLFormElement;

    if (memberform) {
        memberform.addEventListener('submit', addMember);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const assignmentform = document.querySelector('#addAssignmentForm') as HTMLFormElement;

    if (assignmentform) {
        assignmentform.addEventListener('submit', addAssignment);
    }
});

document.querySelector('#timestampSorting')?.addEventListener('change', (event) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'asc') {
        sortByTimestamp('oldestToNewest');
    } else if (selectedValue === 'desc') {
        sortByTimestamp('newestToOldest');
    }
});

document.querySelector('#titleSorting')?.addEventListener('change', (event) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'titleAsc') {
        sortByTitle('titleAsc');
    } else if (selectedValue === 'titleDesc') {
        sortByTitle('titleDesc');
    }
});

// async function updateInProgress() {
//     const tasks = await getAllTasks(); // Hämta alla tasks

//     const selectedCategory = (document.querySelector('#categoryFilter') as HTMLSelectElement).value;
//     const selectedMember = (document.querySelector('#memberFilter') as HTMLSelectElement).value;
// //     const timestampSortValue = (document.querySelector('#timestampSorting') as HTMLSelectElement).value;
// //     const titleSortValue = (document.querySelector('#titleSorting') as HTMLSelectElement).value;

//     let taskArray = Object.values(tasks)
//     let filteredTasks = [...taskArray];

//     // Filtrera uppgifter baserat på valda filter
//     if (selectedCategory !== "Filter by category") {
//         filteredTasks = filterByCategory(filteredTasks, selectedCategory);
//     }

//     if (selectedMember !== "Filter by member") {
//         filteredTasks = filterByMember(filteredTasks, selectedMember);
//     }

// //     // Sortera uppgifterna baserat på valda sorteringskriterier
// //     if (timestampSortValue === "asc") {
// //         filteredTasks.sort((a, b) => a.timestamp - b.timestamp); // Oldest to newest
// //     } else if (timestampSortValue === "desc") {
// //         filteredTasks.sort((a, b) => b.timestamp - a.timestamp); // Newest to oldest
// //     }

// //     if (titleSortValue === "titleAsc") {
// //         filteredTasks.sort((a, b) => a.title.localeCompare(b.title)); // A-Z
// //     } else if (titleSortValue === "titleDesc") {
// //         filteredTasks.sort((a, b) => b.title.localeCompare(a.title)); // Z-A
// //     }
// }

// // // Event listeners för dropdowns
// // document.querySelector('#timestampSorting')?.addEventListener('change', updateInProgress);
// // document.querySelector('#titleSorting')?.addEventListener('change', updateInProgress);
// document.querySelector('#categoryFilter')?.addEventListener('change', updateInProgress);
// document.querySelector('#memberFilter')?.addEventListener('change', updateInProgress);

// // Anropa för att uppdatera listan vid inläsning
// document.addEventListener('DOMContentLoaded', () => {
//     updateInProgress();
// });

// Populera medlemsdropdownen
async function populateMemberFilter() {
    const memberFilter = document.querySelector('#memberFilter') as HTMLSelectElement;

    try {
        const members = await getMembers();

        members.forEach((member) => {
            const option = document.createElement('option');
            option.value = member.name;
            option.textContent = member.name;
            memberFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating member filter:', error);
    }
}

document.addEventListener('DOMContentLoaded', populateMemberFilter);

renderAllTasks();





