const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

let passwordOne = document.getElementById("passwordOne");
let passwordTwo = document.getElementById("passwordTwo");
let passwordGenerate = document.getElementById("passwordGenerate-el");

passwordGenerate.addEventListener("click", function() {
    passwordOne.textContent = generatePassword() + " ";
    passwordTwo.textContent = generatePassword() + " ";
    addCopyIcon(passwordOne);
    addCopyIcon(passwordTwo);
});

function generatePassword() {
    let password = "";
    for (let i = 0; i < 12; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function addCopyIcon(button) {
    let copyIcon = document.createElement('i');
    copyIcon.classList.add('fas', 'fa-copy', 'copy-icon');
    copyIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the button click event from firing
        copyToClipboard(button.textContent.trim());
        highlightPassword(button);
        showTooltip(copyIcon, "Copied to clipboard");
    });
    button.appendChild(copyIcon);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(function(err) {
        console.error("Failed to copy text: ", err);
    });
}

function highlightPassword(button) {
    button.classList.add('highlight');
    setTimeout(() => {
        button.classList.remove('highlight');
    }, 2000); // Remove the highlight after 2 seconds
}

function showTooltip(icon, message) {
    let tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');
    tooltip.textContent = message;
    document.body.appendChild(tooltip); // Append to body instead of button

    // Calculate position of the tooltip
    const iconRect = icon.getBoundingClientRect();
    tooltip.style.left = `${iconRect.left + iconRect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${iconRect.top - tooltip.offsetHeight - 5}px`;

    // Remove the tooltip after 2 seconds
    setTimeout(() => {
        tooltip.remove();
    }, 2000);
}