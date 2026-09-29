document.getElementById("copy-btn").addEventListener("click", function () {
  // 1. Взимаме текста на паролата от параграфа
  const passwordText = document.getElementById("detail-password").innerText;

  // 2. Използваме Clipboard API за копиране
  navigator.clipboard
    .writeText(passwordText)
    .then(() => {
      // 3. Визуален фийдбек при успешно копиране (по избор)
      const copyBtn = document.getElementById("copy-btn");
      copyBtn.innerText = "Copied!";

      // Връща оригиналния текст на бутона след 2 секунди
      setTimeout(() => {
        copyBtn.innerText = "Copy";
      }, 2000);
    })
    .catch((err) => {
      console.error("Грешка при копиране: ", err);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  // === 1. ИНИЦИАЛИЗАЦИЯ НА ЕЛЕМЕНТИТЕ ===
  const actionsContainer = document.getElementById("booking-actions");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");

  // === 2. ФУНКЦИОНАЛНОСТ ЗА РЕЗЕРВАЦИИ И КАЛЕНДАР ===
  if (actionsContainer) {
    const printBtn = actionsContainer.children[0];
    const calendarBtn = actionsContainer.children[1];

    if (printBtn) {
      printBtn.addEventListener("click", () => window.print());
    }

    if (calendarBtn) {
      calendarBtn.addEventListener("click", () => {
        const timeElements = document.querySelectorAll("#stay-dates time");
        let checkInDate = "2026-04-25";
        let checkOutDate = "2026-04-29";

        if (timeElements.length >= 2) {
          checkInDate = timeElements[0].getAttribute("datetime");
          checkOutDate = timeElements[1].getAttribute("datetime");
        }

        const roomElement = document.getElementById("div1");
        let roomName = "Hotel Stay";
        if (roomElement) {
          roomName =
            roomElement.textContent.split("·")[1]?.split("x")[0]?.trim() ||
            "La Garrigue";
        }

        const formatStart = checkInDate.replace(/-/g, "") + "T150000Z";
        const formatEnd = checkOutDate.replace(/-/g, "") + "T110000Z";
        const description = `Hotel booking confirmation. Room: ${roomName}.`;

        const icsContent = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//Hotel Confirmation//EN",
          "BEGIN:VEVENT",
          `DTSTART:${formatStart}`,
          `DTEND:${formatEnd}`,
          `SUMMARY:Stay at Room ${roomName}`,
          `DESCRIPTION:${description}`,
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\r\n");

        const blob = new Blob([icsContent], {
          type: "text/calendar;charset=utf-8;",
        });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = `booking-${roomName.replace(/\s+/g, "-").toLowerCase()}.ics`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }

  // === 3. ФУНКЦИОНАЛНОСТ ЗА СТРАНИЧНО МЕНЮ (SIDEBAR) ===
  if (menuBtn && sidebar) {
    const menuImg = menuBtn.querySelector(".menu-img");
    const hamburgerPath = "./assets/images/hamburger icon menu.png";
    const closePath = "./assets/images/close-icon.png";

    // Функция за бърза промяна на стила и иконата на бутона
    const setMenuButtonState = (isOpen) => {
      menuImg.src = isOpen ? closePath : hamburgerPath;
      menuBtn.style.position = "fixed";
      menuBtn.style.top = isOpen ? "25px" : "15px";
      menuBtn.style.left = isOpen ? "210px" : "15px";
      menuBtn.setAttribute("aria-expanded", isOpen);
    };

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("open");
      setMenuButtonState(sidebar.classList.contains("open"));
    });

    document.addEventListener("click", (e) => {
      if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        e.target !== menuBtn
      ) {
        sidebar.classList.remove("open");
        setMenuButtonState(false);
      }
    });
  }
});
