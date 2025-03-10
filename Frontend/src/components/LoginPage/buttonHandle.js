const checkEmptyValues = (data) => {
    
    //Проходимся по каждому вводу из Input и проверяем, пустое ли оно или нет
    for (const item of data){
        if (empty(item)) return true;
    }

    console.log("Данные введены корректно");
    return false;
}

const empty = (value) => {
    switch(value){
      case null:
      case 0:
      case "":
      case "0":
      case false:
      case NaN:
      case undefined:
        return true;

      default:
        return false;
    }
}

export default checkEmptyValues;