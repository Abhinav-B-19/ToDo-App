const addToDoApi = (task) => {
  const reqBody = {
    todo: task, //"Use DummyJSON in the project",
    completed: false,
    userId: 6,
  };
  //   fetch("https://dummyjson.com/todos/add", {
  fetch("http://localhost:4000/add-todo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  })
    .then((res) => res.json())
    .then(console.log);
};

export default addToDoApi;
