
export function formatDate (date){
    if(date instanceof Date){
        return date.toISOString().slice(0, 10); 
    }
    if(typeof date === "string"){
        return date.slice(0, 10);
    }
    return "";
}