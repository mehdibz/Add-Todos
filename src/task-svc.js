export const rando = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

function delay(t) {
  return new Promise(res => {
    setTimeout(res, t);
  });
}
const delayResolve = (value, t = 10000) => {
  return delay(t).then(() => value);
};

export const tasks = [
  { taskName: "Walk Dog", finished: true, id: rando() },
  { taskName: "Buy Bread", finished: false, id: rando() }
];

// () => Promise<Tasks[]>
export const getTasks = () => delayResolve(tasks.map(task => ({ ...task })));

// (taskName:String) => Promise<Task>
export const addTask = taskName => {
  const newTask = {
    taskName,
    finished: false,
    id: rando()
  };
  tasks.push(newTask);
  return delayResolve({ ...newTask });
};

// (id:String) => Promise<Task>
export const toggleTask = id => {
  const foundTask = tasks.find(t => t.id === id);
  if (foundTask) {
    foundTask.finished = !foundTask.finished;
  }
  return delayResolve(foundTask && { ...foundTask });
};
