function toggleMode() {
    var body = document.body;
    body.classList.toggle("light-mode")
}

function toggleMode() {
    const body = document.body;
    const button = document.getElementById("modeButton");

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        button.innerText = "dark"; 
    } else {
        button.innerText = "light"; 
    }
}