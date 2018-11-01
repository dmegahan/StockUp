$('body').on('click', 'button', (eventObj) => {
    //if the button was clicked, get the parent (which is the LI, and remove it from itemsList)
    let itemsListElement = $(queryItemsList).get(0);
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

function addItemToList()
{
    let itemsListElement = $(queryItemsList);
    let inputFieldsDiv = $(queryAddItemInputsDiv);
    if(hasValidInputFields(inputFieldsDiv)){
        //create an <li> item and add our text to it
        let item = constructListObject();
        itemsList.push(item);
        itemsListElement.append(constructListItem(item));
    }
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
        console.log(textFields[i]);
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