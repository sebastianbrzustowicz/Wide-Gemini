// Content.js - 팝업의 신호를 받아 실제 페이지 너비를 변경합니다.

// 너비를 적용하는 함수
function applyWidth(width) {
    const styleId = 'gemini-wide-style';
    let styleTag = document.getElementById(styleId);

    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
    }

    // CSS를 사용하여 너비 강제 적용 (최신 Gemini 클래스 반영)
    styleTag.textContent = `
        /* 대화 영역 및 하단 입력창 너비 조절 */
        .conversation-container,
        .bottom-container,
        main > div:has(.conversation-container) {
            max-width: ${width}px !important;
            width: 100% !important;
        }
        
        /* 입력창 내부 요소 너비 맞춤 */
        .input-area-container, form {
             max-width: ${width}px !important;
             width: 100% !important;
             margin: 0 auto !important; /* 중앙 정렬 */
        }
    `;
    console.log(`Gemini width set to ${width}px`);
}

// 1. 팝업에서 보내는 메시지 수신 리스너
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "setWidth") {
        applyWidth(request.width);
    }
});

// 2. 페이지 로드 시 초기 설정값 적용
chrome.storage.local.get(['geminiWidth'], function(result) {
    // 저장된 값이 있으면 적용, 없으면 기본값 600px 적용
    const initialWidth = result.geminiWidth || 600;
    applyWidth(initialWidth);
});