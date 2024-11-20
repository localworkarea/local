// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { DotLottie } from '@lottiefiles/dotlottie-web';


// == SPLIT TYPE =========================================================
const splitTextLines = document.querySelectorAll('.split-lines');
const splitTextWords = document.querySelectorAll('.split-words');
const splitTextChars = document.querySelectorAll('.split-chars');
const splitTextCharsSpan = document.querySelectorAll('.split-chars-span');
const splitTextBoth = document.querySelectorAll('.split-both');
const splitSetSpan = document.querySelectorAll('.split-words.set-span');

function initSplitType() {
  // Если существуют элементы с классом .split-lines
  if (splitTextLines.length > 0) {
    splitTextLines.forEach(element => {
      new SplitType(element, { types: 'lines' });
    });
  }

  // Если существуют элементы с классом .split-words
  if (splitTextWords.length > 0) {
    splitTextWords.forEach(element => {
      new SplitType(element, { types: 'words' });
      // Проставляем индексы для всех слов
      const words = element.querySelectorAll('.word');
      words.forEach((word, index) => {
        word.style.setProperty('--index', index);
      });
    });
  }

  // Если существуют элементы с классом .split-chars
  if (splitTextChars.length > 0) {
    splitTextChars.forEach(element => {
      new SplitType(element, { types: 'chars' });
      const chars = element.querySelectorAll('.char');
      chars.forEach((char, index) => {
        char.style.setProperty('--index', index);
      });
    });
  }


  if (splitTextCharsSpan.length > 0) {
   splitTextCharsSpan.forEach(elementSpan => {
       const splitInstance = new SplitType(elementSpan, { types: 'chars' });
       splitInstance.chars.forEach((char, index) => {
           const textContent = char.textContent.trim(); 
           char.innerHTML = `<span class="char-span">${textContent}</span>`;
           // char.style.setProperty('--index', index); // Устанавливаем CSS-переменную --index
       });
   });
 }

  // Если существуют элементы с классом .split-both
  if (splitTextBoth.length > 0) {
    splitTextBoth.forEach(element => {
      new SplitType(element, { types: 'lines, words' });
      // Проставляем индексы для всех слов
      const words = element.querySelectorAll('.word');
      words.forEach((word, index) => {
        word.style.setProperty('--index', index);
      });
    });
  }
  // Добавляем <span> для каждого слова внутри .split-words.set-span
  if (splitSetSpan.length > 0) {
    splitSetSpan.forEach(splitSetSpan => {
      const words = splitSetSpan.querySelectorAll('.word');
      
      words.forEach(word => {
        const text = word.textContent.trim();
        word.innerHTML = `<span class="word-span">${text}</span>`;
      });
    });
  }
}

//  Инициализация SplitType при загрузке
initSplitType();

 let lastWidth = window.innerWidth;
 const resizeObserver = new ResizeObserver(entries => {
     requestAnimationFrame(() => {
         entries.forEach(entry => {
             const currentWidth = entry.contentRect.width;
             // Запускаем initSplitType() только если изменилась ширина
             if (currentWidth !== lastWidth) {
                 initSplitType();
                 lastWidth = currentWidth; // Обновляем lastWidth
             }
         });
     });
 });
 // Наблюдаем за изменениями в элементе body
 resizeObserver.observe(document.body);


    // 1. ПЛАВНАЯ ПРОКРУТКА СТРАНИЦЫ =========================
    function smoothScroll(smoothness = 0.08, inertia = 0.85) {
      let scrollPosition = window.pageYOffset;
      let targetPosition = scrollPosition;
      let isScrolling = false;
      let isDraggingScrollbar = false;
      
      function updateScroll() {
          scrollPosition += (targetPosition - scrollPosition) * smoothness;
          window.scrollTo(0, scrollPosition);
    
          if (Math.abs(targetPosition - scrollPosition) > 0.5) {
              requestAnimationFrame(updateScroll);
          } else {
              isScrolling = false;
          }
      }
    
      function startScroll(event) {
          if (!isDraggingScrollbar) {
              targetPosition += event.deltaY * inertia;
              targetPosition = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetPosition));
              event.preventDefault();
    
              if (!isScrolling) {
                  isScrolling = true;
                  requestAnimationFrame(updateScroll);
              }
          }
      }
    
      function onScroll() {
          if (!isScrolling) {
              scrollPosition = window.pageYOffset;
              targetPosition = scrollPosition;
          }
      }
    
      function onMouseDown() {
          isDraggingScrollbar = true;
      }
    
      function onMouseUp() {
          isDraggingScrollbar = false;
          scrollPosition = window.pageYOffset;
          targetPosition = scrollPosition;
      }
    
      function initSmoothScroll() {
          if (document.body.getAttribute('data-smooth-scroll') === 'true') {
              window.addEventListener('wheel', startScroll, { passive: false });
              window.addEventListener('scroll', onScroll);
              window.addEventListener('mousedown', onMouseDown);
              window.addEventListener('mouseup', onMouseUp);
          } else {
              window.removeEventListener('wheel', startScroll);
              window.removeEventListener('scroll', onScroll);
              window.removeEventListener('mousedown', onMouseDown);
              window.removeEventListener('mouseup', onMouseUp);
          }
      }
    
      const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
              if (mutation.attributeName === 'data-smooth-scroll') {
                  initSmoothScroll();
              }
          });
      });
    
      observer.observe(document.body, { attributes: true });
    
      initSmoothScroll();
    }
    
    // if (document.body.getAttribute('data-smooth-scroll') === 'true') {
      smoothScroll(0.1, 0.85);
    // }
    // =======================================================================



    
    
    window.addEventListener('load', function() {
        
        
        
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        // const dotLottie = new DotLottie({
        //     autoplay: true,
        //     loop: true,
        //     canvas: document.querySelector('#heroLottie'),
        //     src: "files/computer.json",
        // });



//         const svgPath = document.querySelector(".menu__loc-path");
//         const totalLength = svgPath.getTotalLength();
      
//         // Устанавливаем начальные параметры для скрытия линии
//         svgPath.style.strokeDasharray = totalLength;
//         svgPath.style.strokeDashoffset = totalLength;
      
//         // Функция для анимации при добавлении класса
//         function animateSVG() {
//           svgPath.style.strokeDashoffset = 0;
//         }
      
//         // Слежение за изменением класса
//         const observer = new MutationObserver(mutations => {
//           mutations.forEach(mutation => {
//             if (mutation.attributeName === "class") {
//               const classList = mutation.target.classList;
//               if (classList.contains("menu-open")) {
//                 animateSVG();
//               } else {
//                 svgPath.style.strokeDashoffset = totalLength;
//               }
//             }
//           });
//         });
      
//         // Начинаем следить за изменением атрибутов на html
//   const htmlElement = document.documentElement; // Ссылка на тег <html>
//   observer.observe(htmlElement, { attributes: true });
      
     
        
    });

