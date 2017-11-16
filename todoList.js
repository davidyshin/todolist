

var displayList = document.querySelector("ul");
var savedList = window.localStorage.getItem("savedList")
var count = 0

// saves input to "savedList"
function save(input) {
    return window.localStorage.setItem("savedList", JSON.stringify(input))
}
// loads saved list
function load() {
    return JSON.parse(window.localStorage.getItem("savedList"))
}
// loads count
function loadCount() {
    return window.localStorage.getItem("count")
}
// saves count
function saveCount(input) {
    return window.localStorage.setItem("count", input)
}



// takes argument input and creates a list item, adds it into html, adds it onto localstorage 
function newItem(input) {
    var count = loadCount() || "0";
    if (input) {
        var tempList = load() || []
        var obj = {
            description: input,
            completed: false,
            id: count
        }
        var item = document.createElement("li");
        item.innerText = input;
        displayList.appendChild(item);
        item.setAttribute("id", count);
        count = Number(count) + 1;
        tempList.push(obj);

        save(tempList)
        saveCount(count);
    }
}

// displays array/objects in html
function renderList(list) {
    for (var i = 0; i < list.length; i++) {
        var newItem = document.createElement("li")
        newItem.id = list[i].id;
        newItem.innerText = list[i].description;
        if (list[i].completed) {
            newItem.style.textDecoration = "line-through"
        }
        displayList.appendChild(newItem);
    }
}

// reloads list by recalling renderList with new list
function loadList() {
    var tempList = load()
    if (tempList !== null) {
        renderList(tempList)
    }
}

// filters through saved list and resaves a list with only non-completed objects

function removeAllCompleted() {
    var tempList = load()
    var newList = tempList.filter(function (obj) {
        return obj.completed !== true;
    })
    displayList.innerHTML = ""
    renderList(newList)
    save(newList)
}

// runs the newItem function on submit
var submit = document.querySelector("#submit");
submit.addEventListener("click", function (event) {
    event.preventDefault();
    var text = document.querySelector("#todoitem").value
    newItem(text);
    document.querySelector("#todoitem").value = ""
})

// on click, toggles clicked target (list item) completed value, and line-through

displayList.addEventListener("click", function (event) {
    var tempList = load();
    var tag = event.target.id;
    function index() {
        for (var j = 0; j < tempList.length; j++) {
            if (tempList[j].id === tag) {
                return j;
            }
        }
    }
    var i = index()
    var htmlLi = document.getElementById(tag);
    if (!tempList[i].completed) {
        tempList[i].completed = true;
        htmlLi.style.textDecoration = "line-through"
    } else {
        tempList[i].completed = false;
        htmlLi.style.textDecoration = "none"
    }
    save(tempList)
})

// on button click , runs removeAllCompleted function 
var removeButton = document.getElementById("removedone")
removeButton.addEventListener("click", function (event) {
    removeAllCompleted();
})

loadList()
