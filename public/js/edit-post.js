async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const post_content = document.querySelector("#post-content").value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
console.log(title, post_content, id)
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
// console.log("TestABC")
document
  .querySelector("#edit")
  .addEventListener("submit", editFormHandler);
