# Shorts Presenter

OBS Browser Source에서 사용하는 9:16 숏츠용 키워드 오버레이 재생기입니다.

## 사용 URL

```txt
/shorts-presenter/?deck=it-001-005
```

디버그 가이드 표시:

```txt
/shorts-presenter/?deck=it-001-005&debug=1
```

특정 큐부터 시작:

```txt
/shorts-presenter/?deck=it-001-005&cue=3
```

## OBS 설정

- Source: Browser Source
- URL: GitHub Pages URL + `/shorts-presenter/?deck=it-001-005`
- Width: `1080`
- Height: `1920`
- 배경: 투명 오버레이 기준

## 조작

- `Space` / `ArrowRight`: 다음 큐
- `ArrowLeft`: 이전 큐
- `R`: 현재 큐 애니메이션 다시 재생
- `D`: 디버그 가이드 토글

## 덱 구조

덱 파일은 `data/*.json`에 둡니다.

```json
{
  "meta": {
    "title": "IT-001~005",
    "category": "IT",
    "range": "001-005"
  },
  "cues": [
    {
      "id": "IT-001-01",
      "hook": "LLM, 쉽게 말하면 뭘까?",
      "items": [
        {
          "text": "LLM",
          "position": "mid1",
          "style": "heading",
          "animation": "pop"
        }
      ]
    }
  ]
}
```

## 프리셋

### position

- `mid1`: 핵심 용어
- `mid2`: 쉬운 정의
- `mid3`: 예시/비유
- `bottom`: 요약/주의/결론

`top`은 별도 item 위치로 쓰기보다, cue의 `hook` 문구가 고정 후킹 제목으로 렌더링됩니다.

### style

- `heading`
- `keyword`
- `body`
- `box`
- `sfx`

### animation

- `normal`
- `fade`
- `pop`
- `float`
- `slideUp`
- `shake`
