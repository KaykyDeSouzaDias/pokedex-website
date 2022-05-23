function OpenSideNav() {
    document.getElementById("my-side-nav").style.width = "100%";
    document.querySelector("body").style.overflow = "hidden";
}

function CloseSideNav() {
    document.getElementById("my-side-nav").style.width = "0";
}

const insertGenerationButtonImages = () => {
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`generation-0${i}`).innerHTML = `<h1 style="text-decoration=none;">0${i}</h1><img src="imgs/generation-buttons/generation_0${i}.png">`;
    }
}

insertGenerationButtonImages();