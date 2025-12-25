// popup.js - 팝업 창의 슬라이더 동작과 다국어 처리

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('widthSlider'); // popup.html의 슬라이더 ID와 일치해야 함
    const checkbox = document.getElementById('cleanView');

    // ---- I18N: set popup text ----
    const titleEl = document.getElementById('title');
    const hintEl = document.getElementById('hint');

    if (titleEl) titleEl.textContent = chrome.i18n.getMessage("popupTitle");
    if (hintEl)  hintEl.textContent = chrome.i18n.getMessage("popupHint");

    // 1. 초기 설정: 저장된 값이 있으면 슬라이더 위치에 반영
    chrome.storage.local.get(['geminiWidth', 'cleanView'], function(result) {
        if (result.geminiWidth) {
            slider.value = result.geminiWidth;
        }
        if (result.cleanView !== undefined) {
            checkbox.checked = result.cleanView;
        }

        // 초기 상태를 content.js에 전송
        updateContent({width: slider.value, cleanView: checkbox.checked});
    });

    // 2. 슬라이더 조작 감지 및 메시지 전송
    slider.addEventListener('input', function() {
        updateContent({width: slider.value, cleanView: checkbox.checked});
        chrome.storage.local.set({geminiWidth: slider.value});
    });

    // 3. Checkbox 변화 감지
    checkbox.addEventListener('change', function() {
        updateContent({width: slider.value, cleanView: checkbox.checked});
        chrome.storage.local.set({cleanView: checkbox.checked});
    });

    // 4. Function to send message to content.js
    function updateContent({width, cleanView}) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const tab = tabs[0];
            if (!tab || !tab.url.includes("gemini.google.com")) return;
            chrome.tabs.sendMessage(tab.id, {
                action: "updateSettings",
                width: width,
                cleanView: cleanView
            }).catch(() => {});
        });
    }
});
