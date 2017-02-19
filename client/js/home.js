$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/decode",
    type: "POST",
    data: {
        token: localStorage.getItem("token")
    },
    success: function(result) {
        if (result == "TokenExpiredError") {
          swal("Expired Login")
        }else if(result == false){
          swal("Invalid Login")
        }else if(result == "JsonWebTokenError"){

        }else{
          document.querySelector("h1").innerHTML = `Selamat Datang ${result}`
          document.querySelector("#register").innerHTML = ""
          document.querySelector("#login").innerHTML = `<a onclick="logout()" href="">Logout</a>`
          allUser()
        }
    }
  })
})

function allUser() {
  $.ajax({
    url: "http://localhost:3000/getAll",
    type: "GET",
    success: function(result) {
      var tampung = "<h3>Daftar User</h3>"
      result.forEach(function(data){
        tampung+= `<p>Nama User: ${data.name}</p>`
      })
      $("#list").append(tampung)
    }
  })
}


function logout() {
  localStorage.clear()
  window.location.replace("http://localhost:8080")
}
