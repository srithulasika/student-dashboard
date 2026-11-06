const students = [
  {name: "Arun", maths: 85, science: 90, english: 78},
  {name: "Priya", maths: 92, science: 88, english: 95},
  {name: "Kavin", maths: 35, science: 65, english: 72},
  {name: "Divya", maths: 76, science: 82, english: 89},
  {name: "Rahul", maths: 68, science: 74, english: 80},
  {name: "Meena", maths: 90, science: 96, english: 93},
];

console.log(students);

//total marks
const total = (s) => {
  return s.maths + s.science + s.english;
};

// Average
const average = (s) => {
  return Number(((s.maths + s.science + s.english) / 3).toFixed(2));
};

// grade based on average

const grade = (avg) => {
  return avg >= 90
    ? "A"
    : avg >= 75
      ? "B"
      : avg >= 60
        ? "C"
        : avg >= 40
          ? "D"
          : "F";
};

console.log(total(students[0]));
console.log(average(students[0]));
console.log(grade(average(students[0])));

console.log(grade(95));
console.log(grade(80));
console.log(grade(65));
console.log(grade(45));
console.log(grade(30));

// create the report

const report = students.map((s) => {
  return {
    name: s.name,
    total: total(s),
    average: average(s),
    grade: grade(average(s)),
  };
});

console.table(report);

// Display report as JSON
const jsonElement = document.getElementById("json");

jsonElement.textContent = JSON.stringify(report, null, 2);

// filter(): pass or fail

const passed = students.filter((s) => {
  return [s.maths, s.science, s.english].every((mark) => {
    return mark >= 40;
  });
});

const failedCount = students.length - passed.length;

console.table(passed);
console.log(`Number of failed students: ${failedCount}`);

// Create report for passed students
const passedReport = passed.map((s) => ({
  name: s.name,
  total: total(s),
  average: average(s),
  grade: grade(average(s)),
}));

//reduce(): Statistics

// Average
const classAverage =
  students.reduce((sum, s) => {
    return (sum + total(s));
  }, 0) / students.length;

// find topper

const topper = students.reduce((top, s) => {
  if (total(s) > total(top)) {
    return s;
  }
  return top;
}, students[0]);

console.log(`Topper: ${topper.name}`);
console.log(`Total: ${total(topper)}`);

// subject averages

const mathsAverage =
  students.reduce((sum, s) => {
    return sum + s.maths;
  }, 0) / students.length;

const scienceAverage =
  students.reduce((sum, s) => {
    return sum + s.science;
  }, 0) / students.length;

const englishAverage =
  students.reduce((sum, s) => {
    return sum + s.english;
  }, 0) / students.length;

console.log(`Class Average: ${classAverage}`);
console.log(`Topper: ${topper.name}`);
console.log(`Maths Average: ${mathsAverage}`);
console.log(`Science Average: ${scienceAverage}`);
console.log(`English Average: ${englishAverage}`);

// sort(): Student rankings

const sorted = [...report].sort((a, b) => {
  return b.total - a.total;
});

const ranked = sorted.map((s, i) => ({
  ...s,
  rank: i + 1,
}));

console.table(ranked);

// Get the table element
const board = document.getElementById("board");

// Function to display student data
function showTable(list) {
  board.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Total</th>
        <th>Average</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      ${list
        .map(
          (s) => `
            <tr>
              <td>${s.name}</td>
              <td>${s.total}</td>
              <td>${s.average}</td>
              <td>${s.grade}</td>
            </tr>
          `,
        )
        .join("")}
    </tbody>
  `;
}

// All students button
document.getElementById("all").addEventListener("click", () => {
  showTable(report);
});

// Passed students button
document.getElementById("passed").addEventListener("click", () => {
  showTable(passedReport);
});

// Sort by total button
document.getElementById("sort_by_total").addEventListener("click", () => {
  showTable(ranked);
});

// Display all students initially
showTable(report);

const jsonInput = document.getElementById("jsonInput");
const parseButton = document.getElementById("parseJson");
const message = document.getElementById("message");

parseButton.addEventListener("click", () => {
  try {
    const parsedData = JSON.parse(jsonInput.value);

    message.textContent = "Valid JSON!";
    console.log(parsedData);
  } catch (error) {
    message.textContent = "Invalid JSON. Please check your JSON format.";
  }
});
