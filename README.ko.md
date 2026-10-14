# Motion Explainer

**당신 분야의 언어를 알려 주세요. 세상이 더 크리에이티브해집니다.**

[English](README.md) | [日本語](README.ja.md) | [中文](README.zh.md) | **한국어** | [Español](README.es.md)

**당신 분야의 '꼭 알아야 할 이름 24개' 설명 애니메이션**을 만드는 프롬프트입니다. 작은 애니메이션 카드 8장이 들어간 루프 영상 3개와 치트시트 한 장으로, 그 분야 사람이라면 알아 두어야 할 이름들을 보여 줍니다.
이 저장소를 코딩 AI(Claude Code, Codex, Cursor 등)에 건네고 분야를 알려 주면, 한 세트를 처음부터 끝까지 함께 만들어 줍니다.

![두 가지 예시: 카메라 워크(왼쪽)와 모션 그래픽(오른쪽)](assets/preview.gif)

*이 방법으로 만든 두 세트입니다. 일부러 다르게 보이게 했습니다. 스타일은 템플릿이 아니라 분야에서 나옵니다.*

## 왜 만들었나

이 영상들에 댓글이 정말 많이 달렸습니다.

하나씩 읽어 내려가다가, 한 댓글에서 멈췄습니다. 대략 이런 내용이었어요. 자기를 가로막던 건 상상력이 부족해서가 아니었다. 그런 움직임을 뭐라고 부르는지 몰랐을 뿐이었다.

무슨 말인지 너무 잘 알았습니다. 머릿속에는 이미 그림이 있어요. 모자란 건 재능도 상상력도 아니고, AI에게 건넬 단어 하나입니다.

모든 분야에는 그 분야만의 어휘, 공통 언어가 있습니다. 카메라 워크에도, 모션 그래픽에도, 요리에도, 조명에도, 제가 떠올릴 수 있는 모든 일에 있습니다. 여러 분야의 프로들이 여러 언어로, 자기 일에서 가장 중요한 용어를 가르쳐 준다면 정말 큰 도움이 될 거예요.

그래서 이 영상을 만드는 프롬프트 자체를 공개하기로 했습니다.

이런 댓글도 있었습니다. "this is how you become a creative director"(이렇게 크리에이티브 디렉터가 되는 거지).

맞아요, 바로 그거예요.

여러 분야의 어휘를 알게 되면, 훨씬 많은 사람이 자기 안에 잠들어 있던 창의적인 재능을 꺼낼 수 있다고 믿습니다.

그래서 더 많은 사람이 누구나 따라올 수 있게 자기 분야를 설명하는 선생님이 되는 데, 이 저장소가 도움이 되면 좋겠습니다.

그리고 그 너머에서, AI와 함께 멋진 작업을 해내는 크리에이티브 디렉터가 전 세계에 더 많아진다면 정말 멋질 것 같습니다.

— 오타키 쇼헤이 Shohei Ohtaki ([@showheyohtaki](https://x.com/showheyohtaki))

## 사용 방법

1. [Node.js](https://nodejs.org/) 18 이상과 [ffmpeg](https://ffmpeg.org/)를 설치하고, 이 폴더에서 다음을 실행합니다.
   ```bash
   npm install
   npx playwright install chromium
   ```
2. 코딩 AI로 이 폴더를 열고, 한국어로 다음과 같이 붙여 넣습니다.
   ```
   PROMPT.md를 읽고 그대로 진행해 줘.
   분야: <당신의 분야. 예: "커피 추출", "무대 조명", "UI 컴포넌트">
   대상: <예: "AI 이미지 생성으로 상품 사진을 만드는 사람">
   ```
   PROMPT.md는 영어로 쓰여 있지만, AI에게 말을 건 언어로 세트가 만들어집니다. 이름은 그 언어권 현장에서 실제로 쓰는 명칭을 찾아서 쓰고, 라벨·치트시트·게시글도 그 언어로 나옵니다. 영어가 아니라면 모든 이름 아래에 영어 명칭이 함께 들어가서, 누구든 AI에 무엇이라고 입력하면 되는지 알 수 있습니다. 영어판이나 다른 언어판은 선택 사항이며, 마지막에 AI가 한 번만 물어봅니다.
3. 함께 진행합니다. AI는 두 번 멈춰서 확인을 기다립니다. **이름 24개 목록**이 나왔을 때, 그리고 카드의 **스타일**이 정해졌을 때입니다. 당신의 전문성이 가장 크게 작용하는 건 첫 번째 확인입니다. 그다음 AI가 영상을 만들고 렌더링하고 점검하며, 치트시트 이미지, 독립 리뷰, 게시글 작성까지 도와줍니다.

## 저장소 구성

```
PROMPT.md / PROMPT.ja.md   메인 프롬프트: '내 분야'에서 완성된 세트까지 7단계 (영어 / 일본어)
prompts/                   메인 프롬프트가 사용하는 보조 프롬프트
  cheatsheet-image.md        치트시트 이미지 (이미지 생성 AI용)
  review.md                  별도 대화에서 진행하는 독립 리뷰
  post.md                    게시글 (원래 게시물을 예시로 수록)
  translate.md               같은 세트를 다른 언어로 만들기
  (각각 일본어판 .ja.md 있음)
template/index.html        빈 페이지: 제목, 2x4 그리드, 라벨, 페이지 점, 렌더링 규약
render.mjs                 HTML -> mp4 프레임 단위 렌더링 (Playwright + ffmpeg), 점검용 이미지 생성
check.mjs                  완성된 영상 측정: 형식, 루프 이음새, 깜빡임
examples/
  camera-moves/            en/ 와 ja/: HTML, 영상 3개, 치트시트. NAMES.md: 이름 24개
  motion-graphics/         ja/: HTML, 영상 3개, 치트시트. NAMES.md: 이름 24개
```

## 예시

| 세트 | 스타일 | 라벨 언어 | 파일 |
|---|---|---|---|
| 카메라 무브 & 트랜지션 | 카메라 뷰파인더 안의 회색 와이어프레임 장면, 피사체만 파란색 | 영어, 일본어 | [`examples/camera-moves`](examples/camera-moves) ・ [이름 목록](examples/camera-moves/NAMES.md) |
| 모션 그래픽 | 네이비 무대에 네 가지 색, 카드마다 모션 디자인 쇼릴의 한 컷처럼 | 일본어 (영어 명칭 병기) | [`examples/motion-graphics`](examples/motion-graphics) ・ [이름 목록](examples/motion-graphics/NAMES.md) |

작성자가 일본어 사용자라서 예시는 일본어 위주이고, 카메라 세트만 영어판도 만들었습니다. mp4와 PNG는 원래 게시물에 사용한 파일 그대로입니다. 각 `NAMES.md`에는 제작 중에 내린 결정(리뷰 후 고친 점, 보여 주기 어려운 이름을 어떻게 보여 줬는지)에 대한 짧은 메모도 있습니다.

Chromium 계열 브라우저에서 아무 `index.html`이나 열면 루프 재생됩니다. `?page=2`는 2페이지, `?t=3.5`는 3.5초 지점의 정지 화면입니다.

## 렌더링 원리

각 영상은 `<canvas>`에 그리는 HTML 페이지입니다. 실시간 시계를 쓰지 않고, 모든 프레임을 프레임 번호로부터 그립니다.

| HTML 안 | 의미 |
|---|---|
| `window.N_FRAMES` | 한 페이지의 프레임 수 (282 = 9.4초 x 30 fps) |
| `window.renderFrame(i)` | `i`번째 프레임을 그림 |
| `window.prepareFrame(i)` | 선택 사항, 비동기 가능 |
| `window.READY` | 폰트가 준비되면 `true` |
| `?page=N`, `?render=1` | 페이지 지정 / 미리보기 루프 끄기 |

`render.mjs`는 프레임마다 `renderFrame(i)`를 호출해 canvas를 읽고 ffmpeg로 넘기기 때문에, 느린 컴퓨터에서도 프레임이 빠지지 않습니다.

```bash
node render.mjs examples/camera-moves/en/index.html --page 1          # -> out/camera-moves-en-page1.mp4
node render.mjs examples/motion-graphics/ja/index.html --all --sheet --cards  # 영상 3개 + 점검용 이미지
node check.mjs out/motion-graphics-ja-page1.mp4                      # 형식, 루프 이음새, 깜빡임
```

옵션: `--page`, `--all`, `--pages`, `--out`, `--out-dir`, `--fps`, `--crf`, `--sheet`(페이지별 전체 콘택트 시트), `--sheet-fps`, `--cards`(카드별 원본 크기 이미지), `--cards-fps`, `--cards-seconds`. 자세한 내용은 `node render.mjs --help`.
출력: 1200x1350, 30 fps, H.264 (yuv420p), 오디오 없음.

**폰트.** 네트워크에서 아무것도 불러오지 않고, 폰트 파일도 포함하지 않습니다. 예시는 macOS 기본 폰트(Helvetica Neue, Hiragino Sans, Avenir Next, SF Mono)를 사용합니다. Windows나 Linux에서는 브라우저가 다른 폰트로 대체하므로 글자가 조금 달라 보이고, 일본어에는 일본어 폰트(예: Noto Sans JP), 한국어에는 한국어 폰트(예: Noto Sans KR)가 필요합니다. 폰트는 각 `index.html` 앞부분의 상수에서 바꿀 수 있습니다. 인코딩 설정 차이로 새로 렌더링한 영상이 포함된 mp4와 약간 다를 수 있습니다.

## 원래 게시물

이 시리즈의 원래 게시물(일본어):

- 웹 스크롤 애니메이션: https://x.com/showheyohtaki/status/2108065874511077598 (이 저장소에는 미수록)
- 카메라 무브 & 트랜지션: https://x.com/showheyohtaki/status/2109112248832503895
- 모션 그래픽: https://x.com/showheyohtaki/status/2109840044554891464

## 당신 분야 버전을 만들었다면?

**#MotionExplainer** 를 붙여서 올려 주세요. 보러 가겠습니다.

## 라이선스

[MIT](LICENSE). 이 저장소의 프롬프트, 코드, 영상, 이미지는 상업적 용도를 포함해 자유롭게 사용할 수 있습니다. 링크를 남겨 주시면 반갑지만 필수는 아닙니다.
