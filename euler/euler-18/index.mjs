const triangle = `3
7 4
2 4 6
8 5 9 3`;

const splitTri = triangle.split("\n");

// console.log(splitTri);
let total = 0;
let tracking = 0;
for (const row of splitTri) {
  const splitRow = row.split(" ");

  let current = 0;

  for (let i = 0; i < row.length; i++) {
    if (i === tracking || i === tracking + 1) {
      if (Number(row[i]) > current) {
        current = Number(row[i]);
        console.log(current);

        tracking = i;
      }
    }
  }

  total += current;
}

console.log(total);
