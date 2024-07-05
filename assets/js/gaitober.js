const keys = ['e', 'i', 'a', 'o', 'u'];
const shiftKeys = ['enter', 'imes', 'ai', 'ober', 'ufat'];

// CONTENT IDs
const INPUT = document.getElementById('input').value;
const OUTPUT = document.getElementById('output');
const INFO = document.getElementById('info');
const BTN_CLIPBOARD = document.getElementById('clipboard');

let step = '';
onStandardSettings();

function onStandardSettings(changeInfo) {
    step = '';
    BTN_CLIPBOARD.disabled = true;

    changeInfo ? INFO.innerText = 'Utilize apenas letras minúsculas, não utilize letras com acentos nem caracteres especiais' : null;
}

function onEncypt() {
    if (INPUT) {
        let result = '';
        INPUT.toLowerCase().split('').map((char, index) => {
            if (keys.includes(char)) {
                result += shiftKeys[index];
            }
            result += char;
        });

        step = 'encriptado';
        OUTPUT ? OUTPUT.innerText = result : null;
        BTN_CLIPBOARD ? BTN_CLIPBOARD.disabled = false : null;
        INFO.innerText = `A mensagem foi ${step}`;
    }
}

function onDecrypt() {
    if (INPUT) {
        let result = INPUT;
        shiftKeys.forEach((key, index) => {
            if (result.includes(key)) {
                result = result.replace(new RegExp(key, 'g'), keys[index]);
            }
        });
        
        step = 'desencriptado';
        OUTPUT ? OUTPUT.innerText = result : null;
        BTN_CLIPBOARD ? BTN_CLIPBOARD.disabled = false : null;
        INFO.innerText = `A mensagem foi ${step}`;
    }
    
}

function onClip() {
    navigator.clipboard.writeText(OUTPUT.innerText)
        .then(() => INFO ? INFO.innerText = `A mensagem ${step} foi cópiada` : null)
        .catch(err => INFO ? INFO.innerText = 'Não foi possivel cópiar o conteúdo' : null);
    
    onStandardSettings(false);
}