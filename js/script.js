            function initCarousel({
                trackSelector,
                cardSelector,
                dotsSelector
            }){
            const track = document.querySelector(trackSelector);
            const cards = document.querySelectorAll(cardSelector);
            const dotsContainer = document.querySelector(dotsSelector);

            let index = 0;

            let startX = 0;
            let currentX = 0;
            let isDragging = false;
            const swipeThreshold = 50;
            
            function onTouchStart(e){
                startX = e.touches[0].clientX;
                isDragging = true;
            }
            function onTouchMove(e){
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
            }
            function onTouchEnd(){
                if(!isDragging) return;
                const diff= startX - currentX;

                if(diff > swipeThreshold && index< maxIndex()){
                    index++;
                }else if (diff < - swipeThreshold && index > 0){
                    index --;
                }
                update();
                isDragging = false;
            }
            


            function cardsPerView(){
                if (window.innerWidth <= 600) return 1;
                if (window.innerWidth <= 900) return 2;
                return 3;
            }
            function maxIndex(){
                return cards.length - cardsPerView();
            }
            function update(){
                const percent = 100/ cardsPerView();
                track.style.transform = `translateX(-${index * percent}%)`;

                const dots = document.querySelectorAll('.dots button');
                dots.forEach(d => d.classList.remove('active'));
                dots[index]?.classList.add('active');

                cards.forEach(card => card.classList.remove('is-visible'));

                const start = index;
                const end = index + cardsPerView();

                for( let i = start; i<end; i++){
                    cards[i]?.classList.add('is-visible');
            }
            }
            //dots
            function createDots(){
                dotsContainer.innerHTML = '';
                for (let i = 0; i <= maxIndex(); i++){
                const dot = document.createElement('button');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    index = i;
                    update();
                });
                dotsContainer.appendChild(dot);
            }
            }
            window.addEventListener('resize', ()=>{
                index = Math.min(index, maxIndex());
                createDots();
                update();
            });
            createDots();
            update();
            }
            initCarousel({
                trackSelector:'.track',
                cardSelector: '.card',
                dotsSelector: '.dots'
            });

            initCarousel({
                trackSelector: '.track2',
                cardSelector: '.card2',
                dotsSelector: '.dots2'
            })

