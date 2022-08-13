import { DictinaryWord } from "./wordsData.js";

const tilesLeft = document.querySelector(".tiles_left-para");
const TimerDiv = document.querySelector(".timer-holder");
const DisplayWritenWord = document.querySelector(".display-word");
const DisplayMainDiv = document.querySelector(".word-box");
const ScoreBtn = document.querySelector(".score-btn");
const TotalScore = document.querySelector(".total_score_para");
const DeleteBtn = document.querySelector(".delete-div");
const SubmitBtn = document.querySelector(".submit-div");
const mainContainer = document.querySelector(".main-game-box");

var UpperDictinaryWord = DictinaryWord.map((element)=>{
	return element.toUpperCase();
})


let total = 0;
let word="";
let submit_words = [];
SubmitBtn.addEventListener("click",(e)=> {
	e.preventDefault();
	submit_words.push(DisplayWritenWord.textContent);
	total+= 3
	TotalScore.textContent = total;
	console.log(submit_words);
	DisplayWritenWord.textContent = "";
	word = "";
	DeleteBtn.style.visibility="hidden";
	SubmitBtn.style.visibility = "hidden";
})

// Tiles count
let total_tiles = 20;
tilesLeft.textContent = `${total_tiles}`+ " "+"Tiles Left";

TotalScore.textContent = total;

const CheckWord = (e)=> {
	let element = e.target.childNodes[0];
	let num = e.target.childNodes[1].innerText;
	total += +num;
	if(e.target.id === "alph"){
		word += element.data; 
		TotalScore.textContent = total;
		e.target.style.visibility = "hidden";
		total_tiles -=1;
		tilesLeft.textContent = `${total_tiles}`+ " "+"Tiles Left";
	}
	DisplayWritenWord.textContent = word;
	if(UpperDictinaryWord.includes(word.toUpperCase())){
		DeleteBtn.style.visibility="visible";
		SubmitBtn.style.visibility = "visible";
	}
	else{
		DeleteBtn.style.visibility="hidden";
		SubmitBtn.style.visibility = "hidden";
	}
};

mainContainer.addEventListener("click",CheckWord);


function TimerStart(){
	 let time = 19;
	const timerId = setInterval(()=>{
		TimerDiv.textContent = time; 
		time -= 1;
		if(time===-1){
			mainContainer.removeEventListener("click",CheckWord);
			sessionStorage.setItem("words",JSON.stringify(submit_words))
			sessionStorage.setItem("score",JSON.stringify(total))
			window.location.href = "score.html"
			return clearInterval(timerId);
		}
	},1200)

}
TimerStart();



