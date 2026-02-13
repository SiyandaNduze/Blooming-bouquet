const garden = document.getElementById("garden");
const message = document.getElementById("message");
const replayBtn = document.getElementById("replay");

const flowerCount = 8;
let flowers = [];

function createFlowers() {
    flowers = [];
    garden.innerHTML = "";
    message.style.opacity = 0;
    replayBtn.style.opacity = 0;

// Create flowers
for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement("div");
    flower.classList.add("flower");

    // Random position
    flower.style.left = Math.random()*(window.innerWidth-80) + "px";
    flower.style.top = Math.random()*(window.innerHeight/2) + "px";

    // Create petals
    for (let j = 0; j < 7; j++) {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        flower.appendChild(petal);
    }

    // Create center
    const center = document.createElement("div");
    center.classList.add("center");
    flower.appendChild(center);

    const stem = document.createElement("div");
    stem.classList.add("stem");
    flower.appendChild(stem);

    garden.appendChild(flower);
    flowers.push(flower);

    // Bloom animation staggered
    setTimeout(() => {
        flower.classList.add("bloom");
    }, i*800);
}
setTimeout(gatherFlowers, flowerCount*800+1000);
}

function gatherFlowers() {
    const centerX = window.innerWidth/2;
    const baseY = window.innerHeight*0.45;

    // Prettier bouquet layout
    const layout = [
        {x: -60, y: -40},
        {x: 60, y: -40},

        {x: -110, y: 0},
        {x: 0, y: 0},
        {x: 110, y: 0},

        {x: -50, y: 50},
        {x: 50, y: 50},
        {x: 0, y: 105}
    ];

    flowers.forEach((flower,index) => {
        const pos = layout[index % layout.length];

        flower.style.left = (centerX + pos.x - 30) + "px";
        flower.style.top = (baseY + pos.y) + "px";
    });

    // create wrap once
    let wrap = document.querySelector(".bouquet-wrap");
    if (!wrap) {
        wrap = document.createElement("div");
        wrap.classList.add("bouquet-wrap");
        document.body.appendChild(wrap);
    }

    // create ribbon once
    let ribbon = document.querySelector(".ribbon");
    if (!ribbon) {
        ribbon = document.createElement("div");
        ribbon.classList.add("ribbon");
        document.body.appendChild(ribbon);
    } 

    // fade them in
    setTimeout(() => {
        wrap.style.opacity = 1;
        ribbon.style.opacity = 1;
    }, 800);

    setTimeout(() => {
        message.style.opacity = 1;
        replayBtn.style.opacity = 1;
    }, 2000);
}

// falling petals animation
function createFallingPetal() {
    const petal = document.createElement("div");
    petal.classList.add("falling");

    petal.style.left = Math.random()*window.innerWidth + "px";
    petal.style.animationDuration = (5 + Math.random()*5) + "s";
    petal.style.opacity = Math.random();

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 10000);
}

setInterval(createFallingPetal, 500);

//Click interaction
document.body.addEventListener("click",() => {
    gatherFlowers()
});

//Replay
replayBtn.addEventListener("click",createFlowers);

//Start
createFlowers();
