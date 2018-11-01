//________________________ADD ITEM CONSTRUCTION______________________________//
var addItemDialogueSpawned = false;
var itemNameIdentifier = "itemName";
var itemQuantityIdentifier = "itemQuantity";
var notesIdentifier = "notes";
let unitsIdentifier = "itemUnits";

let editItemButtonID = "btnEdit";
let deleteItemButtonID = "btnDelete";

var itemsListID = "ListOfItems";
var itemsListElement = document.getElementById(itemsListID);
var itemsListQuery = `#${itemsListID} li`;
var $addItemDiv = $("#divAddItem");
var requiredInputClass = "requiredInput";
let unitTypes = ["gallons", "units"];

//How we want the addItem div and text to appear initially
let addItemVisibility_Initial = "none";
let addItemVisibility_Show = "inherit";

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

function SpawnAddItemDialogue()
{
    //Dont spawn the add item dialogue again if its already been spawned (or is currently spawned)
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

function constructAddItemDialogue()
{    
    $addItemDiv.hide();
    //Construct the html elements that will enable us to add an item
    //set the id of the inputs to something we can reference later
    $addItemDiv.html(constructAddItemDiv());
}

//_______________________________________________________ LIST CONSTRUCTION __________________________________//

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

