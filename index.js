function solution(expenses) {
    let medianValues = "";

    for (const yearMonth in expenses) {
        const monthExpenses = expenses[yearMonth];
        const firstSundays = findFirstSundays(yearMonth, monthExpenses);
        
        if (firstSundays.length > 0) {
            let medians = "";
            for (const day of firstSundays) {
                const median = calculateMedian(monthExpenses[day]);
                if (median !== null) {
                    medians += median + ";";
                }
            }
            if (medians.length > 0) {
                medianValues += medians;
            }
        }
    }

    return medianValues.length > 0 ? medianValues.slice(0, -1) : null;
}

function findFirstSundays(yearMonth, monthExpenses) {
    const [year, month] = yearMonth.split('-').map(Number);
    return Object.keys(monthExpenses).filter(day => new Date(year, month - 1, day).getDay() === 0);
}

function calculateMedian(dayExpenses) {
    let allExpenses = [];

    for (const category in dayExpenses) {
        allExpenses.push(...dayExpenses[category]);
    }

    if (allExpenses.length === 0) {
        return null;
    } else {
        allExpenses = allExpenses.filter(value => typeof value === 'number').sort((a, b) => a - b);
        const middle = Math.floor(allExpenses.length / 2);
        if (allExpenses.length % 2 === 0) {
            return Math.ceil((allExpenses[middle - 1] + allExpenses[middle]) / 2);
        }
        return allExpenses[middle];
    }
}

const expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
};

console.log(solution(expenses));
