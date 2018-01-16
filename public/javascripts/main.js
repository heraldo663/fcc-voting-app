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
  // Custom events
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
      method: "DELETE",
      success: function(res) {
        window.location.reload(true);
      }
    });
  });
  $("#patch").click(function() {
    event.preventDefault();
    var id = $(this).data("id");
    $.ajax({
      url:
        "http://localhost:3000/dashboard/" + id + "/vote" ||
        process.env.MY_URL + "/dashboard/" + id + "/vote",
      type: "POST",
      method: "PATCH",
      success: function(res) {}
    });
  });

  // chatjs
  var ctx = document.getElementById("chart");
  var itens = $("#chart").data("itens");
  itens = itens.split(",");
  var votes = $("#chart").data("votes");
  votes = votes.split(",");

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: itens,
      datasets: [
        {
          label: "# of Votes",
          data: votes,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
});
