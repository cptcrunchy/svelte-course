export function getItemIndex(listofitems, itemId){
    return listofitems.findIndex(({id}) => id === itemId);
}