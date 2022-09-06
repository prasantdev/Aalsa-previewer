//console.log = () => {}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

const sendBtn = document.getElementById('send-btn');

const msgInput = document.getElementById("msg-input");

/*

window.addEventListener('click', () => {

  recognition.start();

  //console.log('recognition started !')

})

*/

//Get and write User message

//get from voice

recognition.onresult = function (e) {

  let resultIndex = e.resultIndex;

  let transcript = e.results[resultIndex][0].transcript;

  if (transcript.includes('hello')) {

    // //console.log('Hi ! How are you ?')

  }

  writeUserMsg(transcript);

}

//get from input

function writeMessageOnInput() {

  // let typingSound = document.getElementById('typing-sound');

  if (sendBtn.innerText == 'mic') {

    recognition.start();

    return;

  }

  if (msgInput.value.trim('') == '') {

    return false;

  }

  // typingSound.play();

  writeUserMsg(msgInput.value);

  msgInput.value = '';

  sendBtn.children[0].innerText = 'mic';

}

//Write user message

function writeUserMsg(arg) {

  // //console.log(arg);

  if (arg == '' || arg == null) {

    return;

  }

  let messages = document.getElementById('messages');

  let userMsgBox = document.createElement('div');

  userMsgBox.classList.add('user-msg-container');

  userMsgBox.innerHTML = `<p class='msg-content'>${arg}</p>`;

  messages.appendChild(userMsgBox);

  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);


  getBotMsg(arg);

}

//Get and write Bot message

//Get from user message (fetch)

function getBotMsg(userMsg) {

  //  let url = `https://api.udit.gq/api/chatbot?message=${userMsg}[&name=Supra&user=MESSAGE_AUTHOR_ID&gender=Female]`;

  userMsg = userMsg.replace(/\s/ig, '+');
  
  let uid = Math.random().toString().replace('.','');
  let url = `http://api.brainshop.ai/get?bid=169043&key=faK9uaF79Ec7RedQ&uid=${uid}&msg=${userMsg}`

  let url = `https://cors-fetch-it.herokuapp.com/https://api.udit.gq/api/chatbot?message=${userMsg}&name=Aalsa&user=MESSAGE_AUTHOR_ID&gender=female`;

  // let url = `https://mathe.sololearn.repl.co/${userMsg}`;

  fetch(url).then((response) => {

    return response.json();

  }).then((data) => {

    writeBotMsg(data.cnt);

    // //console.log(data.cnt);

    return;

  });

}

////console.log(getBotMsg());

//write bot message

function writeBotMsg(arg) {

  // //console.log(arg);

  // let botMessage = getBotMsg(arg);

  let messages = document.getElementById('messages');

  let botMsgBox = document.createElement('div');

  let botDataBox = document.createElement('div');

  botDataBox.classList.add('bot-data-box');

  botDataBox.innerHTML = `

  <img src='neko.png' class='msg-pfp'>

  <div class='msg-bot-name'><strong>Aalsa</strong></div>

  `;

  botMsgBox.classList.add('bot-msg-container');

  botMsgBox.appendChild(botDataBox);

  botMsgBox.innerHTML += `<p class='msg-content'>${arg}</p>`;

  messages.appendChild(botMsgBox);

  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);

  recognition.abort();

  responsiveVoice.speak(arg, "US English Female", { volume: 1 });

  if (!responsiveVoice.isPlaying()) {

    //  //console.log("I hope you are listening");

  }

}

/*

recognition.onnomatch = function(e) {

  //console.log('no match Found !')

}

*/

//toggle send btn and mic

msgInput.addEventListener('keyup', () => {

  if (msgInput.value.trim('') != '') {

    sendBtn.children[0].innerText = 'send';

  } else {

    sendBtn.children[0].innerText = 'mic';

  }

});
msgInput.addEventListener('input', () => {

  if (msgInput.value.trim('') != '') {

    // alert('Send  Button should appear in the message box.');
    sendBtn.children[0].innerText = 'send';

  } else {
    // alert('mic  Button should appear in the message box.');
    sendBtn.children[0].innerText = 'mic';

  }

});

const menu = document.querySelector(".contextmenu");

let menuVisible = false;

const toggleMenu = command => {

  setTimeout(() => {

    menu.style.display = command === "show" ? "inline-block" : "none";

    menuVisible = !menuVisible;

  }, 100);

};

const setPosition = ({ top, left }) => {

  toggleMenu("show");

  setTimeout(() => {

    var lw = innerWidth,

      lh = innerHeight;

    var w = menu.clientWidth;

    h = menu.clientHeight;

    var l = left,

      t = top;

    if (l + w + 16 >= lw) {

      l = l - w - 16;

    }

    if (t + h + 16 >= lh) {

      t = t - h - 16;

    }

    menu.style.left = `${l}px`;

    menu.style.top = `${t}px`;

  }, 100);

};

window.addEventListener('contextmenu', (e) => {

  ////console.log(e.target);

  if (e.target.className !== "contextmenu" && e.target.className !== "context-option" && (/user-msg-container|bot-msg-container|msg-content|bot-data-box|msg-pfp|msg-badge/g.test(e.target.className))) {

    contextTarget = e.target;

    e.preventDefault();

    let el;

    if (e.target.className.length - /user-msg-container|bot-msg-container/.test(e.target.className).length == 0) {

      el = e.target;

    }

    else {

      el = e.target.closest(".user-msg-container") || e.target.closest(".bot-msg-container");

    }

    const origin = {

      left: e.pageX,

      top: e.pageY

    };

    setPosition(origin);

    return false;

  }

});

document.getElementById("context-copy").addEventListener("click", e => {

  var ell = contextTarget.closest(".user-msg-container") || contextTarget.closest(".bot-msg-container");

  var el = ell.querySelector(".msg-content");

  copy(el.textContent);

});

////console.log(sendBtn.innerText)

recognition.onend = function () {

  // recognition.start();

}

window.addEventListener('load', () => {

  // startRecognition();

  sendBtn.addEventListener('click', writeMessageOnInput);
  window.addEventListener('keydown', (e) => {
  //  console.log(e);
  if(e.key === 'Enter') {
    if(e.shiftKey === false){
      // e.preventDefault();
      writeMessageOnInput();
    }
  }
  });

});

let count = 0;

window.addEventListener('click', () => {

  if (count === 0) {

    writeBotMsg('Hi there dear ! 🤗');

    count++;

  }

  if (menuVisible) {

    toggleMenu("hide");

    // //console.log('working');

  }

  contextTarget = null;

})

function copy(t) {

  try {

    var copyText = document.createElement("textarea");

    var ttbcpd = typeof (t) == "string" ? t : t.textContent;

    copyText.style.position = "fixed";

    copyText.style.left = "-99999999px";

    copyText.style.top = "-99999999px";

    copyText.value = t;

    document.body.appendChild(copyText);

    copyText.select();

    copyText.setSelectionRange(0, 9999999999999);

    document.execCommand("copy");

    document.body.removeChild(copyText);

  }

  catch (e) {
    alert(`Couldn't copy the message. Please contact the developer(Prasant)`)
  }

}
//Test vs test
