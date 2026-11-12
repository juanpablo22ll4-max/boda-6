/* =====================================
   CONFIGURACIÓN
===================================== */

const weddingDate = new Date(
    "2027-09-18T17:00:00-04:00"
);


/* =====================================
   ABRIR INVITACIÓN
===================================== */

/* ==========================================
   VINTAGE ENVELOPE OPENING
========================================== */

const invitationCover = document.getElementById(
    "invitation-cover"
);

const openButton = document.getElementById(
    "openInvitation"
);

const envelopeWrapper = document.getElementById(
    "envelopeWrapper"
);


/* BLOQUEAR SCROLL AL INICIO */

document.body.classList.add("locked");


/* ABRIR SOBRE */

openButton.addEventListener("click", () => {

    // Evitar múltiples clics

    if (envelopeWrapper.classList.contains("is-opening")) {
        return;
    }

    // Activar la animación

    envelopeWrapper.classList.add("is-opening");

    openButton.disabled = true;


    // Terminar la presentación

    setTimeout(() => {

        invitationCover.classList.add("is-finishing");

        document.body.classList.remove("locked");

    }, 2400);


    // Mostrar página principal

    setTimeout(() => {

        invitationCover.style.display = "none";

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 3500);

});


/* =====================================
   ANIMACIONES SCROLL
===================================== */

const revealElements = document.querySelectorAll(
    ".reveal"
);

const observer = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "visible"
                );

                observer.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {

    observer.observe(element);

});


/* =====================================
   COUNTDOWN
===================================== */

const daysElement = document.getElementById(
    "days"
);

const hoursElement = document.getElementById(
    "hours"
);

const minutesElement = document.getElementById(
    "minutes"
);

const secondsElement = document.getElementById(
    "seconds"
);

function updateCountdown() {

    const now = new Date();

    const difference = weddingDate - now;

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;

    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = String(
        days
    ).padStart(2, "0");

    hoursElement.textContent = String(
        hours
    ).padStart(2, "0");

    minutesElement.textContent = String(
        minutes
    ).padStart(2, "0");

    secondsElement.textContent = String(
        seconds
    ).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================
   RSVP
===================================== */

/*
 IMPORTANTE:

 Este formulario funciona como una
 demostración.

 Al enviarlo, prepara un correo
 electrónico con los datos del invitado.

 Para recibir respuestas automáticamente
 y guardarlas en Firebase, necesitaremos
 conectar el formulario con una base
 de datos.

 En esta versión no se guardan
 respuestas en ningún servidor.
*/


const rsvpForm = document.getElementById(
    "rsvpForm"
);

const rsvpStatus = document.getElementById(
    "rsvpStatus"
);


/*
 CAMBIA ESTE CORREO POR EL CORREO REAL
 QUE RECIBIRÁ LAS CONFIRMACIONES.
*/

const rsvpEmail = "rsvp@example.com";


rsvpForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById(
        "guestName"
    ).value.trim();

    const email = document.getElementById(
        "guestEmail"
    ).value.trim();

    const attendance = document.getElementById(
        "attendance"
    ).value;

    const guests = document.getElementById(
        "guests"
    ).value;

    const message = document.getElementById(
        "message"
    ).value.trim();


    if (!name || !email || !attendance) {

        rsvpStatus.textContent =
            "Please complete all required fields.";

        return;

    }


    const subject = encodeURIComponent(
        "Wedding RSVP - " + name
    );


    const body = encodeURIComponent(

        "Wedding RSVP\n\n" +

        "Name: " + name + "\n" +

        "Email: " + email + "\n" +

        "Attendance: " + attendance + "\n" +

        "Number of Guests: " + guests + "\n\n" +

        "Message:\n" + message

    );


    const mailtoLink =
        "mailto:" + rsvpEmail +
        "?subject=" + subject +
        "&body=" + body;


    rsvpStatus.textContent =
        "Your email application will open " +
        "with your RSVP details. " +
        "Please send the email to complete " +
        "your response.";


    window.location.href = mailtoLink;

});

