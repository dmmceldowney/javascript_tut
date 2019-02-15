/**************************
 * Tip calculator 
 */

var obj = {
    bills: [124, 48, 268, 180, 42],
    calc_tip: function(){
        var tip_arr = [];
        for (i = 0; i < this.bills.length; i++){
            if (this.bills[i] < 50){
                tip = 0.2;
            } else if (50 <= this.bills[i] <= 200){
                tip = 0.15;
            } else if (this.bills[i] > 200){
                tip = 0.1;
            }
            tip_arr.push(tip * this.bills[i]);
        }
        this.tips = tip_arr;
    }
}

obj.calc_tip();

console.log("BILLS: " + obj.bills);
console.log("TIPS: " + obj.tips);

final_tab = [];
for (i = 0; i < obj.bills.length; i++){
    final_tab.push(obj.bills[i] + obj.tips[i]);
}
console.log("PAID: " + final_tab);

