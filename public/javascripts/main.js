document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }

  $("#add").click(function() {
    event.preventDefault();
    var inputToAdd = $(
      '<div class="control"> <input class="input" name="itens" type="text" placeholder="item"></div>'
    );
    var $inputFiled = $("#options");
    $inputFiled.append(inputToAdd);
  });

  $("#delete").click(function() {
    var id = $(this).data("id");
    $.ajax({
      url:
        "http://localhost:3000/dashboard/delete/" + id ||
        process.env.MY_URL + "/dashboard/delete/" + id,
      type: "DELETE",
      success: function(res) {
        window.location.reload(true);
      }
    });
  });
});
