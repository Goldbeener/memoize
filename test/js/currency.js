const { scheduler } = require('node:timers/promises');

const test = async () => {
  let x = 0;
  const foo = async () => {
    let y = x;
    await scheduler.wait(100);
    x = y + 1;
  };

  await Promise.all([foo(), foo(), foo()]);
  console.log(x); // 1
};

const test2 = async () => {
  let x = 0;
  const foo = async () => {
    await scheduler.wait(100);
    let y = x;
    x = y + 1; //
  };

  await Promise.all([foo(), foo(), foo()]);
  console.log(x); // 3
};

function main() {
  test();
  test2();
}

main();
