function solution(expenses) {
    let allExpenses = [];

    for (const yearMonth in expenses) {
        const monthExpenses = expenses[yearMonth];

        const firstSunday = Object.keys(monthExpenses).find(day => new Date(yearMonth + '-' + day).getDay() === 0);

        if (!firstSunday) {
            continue;
        }

        const firstSundayExpenses = monthExpenses[firstSunday];

        for (const category in firstSundayExpenses) {
            allExpenses.push(...firstSundayExpenses[category]);
        }
    }

    if (allExpenses.length === 0) {
        return null;
    } else {
        allExpenses.sort((a, b) => a - b);
        if (allExpenses.every(value => typeof value === 'number')) {
            return median(allExpenses);
        } else {
            return null;
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
