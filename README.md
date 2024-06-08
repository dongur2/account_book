## 💰 가계부 스켈레톤 프로젝트 

(임시)

### 🔖 Git 가이드 (참고)

1. 레포지토리 `fork`

2. `git clone`
   ````
    git clone {본인 Repo 주소}
   ````

3. 로컬 환경에서 <u>**기능 이름**</u>으로 브랜치 생성 후 작업
   ````
   git checkout -b {feature_name} // 로컬 브랜치 생성 후 생성한 브랜치로 이동

   예: 
   git checkout -b calendar
   ````

4. 작업 완료 후 `push`
 - 커밋메세지 관련 참고: https://jane-aeiou.tistory.com/93
    ````
    * 커밋메세지 구조

    '타입: 제목
    
     본문(생략 가능)'
    ````

    <br/>

   ````
   git add . // 모든 작업 내용 스테이징
   git commit -m '{commit_message}' // 커밋 메세지 작성 
   git push origin {지금까지 작업한 브랜치 이름} // 원격 저장소에 작업 내용 push

   예: 
   git add .
   git commit -m 'Feat: 캘린더 각 날짜별 수입/지출 금액 표시 기능 추가'
   git push origin calendar
   ````

5. `push` 후 웹페이지에서 <u>**Pull Request**</u> 작성
    - 원본 `repo:dev`으로 PR 
    - 템플릿 맞춰서 작성: 주요 작업 사항 입력

6. `PR Merge` 후 원본 Repo의 새로운 커밋들을 본인 로컬 Repo로 `pull`
- 참고: https://coding-groot.tistory.com/80
   
    6-1. 원본 Repo 주소 원격 등록 (처음 한 번만 수행)
    ````
    git remote add upstream https://github.com/dongur2/account_book.git
    ````

    6-2. 본인 로컬 Repo로 `pull`
    ````
    git pull upstream dev
    ````

    6-3. 본인 원격 Repo로 `push`
    ````
    git push origin {branch_name}
    ````