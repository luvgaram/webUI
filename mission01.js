window.addEventListener('load', function() {
    showMoreBooks();
    setGenreMenuStyle();
    toggleGenreMenu();
    changeGenre();
    swipeBooks();
}, false);

function swipeBooks() {
    var eContents = document.querySelectorAll('.contents');
    var startX, startY, endX, endY, direction;

    eContents[0].addEventListener("touchstart", function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, false);
    eContents[0].addEventListener("touchmove", function(e) {
		endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        direction = endX - startX;
        if (direction < -10) {
			e.preventDefault();
		}
    }, false);
    eContents[0].addEventListener("touchend", function(e) {
        var eBookLeft = this.getElementsByClassName("books_left");
        var eBookCenter = this.getElementsByClassName("books_center");
        var eBookRight = this.getElementsByClassName("books_right");

        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        direction = endX - startX;
        if (direction > 60) {
			moveLeft(e);
        }
        if (direction < -60) {
			moveRight(e);
        }
		
		function moveLeft(e) {
			if (eBookLeft[0].style.display === "block") {
				return;
			}
			if (eBookCenter[0].style.display === "none") {
				eBookRight[0].style.display = "none";
				eBookLeft[0].style.display = "none";
				eBookCenter[0].style.display = "block";
				return;
			}
            eBookCenter[0].style.display = "none";
            eBookRight[0].style.display = "none";
            eBookLeft[0].style.display = "block";
		}
		
		function moveRight(e) {
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

function showMoreBooks() {
    var eContents = document.querySelectorAll('.contents');
    var i;
    for (i = 0; i < eContents.length; i++){
        eContents[i].addEventListener("click", function(e) {
            if (e.target.nodeName == "INPUT") {
                var sBooks = _changeBooks();
                var eBooksList = this.getElementsByClassName("books");
                eBooksList[0].insertAdjacentHTML('beforeend', sBooks);
            }
        }, false);
    }
}

function setGenreMenuStyle() {
    var eGenreMenu = document.getElementById('genre_menu');
    eGenreMenu.style.display = "none";
}

function toggleGenreMenu(){
    var eGenreMenu = document.getElementById('genre_menu');
    document.addEventListener("click", function(e) {
        if (eGenreMenu.style.display === "none" && e.target.className === "genre") {
            eGenreMenu.style.display = "block";
            return;
        }
        eGenreMenu.style.display = "none";
    }, false);
}

function changeGenre() {
    var eGenreMenu = document.getElementById('genre_menu');

    function addEventHandler(liLists) {
        eGenreMenu.addEventListener("click", function(e) {
            if (e.target.nodeName === 'LI') {                
                var	eBooksList = document.getElementsByClassName("books");
                var sBooks = _changeBooks();
                var eBooksListLength = eBooksList.length;
                var i;
                for (i = 0; i < eBooksListLength; i++) {
                    eBooksList[i].innerHTML = sBooks;
                }
            }    
        }, false);
    }
    addEventHandler(eGenreMenu);
}

function _changeBooks() {
    var aBookList = [
        {
            id : "book-01",
            name: "게으름뱅이 탈출학교",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/LF9UMl9DALsC?fife=w170-rw",
            src : "https://play.google.com/store/books/details/%EC%B5%9C%EC%A0%95_30%EC%9D%BC_%EC%95%88%EC%97%90_%EB%82%B4_%EC%82%AC%EB%9E%8C_%EB%A7%8C%EB%93%A4%EA%B8%B0?id=LF9UMl9DALsC",
            author : "최정",
            price : "₩6,000"
        }, {
            id : "book-02",
            name: "감정코칭",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/tpB99PN2arAC?fife=w300-rw",
            src : "https://play.google.com/store/books/details/존_가트맨_외_존_가트맨_최성애_박사의_내_아이를_위한_감정_코칭?id=tpB99PN2arAC",
            author : "존 가트맨",
            price : "₩11,000"
        },{
            id : "book-03",
            name: "당신이 아직 혼자인",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/43T4UOCN8eQC?fife=w300-rw",
            src : "https://play.google.com/store/books/details/%EC%B5%9C%EC%A0%95_%EB%8B%B9%EC%8B%A0%EC%9D%B4_%EC%95%84%EC%A7%81_%ED%98%BC%EC%9E%90%EC%9D%B8_%EC%A7%84%EC%A7%9C_%EC%9D%B4%EC%9C%A0?id=43T4UOCN8eQC",
            author : "최정",
            price : "₩6,500"
        },{
            id : "book-04",
            name: "시험불안 탈출",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/0NsZBAAAQBAJ?fife=w300-rw",
            src : "https://play.google.com/store/books/details/%EB%85%B8%EC%A7%80%EC%98%81_%EC%8B%9C%ED%97%98%EB%B6%88%EC%95%88_%ED%83%88%EC%B6%9C%ED%95%99%EA%B5%90?id=0NsZBAAAQBAJ",
            author : "노지영",
            price : "₩6,000"
        },{
            id : "book-05",
            name: "천국같은 일주일",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/KusUBAAAQBAJ?fife=w300-rw",
            src : "https://play.google.com/store/books/details/%EC%9D%B4%EC%A4%80%ED%98%B8_%EC%B2%9C%EA%B5%AD_%EA%B0%99%EC%9D%80_%EC%9D%BC%EC%A3%BC%EC%9D%BC%EC%9D%84_%EC%9C%84%ED%95%9C_%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98_%EC%84%B8%EB%B9%84%EC%95%BC_%EA%B7%B8%EB%9D%BC%EB%82%98%EB%8B%A4?id=KusUBAAAQBAJ",
            author : "이준호",
            price : "₩4,500"
        }, { 
            id : "book-06",
            name: "게으름뱅이 탈출학교",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/LF9UMl9DALsC?fife=w170-rw",
            src : "https://play.google.com/store/books/details/%EC%B5%9C%EC%A0%95_30%EC%9D%BC_%EC%95%88%EC%97%90_%EB%82%B4_%EC%82%AC%EB%9E%8C_%EB%A7%8C%EB%93%A4%EA%B8%B0?id=LF9UMl9DALsC",
            author : "최정",
            price : "₩6,000"
        }, {
            id : "book-07",
            name: "감정코칭",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/tpB99PN2arAC?fife=w300-rw",
            src : "https://play.google.com/store/books/details/존_가트맨_외_존_가트맨_최성애_박사의_내_아이를_위한_감정_코칭?id=tpB99PN2arAC",
            author : "존 가트맨",
            price : "₩11,000"
        },{
            id : "book-08",
            name: "당신이 아직 혼자인",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/43T4UOCN8eQC?fife=w300-rw",
            src : "https://play.google.com/store/books/details/%EC%B5%9C%EC%A0%95_%EB%8B%B9%EC%8B%A0%EC%9D%B4_%EC%95%84%EC%A7%81_%ED%98%BC%EC%9E%90%EC%9D%B8_%EC%A7%84%EC%A7%9C_%EC%9D%B4%EC%9C%A0?id=43T4UOCN8eQC",
            author : "최정",
            price : "₩6,500"
        },{
            id : "book-09",
            name: "시험불안 탈출",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/0NsZBAAAQBAJ?fife=w300-rw",
            src : "https://play.google.com/store/books/details/%EB%85%B8%EC%A7%80%EC%98%81_%EC%8B%9C%ED%97%98%EB%B6%88%EC%95%88_%ED%83%88%EC%B6%9C%ED%95%99%EA%B5%90?id=0NsZBAAAQBAJ",
            author : "노지영",
            price : "₩6,000"
        },{
            id : "book-10",
            name: "천국같은 일주일",
            imgSrc : "https://encrypted.google.com/books/images/frontcover/KusUBAAAQBAJ?fife=w300-rw",
            src : "https://play.google.com/store/books/details/%EC%9D%B4%EC%A4%80%ED%98%B8_%EC%B2%9C%EA%B5%AD_%EA%B0%99%EC%9D%80_%EC%9D%BC%EC%A3%BC%EC%9D%BC%EC%9D%84_%EC%9C%84%ED%95%9C_%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98_%EC%84%B8%EB%B9%84%EC%95%BC_%EA%B7%B8%EB%9D%BC%EB%82%98%EB%8B%A4?id=KusUBAAAQBAJ",
            author : "이준호",
            price : "₩4,500"
        },
    ];
        var sTemplate = "<li class ='book'><div class = 'bookImage'><img src = '<%=imgUrl%>'><div class = 'bookLink'><a href = '<%=endPageLink%>'></a></div></div><p class = 'title'><a href = '<%=endPageLink%>'><%=title%></a></p><p class = 'author'><a href = '<%=endPageLink%>'><%=author%></a></p><p class = 'price'><a href = '<%=endPageLink%>'><%=price%></a></p></li>";

        return _makeBookElement();

        function _makeBookElement() {
        var pattern = {
        title : '<%=title%>',
        link : '<%=endPageLink%>',
        img : '<%=imgUrl%>',
        author : '<%=author%>',
        price : '<%=price%>'
        };
        var result = [];

        aBookList.forEach(function(item){
        result.push(
            replaceAll(sTemplate, pattern.link, item.src).replace(pattern.title, item.name).replace(pattern.img, item.imgSrc).replace(pattern.author, item.author).replace(pattern.price, item.price)
            );
        });
            var final = result.join('');
            return final;
        }

}

function replaceAll(sValue, param1, param2) {
    return sValue.split(param1).join(param2);
}