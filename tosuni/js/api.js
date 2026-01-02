/**
 * Claude API 클라이언트
 * 브라우저에서 직접 호출 (CORS 헤더 사용)
 */
export class ApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.anthropic.com/v1/messages';
    this.model = 'claude-sonnet-4-20250514'; // 균형 잡힌 성능
  }

  /**
   * Claude API 호출
   * @param {string} systemPrompt - 시스템 프롬프트
   * @param {Array<{role: string, content: string}>} messages - 대화 내역
   * @param {number} maxTokens - 최대 토큰 수
   * @returns {Promise<string|null>} 응답 텍스트
   */
  async chat(systemPrompt, messages, maxTokens = 1000) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: maxTokens,
          system: systemPrompt,
          messages: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error('API 에러:', error);
        throw new Error(error.error?.message || `API 호출 실패: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;

    } catch (err) {
      console.error('API 호출 실패:', err);
      return null;
    }
  }

  /**
   * API 키 유효성 간단 테스트
   * @returns {Promise<boolean>}
   */
  async testConnection() {
    try {
      const result = await this.chat(
        '응답은 "OK"만 해주세요.',
        [{ role: 'user', content: '테스트' }],
        10
      );
      return result !== null;
    } catch {
      return false;
    }
  }
}
