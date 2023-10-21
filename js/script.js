const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

const wordToPicture = {
    python: "python.png",
    guitar: "guitar.jpg",
    jackie: "jackie.jpg",
    c: "c.png",
    typescript: "typescript.png",
    r: "r.png",
    swift: "swift.png",
    java: "java.png",
    modular: "modular.jpeg",
    ruby: "ruby.png",
    haskell: "haskell.png",
    nodejs: "nodejs.png",
    windows: "windows.png",
    photoshop: "photoshop.jpeg",
    zoom: "zoom.png",
    chrome: "chrome.png",
    office: "office.jpeg",
    libreoffice: "libreoffice.png",
    whatsapp: "whatsapp.png",
    icloud: "icloud.png",
    git: "git.png",
    excel: "excel.webp",
    iphone: "iphone.png",
    playstation: "playstation.png",
    nvidia: "nvidia.png",
    alienware: "alienware.png",
    core: "core.png",
    seagate: "seagate.png",
    samsung: "samsung.png",
    razer: "razer.png",
    hp: "hp.png",
    lenovo: "lenovo.png",
    twitter: "twitter.png",
    facebook: "facebook.png",
    tiktok: "tiktok.png",
    linkedin: "linkedin.png",
    pinterest: "pinterest.png",
    snapchat: "snapchat.png",
    youtube: "youtube.png",
    oculus: "oculus.png",
    instagram: "instagram.png",
    tumblr: "tumblr.png",
    tony: "tony.webp",
    thor: "thor.jpeg",
    spidey: "spidey.jpeg",
    tchalla: "tchalla.jpeg",
    hulk: "hulk.png",
    strange: "strange.png",
    cyclo: "cyclo.webp",
    loki: "loki.webp",
    logan: "logan.png",
    cap: "cap.jpeg",
    poobear: "poobear.png",
    tenet: "tenet.jpg",

    //rahul images

    //DC
    batman: "batman.jpg",
    superman: "superman.jpg",
    wonderwoman: "wonderwoman.jpg",
    flash: "flash.jpg",
    hal: "hal.jpg",
    aquaman: "aquaman.jpg",
    joker: "joker.jpg",
    zatanna: "zatanna.jpg",
    catwoman: "catwoman.jpg",
    dickgrayson: "dickgrayson.jpg",

    //Anime
    naruto: "naruto.jpg",
    luffy: "luffy.jpg",
    light: "light.jpg",
    edward: "edward.jpg",
    eva: "eva.jpg",
    sakura: "sakura.jpg",
    yusuke: "yusuke.jpg",
    goku: "goku.jpg",
    zoro: "zoro.jpg",
    spike: "spike.jpg",

    //Naruto
    naruto: "naruto.jpg",
    sasuke: "sasuke.jpg",
    hinata: "hinata.jpg",
    jiraya: "jiraya.jpg",
    kankuro: "kankuro.jpg",
    deidara: "deidara.jpg",
    guy: "guy.jpg",
    katsuya: "katsuya.jpg",
    shukaku: "shukaku.jpg",
    kakashi: "kakashi.jpg",
    
    //onepiece
    luffy:"luffy.jpg",
    zoro:"zoro.jpg",
    nami:"nami.jpg",
    sanji:"sanji.jpg",
    usopp:"usopp.jpg",
    robin:"robin.jpg",
    chopper:"chopper.jpg",
    brook:"brook.jpg",
    franky:"franky.jpg",
    jinbe:"jinbe.jpg",

    //NBA
    lebron:"lebron.jpg",
    curry:"curry.jpg",
    giannis:"giannis.jpg",
    harden:"harden.jpg",
    embiid:"embiid.jpg",
    porzingis:"porzingis.jpg",
    chris:"chris.jpg",
    davis:"davis.jpg",
    westbrook:"westbrook.jpg",
    jokic:"jokic.jpg",

    //FOOD
    lasgna:"lasgna.jpg",
    sushi:"sushi.jpg",
    nachos:"nachos.jpg",
    pbj:"pbj.jpg",
    brie:"brie.jpg",
    carbonora:"carbonora.jpg",
    chowmein:"chowmein.jpg",
    roti:"roti.jpg",
    paella:"paella.jpg",
    biryani:"biryani.jpg"



    // Add more word-picture mappings as needed
};

function generateRandomSequence(min, max) {
    const sequence = [];
  
    // Create an array with numbers from min to max
    for (let i = min; i <= max; i++) {
      sequence.push(i);
    }
  
    // Shuffle the array to randomize the sequence
    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
  
    return sequence;
  }
  
  const minNumber = 0;
  const maxNumber = 9;
  
  let randomSequence = generateRandomSequence(minNumber, maxNumber);
  
  //console.log(randomSequence); // This will print a random sequence of numbers from 1 to 10
  
// Function to update the word picture
function updateWordPicture(word) {
    const imgElement = document.querySelector(".word-picture");
    if (wordToPicture[word]) {
        imgElement.src = `pictures/${wordToPicture[word]}`;
        imgElement.alt = `Picture for ${word}`;
    } else {
        imgElement.src = ""; // Clear the image if there's no corresponding picture
        imgElement.alt = "Word Picture";
    }
}

var url_string = window.location.href.toString(); 
var url = new URL(url_string);
var i = url.searchParams.get("index");
debugger;

let currentWordList = [];
var index_increase=0;
let wordIndex = randomSequence[index_increase]; // Initialize word index
let score = 0;

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    if ( index_increase >= currentWordList.length) {
        // All words have been asked, show total score
        let msg = `Congratulations! You have completed the game. Total Score: ${score}/10`;
        popupUP(msg, true,2,"Game Over");
        //alert(`Congratulations! You have completed the game. Total Score: ${score}`);
        return;
      }
    
    let ranItem = currentWordList[wordIndex];
    // wordList.splice(randomIndex, 1);
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;


    updateWordPicture(word);
    
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";


    setTimeout(() => {
        if(correctLetters.length === word.length) {
            //alert(`Congrats! You found the word ${word.toUpperCase()}`);
            let msg=`Congrats! You found the word ${word.toUpperCase()}`;
            
            popupUP(msg,false);
            score++; 
            index_increase++;
            wordIndex=randomSequence[index_increase]; // Move to the next word
        // randomSequence.slice(0)
        
        randomWord();
            

        } else if(maxGuesses < 1) {
            let msg = "Incorrect Answer. You don't have remaining guesses";
            debugger;
           popupUP(msg, false,999,"Incorrect");
            //alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];

            }
            index_increase++;
            wordIndex=randomSequence[index_increase]; // Move to the next word
            randomWord();
        }
    }, 100);
}
function popupUP(popdata, eflag,pflag=1,head_str="Correct"){
    
    
    $('#modal_content').html(popdata);
    $('#val-mess').html(head_str);
    if(pflag===1){
      $('.wrong-img').hide();
      $('.correct-img').show();
      $('.game-over-img').hide();
    }else if(pflag===2){
      $('.wrong-img').hide();
      $('.correct-img').hide();
      $('.game-over-img').show();
    }else{
      $('.wrong-img').show();
      $('.correct-img').hide();
      $('.game-over-img').hide();
    }
    if(eflag){
    $('#exampleModal .modal-footer .startB').css("display", "block");
    $('#exampleModal .modal-footer .closeB').css("display", "none");
    }
    // Use Bootstrap's JavaScript API to open the modal
    $('#exampleModal').modal('show');


}
function closeBootstrapModal() {
    // Use Bootstrap's JavaScript API to close the modal
    $('#myModal').modal('hide');

    // Remove the modal element from the document's body
    const modalElement = document.getElementById("myModal");
    if (modalElement) {
        document.body.removeChild(modalElement);
    }
}

if (i == 1) {
    currentWordList = wordList1;
  } else if (i == 2) {
    currentWordList = wordList2;
  } else if (i == 3) {
    currentWordList = wordList3;
  }else if (i == 4) {
    currentWordList = wordList4;
  }else if (i == 5) {
    currentWordList = wordList5;
  }else if (i == 6) {
    currentWordList = wordList6;
  }else if (i == 7) {
    currentWordList = wordList7;
  }else if (i == 8) {
    currentWordList = wordList8;
  }else if ( i==9 ){
    currentWordList = wordList9
  }else if (i == 10) {
    currentWordList = wordList10;
  }else if (i == 11) {
    currentWordList = wordList11;
  }


  randomWord();
  resetBtn.addEventListener("click", () => {
    // score = 0;
    // wordIndex = 0;
    // currentWordList = [];
    //  // Reset the current word list
    // // Choose the appropriate word list based on index (i)
    // if (i == 1) {
    //   currentWordList = wordList1;
    // } else if (i == 2) {
    //   currentWordList = wordList2;
    // } else if (i == 3) {
    //   currentWordList = wordList3;
    // }
    // randomWord(); // Start the game again
    window.location.reload();
  });
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());