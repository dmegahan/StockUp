class ItemsList 
{
    constructor(listOfItems = [])
    {
        this.list = listOfItems;
    }

    itemIsEditing(index, isEditing)
    {
        this.list[index].isEditing = isEditing;
        this.draw();
    }

    push(item)
    {
        this.list.push(item);
        this.draw();
    }

    remove(index)
    {
        this.list.splice(index, 1);
        this.draw();
    }

    replace(index, item)
    {
        this.list[index] = item;
        this.draw();
    }

    draw()
    {
        //this will draw the WHOLE content of this.list, so we need to clear the html ul element beforehand
        //in case something is in there
        this.clearHTML();

        for(var i in this.list)
        {
            this.list[i].draw();
        }
    }

    clearHTML()
    {
        let $itemsList = $('ul#ItemsList');
        $itemsList.html("");
    }
}