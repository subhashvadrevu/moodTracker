const happy = document.getElementById("happy")
const sad = document.getElementById("sad")
const neutral = document.getElementById("neutral")
const excited = document.getElementById("excited")
const prevMood = document.getElementById("prevMoods")
const cal = document.getElementById('cal')

const moods = {
    '😄' : "excited",
    '😀' : "happy",
    '😞' : "sad",
    '😐' : "neutral",
}

let h = false
let s = false
let n = false
let e = false

happy.addEventListener('click', () => {
    happy.style.border = "1px solid black";
    sad.style.border = "0px";
    neutral.style.border = "0px";
    excited.style.border = "0px";
    h = true
    s = false
    n = false
    e = false
})

sad.addEventListener('click', () => {
    sad.style.border = "1px solid black";
    happy.style.border = "0px";
    neutral.style.border = "0px";
    excited.style.border = "0px";
    s = true
    h = false
    n = false
    e = false
})

neutral.addEventListener('click', () => {
    neutral.style.border = "1px solid black";
    sad.style.border = "0px";
    happy.style.border = "0px";
    excited.style.border = "0px";
    n = true
    s = false
    h = false
    e = false
})

excited.addEventListener('click', () => {
    excited.style.border = "1px solid black";
    sad.style.border = "0px";
    neutral.style.border = "0px";
    happy.style.border = "0px";
    e = true
    s = false
    n = false
    h = false
})


function setMood(mood, curr) {
    localStorage.setItem(`${curr}`, mood);
    console.log(`your mood on ${curr} is`, localStorage.getItem(`${curr} mood`))
}

function saveMyMood() {
    const now = new Date();
    let d = now.getDate().toString();
    d = d.padStart(2, '0')
    let m = (now.getMonth()+1).toString();
    m = m.padStart(2, '0')
    const y = now.getFullYear();
    const curr = `${y}-${m}-${d}`
    const prevDate = cal.value

    if(e) {
        console.log('excited')
        setMood('😄', prevDate == "" ? curr : prevDate)
    }
    if(h) {
        console.log('happy')
        setMood('😀', prevDate == "" ? curr : prevDate)
    }
    if(s) {
        console.log('sad')
        setMood('😞', prevDate == "" ? curr : prevDate)
    }
    if(n) {
        console.log('neutral')
        setMood('😐', prevDate == "" ? curr : prevDate)
    }
}

function leapyear(y) {
    if(y % 100 == 0) {
        if(y % 400 == 0) {
            return 29
        }
        else {
            return 28
        }
    }
    else {
        if(y % 4 == 0) {
            return 29
        }
        else {
            return 28
        }
    }
}

function addNewMood(d,m,y) {
    const curr = `${y}-${m}-${d}`
    let element = document.createElement("p")
    console.log(localStorage.getItem(curr))
    const currMood = localStorage.getItem(curr) || "Not entered"
    element.innerHTML = `Your mood on ${curr} ${currMood} : ${moods[currMood] || ""}`;
    prevMood.appendChild(element);
}

function showPrevMoods() {
    prevMood.innerHTML = ""
    const now = new Date();
    let d = now.getDate().toString();
    d = d.padStart(2, '0')
    let m = (now.getMonth()+1).toString();
    m = m.padStart(2, "0")
    const y = now.getFullYear();
    let cnt = 7
    const months = {
        "01" : 31,
        "02" : leapyear(y),
        "03" : 31,
        "04" : 30,
        "05" : 31,
        "06" : 30,
        "07" : 31,
        "08" : 31,
        "09" : 30,
        "10" : 31,
        "11" : 30,
        "12" : 31,
    }
    while(cnt>0) {
        addNewMood(d,m,y)
        cnt = cnt-1
        d = Number(d)-1
        if(d<=0) {
            d = Number(months[m])
            m = m-1
            if(m<=0) {
                y = y-1
                m = "12"
            }
        }
    }

}

