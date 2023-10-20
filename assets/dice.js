const faces = [[0,0], [16,0], [0,16], [16,16], [0,32], [16,32]];
const size = 64;
const loadDice = async () => {
    const img = new Image();
    img.onload = () => {
        drawCanvas(img);
    };
    img.src = "/assets/dice-sprite.png";
};

const drawCanvas = async (img) => {
    const canvas = document.createElement("canvas");
    canvas.style.cursor = "pointer";
    canvas.width = size;
    canvas.height = size;

    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    canvas.addEventListener("click", (e) => {
        const roll = Math.floor(Math.random() * 6);
        ctx.clearRect(0, 0, 32, 32);
        ctx.drawImage(img, faces[roll][0], faces[roll][1], 16, 16, 0, 0, size, size);
    });

    ctx.drawImage(img, 0, 0, 16, 16, 0, 0, size, size);
};

loadDice();