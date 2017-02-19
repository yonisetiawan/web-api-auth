function register() {
    if ($("#name").val() == "" || $("#email").val() == "" || $("#password").val() == "") {
        swal("Lengkapi Form Register")
    } else {
        $.ajax({
            url: "http://localhost:3000/register",
            type: "POST",
            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                password: $("#password").val()
            },
            success: function(result) {
                if (result) {
                    window.location.replace("http://localhost:8080/login.html")
                }
            }
        });
    }
}


function login() {
    if ($("#email").val() == "" || $("#password").val() == "") {
        swal("Lengkapi Form Login")
    } else {
        $.ajax({
            url: "http://localhost:3000/login",
            type: "POST",
            data: {
                email: $("#email").val(),
                password: $("#password").val()
            },
            success: function(result) {
                if (result) {
                    localStorage.setItem("token",result.token)
                    window.location.replace("http://localhost:8080")
                }
            }
        });
    }
}
