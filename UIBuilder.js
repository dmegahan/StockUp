var addItemDialogueSpawned = false;
var itemNameIdentifier = "itemName";
var itemQuantityIdentifier = "itemQuantity";
var notesIdentifier = "notes";
let unitsIdentifier = "itemUnits";

let editItemButtonID = "btnEdit";
let deleteItemButtonID = "btnDelete";

let divAddItemID = "divAddItem";
let buttonAddItemID = "btnAdd";
let divItemsListID = "divItemsList";
let ulItemsListID = "ulListOfItems";
let divAddItemInputsID = "divAddItemInputs";

var queryItemsList_LI = `#${ulItemsListID} li`; //get the LI children of the items list with this query
var queryItemsList = `#${ulItemsListID}`; //get the UL items list with this query
var queryAddItemDiv = `#${divAddItemID}`;
var queryAddItemInputsDiv = `#${divAddItemInputsID}`;

var $addItemDiv = $("#divAddItem");
var requiredInputClass = "requiredInput";
let unitTypes = ["gallons", "units"];

//How we want the addItem div and text to appear initially
let addItemVisibility_Initial = "none";
let addItemVisibility_Show = "inherit";

window.onload = () => {
    constructBody();
}

// CONSTRUCT THE BODY
/*
    The body will consist of an "Add an item" button, contained in an addItem div which will also contain our inputs later. 
    It will also contain <ul>
*/
function constructBody()
{
    let $body = $('body');
    $body.append(constructAddItemDiv());

    //delegate the add item dialogue spawner event to the body
    $body.on('click', `#${buttonAddItemID}`, SpawnAddItemDialogue);
    $body.append(constructItemsListDiv());
}

function constructAddItemDiv()
{
    let $addItemDiv = $("<div>", {id: divAddItemID});
    $addItemDiv.append(constructAddItemButton());
    $addItemDiv.append("<br>");
    $addItemDiv.append(constructDivAddItemInputs());
    return $addItemDiv;
}

function constructAddItemButton()
{
    let buttonText = "Add an Item";
    let $addItemButton = $(`<button id=${buttonAddItemID}>${buttonText}</button>`);

    return $addItemButton;
}

function constructDivAddItemInputs()
{
    let $divAddItemInputs = $("<div>", {id: divAddItemInputsID});
    $divAddItemInputs.append(constructAddItemInputs());

    return $divAddItemInputs;
}

//this div contains the UL of items
function constructItemsListDiv()
{
    let $divItemsList = $("<div>", {id: divItemsListID});
    $divItemsList.append("<p>Your current list of items</p>");
    $divItemsList.append(constructItemsListUL());
    return $divItemsList;
}

//this is making the UL of items
function constructItemsListUL()
{
    let $ulItemsList = $("<ul>", {id: ulItemsListID});
    return $ulItemsList;
}


//________________________ADD ITEM CONSTRUCTION______________________________//
function constructAddItemInputs(itemName = "", itemQuantity = "", notes = "", unit = "")
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
    // let $addItemDiv = $(queryAddItemDiv);
    // if($addItemInputsDiv.is(":visible"))
    // {
        addItemToList();
    // }else{
    //     //If the addItemDiv isnt showing, show it
    //     $addItemInputsDiv.show();
    // }
}

// function DespawnAddItemDialogue()
// {
//     //despawn the dialogue, set addItemDialogueSpawned to false
//     addItemDialogueSpawned = false;
// }

// function constructAddItemDialogue()
// {    
//     let $addItemDiv = $(queryAddItemDiv);
//     $addItemDiv.hide();
//     //Construct the html elements that will enable us to add an item
//     //set the id of the inputs to something we can reference later
//     $addItemDiv.html(constructAddItemInputs());
// }

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