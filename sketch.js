let trail = [];
let spots = [];
let colors = ["#FF1FA6", "#E4FF3B", "#1FA1FF"]; // Array of colors
let hoverTarget = null;

function setup() {
    createCanvas(windowWidth, windowHeight);
    spawnSpots();
    setInterval(spawnSpots, 390);
    document.querySelectorAll('.people-list a').forEach(a => {
        a.addEventListener('mouseenter', () => {
            hoverTarget = a;
        });
        a.addEventListener('mouseleave', () => {
            hoverTarget = null;
        });
    });
}

function draw() {

    background(0);

    fill('#ffffff');

    stroke(255, 31, 166);

    trail.push(createVector(mouseX, mouseY));

    if (trail.length > 40) {
        trail.shift();
    }

    for (let i = 0; i < trail.length; i++) {
        const curr = trail[i];
        circle(curr.x, curr.y, i);
    }

    if (hoverTarget) {
        const bounds = hoverTarget.getBoundingClientRect();
        const targetX = bounds.left + bounds.width / 2;
        const targetY = bounds.top + bounds.height / 2;

        for (let i = 0; i < spots.length; i++) {
            const { x, y } = spots[i];
            const dx = targetX - x;
            const dy = targetY - y;
            const angle = atan2(dy, dx);
            const speed = 7;
            spots[i].x += cos(angle) * speed;
            spots[i].y += sin(angle) * speed;
        }
    }

    drawSpots();
}

function spawnSpots() {
    const x = random(width);
    const y = random(height);
    const size = random(4, 10);
    const opacity = random(100, 100);
    const colorIndex = floor(random(colors.length));
    const color = colors[colorIndex];
    spots.push({ x, y, size, opacity, color });
}

function drawSpots() {
    for (let i = 0; i < spots.length; i++) {
        const { x, y, size, opacity, color } = spots[i];
        fill(color);
        ellipse(x, y + size / 4, size * 2);
        fill(0, opacity);
        ellipse(x, y, size);
    }

    
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
  }

