var typedText = ["Network Engineer", "Graphic Designer", "Technical Support"];

var typed = new Typed(".text-typed", {
    strings: typedText,
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

window.addEventListener('scroll', function () {
    var aboutSection = document.getElementById('about');
    var aboutContent = document.querySelector('.about-content');
    var aboutPosition = aboutSection.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.2;

    if (aboutPosition < screenPosition) {
        aboutContent.style.animation = 'slideIn 0.5s forwards';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Menangkap semua elemen gambar dengan class clickable-image
    var images = document.getElementsByClassName("clickable-image");
    
    // Loop melalui setiap gambar untuk menambahkan event listener
    for (var i = 0; i < images.length; i++) {
        images[i].addEventListener('click', function() {
            var modal = document.getElementById("imageModal");
            var modalImg = document.getElementById("modalImage");
            var captionText = document.getElementById("caption");
            
            // Memperlihatkan modal
            modal.style.display = "block";
            
            // Menetapkan gambar dan teks keterangan di dalam modal
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    }
    
    // Mendapatkan tombol untuk menutup modal
    var span = document.getElementsByClassName("close")[0];
    
    // Menangani event klik pada tombol tutup modal
    span.onclick = function() {
        var modal = document.getElementById("imageModal");
        modal.style.display = "none";
    }
    
    // Menangani event klik di luar gambar untuk menutup modal
    window.onclick = function(event) {
        var modal = document.getElementById("imageModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item');

    videoItems.forEach(item => {
        const videoThumbnail = item.querySelector('.video-thumbnail');
        const videoPlayerContainerOverlay = item.querySelector('.video-player-container-overlay');
        const videoPlayerContainer = item.querySelector('.video-player-container');
        const videoPlayer = item.querySelector('.video-player');
        const playButton = item.querySelector('.play-btn');
        const closeButton = item.querySelector('.close');

        videoThumbnail.addEventListener('click', () => {
            videoPlayerContainer.style.display = 'block';
            videoPlayerContainerOverlay.style.display = 'block';
            videoPlayer.play();
        });

        closeButton.addEventListener('click', () => {
            videoPlayerContainer.style.display = 'none';
            videoPlayerContainerOverlay.style.display = 'none';
            videoPlayer.pause();
        });

        videoPlayerContainerOverlay.addEventListener('click', () => {
            videoPlayerContainer.style.display = 'none';
            videoPlayerContainerOverlay.style.display = 'none';
            videoPlayer.pause();
        });
    });
});


