# Claude Code 사용 패턴 분석 프롬프트 (CLI 유저용)

나의 Claude Code 사용 데이터를 깊이 있게 분석하고, 실용적인 활용 전략 인사이트를 발굴해줘.

---

## 📂 데이터 소스

다음 소스들을 종합적으로 분석:

1. **전역 히스토리**: `~/.claude/history.jsonl`
   
   - 모든 사용자 입력 기록
   
   - `timestamp`, `project`, `sessionId`, `pastedContents` 등

2. **세션 파일**: `~/.claude/projects/*/*.jsonl`
   
   - 각 세션의 전체 대화 내역
   
   - 실제 메시지 타임스탬프 (ISO 8601 형식)

3. **세션 환경**: `~/.claude/session-env/`
   
   - 각 세션의 환경 설정 정보

---

## Phase 1: 데이터 수집 및 기본 통계

### 분석 방법

**타임스탬프 파싱**:

```python
# history.jsonl의 밀리초 타임스탬프 사용
for line in history_file:
    record = json.loads(line)
    ts_ms = record['timestamp']

    # 5분 단위 bucket으로 그룹화
    bucket = ts_ms // (5 * 60 * 1000)
    time_buckets[bucket].add(record['sessionId'])

# 세션 파일의 ISO 8601 타임스탬프도 활용 가능
for line in session_file:
    msg = json.loads(line)
    if 'timestamp' in msg:
        dt = datetime.fromisoformat(msg['timestamp'].replace('Z', '+00:00'))
        ts_ms = int(dt.timestamp() * 1000)
```

### 1. 전체 통계

다음 표로 정리:

| 항목          | 값                       |
| ----------- | ----------------------- |
| 분석 날짜       | YYYY-MM-DD              |
| 활동 기간       | 최초 ~ 최근 활동 날짜           |
| 총 기간        | N일                      |
| 실제 활동일      | N일 (활동이 있는 날짜 수)        |
| 활동 비율       | N%                      |
| **총 세션 수**  | N개                      |
| **총 입력 수**  | N개 (history.jsonl 기록 수) |
| **총 메시지 수** | N개 (세션 파일 기준, 선택사항)     |
| 일평균 입력      | N개                      |
| 세션당 평균 입력   | N개                      |

**핵심 발견**: (1-2줄로 요약)

### 2. 동시 세션 분포 (5분 단위)

**분석 로직**:

- history.jsonl의 timestamp를 5분 단위로 그룹화
- 같은 5분 윈도우(bucket)에 속한 고유 세션 ID 개수를 카운트
- 동시 프로젝트 수도 함께 분석

**동시 세션 수 분포**:

| 동시 세션 수 | 빈도 (회) | 비율 (%) |
| ------- | ------ | ------ |
| 1개      | ?      | ?      |
| 2~3개    | ?      | ?      |
| 4~5개    | ?      | ?      |
| 6~10개   | ?      | ?      |
| 11개+    | ?      | ?      |

**동시 프로젝트 수 분포**:

| 동시 프로젝트 수 | 빈도 (회) | 비율 (%) |
| --------- | ------ | ------ |
| 1개        | ?      | ?      |
| 2~3개      | ?      | ?      |
| 4개+       | ?      | ?      |

**추가 통계**:

- 평균 동시 세션 수: ?
- 최대 동시 세션 수: ? (날짜: YYYY-MM-DD)
- 평균 동시 프로젝트 수: ?
- 같은 프로젝트 내 다중 세션 비율: ?%

**핵심 발견**: (1-2줄로 요약)

### 3. 시간대별 패턴

**timestamp 기준으로 집계**:

| 시간대         | 입력 수 | 비율  | 세션 수 |
| ----------- | ---- | --- | ---- |
| 새벽 (00-06시) | ?    | ?%  | ?    |
| 오전 (06-12시) | ?    | ?%  | ?    |
| 오후 (12-18시) | ?    | ?%  | ?    |
| 저녁 (18-24시) | ?    | ?%  | ?    |

**시간별 활동 Top 10**:

| 시간  | 입력 수 | 비율  |
| --- | ---- | --- |
| 21시 | ?    | ?%  |
| ... | ...  | ... |

**요일별 패턴**:

| 요일  | 입력 수 | 평균 세션 수 |
| --- | ---- | ------- |
| 월   | ?    | ?       |
| ... | ...  | ...     |

**핵심 발견**: (1-2줄로 요약)

### 4. 프로젝트별 활동 빈도 Top 10

**history.jsonl의 project 필드 기준**:

| 순위  | 프로젝트 경로            | 입력 수 | 세션 수 | 비율  |
| --- | ------------------ | ---- | ---- | --- |
| 1   | ~/dev/project-name | ?    | ?    | ?%  |
| 2   | ...                | ...  | ...  | ... |

**프로젝트 유형 분류**:

- 장기 프로젝트 (10+ 세션): ?개
- 중기 프로젝트 (3-9 세션): ?개
- 단발성 (1-2 세션): ?개

**핵심 발견**: (1-2줄로 요약)

### 5. 세션 깊이 분석

**세션당 입력 수 기준**:

| 세션 유형            | 세션 수 | 비율  |
| ---------------- | ---- | --- |
| 짧은 세션 (1-5 입력)   | ?    | ?%  |
| 중간 세션 (6-20 입력)  | ?    | ?%  |
| 긴 세션 (21-50 입력)  | ?    | ?%  |
| 매우 긴 세션 (51+ 입력) | ?    | ?%  |

**핵심 발견**: (1-2줄로 요약)

### 6. 가장 활발했던 날 Top 10

| 날짜         | 세션 수 | 입력 수 | 동시 최대 세션 | 주요 프로젝트 |
| ---------- | ---- | ---- | -------- | ------- |
| YYYY-MM-DD | ?    | ?    | ?        | ?       |
| ...        | ...  | ...  | ...      | ...     |

**핵심 발견**: (1-2줄로 요약)

---

## Phase 2: 패턴 발견 (대화형)

내게 질문하며 패턴을 함께 찾자. 데이터를 보고 다음과 같은 질문들을 던져줘. **그리고 질문은 반드시 한번에 하나만 해.**:

### 기본 작업 패턴

1. "1개 세션만 돌릴 때 주로 어떤 작업을 하셨나요?"
   
   - 구체적인 예시나 프로젝트가 있나요?

2. "2~3개 세션을 동시에 돌릴 때는 어떤 조합이었나요?"
   
   - 같은 프로젝트 내에서? 다른 프로젝트?
   
   - 메인 작업 + 서브 작업 구조인가요?

3. "4개 이상 세션을 열었을 때는 어떤 상황이었나요?"
   
   - 계획적인 멀티태스킹? 급하게 여러 이슈 처리?

### 전환 패턴

4. "언제 1개 세션에서 여러 세션으로 늘리게 되나요?"
   
   - 특정 트리거나 상황이 있나요?

5. "시간대별로 작업 방식이 달라지나요?"
   
   - 오전 vs 저녁, 평일 vs 주말?

### 프로젝트 전략

6. "장기 프로젝트(Top 프로젝트)에서는 어떻게 작업하셨나요?"
   
   - 세션을 자주 나누는 편? 긴 세션을 선호?

7. "짧은 세션(1-5 입력)은 주로 어떤 용도였나요?"
   
   - 빠른 확인? 실험? 버그 수정?

### 효율성

8. "가장 생산적이었던 작업 방식은 무엇이었나요?"
   
   - 어떤 조건일 때 가장 효율적이었나요?

**내 답변을 듣고 추가 질문으로 깊이 파고들어줘.**

---

## Phase 3: 심층 분석

데이터와 대화 내용을 바탕으로 다음을 분석:

### 1. 의외의 발견

예상과 다른 패턴이나 놀라운 발견:

- (데이터에서 발견한 의외의 패턴)
- (사용자 답변과 데이터의 불일치)

### 2. 상관관계 분석

- 시간대 vs 동시 세션 수
- 프로젝트 유형 vs 세션 길이
- 요일 vs 작업 패턴
- 프로젝트별 선호 시간대

### 3. 행동 전략 추론

"왜 이렇게 했을까?" 분석:

- 멀티태스킹 전략의 이유
- 특정 시간대 선호 이유
- 세션 분리 기준

### 4. 효율성 패턴

가장 생산적인 조합 발견:

- 최적 동시 세션 수
- 최적 작업 시간대
- 최적 세션 길이

---

## Phase 4: 인사이트 도출

### 1. 나만의 작업 패턴 정의

**비율 분석**:

- 단일 세션 작업: X%
- 멀티 세션 작업: Y%
- 집중 작업 블록: Z%

**패턴 시각화**:

```
일반적인 작업 흐름:
시작 → [단계 1] → [단계 2] → [단계 3] → 완료
```

### 2. 전략 명명

이 패턴에 이름 붙이기:

- 예: "하이브리드 집중 전략", "병렬 실험 방식" 등
- 한 문장으로 정의

### 3. 핵심 원칙 (3~5가지)

1. **원칙 1**: (구체적 설명)
2. **원칙 2**: (구체적 설명)
3. **원칙 3**: (구체적 설명)
4. **원칙 4**: (선택사항)
5. **원칙 5**: (선택사항)

### 4. 적용 시나리오

**언제 효과적인가**:

- 시나리오 A: (상황과 적용 방법)
- 시나리오 B: (상황과 적용 방법)
- 시나리오 C: (상황과 적용 방법)

**언제 비효과적인가**:

- 피해야 할 상황과 이유

---

## Phase 5: 액션 플랜

### 1. 따라하기 가이드 (단계별)

**Step 1: 작업 시작 전**

- [ ] (구체적 행동)
- [ ] (구체적 행동)

**Step 2: 작업 중**

- [ ] (구체적 행동)
- [ ] (구체적 행동)

**Step 3: 세션 전환**

- [ ] (구체적 행동)
- [ ] (구체적 행동)

**Step 4: 작업 마무리**

- [ ] (구체적 행동)
- [ ] (구체적 행동)

### 2. 나에게 최적화된 전략 만들기

**내 상황에 맞는 커스터마이징**:

1. 작업 유형별 전략
2. 시간대별 전략
3. 에너지 레벨별 전략

**도구와 설정**:

- 추천 프로젝트 구조
- 세션 관리 팁
- 자동화 가능한 부분

### 3. 전략 한 줄 정리

> **[전략명]**: (20단어 이내로 핵심 전략 설명)

---

## 📋 결과 포맷

### 📊 데이터 요약

- 활동 기간과 규모
- 핵심 수치 (세션, 입력, 프로젝트)
- 주요 패턴 3가지

### 🔍 발견한 패턴

- Phase 2에서 발견한 작업 패턴
- 멀티태스킹 방식
- 시간대/요일 선호도

### 💡 핵심 인사이트 (3가지)

**인사이트 1**:

- 발견: (무엇을 발견했는가)
- 의미: (왜 중요한가)
- 활용: (어떻게 활용할 수 있는가)

**인사이트 2**:

- 발견: (무엇을 발견했는가)
- 의미: (왜 중요한가)
- 활용: (어떻게 활용할 수 있는가)

**인사이트 3**:

- 발견: (무엇을 발견했는가)
- 의미: (왜 중요한가)
- 활용: (어떻게 활용할 수 있는가)

### 🎯 나만의 전략

**전략명**: [이름]

**정의**: (한 문장)

**핵심 원칙**:

1. 원칙 1
2. 원칙 2
3. 원칙 3

**적용 방법**:

- 언제: (상황)
- 어떻게: (구체적 방법)
- 효과: (기대 결과)

### 🚀 액션 플랜

**즉시 실행 (오늘부터)**:

1. [ ] 액션 아이템 1
2. [ ] 액션 아이템 2
3. [ ] 액션 아이템 3

**1주일 내 실험**:

1. [ ] 실험 1
2. [ ] 실험 2

**장기 적용**:

1. [ ] 습관 1
2. [ ] 습관 2

### 📝 한 줄 요약

> (전체 분석을 관통하는 핵심 메시지를 한 문장으로)

---

## ⚠️ 중요 원칙

1. **단순 통계를 넘어서기**: "왜"와 "어떻게"에 집중
2. **대화형 깊이 파기**: 내 답변을 들으며 추가 질문으로 탐색
3. **실용성**: 따라할 수 있고 적용 가능한 전략 제시
4. **개인화**: 내 데이터의 고유한 패턴 발굴
5. **액션 지향**: 구체적이고 실행 가능한 다음 단계 제공

---

## 🔧 Python 스크립트 참고 구조

```python
import json
from datetime import datetime
from collections import defaultdict, Counter
from pathlib import Path

def analyze_history():
    """history.jsonl 분석"""
    history_file = Path.home() / ".claude/history.jsonl"

    records = []
    time_buckets = defaultdict(set)

    with open(history_file) as f:
        for line in f:
            record = json.loads(line)
            records.append(record)

            # 5분 단위 bucket
            if 'timestamp' in record and 'sessionId' in record:
                ts_ms = record['timestamp']
                bucket = ts_ms // (5 * 60 * 1000)
                time_buckets[bucket].add(record['sessionId'])

    return records, time_buckets

def analyze_concurrent_sessions(time_buckets):
    """동시 세션 통계"""
    concurrent_dist = Counter()

    for bucket, sessions in time_buckets.items():
        count = len(sessions)
        concurrent_dist[count] += 1

    return concurrent_dist

def analyze_by_project(records):
    """프로젝트별 통계"""
    project_stats = defaultdict(lambda: {'sessions': set(), 'inputs': 0})

    for record in records:
        if 'project' in record and 'sessionId' in record:
            project = record['project']
            project_stats[project]['sessions'].add(record['sessionId'])
            project_stats[project]['inputs'] += 1

    return project_stats

def analyze_by_time(records):
    """시간대별 통계"""
    hour_counter = Counter()
    weekday_counter = Counter()

    for record in records:
        if 'timestamp' in record:
            dt = datetime.fromtimestamp(record['timestamp'] / 1000)
            hour_counter[dt.hour] += 1
            weekday_counter[dt.strftime('%A')] += 1

    return hour_counter, weekday_counter

# 실행
records, time_buckets = analyze_history()
concurrent_dist = analyze_concurrent_sessions(time_buckets)
project_stats = analyze_by_project(records)
hour_counter, weekday_counter = analyze_by_time(records)

print(f"총 입력 수: {len(records)}")
print(f"총 세션 수: {len(set(r['sessionId'] for r in records if 'sessionId' in r))}")
print(f"동시 세션 분포: {concurrent_dist}")
```

---

**이 프롬프트로 나만의 Claude Code CLI 사용 패턴과 전략을 발굴해줘!**
