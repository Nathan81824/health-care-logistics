/*====================================
        WHATSAPP WIDGET
=====================================*/

function initWhatsAppWidget() {

    const whatsappToggle = document.getElementById("whatsappToggle");
    const chatBox = document.getElementById("chatBox");
    const closeChat = document.getElementById("closeChat");

    const messageInput = document.getElementById("waMessage");
    const sendButton = document.getElementById("sendMessage");
    const continueButton = document.getElementById("continueWhatsapp");

    const quickReplies = document.querySelectorAll(".quick-replies button");

    // Replace with your WhatsApp number
    const phoneNumber = "2348012345678";


    /*====================================
            SAFETY CHECK
    =====================================*/

    if (!whatsappToggle || !chatBox) {

        console.error("WhatsApp widget not found.");

        return;

    }


    /*====================================
            TOGGLE CHAT
    =====================================*/

    whatsappToggle.addEventListener("click", () => {

        chatBox.classList.toggle("active");

    });


    /*====================================
            CLOSE CHAT
    =====================================*/

    if (closeChat) {

        closeChat.addEventListener("click", () => {

            chatBox.classList.remove("active");

        });

    }


    /*====================================
            QUICK REPLIES
    =====================================*/

    quickReplies.forEach(button => {

        button.addEventListener("click", () => {

            messageInput.value = button.textContent;

            messageInput.focus();

        });

    });


    /*====================================
            SEND MESSAGE
    =====================================*/

    function sendMessage() {

        const message = messageInput.value.trim();

        if (message === "") return;

        const url =
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

    }


    if (sendButton) {

        sendButton.addEventListener("click", sendMessage);

    }


    if (messageInput) {

        messageInput.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                e.preventDefault();

                sendMessage();

            }

        });

    }


    /*====================================
            CONTINUE BUTTON
    =====================================*/

    if (continueButton) {

        continueButton.href = `https://wa.me/${phoneNumber}`;

    }


    /*====================================
            CLOSE WHEN CLICKING OUTSIDE
    =====================================*/

    document.addEventListener("click", (e) => {

        const clickedInside =
            chatBox.contains(e.target) ||
            whatsappToggle.contains(e.target);

        if (!clickedInside) {

            chatBox.classList.remove("active");

        }

    });

}