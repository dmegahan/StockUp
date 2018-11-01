let finishEditingButtonID = "btnFinishEditing";

function editItem(listObj, li_index)
{
    //call this function when the edit button is pressed
    //change the list item so that is has inputs instead of text so we can edit
    //when finished editing, convert those inputs back to text 

    let itemObj = itemsList[li_index];

    listObj.childNodes[li_index].innerHTML = constructEditItemDiv(itemObj);
}

//Use the add item HTML and add a finish editing button to it (and a delete button)
function constructEditItemDiv(itemObj)
{
    let editItemHTML = constructAddItemDiv(itemObj.name, itemObj.quantity, itemObj.notes, itemObj.unit);
    editItemHTML += `
    <button type="button" id="${deleteItemButtonID}">Delete This Item</button>
    <button type="button" id="${finishEditingButtonID}">Finish Editing</button>
    `
    return editItemHTML;
}