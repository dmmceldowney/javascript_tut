function tip_calc(bill){
    if (bill < 50){
        return bill * 0.2;
    } else if (bill <= 200){
        return bill * 0.15;
    } else {
        return bill * 0.1;
    }

}


var bills = [124, 48, 268];

var tips = [];

for(i = 0; i < bills.length; i++){
    tips.push(tip_calc(bills[i]));
}

console.log(bills);
console.log(tips);