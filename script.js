let items = document.querySelectorAll(".contentItem");
items.forEach((item) => {
    if(item.id!="tic-tac-toe"){
        item.addEventListener('click',() => {
            alert("Currently only Tic Tac Toe is available");
        });
    }
});

let otherLinks = document.querySelectorAll("li");
otherLinks.forEach((link) => {
    link.addEventListener('click',() => {
        alert("Coming Soon...");
    });
});