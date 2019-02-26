var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if (totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome )* 100);
        } else {
            this.percentage = -1;
        }

    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals:{
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function(type){ // type = inc or exp
        var sum = 0;
        data.allItems[type].forEach(function(currentElement){
            sum += currentElement.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: function(type, des, val){            
            var newItem, ID;
            
            // create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // push it to the data structure
            data.allItems[type].push(newItem);

            // return the new element
            return newItem;
        },

        deleteItem: function(type, id){

            var ids = data.allItems[type].map(function(current){
                return current.id;
            });

            var index = ids.indexOf(id);

            if (index !== -1){
                // delete the object
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function(){
            // calculate the total income & expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate percentage of income spent
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function(){

            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });

        },

        getPercentages: function(){

            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });

            return allPerc;

        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function(){
            console.log(data);
        }
    };

    

})();


var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatNumber = function(num, type){
        var numSplit, int, dec;
        /*
        + or - before number
        exactly 2 decimal points
        comma separating the thousands

        2310.4567 -> 2,310.44
        2000 -> 2,000.00
        */
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];

        dec = numSplit[1];

        if (int.length > 3){
            // more than 1000
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3 , 3); // input, 2310 => 2,130


        }

        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;
    };

    var nodeListForEach = function(list, callback){
        for (var i = 0; i < list.length; i++){
            callback(list[i], i);
        }
    };
    
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type){
            var html, newHtml, element;
            // 1. create an HTML string w/ placeholder text
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // 2. replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            // 3. insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorID){

            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },

        clearFields: function(){
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(currentValue, indexNumber, array){
                currentValue.value = '';
            });
            
            fieldsArray[0].focus();
        },

        displayBudget: function(object){

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNubmer(object.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(object.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(object.totalExp, 'exp');
            if (object.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = object.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);

            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayMonth: function(){
            var now, year, month, months;
            now = new Date(); // this returns today's date b/c no values in the constructor
            month = now.getMonth();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                        'October', 'November', 'December'];

            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ', ' + year;

        },

        changedType: function(){

            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(cur){

                cur.classList.toggle('red-focus');

            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

        },

        getDOMStrings: function(){
            return DOMstrings;
        }
    };

})();


var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);


    };


    var updateBudget = function(){
        // 1. Calculate budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display budget on UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function(){

        // 1. calculate percentages
        budgetCtrl.calculatePercentages();
        // 2. read them from budget controller
        var percentages = budgetCtrl.getPercentages();
        // 3. update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    
    var ctrlAddItem = function(){
        var input, newItem;
        
        // 1. get field input data
        input = UICtrl.getInput();

        if(input.description !== '' && !isNaN(input.value) && input.value > 0){
            // 2. Add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the new item to the UI
            UIController.addListItem(newItem, input.type);
        
            // 4. Clear the fields
            UIController.clearFields();

            // 5. Calculate and update the budget.
            updateBudget();

            // 6. Calculate and update percentages;
            updatePercentages();

        }

    };

    var ctrlDeleteItem = function(event){
            var itemID = event.target.parentNode.parentNode.parentNode.id;
            if (itemID){
                // split the string to get the number
                var splitID = itemID.split('-');
                var type = splitID[0];
                var id = parseInt(splitID[1]);

                // 1. delete item from data structure
                budgetCtrl.deleteItem(type, id);
                
                // 2. delete item from UI
                UICtrl.deleteListItem(itemID);
                
                // 3. update and show new budget
                updateBudget();

                // 4. Calculate and update percentages
                updatePercentages();
            }
    };

    return {
        init: function(){
            console.log('Application has started.');
            setupEventListeners();
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        }
    }
    
})(budgetController, UIController);

controller.init();