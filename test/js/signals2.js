let subscriber = null;

function signal(value) {
  const subscribers = new Set();

  return {
    get value() {
      if (subscriber) {
        subscribers.add(subscriber);
      }
      return value;
    },
    set value(newValue) {
      value = newValue;
      subscribers.forEach((fn) => fn());
    },
  };
}

function effect(fn) {
  subscriber = fn;
  fn();
  subscriber = null;
}

function derived(fn) {
  const derived = signal();
  effect(() => {
    derived.value = fn();
  });
  return derived;
}

let count = signal(0);
let doubled = derived(() => count.value * 2);

effect(() => {
  console.log('count is ', count.value);
});

effect(() => {
  console.log('count * 2 is', doubled.value);
});

count.value = 2;
