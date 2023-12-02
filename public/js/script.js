
const inputFile = document.getElementById('inputFile');
const inputImage = document.getElementById('inputImage');
const outputCanvas = document.getElementById('outputCanvas');

inputFile.addEventListener('change', ()=>{
    const file = inputFile.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            inputImage.src = e.target.reader;
        };
        reader.readAsDataURL(file);'
    }
})

(async ()=>{
    //codigo
})()