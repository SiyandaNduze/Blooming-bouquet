const garden = document.getElementById("garden");
const message = document.getElementById("message");
const replayBtn = document.getElementById("replay");

const flowerCount = window.innerWidth < 600 ? 6 : 8;
let flowers = [];

function createFlowers() {
    flowers = [];
    garden.innerHTML = "";
    message.style.opacity = 0;
    replayBtn.style.opacity = 0;

    document.querySelector(".bouquet-wrap")?.remove();
    document.querySelector(".ribbon")?.remove();

    const gardenRect = garden.getBoundingClientRect();

    for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElement("div");
        flower.className = "flower";

        flower.style.left = Math.random() * (gardenRect.width - 80) + "px";
        flower.style.top = Math.random() * (gardenRect.height * 0.5) + "px";

        for (let j = 0; j < 7; j++) {
            const petal = document.createElement("div");
            petal.className = "petal";
            flower.appendChild(petal);
        }

        const center = document.createElement("div");
        center.className = "center";
        flower.appendChild(center);

        garden.appendChild(flower);
        flowers.push(flower);

        setTimeout(() => flower.classList.add("bloom"), i * 600);
    }

    setTimeout(gatherFlowers, flowerCount * 600 + 800);
}

function gatherFlowers() {
    const gardenRect = garden.getBoundingClientRect();
    const centerX = gardenRect.width / 2;
    const baseY = gardenRect.height * 0.6;

    const layout = [
        { x: -60, y: -40 }, { x: 60, y: -40 },
        { x: -100, y: 0 }, { x: 0, y: 0 }, { x: 100, y: 0 },
        { x: -40, y: 50 }, { x: 40, y: 50 }, { x: 0, y: 105 }
    ];

    flowers.forEach((flower, i) => {
        const pos = layout[i % layout.length];
        flower.style.left = centerX + pos.x - 40 + "px";
        flower.style.top = baseY + pos.y + "px";
    });

    const wrap = document.createElement("div");
    wrap.className = "bouquet-wrap";
    document.body.appendChild(wrap);

    const ribbon = document.createElement("div");
    ribbon.className = "ribbon";
    document.body.appendChild(ribbon);

    setTimeout(() => {
        wrap.style.opacity = 1;
        ribbon.style.opacity = 1;
    }, 600);

    setTimeout(() => {
        message.style.opacity = 1;
        replayBtn.style.opacity = 1;
    }, 1800);
}

document.body.addEventListener("click", gatherFlowers);
replayBtn.addEventListener("click", createFlowers);

createFlowers();
