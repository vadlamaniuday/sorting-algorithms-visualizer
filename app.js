let myChart = null;
let randomArray = [];

function generateRandomArray(size) {
  randomArray = [];
  for (let index = 0; index < size; index++) {
    randomArray.push(Math.floor(Math.random() * 100));
  }
  return randomArray;
}

const showChartButton = document.getElementById("showChart");
showChartButton.addEventListener("click", () => {
  generateRandomArray(15);
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(document.getElementById("myChart").getContext("2d"), {
    type: "bar",
    data: {
      labels: randomArray,
      datasets: [
        {
          data: randomArray,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
          },
        },
        y: {
          grid: {
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  });
});

const changeSizeButton = document.getElementById("changeSize");
changeSizeButton.addEventListener("click", () => {
  const newSize = parseInt(prompt("Enter the new size for the array:"), 10);

  if (!isNaN(newSize) && newSize > 0) {
    generateRandomArray(newSize);
    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(document.getElementById("myChart").getContext("2d"), {
      type: "bar",
      data: {
        labels: randomArray,
        datasets: [
          {
            data: randomArray,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
          },
          y: {
            grid: {
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  } else {
    alert("Please enter a valid positive number for the array size.");
  }
});

const insertionSortButton = document.getElementById("insertionSort");
insertionSortButton.addEventListener("click", () => {
  insertionSort(randomArray);
  myChart.data.datasets[0].data = randomArray;
  myChart.update();
});

function insertionSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let current = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = current;
  }
}

const selectionSortButton = document.getElementById("selectionSort");
selectionSortButton.addEventListener("click", () => {
  selectionSort(randomArray);

  myChart.data.datasets[0].data = randomArray;
  myChart.update();
});

function selectionSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
}

const bubbleSortButton = document.getElementById("bubbleSort");
bubbleSortButton.addEventListener("click", () => {
  bubbleSort(randomArray);

  myChart.data.datasets[0].data = randomArray;
  myChart.update();
});

function bubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

const quickSortButton = document.getElementById("quickSort");
quickSortButton.addEventListener("click", () => {
  quickSort(randomArray, 0, randomArray.length - 1);

  myChart.data.datasets[0].data = randomArray;
  myChart.update();
});

function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);

    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  return i + 1;
}

const shellSortButton = document.getElementById("shellSort");
shellSortButton.addEventListener("click", () => {
  shellSort(randomArray);

  myChart.data.datasets[0].data = randomArray;
  myChart.update();
});

function shellSort(arr) {
  const len = arr.length;
  let gap = Math.floor(len / 2);

  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      let temp = arr[i];
      let j = i - gap;

      while (j >= 0 && arr[j] > temp) {
        arr[j + gap] = arr[j];
        j -= gap;
      }

      arr[j + gap] = temp;
    }

    gap = Math.floor(gap / 2);
  }
}

const mergeSortButton = document.getElementById("mergeSort");
mergeSortButton.addEventListener("click", () => {
  mergeSort(randomArray, 0, randomArray.length - 1);

  myChart.data.datasets[0].data = randomArray;
  myChart.update();
});

function mergeSort(arr, left, right) {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);

    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);

    merge(arr, left, middle, right);
  }
}

function merge(arr, left, middle, right) {
  const n1 = middle - left + 1;
  const n2 = right - middle;

  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[middle + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}
