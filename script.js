const form = document.querySelector('#image-form');
const input = document.querySelector('#image-file');
const format = document.querySelector('#image-format');
const resultContainer = document.querySelector('#result-container');

form.addEventListener('submit', function(event) {
	event.preventDefault();
	if (!input.files || input.files.length === 0) {
		alert('Selecione uma imagem!');
		return;
	}

	const file = input.files[0];
	if (!file.type.match(/image.*/)) {
		alert('O arquivo selecionado não é uma imagem!');
		return;
	}


        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${file.name.split('.')[0]}.${format.value}`;
                    link.textContent = 'Baixar imagem convertida';
                    link.className = 'btn-baixar';
                    resultContainer.innerHTML = '';
                    resultContainer.appendChild(link);
                    resultContainer.style.display = 'block';
                }, 'image/${format.value}');
            };
        };
        reader.readAsDataURL(file);
});
