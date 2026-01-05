export default function initModal(){
  let currentIndex = 0;
  let images = [];

  // build modal DOM
  const modal = document.createElement('div');
  modal.className = 'nc-modal';
  modal.innerHTML = `
    <div class="nc-modal-content" role="dialog" aria-modal="true">
      <button class="nc-close" aria-label="Fermer">&times;</button>
      <button class="nc-prev" aria-label="Précédent">‹</button>
      <div class="nc-media"><div class="nc-frame"><img alt="" src=""></div></div>
      <button class="nc-next" aria-label="Suivant">›</button>
    </div>
  `;
  document.body.appendChild(modal);

  const imgEl = modal.querySelector('img');
  const prevBtn = modal.querySelector('.nc-prev');
  const nextBtn = modal.querySelector('.nc-next');
  const closeBtn = modal.querySelector('.nc-close');

  function show(index){
    currentIndex = (index + images.length) % images.length;
    const info = images[currentIndex];
    imgEl.src = info.src;
    const srcset = info.srcset;
    if(srcset) imgEl.setAttribute('srcset', srcset); else imgEl.removeAttribute('srcset');
    imgEl.alt = info.alt || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close(){ modal.classList.remove('open'); document.body.style.overflow = ''; }

  prevBtn.addEventListener('click', ()=> show(currentIndex-1));
  nextBtn.addEventListener('click', ()=> show(currentIndex+1));
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e)=>{ if(!e.target.closest('.nc-modal-content')) close(); });

  document.addEventListener('keydown', (e)=>{
    if(!modal.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') show(currentIndex-1);
    if(e.key==='ArrowRight') show(currentIndex+1);
  });

  // simple touch support
  let startX = null;
  modal.addEventListener('touchstart', (e)=> { startX = e.touches[0].clientX; });
  modal.addEventListener('touchend', (e)=>{
    if(startX===null) return; const dx = (e.changedTouches[0].clientX - startX);
    if(Math.abs(dx)>50){ if(dx>0) show(currentIndex-1); else show(currentIndex+1); }
    startX = null;
  });

  // listen to gallery open event
  document.addEventListener('nc:open-modal', (e)=>{
    images = e.detail.images || [];
    show(e.detail.index || 0);
  });
}
