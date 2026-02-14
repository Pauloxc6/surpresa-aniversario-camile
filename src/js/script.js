const message = document.getElementById('message');
const surpriseButton = document.getElementById('surpriseButton');
const menssagem = document.getElementById('menssagem');
const musicSelector = document.getElementById("musicSelector");
const audio = document.getElementById("musica");
const resetButton = document.getElementById("resetButton");

document.querySelectorAll(".music-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        const selectedMusic = btn.getAttribute("data-src");
        resetButton.classList.remove("hidden");

        audio.src = selectedMusic;
        audio.volume = 0;
        audio.play();

        // Fade-in suave
        let fade = setInterval(() => {
            if (audio.volume < 1) {
                audio.volume += 0.03;
            } else {
                clearInterval(fade);
            }
        }, 120);

        // Ativa modo noite
        setTimeout(() => {
            document.body.classList.add("night");
            criarEstrelas();
            criarNévoa();
            iniciarParallax();
        }, 600);

        musicSelector.style.display = "none";
    });
});

resetButton.addEventListener("click", () => {

    // Para música
    audio.pause();
    audio.currentTime = 0;

    // Remove modo noite
    document.body.classList.remove("night");

    // Remove estrelas
    document.querySelectorAll(".star").forEach(el => el.remove());
    document.querySelectorAll(".shooting-star").forEach(el => el.remove());
    document.querySelectorAll(".fog").forEach(el => el.remove());

    // Esconde mensagem
    message.classList.add("hidden");
    musicSelector.classList.add("hidden");

    // Mostra botão surpresa novamente
    surpriseButton.style.display = "inline-block";

    // Esconde botão reset
    resetButton.classList.add("hidden");

    // Limpa texto
    menssagem.innerHTML = "";
});


surpriseButton.addEventListener('click', () => {

    document.body.classList.add("night");
    criarEstrelas();

    message.classList.remove('hidden');
    musicSelector.classList.remove('hidden');
    surpriseButton.style.display = 'none';

    // Pequeno delay cinematográfico
    setTimeout(() => {
        document.body.classList.add("night");
        criarEstrelas();
    }, 400);

    typeWriter(
`Quero te lembrar o quanto você é especial 💖
Que neste novo ano de vida seja repleto de amor,
felicidade e realizações ✨

Que seu novo ano seja leve, doce e cheio de momentos que façam você sorrir do jeito que eu gosto de ver. 💕

Se essa fosse uma história de cinema, você seria a parte mais bonita do roteiro da minha vida. 🌌

Feliz aniversário Camile 🎉`
    );

    gerarConfete();
});


// Efeito digitando
function typeWriter(text) {
    let i = 0;
    menssagem.innerHTML = "";
    const speed = 40;

    function escrever() {
        if (i < text.length) {
            menssagem.innerHTML += text.charAt(i);
            i++;
            setTimeout(escrever, speed);
        }
    }

    escrever();
}

// Confete melhorado
function gerarConfete(){
    for (let i = 0; i < 150; i++){
        const confete = document.createElement("div");
        confete.className = "confete";
        confete.style.left = Math.random() * window.innerWidth + "px";
        confete.style.backgroundColor = getRandomColor();
        confete.style.animationDuration = (Math.random() * 3 + 2) + "s";
        document.body.appendChild(confete);

        setTimeout(() => {
            confete.remove();
        }, 5000);
    }
}

function getRandomColor(){
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function criarEstrelas() {
    for (let i = 0; i < 150; i++) {
        const star = document.createElement("div");
        star.className = "star";

        star.style.left = Math.random() * window.innerWidth + "px";
        star.style.top = Math.random() * window.innerHeight + "px";

        star.dataset.depth = Math.random(); // para parallax

        document.body.appendChild(star);
    }
}

function iniciarParallax() {
    document.addEventListener("mousemove", e => {
        document.querySelectorAll(".star").forEach(star => {
            const depth = star.dataset.depth;
            const moveX = (e.clientX - window.innerWidth/2) * depth * 0.02;
            const moveY = (e.clientY - window.innerHeight/2) * depth * 0.02;
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

function criarEstrelaCadente() {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.top = Math.random() * window.innerHeight/2 + "px";
    star.style.left = Math.random() * window.innerWidth/2 + "px";
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 2000);
}

function criarNévoa() {
    const fog = document.createElement("div");
    fog.className = "fog";
    document.body.appendChild(fog);
}


