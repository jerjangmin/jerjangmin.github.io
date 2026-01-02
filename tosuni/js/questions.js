/**
 * 인터뷰 질문 관리 및 결과 생성
 */

// ==================== 토순이 시스템 프롬프트 ====================
const TOSUNI_SYSTEM_PROMPT = `당신은 에세이 작가이자 인터뷰어 '토순이'입니다.

## 페르소나

이름: 토순이 🐰
슬로건: "당신의 이야기를 써드립니다"
직업: 에세이 작가 겸 인터뷰어

역할:
- 사용자를 인터뷰하여 그들의 2025년 이야기를 수집합니다
- 마지막에 사용자에 대한 3인칭 에세이를 작성합니다
- 마치 잡지 인터뷰처럼, 상대방의 이야기를 경청하고 글로 남기는 작가입니다

성격:
- 인터뷰이의 이야기에 진심으로 관심을 가짐
- 언제나 긍정적으로 해석하는 따뜻한 마음
- 작은 경험에서도 의미를 발견하는 눈
- 판단하지 않고 호기심 가득하게 경청
- 부드러운 존댓말 사용

말투 예시:
- "오, 그런 일이 있었군요! 더 듣고 싶어요."
- "그게 정말 힘드셨겠어요. 그런데 그 와중에도..."
- "아, 이 부분이 정말 좋네요. 제가 글로 쓸 때 꼭 넣고 싶어요."
- "잠깐, 그 장면이 너무 좋아서 조금 더 여쭤볼게요."

## 후속 질문 기법

짧거나 대충 답변할 때:
- "그때 어디에 있었나요? 누구와 함께였어요?"
- "그 순간이 떠오르면 어떤 장면이 보이세요?"

"별일 없었어요" 할 때:
- "작은 것도 괜찮아요. 맛있게 먹은 밥, 잘 잔 날도 다 의미 있어요."
- "대단한 성취가 아니어도 돼요. 책 한 권 읽은 것도 하이라이트예요."

힘든 이야기를 할 때:
- "그게 정말 힘드셨겠어요."
- 공감 먼저, 의미 찾기는 사용자가 준비됐을 때만

## 응답 규칙
- 응답은 2-3문장으로 짧고 따뜻하게
- 한 번에 하나의 질문만
- 이모지는 가끔씩만 사용`;

// ==================== 인터뷰 섹션 정의 ====================
const SECTIONS = [
  {
    id: 'warmup',
    name: '워밍업',
    questions: [
      `안녕하세요! 저는 에세이 작가 토순이예요. 🐰

"당신의 이야기를 써드립니다"라는 마음으로 오늘 인터뷰를 하러 왔어요.

인터뷰가 끝나면, 당신에 대한 에세이를 한 편 써드릴게요.
편하게 이야기해주시면 돼요. 대단한 일이 아니어도 괜찮아요.

그럼 시작해볼까요?

먼저, 에세이에서 사용할 이름 또는 호칭을 알려주세요.
(실명, 닉네임, 이니셜 뭐든 좋아요!)`,

      `좋아요! 그리고 에세이에서 사용할 3인칭 대명사를 골라주세요.
- 그녀
- 그
- 그 사람
- 이름만 사용 (대명사 없이)`,

      `마지막 준비 질문이에요.

2025년, 올해를 딱 한 단어로 표현한다면 어떤 단어가 떠오르세요?
(긍정적인 단어가 아니어도 괜찮아요. '바쁨', '혼란', '회복', '도전'... 뭐든 좋아요.)`
    ],
    followUpPrompt: '사용자가 올해의 키워드를 말했습니다. 그 단어를 선택한 이유나 배경에 대해 공감하고, 구체적인 장면이나 순간이 있는지 간단히 물어보세요. 2문장 이내로.'
  },
  {
    id: 'highlight',
    name: '하이라이트',
    questions: [
      `좋아요! 이제 본격적으로 올해의 하이라이트를 떠올려볼게요.

먼저, 올해 가장 즐거웠던 순간 3가지를 말해주세요.
크고 대단한 것이 아니어도 돼요. 친구랑 맛있는 거 먹은 날, 좋아하는 노래 들으며 산책한 순간... 다 하이라이트예요!`,

      `이번엔 올해 가장 뿌듯했던 성취 3가지를 들려주세요.
작은 것도 괜찮아요. 운동 시작한 것, 책 한 권 읽은 것, 새로운 시도를 한 것... 뭐든 좋아요!`,

      `마지막으로, 올해 예상치 못하게 좋았던 일이 있었나요?
계획에 없었는데 찾아온 즐거움, 우연한 만남, 뜻밖의 기회 같은 것들이요.`
    ],
    followUpPrompt: '사용자가 하이라이트에 대해 이야기했습니다. 가장 인상적인 부분에 공감하고, 그때의 구체적인 장면이나 감정에 대해 간단히 물어보세요. 2문장 이내로.'
  },
  {
    id: 'challenge',
    name: '어려움',
    questions: [
      `하이라이트만 있으면 좋겠지만, 한 해에는 힘든 일도 있었을 거예요.

올해 속상했거나 힘들었던 일이 있었다면, 편하게 이야기해주셔도 돼요.
자세히 말씀 안 하셔도 괜찮고, "이런 일이 있었다" 정도만 적어도 충분해요.`,

      `그 상황에서 어떻게 버텨내셨어요?
또는 지금 돌아보면 그 경험에서 배운 점이 있을까요?
(아직 모르겠다면, "아직 모르겠다"라고 해도 좋아요.)`
    ],
    followUpPrompt: '사용자가 힘들었던 경험을 공유했습니다. 깊이 공감하고, 그 상황을 어떻게 견뎌냈는지 또는 지금 어떤 감정이 남아있는지 조심스럽게 물어보세요. 2문장 이내로.'
  },
  {
    id: 'areas',
    name: '영역별 돌아보기',
    questions: [
      `이제 삶의 여러 영역을 하나씩 돌아볼게요.

올해 일/커리어 영역은 어땠나요?
(학생이라면 학업, 구직 중이라면 그 과정도 괜찮아요.)`,

      `관계 영역은 어땠나요?
가족, 친구, 연인, 동료... 올해 관계에서 기억에 남는 일이 있었나요?`,

      `건강은 어땠나요?
몸 건강뿐 아니라 마음 건강도 포함해서요.`,

      `취미나 여가 시간은 어떻게 보내셨어요?
새로 시작한 취미, 즐겼던 활동, 쉬는 시간 등이요.`,

      `마지막으로, 올해 새롭게 배우거나 성장한 부분이 있다면요?
기술, 지식, 마인드셋... 어떤 것이든 좋아요.`
    ],
    followUpPrompt: '사용자가 삶의 특정 영역에 대해 이야기했습니다. 그 부분에서 특히 의미있었던 점이나 변화에 대해 간단히 공감하고 반응해주세요. 2문장 이내로.'
  },
  {
    id: 'future',
    name: '내년으로 이어가기',
    questions: [
      `거의 다 왔어요! 이제 내년을 향해 볼게요.

올해 했던 것 중에서 내년에도 계속하고 싶은 것이 있나요?`,

      `반대로, 내년에는 바꾸거나 개선하고 싶은 것이 있나요?`,

      `마지막이에요!

2026년의 목표나 다짐이 있다면 알려주세요. 3가지 정도면 좋겠어요.
(거창하지 않아도 돼요. "건강하게 살기" 같은 것도 좋아요!)`
    ],
    followUpPrompt: '사용자가 내년 목표를 공유했습니다. 그 다짐을 응원하고, 인터뷰를 마무리하는 따뜻한 멘트를 해주세요. 2문장 이내로.'
  }
];

// ==================== 결과 생성 프롬프트 ====================
const SUMMARY_PROMPT = `다음 인터뷰 내용을 바탕으로 2025년 회고 요약을 마크다운 형식으로 작성해주세요.

형식:
# 2025 회고 요약

## 1. 올해의 키워드
[키워드]

## 2. 올해의 하이라이트
### 즐거웠던 순간
1. [내용]
2. [내용]
3. [내용]

### 뿌듯했던 성취
1. [내용]
2. [내용]
3. [내용]

### 예상치 못한 좋은 일
[내용]

## 3. 올해의 어려움
### 힘들었던 일
[내용]

### 배운 점
[내용]

## 4. 영역별 돌아보기
- 일/커리어: [내용]
- 관계: [내용]
- 건강: [내용]
- 취미/여가: [내용]
- 배움/성장: [내용]

## 5. 내년으로 이어가기
### 계속하고 싶은 것
[내용]

### 개선하고 싶은 것
[내용]

### 2026년 목표
1. [내용]
2. [내용]
3. [내용]`;

const ESSAY_PROMPT = `다음 인터뷰 내용을 바탕으로 3인칭 에세이를 작성해주세요.

## 작성 규칙
- 인터뷰이 정보에 있는 이름과 대명사를 사용하세요
- 잡지 인터뷰 에세이 스타일로 작성
- 담담하고 깊이 있는 문체
- 구체적인 장면 묘사 포함
- 토순이가 관찰자 시점에서 서술

## 구조
1. 도입: 인상적인 장면이나 인터뷰이의 한 마디로 시작
2. 전개: 하이라이트와 어려움을 교차하며 서술
3. 성찰: 그 경험들이 인터뷰이에게 남긴 것
4. 마무리: 인터뷰를 마치며 토순이가 느낀 점

## 분량
- 800-1200자 내외

## 마지막에 추가
---
*토순이가 인터뷰를 마치고 이 글을 썼습니다. 🐰*`;

const CARD_PROMPT = `다음 인터뷰 내용을 바탕으로 결과 카드용 데이터를 JSON으로 반환해주세요.

{
  "keyword": "한 단어 키워드 (인터뷰이가 말한 올해의 키워드)",
  "summary": "2025년을 한 문장으로 요약 (20-40자)",
  "highlights": [
    "올해의 대표 하이라이트 (15자 이내)",
    "극복한 어려움 또는 성장 (15자 이내)",
    "내년 핵심 다짐 (15자 이내)"
  ]
}

JSON만 반환하세요.`;

// ==================== InterviewFlow 클래스 ====================
export class InterviewFlow {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.sections = SECTIONS;
    this.currentSectionIndex = 0;
    this.currentQuestionIndex = 0;
    this.answers = [];
    this.conversationHistory = [];
    this.isNewSection = true;

    // 인터뷰이 정보
    this.interviewee = {
      name: '',
      pronoun: ''
    };
  }

  get totalSections() {
    return this.sections.length;
  }

  getCurrentSection() {
    return this.sections[this.currentSectionIndex];
  }

  /**
   * 다음 질문 가져오기
   * @returns {Promise<string|null>} 질문 텍스트 또는 null (완료)
   */
  async getNextQuestion() {
    const section = this.getCurrentSection();

    if (!section) {
      return null; // 모든 섹션 완료
    }

    const question = section.questions[this.currentQuestionIndex];

    if (!question) {
      // 현재 섹션 완료, 다음 섹션으로
      this.currentSectionIndex++;
      this.currentQuestionIndex = 0;
      this.isNewSection = true;
      return this.getNextQuestion();
    }

    // 대화 내역에 추가
    this.conversationHistory.push({
      role: 'assistant',
      content: question
    });

    this.currentQuestionIndex++;
    return question;
  }

  /**
   * 사용자 답변 저장
   * @param {string} answer - 사용자 답변
   */
  saveAnswer(answer) {
    const section = this.getCurrentSection();
    const questionIndex = this.currentQuestionIndex - 1;

    // 인터뷰이 정보 추출 (워밍업 섹션)
    if (section?.id === 'warmup') {
      if (questionIndex === 0) {
        this.interviewee.name = answer.trim();
      } else if (questionIndex === 1) {
        this.interviewee.pronoun = this.parsePronoun(answer);
      }
    }

    this.answers.push({
      sectionId: section?.id,
      sectionName: section?.name,
      questionIndex,
      answer
    });

    this.conversationHistory.push({
      role: 'user',
      content: answer
    });

    this.isNewSection = false;
  }

  /**
   * 대명사 파싱
   */
  parsePronoun(answer) {
    const lower = answer.toLowerCase();
    if (lower.includes('그녀')) return '그녀';
    if (lower.includes('그 사람')) return '그 사람';
    if (lower.includes('이름만') || lower.includes('대명사 없')) return '';
    if (lower.includes('그')) return '그';
    return '그';
  }

  /**
   * 후속 질문 생성 가능 여부
   */
  canGenerateFollowUp() {
    const section = this.getCurrentSection();
    if (!section) return false;

    // 섹션의 마지막 질문 후에만 후속 질문
    return this.currentQuestionIndex >= section.questions.length;
  }

  /**
   * AI 후속 질문 생성
   * @param {string} lastAnswer - 마지막 답변
   * @returns {Promise<string|null>}
   */
  async generateFollowUp(lastAnswer) {
    if (!this.apiClient) return null;

    const section = this.sections[this.currentSectionIndex];
    if (!section?.followUpPrompt) return null;

    const response = await this.apiClient.chat(
      TOSUNI_SYSTEM_PROMPT + '\n\n추가 지시: ' + section.followUpPrompt,
      this.conversationHistory,
      200
    );

    if (response) {
      this.conversationHistory.push({
        role: 'assistant',
        content: response
      });
    }

    return response;
  }

  /**
   * 최종 결과 생성
   * @returns {Promise<Object>}
   */
  async generateResult() {
    const interviewText = this.formatInterviewText();

    if (this.apiClient) {
      // API가 있으면 AI 생성
      const [summaryResult, essayResult, cardResult] = await Promise.all([
        this.generateSummary(interviewText),
        this.generateEssay(interviewText),
        this.generateCardData(interviewText)
      ]);

      return {
        summary: this.markdownToHtml(summaryResult),
        summaryText: summaryResult,
        essay: this.essayToHtml(essayResult),
        essayText: essayResult,
        card: cardResult
      };
    } else {
      // API 없으면 기본 결과
      return this.generateDefaultResult();
    }
  }

  /**
   * 인터뷰 내용을 텍스트로 포맷
   */
  formatInterviewText() {
    let text = `## 인터뷰이 정보\n`;
    text += `이름: ${this.interviewee.name}\n`;
    text += `대명사: ${this.interviewee.pronoun || '이름만 사용'}\n\n`;

    text += `## 인터뷰 내용\n\n`;

    let currentSection = '';
    for (const answer of this.answers) {
      if (answer.sectionName !== currentSection) {
        currentSection = answer.sectionName;
        text += `### ${currentSection}\n\n`;
      }
      text += `Q: (질문 ${answer.questionIndex + 1})\n`;
      text += `A: ${answer.answer}\n\n`;
    }

    return text;
  }

  async generateSummary(interviewText) {
    const response = await this.apiClient.chat(
      SUMMARY_PROMPT,
      [{ role: 'user', content: interviewText }],
      2000
    );
    return response || this.getDefaultSummary();
  }

  async generateEssay(interviewText) {
    const response = await this.apiClient.chat(
      ESSAY_PROMPT,
      [{ role: 'user', content: interviewText }],
      2000
    );
    return response || this.getDefaultEssay();
  }

  async generateCardData(interviewText) {
    const response = await this.apiClient.chat(
      CARD_PROMPT,
      [{ role: 'user', content: interviewText }],
      500
    );

    try {
      // JSON 파싱 시도
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('카드 데이터 파싱 실패:', e);
    }

    return this.getDefaultCardData();
  }

  /**
   * 기본 결과 생성 (API 없을 때)
   */
  generateDefaultResult() {
    const keyword = this.answers.find(a => a.sectionId === 'warmup' && a.questionIndex === 2)?.answer || '성장';

    return {
      summary: this.markdownToHtml(this.getDefaultSummary()),
      summaryText: this.getDefaultSummary(),
      essay: this.essayToHtml(this.getDefaultEssay()),
      essayText: this.getDefaultEssay(),
      card: this.getDefaultCardData()
    };
  }

  getDefaultSummary() {
    const keyword = this.answers.find(a => a.sectionId === 'warmup' && a.questionIndex === 2)?.answer || '성장';
    const name = this.interviewee.name || '나';

    return `# 2025 회고 요약

## 1. 올해의 키워드
${keyword}

## 2. 올해의 하이라이트
(AI 모드에서 더 자세한 요약을 받아보세요)

## 3. 올해의 어려움
(인터뷰 내용 기반으로 정리됩니다)

## 4. 영역별 돌아보기
(각 영역별 답변이 여기에 정리됩니다)

## 5. 내년으로 이어가기
(내년 목표와 다짐이 여기에 정리됩니다)

---
*AI 대화 모드를 사용하면 더 풍성한 요약을 받아볼 수 있어요!*`;
  }

  getDefaultEssay() {
    const name = this.interviewee.name || '그';
    const pronoun = this.interviewee.pronoun || '';
    const keyword = this.answers.find(a => a.sectionId === 'warmup' && a.questionIndex === 2)?.answer || '성장';

    return `${name}의 2025년

${pronoun ? pronoun + '의' : name + '의'} 올해는 '${keyword}'의 해였다.

인터뷰를 하는 동안, ${pronoun || name}은(는) 올 한 해를 차분히 돌아보았다.
즐거웠던 순간들, 힘들었던 시간들, 그리고 그 속에서 배운 것들.

모든 경험이 ${pronoun || name}을(를) 지금의 모습으로 만들었다.

내년에는 어떤 이야기가 펼쳐질까?
${pronoun || name}의 2026년이 기대된다.

---
*토순이가 인터뷰를 마치고 이 글을 썼습니다. 🐰*

---
*AI 대화 모드를 사용하면 더 풍성한 에세이를 받아볼 수 있어요!*`;
  }

  getDefaultCardData() {
    const keyword = this.answers.find(a => a.sectionId === 'warmup' && a.questionIndex === 2)?.answer || '성장';

    return {
      keyword: keyword.slice(0, 10),
      summary: '2025년, 당신만의 이야기를 써내려갔습니다.',
      highlights: [
        '올해의 소중한 순간들',
        '어려움을 이겨낸 힘',
        '내년을 향한 다짐'
      ]
    };
  }

  /**
   * 마크다운을 HTML로 변환 (간단 버전)
   */
  markdownToHtml(md) {
    return md
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.*)$/gm, (match) => {
        if (match.startsWith('<')) return match;
        return match;
      });
  }

  /**
   * 에세이를 HTML로 변환
   */
  essayToHtml(text) {
    return text
      .split('\n\n')
      .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }
}
