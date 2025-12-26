# Docker로 실행하기

## 필수 요구사항
- Docker Desktop 설치 (https://www.docker.com/products/docker-desktop)
- Docker Compose 설치 (Docker Desktop에 포함되어 있음)

## 실행 방법

### 1. 프로덕션 모드로 실행

```bash
# 컨테이너 빌드 및 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f app

# 중지
docker-compose down

# 중지 및 데이터 삭제
docker-compose down -v
```

### 2. 개발 모드로 실행 (핫 리로드 지원)

```bash
# 개발 모드로 실행 (코드 변경 시 자동 반영)
docker-compose --profile dev up -d app-dev

# 로그 확인
docker-compose logs -f app-dev

# 중지
docker-compose --profile dev down
```

## 접속 주소

- **웹사이트**: http://localhost:3000
- **관리자**: http://localhost:3000/admin
- **MongoDB**: localhost:27017

## MongoDB 접속 정보

- **호스트**: localhost
- **포트**: 27017
- **사용자명**: admin
- **비밀번호**: sangrich123
- **데이터베이스**: sangrich

## MongoDB 직접 접속

```bash
# MongoDB 컨테이너에 접속
docker exec -it sangrich-mongodb mongosh

# 인증
use admin
db.auth("admin", "sangrich123")

# 데이터베이스 선택
use sangrich

# 컬렉션 확인
show collections

# 데이터 조회 예시
db.posts.find()
```

## 유용한 명령어

```bash
# 실행 중인 컨테이너 확인
docker-compose ps

# 컨테이너 재시작
docker-compose restart

# 특정 서비스만 재시작
docker-compose restart app

# 컨테이너 로그 확인
docker-compose logs -f

# MongoDB만 로그 확인
docker-compose logs -f mongodb

# 이미지 다시 빌드
docker-compose build --no-cache

# 모든 컨테이너 중지 및 삭제
docker-compose down

# 볼륨까지 함께 삭제 (데이터 초기화)
docker-compose down -v
```

## 환경변수 설정

`.env` 파일을 생성하여 환경변수를 설정할 수 있습니다:

```bash
cp .env.example .env
```

그리고 `.env` 파일을 수정하여 원하는 값으로 변경하세요.

## 문제 해결

### 포트 충돌 오류
이미 3000 포트를 사용 중인 경우:
```bash
# docker-compose.yml에서 포트 변경
ports:
  - "3001:3000"  # 3001 포트로 변경

# 또는 .env 파일에서 포트 변경
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### MongoDB 연결 오류
```bash
# MongoDB 컨테이너 상태 확인
docker-compose ps mongodb

# MongoDB 로그 확인
docker-compose logs mongodb

# MongoDB 재시작
docker-compose restart mongodb
```

### 빌드 오류
```bash
# 캐시 없이 다시 빌드
docker-compose build --no-cache

# 모든 컨테이너와 볼륨 삭제 후 재시작
docker-compose down -v
docker-compose up -d --build
```

## 데이터 백업

```bash
# MongoDB 데이터 백업
docker exec sangrich-mongodb mongodump --username admin --password sangrich123 --authenticationDatabase admin --db sangrich --out /backup

# 백업 파일 복사
docker cp sangrich-mongodb:/backup ./mongodb-backup
```

## 데이터 복원

```bash
# 백업 파일을 컨테이너에 복사
docker cp ./mongodb-backup sangrich-mongodb:/restore

# MongoDB 데이터 복원
docker exec sangrich-mongodb mongorestore --username admin --password sangrich123 --authenticationDatabase admin --db sangrich /restore/sangrich
```
