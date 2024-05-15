
// не доработано то как работает с разными деревьями не правельные ответы считает только 03,01 воскресенье 

function solution(expenses) {
    for (const yearMonth in expenses) {
        const year = parseInt(yearMonth.split("-")[0]);
        const month = parseInt(yearMonth.split("-")[1]);
    
        const firstDayOfMonth = new Date(year, month - 1, 1);
        
        let firstSunday = null;
        for (let day = 1; day <= 7; day++) {
            const currentDay = new Date(year, month - 1, day);
            if (currentDay.getDay() === 0) {
                firstSunday = currentDay;
                break;
            }
        }
        
        const dayOfMonth = firstSunday.getDate();
        const key = dayOfMonth < 10 ? "0" + dayOfMonth : "" + dayOfMonth;
        
        if (expenses[yearMonth].hasOwnProperty(key)) {
            const expensesBeforeSunday = [];
            for (let i = 1; i <= dayOfMonth; i++) {
                const currentDayKey = i < 10 ? "0" + i : "" + i;
                if (expenses[yearMonth].hasOwnProperty(currentDayKey)) {
                    for (const category in expenses[yearMonth][currentDayKey]) {
                        expensesBeforeSunday.push(...expenses[yearMonth][currentDayKey][category]);
                    }
                }
            }
      
            if (expensesBeforeSunday.length === 0) {
                return null; // Возвращаем null, если нет расходов до первого воскресенья
            }
            
            expensesBeforeSunday.sort((a, b) => a - b);
            if (expensesBeforeSunday.every(value => typeof value === 'number')) {
                return median(expensesBeforeSunday);
            } else {
                return null; // Возвращаем null, если есть нечисловые значения
            }
        }
    }
   

    function median(values) {
        const sorted = values.slice().sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);

        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }

        return sorted[middle];
    }
}

const expenses = {
    "2023-01": {
        "03": {
            "food": [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
            "fuel": [210.22]
        },
        "09": {
            "food": [11.9],
            "fuel": [190.22]
        }
    },
    "2023-03": {
        "07": {
            "food": [20, 11.9, 30.20, 11.9]
        },
        "04": {
            "food": [10.20, 11.50, 2.5],
            "fuel": []
        }
    },
    "2023-04": {}
};

console.log(solution(expenses));
