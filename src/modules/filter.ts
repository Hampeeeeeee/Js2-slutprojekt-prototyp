import { Assignment } from "./assignment";

// Filtrera uppgifter baserat på medlem
export const filterByMember = (tasks: Assignment[], member: string) => {
    console.log(member)
    return tasks.filter(task => task.assigned === member);
}

// Filtrera uppgifter baserat på kategori
export const filterByCategory = (tasks: Assignment[], category: string) => {
    return tasks.filter(task => task.category === category);
}

// export const filterByCategory = (tasks:Assignment[], category:string) => tasks.filter( task => task.category == category);
// export const filterByMember = (tasks:Assignment[], assigned:string) => tasks.filter( task => task.assigned == assigned);