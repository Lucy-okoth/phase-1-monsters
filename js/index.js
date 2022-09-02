// name, age, description, <create btn>
document.addEventListener("DOMContentLoaded", afterLoad);
function afterLoad() {
    let createDiv = document.getElementById("create-monster");
    let monsterConatainer = document.getElementById("monster-container")
    let forward = document.getElementById("forward");
    let back = document.getElementById("back")
    let inputName = document.createElement('input');
    let inputAge = document.createElement('input');
    let inputDescription = document.createElement('input');
    let creator = document.createElement("button");
    inputName.type = "text";
    inputName.placeholder = "name...";
    inputAge.type = "text";
    inputAge.placeholder = "age...";
    inputDescription.type = "text";
    inputDescription.placeholder = "description...";
    creator.innerText = "Create";
    createDiv.appendChild(inputName);
    createDiv.appendChild(inputAge);
    createDiv.appendChild(inputDescription);
    createDiv.appendChild(creator);
    creator.addEventListener("click", () => {
        createDiv.appendChild(divCreator(inputName.value, inputAge.value, inputDescription.value));
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },

            body: JSON.stringify({
                "name": inputName.value,
                "age": parseInt(inputAge.value), "description": inputDescription.value
            })
        })
    })
    function divCreator(name, age, description) {
        let monsterDiv = document.createElement('div');
        let monsterName = document.createElement("h2");
        let monsterAge = document.createElement('h4');
        let monsterDes = document.createElement('p');
        monsterName.textContent = name;
        monsterAge.textContent = age;
        monsterDes = description;
        monsterDiv.appendChild(monsterName);
        monsterDiv.appendChild(monsterAge);
        monsterDiv.append(monsterDes);
        return (monsterDiv);
    }
    function fetcher(page) {
        monsterConatainer.innerHTML = "";
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(resp => resp.json())
            .then(obj => {
                for (el of obj) {
                    monsterConatainer.append(divCreator(el.name, el.age, el.description))
                }
            })
    }
    let pageNo = 1;
    let pages = 0;
    fetch(`http://localhost:3000/monsters`)
        .then(resp => resp.json())
        .then(obj => {
            pages = Math.ceil(obj.length / 50);
        })
    fetcher(pageNo);
    forward.addEventListener("click", () => {
        if (pages >= pageNo) {
            fetcher(pageNo)
            ++pageNo;
        }
        else {
            alert("End of monster list");
        }
    })
    back.addEventListener("click", () => {
        if (pageNo > 1) {
            fetcher(pageNo)
            --pageNo;
        }
        else {
            alert("End of monster list");
        }
    })
}

