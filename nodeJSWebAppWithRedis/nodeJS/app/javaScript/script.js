document.addEventListener("DOMContentLoaded", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("visitCount").innerHTML = this.responseText;
            alert('Total Number of Visit: ' + this.responseText);
        }
    };
    xhttp.open("GET", "/api/visitCount", true);
    xhttp.send();
});