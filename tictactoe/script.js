const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
selectPvpBtn = selectBox.querySelector(".pvp"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

window.onload = ()=>{
	for (let i = 0; i < allBox.length; i++) {
		allBox[i].setAttribute("onclick", "clickedBox(this)");
	}

	selectXBtn.onclick = ()=>{
		selectBox.classList.add("hide");
		playBoard.classList.add("show");
	}
	selectOBtn.onclick = ()=>{
		selectBox.classList.add("hide");
		playBoard.classList.add("show");
		players.setAttribute("class", "players active player");
	}
	selectPvpBtn.onclick = ()=>{
		runBot = false;
		selectBox.classList.add("hide");
		playBoard.classList.add("show");
	}
}

function clickedBox(element){
	if(players.classList.contains("player")){
		playerSign = "O";
		element.innerHTML = `<i class="${playerOIcon}"></i>`;
		players.classList.remove("active");
	}else{
		playerSign = "X";
		element.innerHTML = `<i class="${playerXIcon}"></i>`;
		players.classList.add("active");
	}
	element.setAttribute("id", playerSign);
	selectWinner();
	element.style.pointerEvents = "none";

	if(runBot){
		playBoard.style.pointerEvents = "none";
		let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
		setTimeout(()=>{
			bot();
		}, randomDelayTime);
	}else{
		switchPlayer();
	}
}

function switchPlayer(){
	if(players.classList.contains("player")){
		players.classList.remove("player");
	}else{
		players.classList.add("player");
	}
}

function bot(){
	let array = [];
	for(let i = 0; i < allBox.length; i++){
		if(allBox[i].childElementCount == 0){
			array.push(i);
		}
	}
	let randomBox = array[Math.floor(Math.random() * array.length)];
	if(array.length > 0){
		if(players.classList.contains("player")){
			playerSign = "X";
			allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
			players.classList.add("active");
		}else{
			playerSign = "O";
			allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
			players.classList.remove("active");
		}
		allBox[randomBox].setAttribute("id", playerSign);
		selectWinner();
		allBox[randomBox].style.pointerEvents = "none";
		playBoard.style.pointerEvents = "auto";
	}
}

function getPlayerSign(idname) {
	return document.querySelector(".box" + idname).id;
}

function checkThreeSigns(val1, val2, val3, sign){
	if(getPlayerSign(val1) == sign && getPlayerSign(val2) == sign && getPlayerSign(val3) == sign){
		return true;
	}
	return false;
}

function selectWinner(){
	if(checkThreeSigns(1,2,3,playerSign) ||
		checkThreeSigns(4,5,6,playerSign) ||
		checkThreeSigns(7,8,9,playerSign) ||
		checkThreeSigns(1,5,9,playerSign) ||
		checkThreeSigns(3,5,7,playerSign) ||
		checkThreeSigns(1,4,7,playerSign) ||
		checkThreeSigns(2,5,8,playerSign) ||
		checkThreeSigns(3,6,9,playerSign) ){
		runBot = false;
		setTimeout(()=>{
			playBoard.classList.remove("show");
			resultBox.classList.add("show");
		}, 700);

		wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
	}else{
		let draw = true;
		for(let i = 0; i < allBox.length; i++){
			if(allBox[i].childElementCount == 0){
				draw = false;
			}
		}
		if(draw){
			runBot = false;
			setTimeout(()=>{
				playBoard.classList.remove("show");
				resultBox.classList.add("show");
			}, 700);

			wonText.textContent = "Match has been drawn!";
		}
	}
}

replayBtn.onclick = ()=>{
	window.location.reload();
}
