/*set and updateImage function are used from lessonEvents.js*/
/*lesson*Data variable from lessonEvents.js is assigned to ownLesson in loadLesson*/
/*EXTRA FUNCTION START*/
function play(audio){
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}
/*EXTRA FUNCTION END*/
function resetThings(minute){
	start = false;
	loc = -1;
	wrongCount = 0;
	rightCount = 0;
	remSeconds = minute *30; // minutes passed is double so 60/2
	button2.textContent = 'Start Test';
	input1.value = '';
}
function readyLesson(data){
	let elem = document.getElementById('lessonArea');
	lesson = data;
	words = lesson.split(' ');
	tagWords = [...words];
	for(let i=0;i<words.length;i++){
		tagWords[i] = `<span id="id${i}" style="">` + words[i] + '</span>';
	}
	elem.innerHTML = tagWords.join(' ');
}
function loadLesson(minute) {
	if (lessonId != undefined) {
		resetThings(2);
		let ownLesson;
		switch(lessonId){
			case 3:
			ownLesson = lesson3Data;
			break;
			case 4:
			ownLesson = lesson4Data;
			break;
			case 5:
			ownLesson = lesson5Data;
			break;
			case 6:
			ownLesson = lesson6Data;
			break;
			case 7:
			ownLesson = lesson7Data;
			break;
			case 8:
			ownLesson = lesson8Data;
			break;
			case 9:
			ownLesson = lesson9Data;
			break;
			case 10:
			ownLesson = lesson10Data;
			break;
			case 11:
			ownLesson = lesson11Data;
			break;
			case 12:
			ownLesson = lesson12Data;
			break;
			case 13:
			ownLesson = lesson13Data;
			break;
			case 14:
			ownLesson = lesson14Data;
			break;
			case 15:
			ownLesson = lesson15Data;
			break;
			case 16:
			ownLesson = lesson16Data;
			break;
			case 17:
			ownLesson = lesson17Data;
			break;
			case 18:
			ownLesson = lesson18Data;
			break;
			case 19:
			ownLesson = lesson19Data;
			break;
			case 20:
			ownLesson = lesson20Data;
			break;
			case 21:
			ownLesson = lesson21Data;
			break;
			case 22:
			ownLesson = lesson22Data;
			break;
			case 23:
			ownLesson = lesson23Data;
			break;
			case 24:
			ownLesson = lesson24Data;
			break;
			default:
			break;
		}
		ownLesson = ownLesson.replaceAll('\n',' ');
		readyLesson(ownLesson);
	}
	else{
	//data fetching
	let postNum = Math.floor((Math.random() * 99) + 1);
	fetch(`https://jsonplaceholder.typicode.com/posts/${postNum}`)
	.then(res => res.json())
	.then(data => {
		resetThings(minute);
		//new lesson
		data = data['body'].replaceAll('\n',' ');
		data = data.repeat(minute);
		readyLesson(data);
	});
	}
}
function counter(){
	if (start) {
		if (remSeconds<=1 || loc == words.length-1) {
			start = false;
			let accuracy = Math.floor((rightCount * 100)/(rightCount + wrongCount));
			let speed = (rightCount+wrongCount)/Number.parseInt(tag1.value);
			//invoke Bootstrap model here...
			if (loc == words.length-1) {
				speed = (rightCount+wrongCount)/((60- remSeconds) / 60);
			}
			/*Check if required spped true to complete lesson*/
			if (lessonId != undefined && speed > 30 && accuracy > 80) {
				set('lessonId'+lessonId);
				updateImage('lessonId'+lessonId);
			}
			let modalBody = document.getElementsByClassName('modal-body')[0];
			modalBody.innerHTML = `
			Speed - ${Number.parseInt(speed)}WPM <br>
			Accuracy - ${accuracy}%
			`;
			let modal = new bootstrap.Modal(document.getElementById('result'));
			modal.show();
		}
		remSeconds--;
		button2.textContent = `${remSeconds}s Left`;
	}
}
/*Important Variables*/
var start; //loadLesson reset to false
var loc; //loadLesson reset to -1
var lesson; //loadLesson assign it data
var words; // loadLesson assign it lesson.split
var tagWords; //for loop assign words+span tag
var remSeconds; //assign by loadLesson, increased by counter
var wrongCount;
var rightCount;
var lessonId; //changed in lessonEvents.js
var audio1 = new Audio('sa3.mp3');
var audio2 = new Audio('sa4.wav');
/*DOM Selecters*/
let button1 = document.getElementById('loadLessonButton');
let tag1 = document.getElementById('test-time');
let input1 = document.getElementById('user-input');
let button2 = document.getElementById('test-submit');
let para1 = document.getElementById('lessonArea');
/*Events*/
document.getElementById('subscribe-form').onsubmit = (event) => {
	event.preventDefault();
	let email = document.getElementsByName('email')[0].value;
	let subject = "Hii Shiviam Singla, Please add my email to the list of subscribed users of Typing Cert. my email is "+ email + "\nThanks";
	document.location = "mailto:ShiviamSingla@gmail.com?subject="+subject;
}
document.body.onload = () => {
	loadLesson(1*2);
};
button1.onclick = () => {
	lessonId = undefined;
	let minute = Number.parseInt(tag1.value);
	loadLesson(minute*2);
};
button2.onclick = () => {
	start = true;
}
tag1.onchange = () => {
	lessonId = undefined;
	let minute2 = Number.parseInt(tag1.value);
	loadLesson(minute2*2);
};
input1.onkeypress = (event) =>{
	if (!start) {start = true;}
	if (event.keyCode == 9 || event.keyCode == 13) {event.preventDefault();}
	if (event.keyCode == 32) {
		event.preventDefault();
		if (loc==15) {para1.scroll(0,40);}
		if (loc==30) {para1.scroll(0,80);}
		if (loc==45) {para1.scroll(0,120);}
		if (loc==60) {para1.scroll(0,160);}
		if (loc==75) {para1.scroll(0,200);}
		if (loc==90) {para1.scroll(0,280);}
		if (loc==105) {para1.scroll(0,320);}
		if (loc==120) {para1.scroll(0,360);}
		if (loc==135) {para1.scroll(0,400);}
		if (loc==150) {para1.scroll(0,440);}
		loc++;
		if (words[loc] == input1.value) {
			play(audio1);
			rightCount++;
			let temp = document.getElementById(`id${loc}`);
			temp.style = 'color:green !important';
		}
		else {
			play(audio2);
			wrongCount++;
			let temp = document.getElementById(`id${loc}`);
			temp.style = 'color:white !important';
		}
		input1.value = '';
	}
};
setInterval(counter,1000);