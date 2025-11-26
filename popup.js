// popup.js - 팝업 창의 슬라이더 동작을 담당합니다.

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('widthSlider'); // popup.html의 슬라이더 ID와 일치해야 함

    // 1. 초기 설정: 저장된 값이 있으면 슬라이더 위치에 반영
    chrome.storage.local.get(['geminiWidth'], function(result) {
        if (result.geminiWidth) {
            slider.value = result.geminiWidth;
        }
    });

    // 2. 슬라이더 조작 감지 및 메시지 전송
    slider.addEventListener('input', function() {
        const widthValue = slider.value;

        // (1) 현재 보고 있는 Gemini 탭에 너비 변경 메시지 전송
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url.includes("gemini.google.com")) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "setWidth",
                    width: widthValue
                });
            }
        });

        // (2) 변경된 너비 값을 저장 (나중에 다시 열었을 때 유지하기 위함)
        chrome.storage.local.set({geminiWidth: widthValue});
    });
});