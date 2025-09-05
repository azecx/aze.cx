const body = document.body;
const button = document.getElementById("modeButton");

if (localStorage.getItem("light-mode") === "true") {
    body.classList.add("light-mode");
    button.innerText = "dark";
} else {
    body.classList.remove("light-mode");
    button.innerText = "light";
}

function toggleMode() {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        button.innerText = "dark"; 
        localStorage.setItem("light-mode", "true"); 
    } else {
        button.innerText = "light"; 
        localStorage.setItem("light-mode", "false"); 
    }
}
