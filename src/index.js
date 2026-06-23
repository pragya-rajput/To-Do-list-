
import "./style.css";

function saveToLocalStorage()
{
    localStorage.setItem("projects" , JSON.stringify(projects));
}

function loadFromLocalStorage()
{
     const savedData = localStorage.getItem("projects");   // get the saved data from array 

     const parsedProjects = JSON.parse(savedData);         // convert back to array

     parsedProjects.forEach(projectData =>
     {
          const project = new Project(projectData.name);   // create new project object  
          project.displayProject();                        // display it
          projects.push(project)                           //  add it to projects array

          projectData.toDos.forEach(projectToDo =>
          {
               const newTodo = new ToDo(projectToDo.title , projectToDo.description , projectToDo.dueDate , projectToDo.priority);
               project.toDos.push(newTodo);
          }
          )
     }
     )
}


class Project 
{
   constructor(name)
   {
        this.name = name;
        this.toDos = [];
   };
       
   displayProject()
   {
        const projectList = document.querySelector("#project-list");
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-card");

        const showName = document.createElement("h3");
        showName.textContent = `${this.name}`;

        projectDiv.addEventListener("click" , ()=>
       {
           document.querySelectorAll(".project-card").forEach(card => 
               {
                    card.classList.remove("selected-project");
               });

               projectDiv.classList.add("selected-project");

            currentProject = this;
            renderProject(currentProject);
        
       });
      
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click" , (e) =>
     {
            e.stopPropagation();

          if(projects.length === 1)
          {
               alert("You must have at least one project.");
               return;
          }

           const indexOfProject = projects.indexOf(this);

          if(indexOfProject != -1)
          {
               projects.splice(indexOfProject , 1);
               saveToLocalStorage();
               projectDiv.remove();
          }

          currentProject = projects[0];

          renderProject(currentProject);

     });

        projectDiv.append(showName , deleteBtn);
        projectList.append(projectDiv);
   }

}

class ToDo
{
      constructor(title , description , dueDate , priority)
      {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
      }
      
      Display(container , project)
      {
           const displayDetails = document.createElement("div");
           displayDetails.classList.add("task-details");

          const title = document.createElement("div");
          title.textContent = this.title;

          const dueDate = document.createElement("div");
          dueDate.textContent = `Due : ${this.dueDate}`;

          const priority = document.createElement("div");
          priority.classList.add("task");
          priority.textContent = ` Priority : ${this.priority}`;

          const descriptionBtn = document.createElement("button");
          descriptionBtn.textContent = "show description";
          const descriptionContent = document.createElement("p");
          descriptionContent.textContent = this.description;

          descriptionContent.style.display = "none";

          descriptionBtn.addEventListener("click" , function()
          { 
            if(descriptionContent.style.display === "none")
            {
                 descriptionContent.style.display = "block";
                 descriptionBtn.textContent = "hide description";
            }

            else{
                descriptionContent.style.display = "none";
                 descriptionBtn.textContent = "show description";
            }
          });
            
            const deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.type = "button";
            deleteTaskBtn.textContent = "Delete";
            deleteTaskBtn.addEventListener("click" , () =>
           {
                   const index = project.toDos.indexOf(this);

                   if(index != -1)
                   {
                    project.toDos.splice(index , 1)
                    saveToLocalStorage();
                   }

                   renderProject(project);
           });

           const completeTask = document.createElement("button");
           completeTask.textContent = "complete-Task";
           completeTask.classList.add("task");
           completeTask.classList.add("complete-task");

           displayDetails.append(title , dueDate , priority , descriptionBtn , descriptionContent , deleteTaskBtn , completeTask);

           container.appendChild(displayDetails);

           completeTask.addEventListener("click" , function()
          {
                 displayDetails.classList.toggle("completed");
          });
           
      }

}


function renderProject(project)
{
     taskContainer.innerHTML = "";
     project.toDos.forEach(todo => {
          todo.Display(taskContainer , project);
     });
}

const projects = [];

const taskContainer = document.querySelector("#task-container");

loadFromLocalStorage();

if(projects.length === 0)
{
const defaultProject = new Project("Default");
defaultProject.displayProject();
projects.push(defaultProject);
}

let currentProject = projects[0];

const newProject = document.querySelector("#addAProject");
newProject.addEventListener("click" , function()
{

const projectForm = document.createElement("div");

const currentProjectName = document.createElement("input");
currentProjectName.value = "";
currentProjectName.required = true;
currentProjectName.type = "text";
currentProjectName.placeholder = "Enter project Name : ";

const saveBtn = document.createElement("button");
saveBtn.textContent = "Save";

const cancelBtn = document.createElement("button");
cancelBtn.textContent = "cancel";

projectForm.append(currentProjectName , saveBtn , cancelBtn);
document.body.append(projectForm);

saveBtn.addEventListener("click" , function()
{
    const newProj = new Project(currentProjectName.value);
    currentProject = newProj;
    newProj.displayProject();
    projects.push(newProj);
    saveToLocalStorage();

    renderProject(currentProject);
    currentProjectName.value = "";
    projectForm.remove();
    
});

cancelBtn.addEventListener("click" , function()
{
    projectForm.remove();
});


});

const addTask = document.querySelector("#addNewTask");

addTask.addEventListener("click" , function()
{    
     const taskSection = document.querySelector("#task-section");
     const formContent = document.createElement("form");
     formContent.classList.add("form");
     
     const titleInput = document.createElement("input");
     titleInput.value = "";
     titleInput.required = true;
     titleInput.type = "text";
     titleInput.placeholder = "Enter Title : ";

     const description = document.createElement("input");
     description.value = "";
     description.type = "text";
     description.placeholder = "Enter Description about task ";

     const dueDate = document.createElement("input");
     dueDate.value = "";

     dueDate.type = "date";
     dueDate.placeholder = "select due date for task ";

     const priority = document.createElement("select");
     priority.value = "";

     const highOption = document.createElement("option");
     highOption.value = "High";
     highOption.textContent = "High";

     const mediumOption = document.createElement("option");
     mediumOption.value = "Medium";
     mediumOption.textContent = "Medium";

     const lowOption = document.createElement("option");
     lowOption.value = "Low";
     lowOption.textContent = "Low";

     const saveBtn = document.createElement("button");
     saveBtn.textContent = "Save";
     saveBtn.type = "submit";
      
     const deleteBtn = document.createElement("button");
     deleteBtn.type = "button";
     deleteBtn.textContent = "Delete";
       
     priority.append(highOption , mediumOption , lowOption);

     formContent.append(titleInput , description , dueDate , priority , saveBtn , deleteBtn);

     taskSection.append(formContent);
      
     formContent.addEventListener("submit" , function(e)
      {
             e.preventDefault();
             const obj = new ToDo(titleInput.value , description.value , dueDate.value , priority.value);
             currentProject.toDos.push(obj);
             saveToLocalStorage()
             renderProject(currentProject);
             formContent.remove();
      });

      deleteBtn.addEventListener("click" , function()
      {
            formContent.remove();
      });


}); 

