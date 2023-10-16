let loop;
// ESP32로 동작을 보내는 함수
function sendActionToESP32(action, buttonName) {
    console.log(action, "action");
    console.log(buttonName, "buttonName");
    // 여기에 ESP32로 동작을 보내는 코드를 작성합니다.
    // buttonName을 활용하여 각 버튼에 대한 동작을 구분할 수 있습니다.
    // 예를 들어 AJAX 요청을 사용하여 서버로 동작을 전송하거나 WebSocket을 통해 통신할 수 있습니다.
    // 자세한 구현 방법은 ESP32 측에서 사용하는 통신 프로토콜과 라이브러리에 따라 다를 수 있습니다.
    // 해당 동작을 수행하는 API 또는 함수를 호출하면 됩니다.

    if (action === "Pressed") {
        console.log(1111);
    }
    if (action === "Pressed" && buttonName === "active") {
        value = 5
        console.log(value, "sent");
        // loop = setInterval(() => {
        var esp32Address = "172.20.10.11";

        var url = "http://" + esp32Address + "/?param1=" + value;

        // HTTP GET 요청을 보냅니다.
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 요청이 성공적으로 완료되었을 때 실행할 코드를 작성합니다.
                console.log("Data sent successfully");
            }
        };
        xhr.send();

        // }, 4000)
        console.log(value);
    } else {
        // clearInterval(loop);

        if (action == 'RELEASED') {
            // 정지 상태 0
            value = 0;
            console.log(value, 'sent');
        } else {
            if (buttonName == 'up') {
                // forward 1
                value = 1;
                console.log(value, 'sent');
            }
            else if (buttonName == 'down') {
                // back 2
                value = 2;
                console.log(value, 'sent');
            }
            else if (buttonName == 'left') {
                // left 3
                value = 3;
                console.log(value, 'sent');
            }
            else if (buttonName == 'right') {
                // right 4
                value = 4;
                console.log(value, 'sent');
            }

        }

        var esp32Address = "172.20.10.11";

        var url = "http://" + esp32Address + "/?param1=" + value;

        // HTTP GET 요청을 보냅니다.
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 요청이 성공적으로 완료되었을 때 실행할 코드를 작성합니다.
                console.log("Data sent successfully");
            }
        };
        xhr.send();

        console.log('Sending action to ESP32 - Button', buttonName, ':', action);
    }
}


// 버튼을 누르는 동작 감지 핸들러 생성
function createButtonPressHandler(buttonName) {
    return function () {
        // 여기에 ESP32로 보낼 특정 동작을 구현합니다.
        console.log(buttonName + "createButtonPressedHandler")
        sendActionToESP32('PRESSED', buttonName);
    }
}

// 버튼을 떼는 동작 감지 핸들러 생성
function createButtonReleaseHandler(buttonName) {
    return function () {
        // 정지 0
        // 여기에 ESP32로 보낼 다른 동작을 구현합니다.
        console.log(buttonName + "createButtonReleasedHandler")
        sendActionToESP32('RELEASED', buttonName);
    }
}

const container = document.querySelector('.container');
const image = document.getElementById('buttonImg');

createButtonReleaseHandler(null);
image.addEventListener('click', function () {
    container.classList.toggle('active');
    image.classList.toggle('active');

    if (container.classList.contains('active')) {
        container.style.transitionDuration = '0.3s';
        //document.getElementById("resumeImg").style.display = 'block';
        image.src = 'onoff.svg'; // 다른 이미지로 변경

        document.getElementById("upImg").style.display = 'none';
        document.getElementById("leftImg").style.display = 'none';
        document.getElementById("rightImg").style.display = 'none';
        document.getElementById("downImg").style.display = 'none';

        console.log('ACTIVE');



        // 자율주행 5
        // active 상태가 되고 

        sendActionToESP32("Pressed", "active");
    } else {
        container.style.transitionDuration = '0.3s';
        //document.getElementById("resumeImg").style.display = 'none';
        image.src = 'button.svg'; // 원래 이미지로 변경

        document.getElementById("upImg").style.display = 'block';
        document.getElementById("leftImg").style.display = 'block';
        document.getElementById("rightImg").style.display = 'block';
        document.getElementById("downImg").style.display = 'block';

        console.log('NON ACTIVE');
        sendActionToESP32('RELEASED', direction);

        var upButton = document.getElementById('upImg');
        var leftButton = document.getElementById('leftImg');
        var rightButton = document.getElementById('rightImg');
        var downButton = document.getElementById('downImg');

        // 방향 키 입력을 처리하기 위한 변수
        var direction = null;
        var isKeyPressed = false;

        // 각 버튼에 대한 이벤트 리스너 등록
        upButton.addEventListener('mousedown', createButtonPressHandler('up'));
        upButton.addEventListener('mouseup', createButtonReleaseHandler('up'));

        leftButton.addEventListener('mousedown', createButtonPressHandler('left'));
        leftButton.addEventListener('mouseup', createButtonReleaseHandler('left'));

        rightButton.addEventListener('mousedown', createButtonPressHandler('right'));
        rightButton.addEventListener('mouseup', createButtonReleaseHandler('right'));

        downButton.addEventListener('mousedown', createButtonPressHandler('down'));
        downButton.addEventListener('mouseup', createButtonReleaseHandler('down'));

        // 방향 키를 누를 때 이벤트 처리
        document.addEventListener("keydown", function (event) {
            if (!isKeyPressed) {
                // 방향 키 코드를 확인하여 원하는 동작에 따라 처리합니다.
                if (event.code === "ArrowUp") {
                    // 위쪽 방향키를 눌렀을 때 실행할 코드
                    direction = "up";
                    isKeyPressed = true;
                } else if (event.code === "ArrowDown") {
                    // 아래쪽 방향키를 눌렀을 때 실행할 코드
                    direction = "down";
                    isKeyPressed = true;
                } else if (event.code === "ArrowLeft") {
                    // 왼쪽 방향키를 눌렀을 때 실행할 코드
                    direction = "left";
                    isKeyPressed = true;
                } else if (event.code === "ArrowRight") {
                    // 오른쪽 방향키를 눌렀을 때 실행할 코드
                    direction = "right";
                    isKeyPressed = true;
                }
                checkDirection(direction);
            }
            // 방향 키를 누르고 있을 때 브라우저의 스크롤 이동을 방지합니다.
            //event.preventDefault();
        });

        // 방향 키를 뗄 때 이벤트 처리
        document.addEventListener("keyup", function (event) {
            // 눌렀던 방향 키를 뗄 때 실행할 코드
            direction = null;
            isKeyPressed = false;
            // createButtonReleaseHandler(direction);
            sendActionToESP32('RELEASED', direction);
        });



        // 주기적으로 현재 방향 값을 확인하고 처리하는 함수
        function checkDirection(direction) {
            if (direction === "up") {
                // 위쪽 방향으로 이동하는 동작 처리
                console.log("Up Pressed");
                // createButtonPressHandler(direction);
                sendActionToESP32('PRESSED', direction);
            } else if (direction === "down") {
                // 아래쪽 방향으로 이동하는 동작 처리
                console.log("Down Pressed");
                // createButtonPressHandler(direction);
                sendActionToESP32('PRESSED', direction);
            } else if (direction === "left") {
                // 왼쪽 방향으로 이동하는 동작 처리
                console.log("Left Pressed");
                // createButtonPressHandler(direction);
                sendActionToESP32('PRESSED', direction);
            } else if (direction === "right") {
                // 오른쪽 방향으로 이동하는 동작 처리
                console.log("Right Pressed");
                // createButtonPressHandler(direction);
                sendActionToESP32('PRESSED', direction);
            }

            // 주기적으로 실행하려는 경우에는 requestAnimationFrame을 사용하여 함수를 호출합니다.
            // 예를 들어, 60FPS로 실행하려면 다음과 같이 사용할 수 있습니다:
            // requestAnimationFrame(checkDirection);
        }
    }
});