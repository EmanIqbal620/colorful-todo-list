#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
// Print Welcome message
console.log(chalk.bold.rgb(204, 204, 204)(`\n \t\t <<<======================================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<===============>>>  ${chalk.bold.hex("#9999FF")(`Welcome To 'CodeWithEman' app  <<<================>>>`)}`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<======================================================\n`));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do:",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo_List", "Exit"]
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo_List") {
            viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
// Function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new Task"
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} task added successfully in Todo-List\n`);
};
// Function to view all Todo-List Tasks
let viewTask = () => {
    console.log("\n Your Todo-List: \n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log("\n");
};
// Function to delete a task from the list
let deleteTask = async () => {
    viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no' of the task you want to delete :",
            validate: (value) => {
                if (isNaN(value) || value < 1 || value > todoList.length) {
                    return 'Please enter a valid task number';
                }
                return true;
            }
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deletedTask[0]} task has been deleted successfully from your Todo-List\n`);
};
// Function to update a task
let updateTask = async () => {
    viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no' of the task you want to update:",
            validate: (value) => {
                if (isNaN(value) || value < 1 || value > todoList.length) {
                    return 'Please enter a valid task number';
                }
                return true;
            }
        },
        {
            name: "new_task",
            type: "input",
            message: "Now enter the new task name:"
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(`\n Task at index no. ${update_task_index.index - 1} updated successfully [for updated list check option: "View Todo-List"]`);
};
main();
