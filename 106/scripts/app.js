const iconImportant ="iImportant fas fa-star";
const iconNonImportant = "iImportant far fa-star";
var important = false;
var panelVisible = true;
var total = 0;

function toggleImportance(){
    if(important) {
        //from imp to not imp
        $("#iImportant").removeClass(iconNonImportant).addclass(iconImportant);
     important = false;
    }
    else{
        //non imp to imp
     $("#iImportant").removeClass(iconNonImportant).addclass(iconImportant);
     important = true;
    }
}
function togglePanel(){
    if(panelVisible){
        $("#form").hide();
        $("#btntogglePanel").text("< show");
        panelVisble = false;
        
    }
    else{
        $("#form").show();
        $("#btntogglePanel").text("hide >");
        panelVisible = true;
        
        
    }
}

function saveTask(){
    let title = $("#txtTitle").val();
    let desc = $("#txtDesc").val();
    let dueDate = $("#selDate").val();
    let location = $("#txtLocation").val();
    let invites = $("#txtInvites").val();
    let color = $("#selColor").val();
    let frequency = $("#selFrequency").val();
    let status = $("#selStatus").val();

    //create an object
    let task = new Task(important, title, desc, dueDate, location, invites, color, frequency, status);
  
    
   
    $.ajax({
        type:"post",
        url:"https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType:"application/json",
        succes: function(res){
            console.log("Task saved", res);
            displayTask(task);
            clearForm();
            total += 1;
            $("#headCount").text("you have " + total + " tasks");
        },
        error: function(errorDetails){
            console.error("save failed", errorDetails);
        },
    });

    

}

function clearForm(){
    $("input").val("");
    $("textarea").val("");
    $("select").val("0");
    $("selColor").val("#ffffff");
}

function getStatusText(status){
    switch(status){
        case "1":
            return "Pending";
        case "2":
            return "In progress"
        case "3": 
            return "Pause";
        case "4":
            return "Compleeted";
        case "5":
            return "Abandoned";
        default:
            return "Other";

    }
}

function getFrequencyText(val){
    switch(val){
        case "0":
            return "one time";
        case "1":
            return "Daily";
        case "2":
            return "Weekly";
        case "3":
            return "Monthly";
        
        default:
            return ""
    }
}

function displayTask(task){
    let iconClass = iconNonImportant;
    if(task.important){
        iconClass = iconImportant;
    }

    let syntax = 
    `<div class="task-item" style="border: 1px solid ${task.color};">
    <div class="icon">
    <i class="${iconClass}"></i>
    </div>

    <div class="info-1">
       <h5>${task.title}</h5>
       <p>${task.description}</p>
       </div>

       <div class="info-2">
       <label>${task.dueDate}</label>
       <label>${task.location}</label>
       </div>

       <div class="info-3">
       <p>${task.invites}</p>
       </div>

       <div class="info-2">
       <label>${getStatusText(task.status)}</label>
       <label>${getFrequencyText(task.frequency)}</label>
       </div>

     </div>`;

    $("#tasks").append(syntax);
}
function fetchTasks(){
    $.ajax({
        type: "get",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(res){
            let data = JSON.parse(res);

            total = 0;
            for(let i = 0; i < data.length; i++){
                let task = data[i];

                if(task.name == "David"){
                    total += 1;
                displayTask(task);
            }
        }
        $("#headCount").text("you have " + total + " tasks");
        },
        error: function(err){
            console.error("Error rettrieving data", err);
        }
    });

}

function clearAllTasks(){
    $.ajax({
        type: "delete",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/David",
        success: function(){
            location.reload();

        },
        error: function(err){
            console.log("Error clearing task", err)
        }
        
    })
}

function init(){
    console.log("task manager page")
    //assign events
    $("#iImportant").click(toggleImportance);
    $("#btnTogglePanel").click(togglePanel);
    $("#btnSave").click(saveTask);
    $("#btnClearAll").click(clearAllTasks);

    fetchTasks();

}

window.onload = init;
