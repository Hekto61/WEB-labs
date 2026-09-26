function cocktailSort(arr) {
    var left = 0;
    var right = arr.length - 1;
    var swapped = true;

    while (swapped) {
        swapped = false;
        for (var i = left; i < right; i++) {
            if (arr[i] > arr[i + 1]) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }

        right--;
        swapped = false;

        for (var j = right; j > left; j--) {
            if (arr[j] < arr[j - 1]) {
                var temp2 = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp2;
                swapped = true;
            }
        }
        left++;
    }

    return arr;
}

function sortArray() {
    var inputElement = document.getElementById("arrayInput");
    var rawText = inputElement.value;

    if (rawText.trim() === "") {
        alert("Пожалуйста, введите числа в поле ввода!");
        return;
    }

    var stringParts = rawText.trim().split(/[ ,]+/);
    var numbers = [];

    for (var i = 0; i < stringParts.length; i++) {
        var num = Number(stringParts[i]);

        if (isNaN(num)) {
            alert("Ошибка: '" + stringParts[i] + "' не является числом!");
            return;
        }
        numbers.push(num);
    }

    document.getElementById("initialArray").innerHTML = numbers.join(", ");

    var sorted = cocktailSort(numbers.slice());

    document.getElementById("sortedArray").innerHTML = sorted.join(", ");
}