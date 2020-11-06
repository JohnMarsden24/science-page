// const IterativeRotationCipher = {};

// IterativeRotationCipher.encode = function (n, str) {
//   //your code goes here. you can do it!
//   let finalStr = str;
//   const originalLength = str.length;
//   const spaces = getSpaceLocations(finalStr);
//   for (let rotation = 0; rotation < n; rotation++) {
//     //   Removes spaces from string
//     const newStr = finalStr.replace(/\ /g, "");

//     // Shifts order of characters to the RIGHT by n
//     let shiftedChars =
//       newStr.slice(newStr.length - n) + newStr.slice(0, newStr.length - n);

//     const splitAgain = insertSpaces(shiftedChars, spaces).split(" ");

//     // Shifts each substring character to the RIGHT by n
//     for (let i = 0; i < splitAgain.length; i++) {
//       for (let k = 0; k < n; k++) {
//         splitAgain[i] =
//           splitAgain[i].slice(splitAgain[i].length - 1) +
//           splitAgain[i].slice(0, splitAgain[i].length - 1);
//       }
//     }
//     finalStr = splitAgain.join(" ");
//   }
//   return `${n} ${finalStr}`;
// };

// IterativeRotationCipher.decode = function (str) {
//   //your code goes here. you can do it!
//   //   Gets N by removing it from the inpu tstring
//   const split = str.split(" ");
//   const n = Number(split.shift());

//   let finalStr = split.join(" ");
//   const spaces = getSpaceLocations(finalStr);
//   for (let rotation = 0; rotation < n; rotation++) {
//     const splitAgain = finalStr.split(" ");

//     // Shifts each substring character to the LEFT by n
//     for (let i = 0; i < splitAgain.length; i++) {
//       for (let k = 0; k < n; k++) {
//         splitAgain[i] = splitAgain[i].slice(1) + splitAgain[i].slice(0, 1);
//       }
//     }
//     const newStr = splitAgain.join("");

//     // Shifts order of characters to the LEFT by n
//     let shiftedChars = newStr.slice(n) + newStr.slice(0, n);

//     finalStr = insertSpaces(shiftedChars, spaces);
//   }
//   return finalStr;
// };

// function getSpaceLocations(str) {
//   const spaces = [];
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === " ") {
//       spaces.push(i);
//     }
//   }
//   return spaces;
// }

// function insertSpaces(str, spaceArr) {
//   spaceArr.forEach((elem) => {
//     str = str.slice(0, elem) + " " + str.slice(elem);
//   });
//   return str;
// }

// const test1 = IterativeRotationCipher.encode(
//   10,
//   `If you wish to make an apple pie from scratch, you must first invent the universe.`
// );

// const test2 = IterativeRotationCipher.decode(
//   "10 hu fmo a,ys vi utie mr snehn rni tvte .ysushou teI fwea pmapi apfrok rei tnocsclet`"
// );
// console.log(test1);
// console.log(test2);

const bankAccount = {
  balance: 2020,
  learning: true,
  name: "Georgy Glezer",
};

const handler = {
  get: function (target, prop, receiver) {
    console.log(target);
    console.log(prop);
    if (prop === "balance") {
      console.log(`Current Balance Of: ${target.name} Is: ${target.balance} `);
    }

    return target[prop];
  },
};

const wrappedBankAcount = new Proxy(bankAccount, handler);

wrappedBankAcount.balance; // access to the balance
wrappedBankAcount.learning; // access to the balance
