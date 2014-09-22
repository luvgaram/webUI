// onload 시 실행할 함수 목록
window.addEventListener('load', function() {
    getJson();
    showMoreBooks();
    setMenuStyle();
    toggleMenu();
    switchAppMenu();
    changeGenre();
    swipeBooks();
}, false);


// JSON 데이터를 가져와 aBookList(추가할 책)를 준비해둠
function getJson() {
    var url = "http://localhost:8000/response.json";
    var request = new XMLHttpRequest();

    request.open("GET" , url , true);
    request.send(null)
    request.onreadystatechange = function() {

        if(request.readyState === 4 && request.status === 200) {
			console.log("비동기식 통신 발생");
            result = request.responseText;
            result = JSON.parse(result);
            aBookList = result;
        }
    }
    setTimeout(function() {request.abort();console.log("event aborted!!")}, 200); // 10주 실습 2, 자꾸 abort해서 200으로 올려둠;;
}

// 모바일 touch 이벤트로 책 swipe
function swipeBooks() {
    var eContents = document.querySelectorAll('article');
    var startX, startY, endX, endY, directionX, directionY, startTime, moveTime;
    var maxTime = 200; // 터치 판정 시간 제한
    var touchDistance = 80; // 터치 판정 이동 거리

    eContents[0].addEventListener("touchstart", function(e) {
		if (ancestor(e.touches[0].target, 'contents')) { // ancestor가 .contents와 일치하면 노드 반환하는 함수
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			startTime = new Date().getTime(); // 터치 시작 시간 기록
		}
    }, false);
    eContents[0].addEventListener("touchmove", function(e) {
		if (ancestor(e.touches[0].target, 'contents')) {
			endX = e.changedTouches[0].clientX;
			endY = e.changedTouches[0].clientY;
			direction = endX - startX;
			if (direction < -10) {
				e.preventDefault();
			}
		}
    }, false);
    eContents[0].addEventListener("touchend", function(e) {
		var eContents = ancestor(e.target, 'contents');
		var eBookLeft = eContents.getElementsByClassName("books_left");
		var eBookCenter = eContents.getElementsByClassName("books_center");
		var eBookRight = eContents.getElementsByClassName("books_right");
		
		endX = e.changedTouches[0].clientX;
		endY = e.changedTouches[0].clientY;
		moveTime = new Date().getTime() - startTime; // 터치 끝 시간에서 시작 시간 빼서 움직인 시간 기록
		directionX = endX - startX;
		directionY = endY - startY;
		if (moveTime < maxTime  && Math.abs(directionY) < touchDistance) {
			checkTouch(directionX, directionY);
		} // 제한 시간 안에 움직였고 상하로 움직이지 않았다면 스와이프 방향 체크 함수 실행

		function checkTouch(directionX, directionY) {
			if (direction > touchDistance) {
				showRight(e); // 터치 길이 판정보다 크게 좌측으로 움직였으면 오른쪽 보이게 함
			}
			if (direction < -touchDistance) {
				showLeft(e);
			}
		}

		function showRight(e) { // 오른쪽 div를 보이게
			if (eBookLeft[0].style.display === "block") {
				return; // 현재가 좌측 div라면 움직이지 않음
			}
			if (eBookCenter[0].style.display === "none") {
				eBookRight[0].style.display = "none";
				eBookLeft[0].style.display = "none";
				eBookCenter[0].style.display = "block";
				return; // 가운데 div 보이게 함
			}
			eBookCenter[0].style.display = "none";
			eBookRight[0].style.display = "none";
			eBookLeft[0].style.display = "block";
			// 우측 div 보이게 함
		}

		function showLeft(e) { // 왼쪽 div를 보이게
			if (eBookRight[0].style.display === "block") {
				return;
			}
			if (eBookCenter[0].style.display === "none") {
				eBookLeft[0].style.display = "none";
				eBookRight[0].style.display = "none"
				eBookCenter[0].style.display = "block";
				return;
			}
			eBookCenter[0].style.display = "none";
			eBookLeft[0].style.display = "none";
			eBookRight[0].style.display = "block"; 
		}

    }, false);
}

function showMoreBooks() { // 더보기를 누르면 책들을 append, 이벤트 델리게이션)
    var eContents = document.getElementsByTagName("ARTICLE");
    eContents[0].addEventListener("click", function(e) {
        if (e.target.nodeName == "INPUT") {
            var sBooks = changeBooks();
            var eBooksList = e.target.parentNode.parentNode.getElementsByClassName("books");
            eBooksList[0].insertAdjacentHTML('beforeend', sBooks);
        }
    }, false);
}

function setMenuStyle() { // 장르와 앱의 드롭다운 메뉴 디스플레이를 none으로 설정
    var eGenreMenu = document.getElementById('genre_menu');
    var eAppMenu = document.getElementById('appMenu'); 
    eGenreMenu.style.display = "none";
    eAppMenu.style.display = "none";
	
    var i;
    for (i=0; i<9; i++) {
        eAppMenu.childNodes[i*2+1].style.left = (i % 3)*80 + "px";
        eAppMenu.childNodes[i*2+1].style.top = (Math.floor(i / 3))*80 + "px";
    }
}

function toggleMenu() { // 장르와 앱 드롭다운 메뉴를 보이거나 안보이게 함
    var eGenreMenu = document.getElementById('genre_menu');
    var eAppMenu = document.getElementById('appMenu');
    document.addEventListener("click", function(e) {
        if (eGenreMenu.style.display === "none" && e.target.className === "genre") {
            eGenreMenu.style.display = "block";
            return; // 장르 버튼을 눌렀다면 장르 드롭다운 메뉴 보임
        }
        if (eAppMenu.style.display === "none" && e.target.parentNode.className === "menu") {
            eAppMenu.style.display = "block";
            return; // 앱 버튼을 눌렀다면 앱 드롭다운 메뉴 보임
        }
		if (e.target.className === "appMenuItem" || e.target.parentNode.className === "appMenuItem" || e.target.parentNode.parentNode.className === "appMenuItem" ) {
            eAppMenu.style.display = "block"; // 앱 드롭다운 메뉴 내의 항목들을 클릭했으면 보이는 상태 유지
            return; 
        }
        eGenreMenu.style.display = "none";
        eAppMenu.style.display = "none";
    }, false);
}

function switchAppMenu(){
	var divZIndex = 1000; // 기본 z-index
	var isDraggable = false; //  드래그 가능한지 체크하는 변수
	var currentTarget, validTarget, validTargetLeft, validTargetTop, startX, startY, startPositionX, startPositionY, currentOrder, newOrder, leftPosition, topPosition;
	var eAppMenu = document.getElementById('appMenu');

	eAppMenu.addEventListener("mousedown", downMouse, false); // 마우스 다운 이벤트 (무브는 다운 안에)
	document.addEventListener("mouseup", upMouse, false); // 마우스 업 이벤트


	function downMouse(e){
		currentTarget;

		if (typeof e.target != "undefined") { // 타겟이 있으면 e.target을 currentTarget으로
			currentTarget = e.target;
		}

		if (currentTarget.className != "appMenuItem"){ // 자식노드가 잡혔으면 부모 노드를 currentTarget으로
			currentTarget = currentTarget.parentNode;
		}

		if (currentTarget.className == "appMenuItem"){ //currentTarget이 draggableDiv이면 
			isDraggable = true; // 드래그 체크 변수 참
			startX = e.clientX; // 시작 지점 저장
			startY = e.clientY;
			startPositionX = e.layerX; // 레이어 중 어느 위치 잡았는지
			startPositionY = e.layerY;

			validTarget = currentTarget;
			validTargetLeft = parseInt(currentTarget.style.left+0); //드래깅 전 left, top
			validTargetTop = parseInt(currentTarget.style.top+0);
			validTarget.style.zIndex = divZIndex++; // 드래깅 대상의 z-index 높임
			validTarget.style.backgroundColor = "#ccc"; //드래깅 대상 배경색 지정

			currentOrder = checkOrder(validTargetLeft, validTargetTop);					
			document.onmousemove = moveMouse;  //move 마우스 이벤트 걺
		 }
	}

	function upMouse(){
		isDraggable = false; // 드래그 체크 변수 거짓
		document.onmousemove = null; // move 마우스 이벤트 끔
		if (typeof currentTarget != "undefined" && currentTarget.className == "appMenuItem"){
			setItemLocation();
		}
	}

	function moveMouse(e){
		if (isDraggable){
			leftPosition = validTargetLeft + e.clientX - startX;
			topPosition = validTargetTop + e.clientY - startY;

			// 밖으로 못도망가게 해야함 ㅠㅠ
			validTarget.style.left = leftPosition + "px";
			validTarget.style.top  = topPosition + "px";

			return false;
		}
	}

	function setItemLocation() { // 정위치에 놓음
		validTarget.style.backgroundColor = "#fff";
		newOrder = checkOrder(leftPosition, topPosition);
		
		validTarget.style.left = assignLeft(newOrder);
		validTarget.style.top = assignTop(newOrder);
		
		console.log(leftPosition, topPosition, newOrder);
		
		sortItem();
	}

	function sortItem() { // 소팅함
		var changedOrder = newOrder - currentOrder;
		var movingItems = document.querySelectorAll('.appMenuItem');
		if (changedOrder > 0) {
			var i;
			for( i = 0;  i  < changedOrder; i++) {
				movingItems[newOrder - i].style.left = assignLeft(newOrder - i  - 1);										  
				movingItems[newOrder - i].style.top = assignTop(newOrder - i  - 1);							
			}
		}
		if (changedOrder < 0) {
			var i;
			for( i = 0;  i  < Math.abs(changedOrder); i++) {
				movingItems[newOrder + i].style.left = assignLeft(newOrder + i + 1);										  
				movingItems[newOrder + i].style.top = assignTop(newOrder + i  + 1);							
			}
		}
	}

	function checkOrder(x, y) { // 위치를 순서값으로 변환
		var order = Math.floor(x/80) + (Math.floor(y/80))*3;
		return order;
	}

	function assignLeft(x) { // 요소의 left값 계산
		x = (Math.floor(x%3)*80)+"px";
		return x;
	}

	function assignTop(y) {
		y = (Math.floor(y/3)*80)+"px";
		return y;
	}
}


function changeGenre() { // 장르 드롭다운 메뉴 내 LI를 누르면 책 내용이 바뀜
    var eGenreMenu = document.getElementById('genre_menu');
    addEventHandler(eGenreMenu);

    function addEventHandler(liLists) { // 이벤트 델리게이션(UL에 걸고 LI에서 각각 처리), 로딩 효과
        eGenreMenu.addEventListener("click", function(e) {
            if (e.target.nodeName === 'LI') {
                var eLoading = document.getElementById("blur");
                var	eBooksList = document.getElementsByClassName("books");
                var sBooks = changeBooks();
                var eBooksListLength = eBooksList.length;
                var i;
                eLoading.style.display = "block";
                for (i = 0; i < eBooksListLength; i++) {
                    eBooksList[i].innerHTML = sBooks;
                }
                setTimeout(function() {
                    eLoading.style.display = "none";
                },200);
            }    
        }, false);
    }
}

function changeBooks() { // 템플릿 내용을 변경
    var sTemplate = document.getElementById('liTemplate').textContent;
    sTemplate = sTemplate.substring(14, sTemplate.length - 10);
    // html 안의 템플릿에서 가져옴
    return makeBookElement();

    function makeBookElement() { // pattern 내용을 JSON으로 가져온 데이터로 교체
        var pattern = {
            title : '<%=title%>',
            link : '<%=endPageLink%>',
            img : '<%=imgUrl%>',
            author : '<%=author%>',
            price : '<%=price%>'
        };
        var patternResult = [];

        aBookList.forEach(function(item){
            patternResult.push(
                replaceAll(sTemplate, pattern.link, item.src).replace(pattern.title, item.name).replace(pattern.img, item.imgSrc).replace(pattern.author, item.author).replace(pattern.price, item.price)
            );
        });
        var final = patternResult.join('');
        return final;
    }

    function replaceAll(sValue, param1, param2) {
        return sValue.split(param1).join(param2);
    }
}

function ancestor (node, match) {
	while(node.parentNode !== null && node.className !== match) {
		node = node.parentNode;
	}
	if (node.className === match){
		return node;
	}
	return null;
}