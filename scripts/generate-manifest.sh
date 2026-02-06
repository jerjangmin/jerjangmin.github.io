#!/bin/bash
# files/ 디렉토리를 스캔하여 data.json을 자동 생성하는 스크립트

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
FILES_DIR="$ROOT_DIR/files"
OUTPUT="$ROOT_DIR/data.json"

# 확장자 → 카테고리 매핑
get_category() {
  local ext="$1"
  case "$ext" in
    pdf|md|txt|doc|docx|hwp|hwpx) echo "문서" ;;
    xlsx|xls|csv) echo "스프레드시트" ;;
    pptx|ppt|key) echo "프레젠테이션" ;;
    psd|ai|eps|svg|png|jpg|jpeg|webp|gif|tiff|fig) echo "그래픽 리소스" ;;
    mp4|mov|avi|webm) echo "영상 리소스" ;;
    mp3|wav|aac|ogg) echo "오디오" ;;
    ttf|otf|woff|woff2) echo "폰트" ;;
    html|xlsm) echo "계산기/도구" ;;
    zip|rar|7z|tar|gz) echo "압축파일" ;;
    *) echo "기타" ;;
  esac
}

# 파일 크기를 읽기 쉬운 형식으로 변환
format_size() {
  local bytes="$1"
  if [ "$bytes" -ge 1048576 ]; then
    awk "BEGIN { printf \"%.1fMB\", $bytes / 1048576 }"
  else
    awk "BEGIN { printf \"%.1fKB\", $bytes / 1024 }"
  fi
}

# 파일명에서 제목 추출 (하이픈/언더스코어 → 공백, 확장자 제거)
get_title() {
  local filename="$1"
  local name="${filename%.*}"
  echo "$name" | sed 's/[-_]/ /g'
}

# git log에서 파일 추가 날짜 추출
get_date() {
  local filepath="$1"
  local date
  date=$(git -C "$ROOT_DIR" log --diff-filter=A --format="%ai" -- "$filepath" 2>/dev/null | head -1 | cut -d' ' -f1)
  if [ -z "$date" ]; then
    # git 기록이 없으면 현재 날짜 사용
    date=$(date +%Y-%m-%d)
  fi
  echo "$date"
}

# JSON 문자열 이스케이프
json_escape() {
  local str="$1"
  str="${str//\\/\\\\}"
  str="${str//\"/\\\"}"
  echo "$str"
}

# files/ 디렉토리 존재 확인
if [ ! -d "$FILES_DIR" ]; then
  echo '{"generated":"'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'","files":[]}' > "$OUTPUT"
  echo "files/ 디렉토리가 없어 빈 data.json을 생성했습니다."
  exit 0
fi

# JSON 생성 시작
GENERATED=$(date -u +%Y-%m-%dT%H:%M:%SZ)
JSON='{"generated":"'"$GENERATED"'","files":['

FIRST=true

# files/ 내 파일 순회 (.gitkeep 제외)
while IFS= read -r -d '' filepath; do
  filename=$(basename "$filepath")

  # .gitkeep 및 숨김 파일 무시
  [[ "$filename" == .* ]] && continue

  ext="${filename##*.}"
  ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
  category=$(get_category "$ext")
  title=$(get_title "$filename")
  title=$(json_escape "$title")

  # 파일 크기
  if [[ "$(uname)" == "Darwin" ]]; then
    bytes=$(stat -f%z "$filepath")
  else
    bytes=$(stat -c%s "$filepath")
  fi
  size=$(format_size "$bytes")

  # 날짜
  file_date=$(get_date "$filepath")

  # 상대 경로
  rel_path="./files/$filename"

  if [ "$FIRST" = true ]; then
    FIRST=false
  else
    JSON+=','
  fi

  JSON+='{"filename":"'"$(json_escape "$filename")"'"'
  JSON+=',"title":"'"$title"'"'
  JSON+=',"category":"'"$category"'"'
  JSON+=',"extension":"'"$ext"'"'
  JSON+=',"size":"'"$size"'"'
  JSON+=',"date":"'"$file_date"'"'
  JSON+=',"path":"'"$rel_path"'"}'

done < <(find "$FILES_DIR" -maxdepth 1 -type f -print0 | sort -z)

JSON+=']}'

echo "$JSON" > "$OUTPUT"
echo "data.json 생성 완료: $(echo "$JSON" | grep -o '"filename"' | wc -l | tr -d ' ')개 파일"
