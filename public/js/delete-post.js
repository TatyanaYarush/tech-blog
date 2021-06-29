async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

try {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("Your Post Deleted");
  document.location.replace("/dashboard");
} catch (error) {
  alert(error);
}

}

//   if (response.ok) {
//     alert("Your Post Deleted");
//     document.location.replace("/dashboard");
//   } else {
//     alert(response.statusText);
//   }
// }

document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);
