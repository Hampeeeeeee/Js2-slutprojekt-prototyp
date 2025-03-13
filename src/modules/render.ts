import { getAllTasks } from "./URL";
import { assignTaskToMember } from "./member.ts";

let tasks: Object;

export async function renderAllTasks(): Promise<void> {
    try {
        tasks = await getAllTasks();
        // TIPS Filtrera ut tre arrayer från tasks, en för varje status 
        // console.log(tasks)
        // console.log(Object.keys(tasks))
        const todoContainer = document.getElementById('todoContainer') as HTMLDivElement;
        const inProgressContainer = document.getElementById('inProgressContainer') as HTMLDivElement;
        const doneContainer = document.getElementById('doneContainer') as HTMLDivElement;


        todoContainer.innerHTML = '';
        inProgressContainer.innerHTML = '';
        doneContainer.innerHTML = '';
        if (todoContainer) {
            // Loopa igenom alla tasks och skapa HTML för varje
            Object.keys(tasks).forEach(taskId => {
                // console.log(taskId)
                const task = tasks[taskId];
                // console.log('first objekt keys loop:', taskId)
                // console.log(task.status)
                // Fortsättning på TIPS: eller använd if-statements och kolla värdet av status 
                if (task.status === 'new') {
                    // Skapa en div för varje uppgift
                    const taskElement = document.createElement('div');
                    taskElement.classList.add('assignment');
                    taskElement.setAttribute('data-timestamp', task.timestamp.toString());

                    const timestamp = task.timestamp;
                    const date = new Date(timestamp);
                    const formattedDate = date.toLocaleString('sv-SE');

                    taskElement.innerHTML = `
                        <h2>To do</h2>
                        <h3>${task.title}</h3>
                        <p><i>${task.description}</i></p>
                        <h4><b>Qualification: ${task.category}</b></h4>
                        <h5>${formattedDate}</h5>
                        <button id="assignToBtn">Assign to</button>
                    `;

                    todoContainer.appendChild(taskElement);

                    const assignToBtn = taskElement.querySelector('#assignToBtn') as HTMLButtonElement | null;
                    if (assignToBtn) {
                        assignToBtn.addEventListener('click', async () => {
                            assignTaskToMember(task.category, task.category, assignToBtn, taskId);

                            // const url =  `https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/assignments/${taskId}.json`;

                            // const inProgressTask = {
                            //     status: 'in progress',
                            //     // selectedMember,
                            // }
                            // const options = {
                            //     method: "PATCH",
                            //     body: JSON.stringify(inProgressTask),
                            //     headers: {
                            //         "Content-Type": "application/json; charset=UTF-8"
                            //     }
                            // };
                            // try {         
                            //     const response = await fetch(url, options);
                            //     if (response.ok) {
                            //         console.log("Task status updated to done");
                            //     } else {
                            //         console.error('Failed to update task status');
                            //     }
                            // } catch (error) {
                            //     console.error('Error while updating task status:', error);
                            // }
                        });
                    }
                }
                else if (task.status === 'in progress') {

                    // Skapa en div för varje uppgift
                    const taskElement = document.createElement('div');
                    taskElement.classList.add('assignment');
                    taskElement.setAttribute('data-timestamp', task.timestamp.toString());

                    const timestamp = task.timestamp;
                    const date = new Date(timestamp);
                    const formattedDate = date.toLocaleString('sv-SE');

                    taskElement.innerHTML = `
                        <h2>In progress</h2>
                        <h3>${task.title}</h3>
                        <p><i>${task.description}</i></p>
                        <h4><b>Qualification: ${task.category}</b></h4>
                        <h5>${formattedDate}</h5>
                        <p>Assigned to: ${task.assigned}</p>
                        <button id="doneBtn">Done</button>
                    `;

                    inProgressContainer.appendChild(taskElement);

                    const doneBtn = taskElement.querySelector('#doneBtn') as HTMLButtonElement | null;
                    if (doneBtn) {
                        doneBtn.addEventListener('click', async () => {
        
                            const url =  `https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/assignments/${taskId}.json`;

                            const doneTask = {
                                status: 'done',
                            }
                            const options = {
                                method: "PATCH",
                                body: JSON.stringify(doneTask),
                                headers: {
                                    "Content-Type": "application/json; charset=UTF-8"
                                }
                            };
                            try {         
                                const response = await fetch(url, options);
                                if (response.ok) {
                                    console.log("Task status updated to done");
                                    renderAllTasks();
                                } else {
                                    console.error('Failed to update task status');
                                }
                            } catch (error) {
                                console.error('Error while updating task status:', error);
                            }
                        });
                    }
                }
                else if (task.status === 'done') {

                    // Skapa en div för varje uppgift
                    const taskElement = document.createElement('div');
                    taskElement.classList.add('assignment');
                    taskElement.setAttribute('data-timestamp', task.timestamp.toString());

                    const timestamp = task.timestamp;
                    const date = new Date(timestamp);
                    const formattedDate = date.toLocaleString('sv-SE');

                    taskElement.innerHTML = `
                        <h2>Done</h2>
                        <h3>${task.title}</h3>
                        <p><i>${task.description}</i></p>
                        <h4><b>Qualification: ${task.category}</b></h4>
                        <h5>${formattedDate}</h5>
                        <p>Assigned to: ${task.assigned}</p>
                        <button id="deleteBtn">Delete</button>
                    `;

                    doneContainer.appendChild(taskElement);

                    const deleteBtn = taskElement.querySelector('#deleteBtn') as HTMLButtonElement | null;
                    if (deleteBtn) {
                        deleteBtn.addEventListener('click', async () => {
                            const url =  `https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/assignments/${taskId}.json`;

                            const deletedTask = {
                                status: 'deleted',
                            }
                            const options = {
                                method: "PATCH",
                                body: JSON.stringify(deletedTask),
                                headers: {
                                    "Content-Type": "application/json; charset=UTF-8"
                                }
                            };
                            try {         
                                const response = await fetch(url, options);
                                if (response.ok) {
                                    console.log("Task status updated to deleted");
                                } else {
                                    console.error('Failed to update task status');
                                }
                            } catch (error) {
                                console.error('Error while updating task status:', error);
                            }
                        });
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error displaying assignments:', error);
    }
}