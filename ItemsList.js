var itemsList = [];

function getIndexOfLI(child, parent)
{
    for(let i = 0; i < parent.childNodes.length; i++)
        {
            if(parent.childNodes[i] === child)
            {
                return i;
            }
        }
}