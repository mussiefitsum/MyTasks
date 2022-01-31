export default function categorizeTasks(tasks, category) {
    if (category.length === 0) return tasks;
    return tasks.filter(task => task.category === category);
}