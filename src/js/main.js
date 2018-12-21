(function main() {
    //keep track of our list of items
    let itemsList = new ItemsList();

    //Add an event handler for the Add Item button. This event handler will add the item to the items list and let it do the rest
    $('#divAddItem').on('click', '#btnAddItem', (eventObj) => {
        //get inputs from everything in div and construct an item out of them
        //get the div that holds all our inputs
        let $addItemsInputs = $('#AddItemInputs');
        let newItem = constructItemObject($addItemsInputs);

        itemsList.push(newItem);
    });

    $('ul#ItemsList').on('click', 'button', (eventObj) => {
        //.closest gets the closest element up the tree
        let li = eventObj.target.closest('li');
        //get all li of the items list ul
        let $itemsList_li = $('ul#ItemsList li');
        //get index of items list, will match our internal items list
        let liIndex = $itemsList_li.index(li);
        if(eventObj.target.id === 'btnDeleteItem')
        {
            itemsList.remove(liIndex);
        }
        else if(eventObj.target.id === 'btnEditItem')
        {
            itemsList.itemIsEditing(liIndex, true);
        }
        else if(eventObj.target.id === 'btnFinishEditing')
        {
            let itemSelector = $(`ul#ItemsList li:eq(${liIndex})`);
            itemsList.replace(liIndex, constructItemObject(itemSelector));
            itemsList.itemIsEditing(liIndex, false);
        }
    });
})();
 
function getValidityOfInputs()
{

}

//construct item object from inputs
function constructItemObject($selector)
{
    let itemName = $selector.find(`#itemName`).val();
    let itemQuantity = $selector.find(`#itemAmount`).val();
    let itemNotes = $selector.find(`#itemNotes`).val();
    let itemUnits = $selector.find(`#itemUnits`).val();

    return new Item(itemName, new Quantity(itemQuantity, itemUnits), itemNotes);
}