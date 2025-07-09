# ☕ Coffee Tasting Journal (커피 테이스팅 저널)

> 스페셜티 커피 초중급자들이 쉽고 재미있게 자신의 센서리를 개발할 수 있는 앱

## 🎯 프로젝트 소개

커피의 복잡한 맛을 전문가처럼 표현하기 어려우셨나요? 
이 앱은 여러분이 느낀 맛과 로스터의 테이스팅 노트를 재미있게 비교하며, 
점차 더 많은 맛을 구분할 수 있도록 도와줍니다.

### 주요 특징
- 🎮 **쉬운 입력**: 복잡한 전문 용어 없이 직관적인 맛 선택
- 🎪 **재미있는 비교**: 내가 느낀 맛 vs 로스터 노트 매칭
- 📈 **성장 추적**: 나만의 센서리 발전 과정 기록

## 🚀 MVP 기능 목록

### Phase 1 (현재 개발 중)
- [ ] 커피 정보 입력 (이름, 로스터리, 원산지)
- [ ] 로스터 테이스팅 노트 입력
- [ ] 사용자 테이스팅 노트 선택 (간단한 카테고리)
- [ ] 매칭 결과 표시
- [ ] 기본 기록 저장

### Phase 2 (계획)
- [ ] 사용자 프로필 및 통계
- [ ] 맛 카테고리 레벨 시스템
- [ ] 성장 그래프 및 배지
- [ ] 커피샵 데이터베이스

### Phase 3 (미래)
- [ ] 커뮤니티 기능
- [ ] 바코드 스캔
- [ ] AI 추천 시스템

## 💻 기술 스택

```
프론트엔드: React Native (iOS/Android 동시 개발)
백엔드: Supabase (빠른 MVP 개발)
데이터베이스: PostgreSQL
인증: Supabase Auth
```

## 📱 화면 구성

### 1. 홈 화면
- 최근 기록한 커피 목록
- 빠른 기록 추가 버튼

### 2. 커피 입력 화면
- 커피 기본 정보
- 로스터 노트 입력

### 3. 테이스팅 화면
- 단계별 맛 선택
- 시각적 가이드

### 4. 결과 화면
- 매칭 결과
- 격려 메시지
- 공유 기능

## 🛠 개발 환경 설정

```bash
# 프로젝트 클론
git clone https://github.com/yourusername/coffee-tasting-journal.git

# 디렉토리 이동
cd coffee-tasting-journal

# 의존성 설치
npm install

# iOS 개발 (Mac만 가능)
cd ios && pod install
cd ..
npm run ios

# Android 개발
npm run android
```

## 📁 프로젝트 구조

```
coffee-tasting-journal/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── screens/        # 화면 컴포넌트
│   ├── navigation/     # 내비게이션 설정
│   ├── services/       # API 및 외부 서비스
│   ├── utils/          # 유틸리티 함수
│   └── constants/      # 상수 (맛 카테고리 등)
├── assets/            # 이미지, 폰트 등
└── README.md
```

## 🎨 디자인 원칙

1. **단순함**: 초보자도 쉽게 사용
2. **재미**: 게임같은 요소 추가
3. **격려**: 긍정적인 피드백 중심
4. **성장**: 발전 과정이 보이도록

## 🤝 기여 방법

1. 이슈 확인 또는 생성
2. 피처 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 👥 팀

- **프로젝트 오너**: [당신의 이름]
- **디자인**: TBD
- **개발**: TBD

## 📞 문의

- 이메일: your.email@example.com
- 이슈 트래커: [GitHub Issues](https://github.com/yourusername/coffee-tasting-journal/issues)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

---

**"커피 한 잔에 담긴 수많은 맛을 발견하는 즐거움을 모든 커피 러버들과 나누고 싶습니다"** ☕✨