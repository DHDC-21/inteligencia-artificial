const fileInput = document.getElementById('file');
const imagem = document.getElementById('imagem');
let canvas; // Declare a variável canvas fora da função para que possa ser acessada globalmente

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(() => {
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        console.log('Arquivo selecionado', file);
        if (file) {
            const imagemURL = URL.createObjectURL(file);
            imagem.src = imagemURL;
            imagem.onload = reconhecimentoFacial; // Iniciar o reconhecimento apenas após a imagem ser carregada
        }
    });

    async function reconhecimentoFacial() {
        console.log('Fazendo o reconhecimento facial!');
        try {
            // Remover o canvas anterior, se existir
            if (canvas) {
                canvas.remove();
            }

            // Criar um novo canvas
            canvas = faceapi.createCanvasFromMedia(imagem);

            // Encontrar o contêiner do Bootstrap (ajuste o seletor conforme necessário)
            const containerBootstrap = document.querySelector('.container');

            // Anexar o canvas ao contêiner do Bootstrap
            containerBootstrap.appendChild(canvas);

            // Alinhar o canvas com a imagem
            canvas.style.position = 'absolute';
            canvas.style.top = `${imagem.offsetTop}px`;
            canvas.style.left = `${imagem.offsetLeft + 10}px`;

            const displaySize = { width: imagem.width, height: imagem.height };

            faceapi.matchDimensions(canvas, displaySize);

            // Bloco sem o timer
            const detections = await faceapi.detectAllFaces(
                imagem,
                new faceapi.TinyFaceDetectorOptions() // Fornecendo explicitamente as opções do TinyFaceDetector
            )
                .withFaceLandmarks()
                .withFaceExpressions();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            faceapi.draw.drawDetections(canvas, resizedDetections); // Desenhando detecções
            //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections); // Desenhando os pontos de referencia
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections); // Desenhando expressões
        } catch (error) {
            console.log(error);
        }
    }
});
