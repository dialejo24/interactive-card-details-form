let inputs = document.getElementsByTagName("input");
let form = document.querySelector(".form_section > form");
let card_number = document.querySelector("#card_number");
let cvc_number = document.getElementById("cvc");
let month = document.querySelector('input[name="exp_month"]');
let year = document.getElementById("exp_date_year");
let cvcLabel = document.querySelector(".cvc_num");
let dateLabel = document.querySelector(".exp_date");
let cardholder_name = document.querySelector(".card_owner");
let cardNumLabel = document.querySelector(".card_num");
let form_section = document.querySelector(".form_section");
let confirm_section = document.querySelector(".confirmed_section");
let btnContinue = document.querySelector(".btnContinue");

form.addEventListener("submit", e => {
    e.preventDefault();

    isEmpty();
    validateCardNumber();
    validateMonth();
    validateCVC();
    validateYear();
    if (isFormValid()) {
        form_section.classList.add("hideForm");
        confirm_section.classList.add("showConfirm");
    }
})

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keydown", setNormalState);
    inputs[i].addEventListener("keyup", displayUserInput);
}

btnContinue.addEventListener("click", () => {
    confirm_section.classList.remove("showConfirm");
    form_section.classList.remove("hideForm");
    resetForm();
});

function setNormalState(e) {
    if (e.target.classList.contains("invalid_input")) {
        e.target.classList.remove("invalid_input");
        e.target.nextElementSibling.classList = "error_msg";
    }
}

function setErrorStyle(input, error_message) {
    if (!input.classList.contains("invalid_input")) {
        input.classList.add("invalid_input");
        input.nextElementSibling.classList.add(error_message);   
    }
}

function displayUserInput(e) {
    if (e.target == cvc_number) {
        cvcLabel.textContent = (cvc_number.value.at(0) || "0") + (cvc_number.value.at(1) || (cvc_number.value.at(0) ? "" : "0")) + (cvc_number.value.at(2) || (cvc_number.value.at(0) ? "" : "0"));

    } else if (e.target == month) {
        dateLabel.textContent = (month.value.at(0) || "0") + (month.value.at(1) || (month.value.at(0) ? "": "0")) + "/" + dateLabel.textContent.split("/")[1];

    } else if (e.target == year) {
        dateLabel.textContent = dateLabel.textContent.split("/")[0] + "/" + (year.value.at(0) || "0") + (year.value.at(1) || (year.value.at(0) ? "": "0"));
        
    } else if (e.target == card_number) {
        cardNumLabel.textContent = e.target.value || "0000 0000 0000 0000";
    } else {
        cardholder_name.textContent = e.target.value || "jane appleseed";
    }
}

function resetForm() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    cvcLabel.textContent = "000";
    dateLabel.textContent = "00/00";
    cardholder_name.textContent = "jane appleseed";
    cardNumLabel.textContent = "0000 0000 0000 0000";
}


/* Validations */
function isEmpty() {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim().length == 0) {
            setErrorStyle(inputs[i], "empty_msg");
            inputs[i].value = "";
        }
    }
}

function validateCardNumber() {
    let pattern;
    if (card_number.value.length == 19) {
        pattern = /(\d{4}\s\d{4}\s\d{4}\s\d{4})/;

        if (!pattern.test(card_number.value)) {
            if (/[^0-9\s]/.test(card_number.value)) {
                setErrorStyle(card_number, "invalid_card_num");

            } else {
                setErrorStyle(card_number, "invalid_format_msg")
            }
        }

    } else if (card_number.value.length == 16) {
        pattern = /\d{16}/;

        if (!pattern.test(card_number.value)) {
            if (/[^0-9\s]/.test(card_number.value)) {
                setErrorStyle(card_number, "invalid_card_num");

            } else {
                setErrorStyle(card_number, "invalid_format_msg");
            }
        }

    } else {
        setErrorStyle(card_number, "invalid_format_msg");
    }
}

function validateCVC() {
    if (cvc_number.value.length != 3 || +cvc_number.value < 0) {
        setErrorStyle(cvc_number, "invalid_format_msg");
    }

}

function validateMonth() {
    let numMonth = +month.value;
    if (month.value.length != 2 || numMonth < 1 || numMonth > 12) {
        setErrorStyle(month, "invalid_format_msg");
    }
}

function validateYear() {
    if (year.value.length != 2 || +year.value < 0) {
        setErrorStyle(year, "invalid_format_msg");
    }
}

function isFormValid() {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].classList.contains("invalid_input")) {
            return false;
        }
    }

    return true;
}




