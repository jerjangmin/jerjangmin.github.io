/**
 * 토순이의 인터뷰 - 메인 앱
 */
import { ChatManager } from './chat.js';
import { ApiClient } from './api.js';
import { CardExporter } from './card.js';
import { InterviewFlow } from './questions.js';

class TosuniApp {
  constructor() {
    this.screens = {
      intro: document.getElementById('intro-screen'),
      chat: document.getElementById('chat-screen'),
      result: document.getElementById('result-screen')
    };

    this.apiKey = null;
    this.apiClient = null;
    this.chatManager = null;
    this.interviewFlow = null;
    this.cardExporter = null;

    this.init();
  }

  init() {
    // Lucide 아이콘 초기화
    lucide.createIcons();

    // 모듈 초기화
    this.chatManager = new ChatManager();
    this.cardExporter = new CardExporter();

    // 이벤트 바인딩
    this.bindEvents();

    // sessionStorage에서 API 키 복원
    this.loadApiKey();
  }

  bindEvents() {
    // ==================== 인트로 화면 ====================
    document.getElementById('start-btn').addEventListener('click', () => {
      this.startInterview();
    });

    // API 키 입력 시 에러 메시지 숨김
    document.getElementById('api-key-input').addEventListener('input', () => {
      document.getElementById('api-key-error').classList.add('hidden');
    });

    // ==================== 채팅 화면 ====================
    document.getElementById('back-btn').addEventListener('click', () => {
      if (confirm('인터뷰를 종료하시겠어요? 진행 내용이 사라집니다.')) {
        this.showScreen('intro');
        this.chatManager.clear();
      }
    });

    document.getElementById('send-btn').addEventListener('click', () => {
      this.sendMessage();
    });

    const userInput = document.getElementById('user-input');
    userInput.addEventListener('input', () => {
      this.updateSendButton();
      this.autoResizeTextarea(userInput);
    });

    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // ==================== 결과 화면 ====================
    // 탭 네비게이션
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    document.getElementById('copy-summary-btn').addEventListener('click', () => {
      this.copySummary();
    });

    document.getElementById('copy-essay-btn').addEventListener('click', () => {
      this.copyEssay();
    });

    document.getElementById('download-btn').addEventListener('click', () => {
      this.downloadCard();
    });

    document.getElementById('share-btn').addEventListener('click', () => {
      this.shareCard();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
      this.restart();
    });
  }

  // ==================== API 키 관리 ====================
  loadApiKey() {
    const saved = sessionStorage.getItem('tosuni_api_key');
    if (saved) {
      this.apiKey = saved;
      document.getElementById('api-key-input').value = saved;
    }
  }

  saveApiKey(key) {
    this.apiKey = key;
    if (key) {
      sessionStorage.setItem('tosuni_api_key', key);
    } else {
      sessionStorage.removeItem('tosuni_api_key');
    }
  }

  // ==================== 인터뷰 시작 ====================
  async startInterview() {
    // API 키 검증 (필수)
    const keyInput = document.getElementById('api-key-input');
    const key = keyInput.value.trim();

    if (!key) {
      document.getElementById('api-key-error').classList.remove('hidden');
      keyInput.focus();
      return;
    }

    // API 키 저장
    this.saveApiKey(key);
    this.apiClient = new ApiClient(key);

    // InterviewFlow 초기화
    this.interviewFlow = new InterviewFlow(this.apiClient);

    // 채팅 화면으로 전환
    this.showScreen('chat');

    // 채팅 초기화
    this.chatManager.clear();

    // 첫 메시지 (인사)
    await this.delay(500);
    await this.askNextQuestion();
  }

  // ==================== 화면 전환 ====================
  showScreen(screenName) {
    Object.values(this.screens).forEach(screen => {
      screen.classList.remove('screen--active');
    });
    this.screens[screenName].classList.add('screen--active');

    // 채팅 화면이면 입력창 포커스
    if (screenName === 'chat') {
      setTimeout(() => {
        document.getElementById('user-input').focus();
      }, 300);
    }
  }

  // ==================== 메시지 전송 ====================
  async sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();

    if (!text) return;

    // 입력창 비우기
    input.value = '';
    this.updateSendButton();
    this.autoResizeTextarea(input);

    // 사용자 메시지 추가
    this.chatManager.addMessage('user', text);

    // 답변 저장
    this.interviewFlow.saveAnswer(text);

    // 타이핑 인디케이터 표시
    this.chatManager.showTyping();

    // API가 있고, 후속 질문이 가능하면 생성
    if (this.apiClient && this.interviewFlow.canGenerateFollowUp()) {
      const followUp = await this.interviewFlow.generateFollowUp(text);

      if (followUp) {
        await this.delay(500);
        this.chatManager.hideTyping();
        this.chatManager.addMessage('ai', followUp);
        await this.delay(1000);
        this.chatManager.showTyping();
      }
    }

    // 다음 질문으로
    await this.delay(800);
    this.chatManager.hideTyping();
    await this.askNextQuestion();
  }

  async askNextQuestion() {
    const question = await this.interviewFlow.getNextQuestion();

    if (question) {
      // 섹션 표시 업데이트
      this.updateSectionIndicator();
      this.updateProgress();

      // 질문 메시지 추가
      this.chatManager.addMessage('ai', question);
    } else {
      // 인터뷰 완료
      await this.generateResult();
    }
  }

  // ==================== UI 업데이트 ====================
  updateProgress() {
    const current = this.interviewFlow.currentSectionIndex + 1;
    const total = this.interviewFlow.totalSections;

    document.getElementById('progress-text').textContent = `${current}/${total}`;
    document.getElementById('progress-fill').style.width =
      `${(current / total) * 100}%`;
  }

  updateSectionIndicator() {
    const section = this.interviewFlow.getCurrentSection();
    if (!section) return;

    const indicator = document.getElementById('section-indicator');
    const icon = document.getElementById('section-icon');
    const name = document.getElementById('section-name');

    icon.src = `./images/section-${section.id}.svg`;
    icon.onerror = () => {
      icon.src = './images/tosuni-avatar.svg';
    };
    name.textContent = section.name;

    // 섹션이 바뀔 때만 표시
    if (this.interviewFlow.isNewSection) {
      indicator.classList.remove('hidden');
      setTimeout(() => {
        indicator.classList.add('hidden');
      }, 3000);
    }
  }

  updateSendButton() {
    const input = document.getElementById('user-input');
    const btn = document.getElementById('send-btn');
    btn.disabled = !input.value.trim();
  }

  autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  // ==================== 결과 생성 ====================
  async generateResult() {
    this.chatManager.addMessage('ai',
      '인터뷰 감사합니다! 정말 좋은 이야기들이었어요.\n\n잠시만요, 당신의 2025년을 정리하고 있어요... ✨');

    this.chatManager.showTyping();

    // 결과 생성
    const result = await this.interviewFlow.generateResult();

    this.chatManager.hideTyping();

    // 요약 탭 채우기
    document.getElementById('summary-content').innerHTML = this.formatSummary(result.summary);

    // 에세이 탭 채우기
    document.getElementById('essay-content').innerHTML = this.formatEssay(result.essay);

    // 카드 채우기
    document.getElementById('card-keyword').textContent = result.card.keyword;
    document.getElementById('card-summary').textContent = result.card.summary;
    document.getElementById('highlight-1').textContent = result.card.highlights[0] || '올해의 하이라이트';
    document.getElementById('highlight-2').textContent = result.card.highlights[1] || '극복한 어려움';
    document.getElementById('highlight-3').textContent = result.card.highlights[2] || '내년의 다짐';

    // 원본 텍스트 저장 (복사용)
    this._summaryText = result.summaryText;
    this._essayText = result.essayText;

    // 결과 화면으로 전환
    await this.delay(1500);
    this.chatManager.addMessage('ai', '완성했어요! 결과를 확인해보세요 🐰');
    await this.delay(1000);
    this.showScreen('result');
  }

  formatSummary(html) {
    return html;
  }

  formatEssay(html) {
    return html;
  }

  // ==================== 탭 전환 ====================
  switchTab(tabName) {
    // 버튼 활성화
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('tab-btn--active', btn.dataset.tab === tabName);
    });

    // 콘텐츠 활성화
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('tab-content--active', content.id === `tab-${tabName}`);
    });
  }

  // ==================== 복사 기능 ====================
  async copySummary() {
    try {
      await navigator.clipboard.writeText(this._summaryText);
      this.showCopyFeedback('copy-summary-btn', '복사됨!');
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }

  async copyEssay() {
    try {
      await navigator.clipboard.writeText(this._essayText);
      this.showCopyFeedback('copy-essay-btn', '복사됨!');
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }

  showCopyFeedback(btnId, message) {
    const btn = document.getElementById(btnId);
    const originalHtml = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check"></i> ${message}`;
    lucide.createIcons();

    setTimeout(() => {
      btn.innerHTML = originalHtml;
      lucide.createIcons();
    }, 2000);
  }

  // ==================== 카드 저장/공유 ====================
  async downloadCard() {
    const btn = document.getElementById('download-btn');
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="loader"></i> 저장 중...';
    lucide.createIcons();

    try {
      await this.cardExporter.download('2025-회고-토순이의인터뷰.png');
      btn.innerHTML = '<i data-lucide="check"></i> 저장 완료!';
    } catch (err) {
      console.error('이미지 생성 실패:', err);
      btn.innerHTML = '<i data-lucide="x"></i> 실패';
      alert('이미지 저장에 실패했어요. 스크린샷을 사용해주세요.');
    }

    lucide.createIcons();

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="download"></i> 이미지로 저장';
      lucide.createIcons();
    }, 2000);
  }

  async shareCard() {
    if (navigator.share) {
      try {
        const blob = await this.cardExporter.toBlob();
        const file = new File([blob], '2025-회고.png', { type: 'image/png' });

        await navigator.share({
          title: '나의 2025년 회고',
          text: '토순이와 함께한 2025년 회고입니다',
          files: [file]
        });
      } catch (err) {
        // 공유 취소 또는 파일 공유 미지원
        this.fallbackShare();
      }
    } else {
      this.fallbackShare();
    }
  }

  async fallbackShare() {
    try {
      await navigator.clipboard.writeText('https://jerjangmin.github.io/tosuni/');
      alert('링크가 복사되었어요!');
    } catch (err) {
      alert('공유 링크: https://jerjangmin.github.io/tosuni/');
    }
  }

  // ==================== 재시작 ====================
  restart() {
    this.interviewFlow = null;
    this.chatManager.clear();
    this._summaryText = '';
    this._essayText = '';
    this.showScreen('intro');
  }

  // ==================== 유틸리티 ====================
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 앱 시작
document.addEventListener('DOMContentLoaded', () => {
  new TosuniApp();
});
