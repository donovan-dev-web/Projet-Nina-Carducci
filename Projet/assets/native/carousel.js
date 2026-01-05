export default function initCarousel(){
  const carousel = document.getElementById('carouselExampleIndicators');
  if(!carousel) return;

  const inner = carousel.querySelector('.carousel-inner');
  const items = Array.from(inner.querySelectorAll('.carousel-item'));
  const indicators = Array.from(carousel.querySelectorAll('.carousel-indicators button'));
  const prevBtn = carousel.querySelector('.carousel-control-prev');
  const nextBtn = carousel.querySelector('.carousel-control-next');

  let current = items.findIndex(i=>i.classList.contains('active'));
  if(current<0) current = 0;

  function show(index){
    index = (index + items.length) % items.length;
    items.forEach((it,i)=>{
      it.classList.toggle('active', i===index);
      indicators[i] && indicators[i].classList.toggle('active', i===index);
      if(i===index){
        const img = it.querySelector('img');
        if(img && img.getAttribute('loading')==='lazy') img.loading = 'eager';
      }
    });
    current = index;
  }

  indicators.forEach((btn, idx)=>{
    btn.addEventListener('click', ()=> show(idx));
  });

  prevBtn && prevBtn.addEventListener('click', ()=> show(current-1));
  nextBtn && nextBtn.addEventListener('click', ()=> show(current+1));

  // Auto slide
  let interval = setInterval(()=> show(current+1), 5000);
  carousel.addEventListener('mouseenter', ()=> clearInterval(interval));
  carousel.addEventListener('mouseleave', ()=> { interval = setInterval(()=> show(current+1), 5000); });

  // keyboard
  document.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowLeft') show(current-1);
    if(e.key==='ArrowRight') show(current+1);
  });
}
