const a = 2, b = 3;
const tries = ["a-b", "a*b", "a+b"];
let i = 0;
while (eval(tries[i]) !== 5) {
  console.log("fail:", tries[i]);
  i++;
}
console.log("pass:", tries[i]);
