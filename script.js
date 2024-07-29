const contentArray = [
  
   "I. Introdução (Balão Verde)",
"Seja bem-vindo ao Treinamento Preparatório I.",
"O Tp1 tem o intuito de trazer informações úteis a respeito das atividades realizadas pelos Sargentos", "e certificar de que você conseguirá aplicar o Treinamento Básico I (T1) corretamente.",
"Ao final, você receberá a sigla Tp1.",
"II. Métodos de treinamento (Balão Verde)",
"Os treinadores precisam utilizar os scripts da Segunda Companhia, disponíveis no painel de Praças.", "É permitido também que apliquem o treino com as próprias palavras, desde que se mantenham fiéis às informações do treinamento.",
"Para ficar por dentro dos métodos de treinamento, acesse o nosso site: linktr.ee/segundacpexbrhb",
"Os scripts de treinamento também estão disponíveis no painel de Praças.",
"Dúvidas?",
"III. Aulador (Balão Verde)",
"O Aulador é uma ferramenta para computador que facilita a aplicação de treinamentos.", "Com ele é possível aplicar os treinos de forma automática e rápida.",
"Caso tenha interesse em instalá-lo, converse posteriormente com um Oficial da Segunda Companhia.",
"Dúvidas?",
"IV. Grupos Externos (Balão Verde)",
"A participação nos Grupos Externos é de extrema importância para o seu desenvolvimento dentro da instituição.", "Eles o ajudarão em quesito de promoções e te integrarão dentro das atividades propostas pelo Exército Brasileiro.",
"Atualmente existem os Monitores, Ajudantes e Supervisores.", "Procure um Oficial responsável pelo grupo o qual deseja fazer parte.",
"Dúvidas?",
"V. Avaliação de treinamentos (Balão Verde)",
"Ao ser promovido, você passará pelas avaliações de treinamentos para se tornar apto a aplicar os treinos cabíveis a sua patente.",
"Nela, você precisa aplicar o treinamento ao Oficial, seguindo o script. Utilize o balão de fala VERDE para os títulos e o BRANCO para explicação.",
"Mantenha-se constante ao script, pois todas as informações apresentadas são de extrema importância e relevância aos treinados.",
"Dúvidas?",
"VI. Envio de treinamentos (Balão Verde)",
"Ao ser aprovado na sua primeira avaliação de treino, você será o mais novo treinador do Exército Brasileiro.",
"Para o T1, você tem a opção de utilizar o CI ou a sala de Treino Robótica.",
"Enquanto 3° Sargento, você terá prioridade para aplicar T1.",
"Caso haja 2 ou mais treinados e/ou um Auxiliar, o treinamento será obrigatoriamente realizado na sala de treinamento.",
"Quando possuir as demais siglas e desejar aplicar algum treinamento, deverá sempre comunicar ao Oficial em MQG e aguardar a sua confirmação.",
"Dúvidas?",
"VII. Respeito à Hierarquia",
"Os treinadores são o primeiro contato dos recém-alistados com a hierarquia do Exército.", "Por isso, é importante cobrar os termos corretos.",
"“Senhor(a)” são apenas para Oficiais. É comum que as menores patentes se confundam com os termos.", "Mantenha em mente que é um ambiente novo com dinâmicas novas.",
"É obrigação dos treinadores corrigi-los quando erros como esse acontecerem.",
"Praças devem ser chamados pela sua patente durante os treinamentos.",
"Dúvidas?",
"VII. Finalização (Balão Verde)",
"Parabéns, você foi aprovado no Treinamento Preparatório I.",
"Adicione a sigla Tp1 em sua missão.",
"Caso queira ser avaliado em T1, informe a um oficial da Segunda Companhia."
  
];

const container = document.getElementById('container');
const alertBox = document.getElementById('alert');
const copyPreviousButton = document.getElementById('copyPrevious');
const copyNextButton = document.getElementById('copyNext');
const startAutoCopyButton = document.getElementById('startAutoCopy');
const stopAutoCopyButton = document.getElementById('stopAutoCopy');

let autoCopyInterval;

contentArray.forEach((paragraph, index) => {
    const p = document.createElement('p');
    p.className = 'paragraph';
    if (paragraph.includes('(Balão Verde)')) {
        p.classList.add('balao-verde');
    }
    p.dataset.index = index;
    p.innerText = paragraph;
    container.appendChild(p);
});

const paragraphs = document.querySelectorAll('.paragraph');

function copyText(index) {
    if (index < 0 || index >= paragraphs.length) return;

    const textToCopy = paragraphs[index].innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        paragraphs.forEach(p => p.classList.remove('copied'));
        paragraphs[index].classList.add('copied');

        // Scroll to center the paragraph
        const containerHeight = container.clientHeight;
        const paragraphOffsetTop = paragraphs[index].offsetTop;
        const paragraphHeight = paragraphs[index].offsetHeight;
        const scrollTop = paragraphOffsetTop - (containerHeight / 2) + (paragraphHeight / 2);
        container.scrollTo({ top: scrollTop, behavior: 'smooth' });

        // Show alert if paragraph contains "(Balão Verde)"
        if (paragraphs[index].classList.contains('balao-verde')) {
            showAlert();
            clearInterval(autoCopyInterval); // Stop the timer if "(Balão Verde)" is found
        }
    }).catch(err => console.error('Failed to copy text: ', err));
}

function showAlert() {
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
        enableButtons();
    }, 3000);
}

function enableButtons() {
    copyPreviousButton.disabled = false;
    copyNextButton.disabled = false;
}

let currentIndex = 0;

copyPreviousButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        copyText(currentIndex);
    }
});

copyNextButton.addEventListener('click', () => {
    if (currentIndex < paragraphs.length - 1) {
        currentIndex++;
        copyText(currentIndex);
    }
});

startAutoCopyButton.addEventListener('click', () => {
    clearInterval(autoCopyInterval); // Clear any existing interval to prevent multiple intervals running
    autoCopyInterval = setInterval(() => {
        if (currentIndex < paragraphs.length - 1) {
            currentIndex++;
            copyText(currentIndex);
        } else {
            clearInterval(autoCopyInterval);
        }
    }, 6000);
});

stopAutoCopyButton.addEventListener('click', () => {
    clearInterval(autoCopyInterval);
});

window.onload = () => {
    copyText(currentIndex);
};