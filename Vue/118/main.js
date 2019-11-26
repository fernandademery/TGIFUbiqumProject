var app = new Vue({
  el: "#app",
  data: {
    message: "Hello all!",
    array: [1, 2, 3, 4, 5, 6],
    age: 18,
    posts: []
  },
  methods: {
    fetchPosts: function() {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log("data", data);
          app.posts = data;
        });
    }
  },
  created: function() {
    this.fetchPosts();
  }
});
