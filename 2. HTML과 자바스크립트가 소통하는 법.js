// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
// 만약에 유저가 번호를 맞추면, 맞췄습니다!
// 랜덤번호 < 유저가 고른 번호 => Down!!!
// 랜덤번호 > 유저가 고른 번호 => Up!!!
// Reset 버튼을 누르면 게임이 리셋
// 5번의 기회를 다 쓰면 게임이 끝난다(더 이상 추측 불가, 버튼 비활성화)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 차감하지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면 => 알려준다, 기회를 차감하지 않는다

let computerNum = 0;
let playButton = document.getElementById("play-button"); // HTML 태그 중 id가 play-buttion인 태그를 가져옴
let userInput = document.getElementById("user-input") // HTML 태그 중 id가 user-input인 태그를 가져옴
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5 // 유저가 플레이할 기회를 5번 부여
let gameOver = false
let chanceArea = document.getElementById("chance-area");
let history = [] // 유저가 입력한 히스토리 배열

playButton.addEventListener("click", play); // 클릭하면 play 함수 실행
resetButton.addEventListener("click", reset) // 클릭하면 reset 함수 실행
userInput.addEventListener("focus", function(){ // 익명함수
    userInput.value=""}) // 입력창으로 커서를 옮기면 기존에 입력한 값 지우기

// 컴퓨터가 1~100에서 랜덤번호 지정
function pickRandomNum() { // Math.floor => 수학에서의 버림 기능. 여기선 소수점 이하를 버림
    computerNum = Math.floor(Math.random()*100)+1; // Math.random() => 0~1 사이의 무작위 숫자 반환
    console.log("정답", computerNum);
}


// 유저가 숫자를 입력하고 Go 버튼을 클릭하여 게임 진행
function play() {
    let userValue = userInput.value; // 유저가 입력한 숫자를 나타냄

    if(userValue < 1 || userValue> 100) { // 유저가 1 미만 100 초과 값을 입력하면 실행
        resultArea.textContent="1과 100 사이의 숫자를 입력해 주세요" 
        return; // 기회를 차감하지 않고 종료
    }

    // 히스토리에 이미 userValue 값이 있으면 리턴
    if(history.includes(userValue)) { // 히스토리에 히스토리에 이미 있는 값을 입력하면
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요" // 실행
        return; // 남은 기회를 차감하지 않고 종료
    }

    chances -- ; // chances가 1씩 감소
    chanceArea.textContent = `남은 기회 : ${chances}번`
    console.log("chance", chances);

    if(userValue < computerNum) { // 입력한 숫자 < 랜덤숫자 => Up!!!
            resultArea.textContent = "Up!!!"
    }else if(userValue > computerNum) { // 입력한 숫자 > 랜덤숫자 => Down!!!
            resultArea.textContent = "Down!!!"
    } else { // 입력한 숫자가 랜덤숫자보다 크지도 작지도 않다 => 입력 숫자 = 랜덤 숫자
            resultArea.textContent = "맞췄습니다!!!";
            gameOver=true // 정답을 맞췄으므로 게임을 종료
    }

    // 입력한 값 히스토리 배열에 저장
    history.push(userValue)
    console.log(history);

    if(chances < 1) { // 5번을 다 해서 남은 기회가 1 미만 즉 0일 때
        gameOver = true // Go 버튼 비활성화
    }

    if(gameOver == true) {
        playButton.disabled = true // 게임이 종료되면서 Go 버튼 비활성화 
    }
}


// 리셋 설정. 리셋 버튼을 누르면 게임 리셋
function reset() {
    // user input 창이 깨끗하게 정리되고
    userInput.value = ""
    // 새로운 번호를 생성
    pickRandomNum()

    resultArea.textContent = "결과값이 여기 나옵니다!!!";
}

pickRandomNum();