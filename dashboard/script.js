const students = [
  { name: "Arun", maths: 85, science: 90, english: 78 },
  { name: "Priya", maths: 92, science: 88, english: 95 },
  { name: "Kavin", maths: 35, science: 65, english: 72 },
  { name: "Divya", maths: 76, science: 82, english: 89 },
  { name: "Rahul", maths: 68, science: 74, english: 80 },
  { name: "Meena", maths: 90, science: 96, english: 93 },
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

const grade=(avg)=>{
    return avg >= 90 ? "A" 
     : avg >=75 ? "B"
     : avg >=60 ? "C"
     : avg >= 40 ? "D"
     : "F"
}

console.log(total(students[0]));
console.log(average(students[0]));
console.log(grade(average(students[0])));

console.log(grade(95)); 
console.log(grade(80)); 
console.log(grade(65)); 
console.log(grade(45)); 
console.log(grade(30));

// create the report

const report=students.map((s)=>{
    return {
        name:s.name,
        total:total(s),
        average:average(s),
        grade:grade(average(s))
    };
});

console.table(report);