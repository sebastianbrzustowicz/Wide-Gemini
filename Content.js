// Content.js - 팝업의 신호를 받아 실제 페이지 너비와 요소 표시/숨김을 처리합니다.

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

        /* user-query w środku conversation-container */
        .conversation-container user-query {
            max-width: ${width}px !important;
            width: 100% !important;
        }

        /* 입력창 내부 요소 너비 맞춤 */
        .input-area-container:not(.is-zero-state), form {
            max-width: ${width}px !important;
            width: 100% !important;
            margin: 0 auto !important;
        }

        .input-area-container.is-zero-state {
            max-width: ${width}px !important;
            width: 95% !important;
            margin: 0 auto !important;
        }

        [class*="user-query-container"] {
            padding-bottom: 0px !important;
        }
    `;
}

// "정리된 보기"를 위해 모든 불필요한 요소를 숨기거나 표시하는 함수
function applyVisibility(hide) {
    const selectors = [
        '.desktop-ogb-buffer',
        '.buttons-container.adv-upsell.ng-star-inserted',
        '.gds-label-m-alt.desktop-spacing.ng-star-inserted',
        '.boqOnegoogleliteOgbOneGoogleBar',
        '.top-bar-actions'
    ];
    selectors.forEach(selector => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => el.style.display = hide ? 'none' : 'block');
    });
}

// DOM 변화를 관찰하고 cleanView가 활성화되었을 때 요소를 즉시 적용하는 함수
function observeDOM(cleanView) {
    const observer = new MutationObserver(() => applyVisibility(cleanView));
    observer.observe(document.body, { childList: true, subtree: true });
    // 페이지 로드 시 바로 적용
    applyVisibility(cleanView);
}

// popup.js로부터 메시지 수신 리스너
chrome.runtime.onMessage.addListener(function(request) {
    if (request.action === "setWidth") {
        applyWidth(request.width);
    } else if (request.action === "updateSettings") {
        applyWidth(request.width);
        applyVisibility(request.cleanView);
    }
});

// 페이지 로드 시 저장된 설정을 즉시 적용
chrome.storage.local.get(['geminiWidth', 'cleanView'], function(result) {
    const initialWidth = result.geminiWidth || 1800;
    const cleanView = result.cleanView || true;

    applyWidth(initialWidth);
    observeDOM(cleanView);
});
