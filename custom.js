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

// document.getElementById("copy-btn").addEventListener("click", function () {
//   // 1. Взимаме текста на паролата
//   const passwordText = document.getElementById("detail-password").innerText;

//   // 2. Създаваме временно текстово поле в паметта
//   const tempTextArea = document.createElement("textarea");
//   tempTextArea.value = passwordText;
//   document.body.appendChild(tempTextArea);

//   // 3. Маркираме текста вътре в него
//   tempTextArea.select();
//   tempTextArea.setSelectionRange(0, 99999); /* За мобилни устройства */

//   // 4. Изпълняваме командата за копиране (работи без HTTPS)
//   const success = document.execCommand("copy");

//   // 5. Изтриваме временното поле от екрана
//   document.body.removeChild(tempTextArea);

//   // 6. Проверка и визуален фийдбек
//   if (success) {
//     alert('Паролата "' + passwordText + '" беше копирана успешно!');
//   } else {
//     alert("Грешка при копирането. Моля, маркирайте ръчно.");
//   }
// });
// document.addEventListener("DOMContentLoaded", () => {
//   const actionsContainer = document.getElementById("booking-actions");
//   if (!actionsContainer) return;

//   const printBtn = actionsContainer.children[0];
//   const calendarBtn = actionsContainer.children[1];

//   // 1. ФУНКЦИОНАЛНОСТ ЗА ПРИНТИРАНЕ
//   if (printBtn) {
//     printBtn.addEventListener("click", () => {
//       window.print();
//     });
//   }

//   // 2. ДИНАМИЧНА ФУНКЦИОНАЛНОСТ ЗА КАЛЕНДАР
//   if (calendarBtn) {
//     calendarBtn.addEventListener("click", () => {
//       // Намираме таговете <time> в кода на картичката
//       const timeElements = document.querySelectorAll("#stay-dates time");

//       // Ако по някаква причина липсват дати в HTML-а, слагаме дефолтни
//       let checkInDate = "2026-04-25";
//       let checkOutDate = "2026-04-29";

//       if (timeElements.length >= 2) {
//         checkInDate = timeElements[0].getAttribute("datetime"); // Взима "2026-04-25"
//         checkOutDate = timeElements[1].getAttribute("datetime"); // Взима "2026-04-29"
//       }

//       // Извличаме името на стаята (взима текста преди знака 'x' или точката)
//       const roomElement = document.getElementById("div1");
//       let roomName = "Hotel Stay";
//       if (roomElement) {
//         roomName =
//           roomElement.textContent.split("·")[1]?.split("x")[0]?.trim() ||
//           "La Garrigue";
//       }

//       // Форматираме датите в нужния за .ics формат (ГГГГММДДTHHmmSSZ)
//       // Премахваме тиретата от "2026-04-25" -> "20260425" и добавяме часа от дизайна (15:00 и 11:00)
//       const formatStart = checkInDate.replace(/-/g, "") + "T150000Z"; // Става: 20260425T150000Z
//       const formatEnd = checkOutDate.replace(/-/g, "") + "T110000Z"; // Става: 20260429T110000Z

//       const description = `Hotel booking confirmation. Room: ${roomName}.`;

//       // Генериране на структурата на iCalendar
//       const icsContent = [
//         "BEGIN:VCALENDAR",
//         "VERSION:2.0",
//         "PRODID:-//Hotel Confirmation//EN",
//         "BEGIN:VEVENT",
//         `DTSTART:${formatStart}`,
//         `DTEND:${formatEnd}`,
//         `SUMMARY:Stay at Room ${roomName}`,
//         `DESCRIPTION:${description}`,
//         "END:VEVENT",
//         "END:VCALENDAR",
//       ].join("\r\n");

//       // Създаване и изтегляне на файла
//       const blob = new Blob([icsContent], {
//         type: "text/calendar;charset=utf-8;",
//       });
//       const link = document.createElement("a");

//       link.href = URL.createObjectURL(blob);
//       link.download = `booking-${roomName.replace(/\s+/g, "-").toLowerCase()}.ics`;

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const menuBtn = document.getElementById("menuBtn");
//   const sidebar = document.getElementById("sidebar");

//   if (menuBtn && sidebar) {
//     const menuImg = menuBtn.querySelector(".menu-img");

//     const hamburgerPath = "./assets/images/hamburger icon menu.png";
//     const closePath = "./assets/images/close-icon.png";

//     menuBtn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       sidebar.classList.toggle("open");

//       // 1. Когато сайдбарът се ОТВАРЯ (показва се хиксчето)
//       if (sidebar.classList.contains("open")) {
//         menuImg.src = closePath;

//         // Позиционираме хиксчето спрямо екрана в десния ъгъл на отвореното меню
//         menuBtn.style.position = "fixed";
//         menuBtn.style.top = "25px";
//         menuBtn.style.left = "210px"; // Нагласете го спрямо ширината на сайдбара ви, за да застане точно

//         // 2. Когато сайдбарът се ЗАТВАРЯ (връщат се трите чертички)
//       } else {
//         menuImg.src = hamburgerPath;

//         // Връщаме трите чертички на фиксирана позиция на екрана в горния ляв ъгъл
//         menuBtn.style.position = "fixed";
//         menuBtn.style.top = "15px";
//         menuBtn.style.left = "15px";
//       }
//     });

//     // Ако се кликне извън менюто
//     document.addEventListener("click", (e) => {
//       if (
//         sidebar.classList.contains("open") &&
//         !sidebar.contains(e.target) &&
//         e.target !== menuBtn
//       ) {
//         sidebar.classList.remove("open");
//         menuImg.src = hamburgerPath;

//         // Връщаме дефолтната позиция за 3-те чертички
//         menuBtn.style.position = "fixed";
//         menuBtn.style.top = "15px";
//         menuBtn.style.left = "15px";
//       }
//     });
//   }
// });
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
