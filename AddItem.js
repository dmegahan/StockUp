//flip this value to true while the text boxes are available
var addItemDialogueSpawned = false;
var itemNameIdentifier = "itemName";
var itemQuantityIdentifier = "itemQuantity";
var notesIdentifier = "notes";
let unitsIdentifier = "itemUnits";

let editItemButtonID = "btnEdit";
let deleteItemButtonID = "btnDelete";

var itemsListElement = document.getElementById("ListOfItems");
var $addItemDiv = $("#divAddItem");
var requiredInputClass = "requiredInput";
let unitTypes = ["gallons", "units"];

//How we want the addItem div and text to appear initially
let addItemVisibility_Initial = "none";
let addItemVisibility_Show = "inherit";


//event placed on the whole UL item list
itemsListElement.addEventListener('click', (eventObj) => {
    //if the button was clicked, get the parent (which is the LI, and remove it from itemsList)
    if(eventObj.target.id === deleteItemButtonID)
    {
        //loop through all list items, get the index if a list item matches exactly
        let LIIndex = getIndexOfLI(eventObj.target.parentElement, itemsListElement);

        itemsList.splice(LIIndex, 1);
        itemsListElement.removeChild(eventObj.target.parentElement);
    }
    else if(eventObj.target.id === editItemButtonID)
    {
        editItem(itemsListElement,getIndexOfLI(eventObj.target.parentElement, itemsListElement));
    }
    else if(eventObj.target.id === finishEditingButtonID)
    {
        //eventObj.target.parentElement is an LI
        let LIIndex = getIndexOfLI(eventObj.target.parentElement, itemsListElement);
        itemsList[LIIndex] = constructListObject(eventObj.target.parentElement);

        itemsListElement.replaceChild(constructListItem(itemsList[LIIndex]), itemsListElement.childNodes[LIIndex]);
    }
});

function constructAddItemDialogue()
{    
    $addItemDiv.hide();
    //Construct the html elements that will enable us to add an item
    //set the id of the inputs to something we can reference later
    $addItemDiv.html(constructAddItemDiv());
}

function constructAddItemDiv(itemName = "", itemQuantity = "", notes = "", unit = "")
{
    let addItemInnerHTML = `
    Item Name: <input type="text" name="${itemNameIdentifier}" id="${itemNameIdentifier}" class="${requiredInputClass}" value="${itemName}">
    <br>
    Item Quantity: <input type="text" name="${itemQuantityIdentifier}" id="${itemQuantityIdentifier}" class="${requiredInputClass}" value="${itemQuantity}">
    ${constructUnitsDropdown(unitTypes, unit)}
    <br>
    Notes: <input type="text" name="${notesIdentifier}" id="${notesIdentifier}" value="${notes}"><br>
    `
    return addItemInnerHTML;
}

function constructUnitsDropdown(unitTypes, unit)
{
    let html = `<select id="${unitsIdentifier}">`;
    for(let i = 0; i < unitTypes.length; i++)
    {
        html += `<option value="${unitTypes[i]}">${unitTypes[i]}`
        if(unit === unitTypes[i])
        {
            //select the unit if its provided
            html += `selected`
        }
        html += `</option>`
    }
    html += `</select>`
    return html;
}

function SpawnAddItemDialogue()
{
    //Dont spawn the add item dialogue again if its already been spawned (or is currently spawned)
    console.log($addItemDiv.is(":visible"));
    if($addItemDiv.is(":visible"))
    {
        addItemToList();
    }else{
        //If the addItemDiv isnt showing, show it
        $addItemDiv.show();
    }
}

function DespawnAddItemDialogue()
{
    //despawn the dialogue, set addItemDialogueSpawned to false
    addItemDialogueSpawned = false;
}

function addItemToList()
{
    if(hasValidInputFields($addItemDiv)){
        //create an <li> item and add our text to it
        let item = constructListObject();
        itemsList.push(item);
        itemsListElement.appendChild(constructListItem(item));
    }
}

//element is a parameter that determines how to search for our add item elements
//We want to be able to sometimes search for these add item elements that get created in the actual list
//when you edit
function constructListObject(element = document)
{
    //Grab the values from the 2 textboxes, itemName and itemQuantity
    //let itemName = element.querySelector(`#${itemNameIdentifier}`).value;
    
    let itemName = $(element).find(`#${itemNameIdentifier}`).val();
    let itemQuantity = $(element).find(`#${itemQuantityIdentifier}`).val();
    let itemNotes = $(element).find(`#${notesIdentifier}`).val();
    let itemUnits = $(element).find(`#${unitsIdentifier}`).val();
    //make the item object and return it
    let item = {name: itemName, quantity: itemQuantity, notes: itemNotes, units: itemUnits};
    return item;
}

/*
    Take an item object (javascript object) and create a list item based off it
*/
function constructListItem(itemObject)
{
    var li = document.createElement("li");
    li.innerHTML = `
    Item Name: ${itemObject.name}<br>
    Item Quantity: ${itemObject.quantity} ${itemObject.units}<br>
    <button type="button" id="${deleteItemButtonID}">Delete This Item</button>
    <button type="button" id="${editItemButtonID}">Edit This Item</button>
    `;
    return li;
}

//Given an element, search down the element (and its children) to determine if any input fields are blank. 
//Return true is all required input fields are valid (not blank)
function hasValidInputFields($element)
{
    //loop through all input fields that have a type of text
    //query all inputs in the element that are empty and have the .requiredInput class
    let textFields = $element.find(`input[type="text"].${requiredInputClass}`);

    let hasValidFields = true;
    for(let i = 0; i < textFields.length; i++)
    {
        //if the string length is  0 after all whitespace has been removed (aka the string is only whitespace)
        if(textFields[i].value.replace(/\s/g, "").length === 0)
        {
            //the input is empty, so highlight it
            let border = textFields[i].style.border;
            textFields[i].style.border = "2px solid red";
            //set a timeout and return the border to default when it completes
            setTimeout((field) => {
                field.style.border = "";
            }, 3000, textFields[i], border);
            hasValidFields = false;
        }

    }
    return hasValidFields;
}

//load the js file and construct the dialogue, but hide it at first
constructAddItemDialogue();