const textColorPicker = document.getElementById('textColorPicker')
const canvasColorPicker = document.getElementById('canvasColorPicker')
const fontSizePicker = document.getElementById('fontSizePicker')
const canvas = document.getElementById('myCanvas')
const clearBtn = document.getElementById('clearBtn')
const saveDownloadBtn = document.getElementById('saveDownloadBtn')
const retrieveBtn = document.getElementById('retrieveBtn')

let isDrawing;  
const ctx = canvas.getContext('2d')

textColorPicker.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.strokeStyle = e.target.value;
})

canvasColorPicker.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 500)
})

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})

canvas.addEventListener('mousemove', (e) => {
    if(isDrawing) {
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()

        lastX = e.offsetX
        lastY = e.offsetY
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
})

fontSizePicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
})

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

saveDownloadBtn.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());

    let link = document.createElement('a')
    link.download = 'my-canvas.png'
    link.href = canvas.toDataURL();
    link.click();
})

retrieveBtn.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents')

    if(savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0);
    }
})