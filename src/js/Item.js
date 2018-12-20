class Item 
{
    constructor(name, quantity, notes)
    {
        this.name = name;
        this.quantity = quantity;
        this.notes = notes;

        this.isEditing = false;
    }

    draw()
    {
        //append to the items list element in body.html
        let $elementToAppendTo = $('ul#ItemsList');
        
        let deleteItemButtonID = 'btnDeleteItem';
        let editItemButtonID = 'btnEditItem';

        let li;
        if(!this.isEditing)
        {
            //if we're not editing this item, draw as normal
            //construct li to append
            li =    `<li>
                        Item Name: ${this.name}<br>
                        Item Quantity: ${this.quantity.amount} ${this.quantity.unit}<br>
                        <button type="button" id="${deleteItemButtonID}">Delete This Item</button>
                        <button type="button" id="${editItemButtonID}">Edit This Item</button>
                    </li>`
        }else if(this.isEditing){
            //if we are editing this item, draw it differently
            li =    `<li>
                        Item Name: <input type="text" name="itemName" id="itemName" class="requiredInput" value="${this.name}">
                        <br>
                        Item Quantity: <input type="text" name="itemAmount" 
                                        id="itemAmount" class="requiredInput" value="${this.quantity.amount}">
                        <select id="itemUnits">
                                <option value="gallons">gallons</option>
                                <option value="units">units</option>
                        </select>
                        <br>
                        Notes: <input type="text" name="itemNotes" id="itemNotes" value="${this.notes}"><br>
                        <button type="button" id="btnDeleteItem">Delete This Item</button>
                        <button type="button" id="btnFinishEditing">Finish Editing</button>
                    </li>`
        }
        
        $elementToAppendTo.append(li);
    }
}