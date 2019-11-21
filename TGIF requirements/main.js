console.log(1);
// let posts = [];
// var url = ""
// if(){
//     url = "posts"
// }else{
//     url = "comments"
// }
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(function(response) {
    console.log(2);
    console.log(response);
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    posts = data;
    // helper();
    createTable(data);
  })
  .catch(function(error) {
    console.log(error);
  });
console.log(3);
function createTable() {
  console.log("posts", posts);
  var list = document.getElementById("list");
  for (var i = 0; i < posts.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = posts[i].title;
    list.appendChild(li);
  }
}
// function helper() {
//   createTable();
// }
