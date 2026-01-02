/**
 * 결과 카드 이미지 내보내기
 */
export class CardExporter {
  constructor() {
    this.cardElement = document.getElementById('result-card');
  }

  /**
   * 카드를 Canvas로 변환
   * @param {Object} options - html2canvas 옵션
   * @returns {Promise<HTMLCanvasElement>}
   */
  async toCanvas(options = {}) {
    const defaultOptions = {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
      allowTaint: true
    };

    return html2canvas(this.cardElement, { ...defaultOptions, ...options });
  }

  /**
   * 카드를 Blob으로 변환
   * @returns {Promise<Blob>}
   */
  async toBlob() {
    const canvas = await this.toCanvas();
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Blob 생성 실패'));
        }
      }, 'image/png');
    });
  }

  /**
   * 카드를 이미지로 다운로드
   * @param {string} filename - 파일명
   */
  async download(filename = '2025-회고-토순이의인터뷰.png') {
    const canvas = await this.toCanvas();
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  /**
   * 카드를 Data URL로 변환
   * @returns {Promise<string>}
   */
  async toDataUrl() {
    const canvas = await this.toCanvas();
    return canvas.toDataURL('image/png');
  }
}
