let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// Conteúdo do modal para cada card (adicione/edite conforme desejar)
const modalContents = [
    {
        html: `
            <h2>Banho do 40</h2>
            <img src="Balneário Ilha do Coco verdee.jpg" style="width:100%;border-radius:8px;margin-bottom:16px;">
            <p>O Balneário Ilha do Coco Verde, conhecido como “Banho do 40”, é um recanto natural às margens do Rio Cajuapara, no distrito de Pequiá, em Açailândia, a 1,3km da BR-222.</p>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video" frameborder="0" allowfullscreen style="margin-top:16px;"></iframe>
        `
    },
    {
        html: `
            <h2>Paraíso Tropical</h2>
            <img src="../images/Balneário Paraíso imagem 3.jpg" style="width:100%;border-radius:8px;margin-bottom:16px;">
            <p>O Balneário Paraíso Tropical, em Açailândia, é ideal para lazer em família, com piscinas naturais, áreas para piquenique e contato com a natureza.</p>
        `
    },
    // ...adicione mais objetos para cada card na ordem...
];

// Seletores do modal
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.querySelector('.modal-content');
const closeModalBtn = document.querySelector('.modal-close');

let sliderInterval;

function startSlider() {
    // Substitua pelo seu código real de auto-play
    sliderInterval = setInterval(() => {
        // nextSlide();
    }, 3000);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

// Função para abrir o modal com conteúdo dinâmico
function openModal(index) {
    modalContent.innerHTML = modalContents[index]?.html || "<p>Conteúdo não encontrado.</p>";
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    stopSlider(); // <-- Pare o slider aqui
}

// Função para fechar o modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    startSlider(); // <-- Volte o slider aqui
}

// Eventos para fechar o modal
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeModal();
});

// Liga o modal aos botões "Saiba Mais"
document.querySelectorAll('.learn-more-btn').forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Não deixa o slider mudar
        openModal(idx);
    });
});

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuClose = document.querySelector('.menu-close');
const arrows = document.querySelector('.arrows');

hamburger.addEventListener('click', () => {
    menu.classList.add('open');
    if (arrows) arrows.style.display = 'none';
});

menuClose.addEventListener('click', () => {
    menu.classList.remove('open');
    if (arrows) arrows.style.display = '';
});

// Optional: close menu when clicking a link (on mobile)
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
    });
});