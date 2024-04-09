let geminiWidth = 100;

(function() {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');
  
    // Add slider to body
    document.body.appendChild(sliderContainer);
  
    const sliderMarkup = `
      <input type="range" min="0" max="100" value="100" class="slider">
    `;
  
    sliderContainer.innerHTML = sliderMarkup;

    const slider = sliderContainer.querySelector('.slider');

    slider.addEventListener('input', (event) => {
      const currentValue = event.target.value;
      geminiWidth = currentValue;
      changeElementsSize();
    });
  
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .slider-container {
        position: fixed;
        top: 10px;
        right: 100px;
        width: 10%;
        height: 50px;
        z-index: 100;
      }
  
      .slider {
        width: 100%;
        height: 100%;
      }
    `;
  
    document.head.appendChild(styleElement);
  
  })();

  function changeElementsSize() {

    (function() {
      const conversationContainers = document.querySelectorAll('.conversation-container.ng-star-inserted');
      
        if (conversationContainers.length > 0) {
          conversationContainers.forEach((container) => {
            container.style.width = geminiWidth + '%'; 
            container.style.maxWidth = geminiWidth + '%';
            container.style.minWidth = '20%';
          });
        }
      })();

      (function() {
        const conversationContainers = document.querySelectorAll('.input-area-container.ng-tns-c3785935164-1.ng-star-inserted');
      
        if (conversationContainers.length > 0) {
          conversationContainers.forEach((container) => {
            container.style.width = geminiWidth + '%';
            container.style.maxWidth = geminiWidth + '%';
            container.style.minWidth = '50%';
          });
        }
      })();

      (function() {
        const conversationContainers = document.querySelectorAll('.bottom-container.ng-star-inserted');
      
        if (conversationContainers.length > 0) {
          conversationContainers.forEach((container) => {
            container.style.width = geminiWidth + '%';
            container.style.maxWidth = geminiWidth + '%';
            container.style.minWidth = '50%';
          });
        }
      })();

      (function() {
        const conversationContainers = document.querySelectorAll('.text-input-field');
      
        if (conversationContainers.length > 0) {
          conversationContainers.forEach((container) => {
            container.style.height = '120px';
            container.style.maxHeight = '120px';
          });
        }
      })();
  }
  
setTimeout(changeElementsSize, 1000);

setInterval(() => changeElementsSize(), 50);

  