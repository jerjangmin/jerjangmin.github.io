/**
 * 채팅 메시지 렌더링 및 관리
 */
export class ChatManager {
  constructor() {
    this.container = document.getElementById('chat-messages');
    this.typingElement = null;
  }

  /**
   * 메시지 추가
   * @param {'ai'|'user'} type - 메시지 타입
   * @param {string} content - 메시지 내용
   */
  addMessage(type, content) {
    const messageEl = document.createElement('div');
    messageEl.className = `message message--${type}`;

    if (type === 'ai') {
      messageEl.innerHTML = `
        <img src="./images/tosuni-avatar.svg" alt="토순이" class="message-avatar">
        <div class="message-bubble">${this.formatText(content)}</div>
      `;
    } else {
      messageEl.innerHTML = `
        <div class="message-bubble">${this.formatText(content)}</div>
      `;
    }

    this.container.appendChild(messageEl);
    this.scrollToBottom();
  }

  /**
   * 텍스트 포맷팅
   * @param {string} text - 원본 텍스트
   * @returns {string} 포맷된 HTML
   */
  formatText(text) {
    // XSS 방지를 위한 이스케이프
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // 줄바꿈 처리
    return escaped.replace(/\n/g, '<br>');
  }

  /**
   * 타이핑 인디케이터 표시
   */
  showTyping() {
    if (this.typingElement) return;

    this.typingElement = document.createElement('div');
    this.typingElement.className = 'message message--ai';
    this.typingElement.innerHTML = `
      <img src="./images/tosuni-thinking.svg" alt="토순이" class="message-avatar">
      <div class="message-bubble typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;

    this.container.appendChild(this.typingElement);
    this.scrollToBottom();
  }

  /**
   * 타이핑 인디케이터 숨김
   */
  hideTyping() {
    if (this.typingElement) {
      this.typingElement.remove();
      this.typingElement = null;
    }
  }

  /**
   * 채팅 내용 초기화
   */
  clear() {
    this.container.innerHTML = '';
    this.typingElement = null;
  }

  /**
   * 스크롤을 맨 아래로
   */
  scrollToBottom() {
    // 약간의 딜레이 후 스크롤 (애니메이션 고려)
    requestAnimationFrame(() => {
      this.container.scrollTop = this.container.scrollHeight;
    });
  }
}
