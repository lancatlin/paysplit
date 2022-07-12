const people = {}
let total = 0

function onEnter(callback) {
    return (ev) => {
        if (ev.key === "Enter") {
            callback();
        }
    }
}

function addPerson() {
    elem = document.getElementById("name")
    if (elem.value in people) return
    people[elem.value] = 0
    console.log(elem.value)
    li = document.createElement("li")
    li.innerText = elem.value
    document.getElementById("people").appendChild(li)

    option = document.createElement("option")
    option.value = elem.value
    option.innerText = elem.value
    document.getElementById("payer-name").appendChild(option)
    elem.value = ""
    settlement()
}

function addRecord() {
    payer = document.getElementById("payer-name").value
    amountElem = document.getElementById("amount")
    amount = Number(amountElem.value)
    people[payer] += amount
    total += amount

    console.log(payer, amount.value)
    li = document.createElement("li")
    li.innerText = `${payer} 付了 ${amount}`
    document.getElementById("records").appendChild(li)

    amountElem.value = ""
    console.log(people)
    settlement()
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function settlement() {
    avg = Math.round(total / Object.keys(people).length)
    result = document.getElementById("result") 
    removeAllChildNodes(result)
    const elem = document.createElement("li")
    elem.innerText = `平均: ${avg}`
    document.getElementById("result").appendChild(elem)
    for (const person in people) {
        const elem = document.createElement("li")
        elem.innerText = `${person}: ${people[person] - avg}`
        document.getElementById("result").appendChild(elem)
    }
}


document.getElementById("name").addEventListener("keypress", onEnter(addPerson))
document.getElementById("amount").addEventListener("keypress", onEnter(addRecord))

