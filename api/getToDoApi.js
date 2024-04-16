const getToDoApi = () => {
  //   fetch("https://dummyjson.com/todos/user/6")
  fetch("http://localhost:4000/home")
    .then((res) => res.json()) //res.json())
    .then(console.log);
};

export default getToDoApi;
