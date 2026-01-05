export default function initGallery(){
  const gallery = document.querySelector('.gallery');
  if(!gallery) return;
  // make sure gallery is visible
  if(gallery.style.display === 'none') gallery.style.display = '';

  const items = Array.from(gallery.querySelectorAll('.gallery-item'));
  // ensure row wrapper exists (mimic mauGallery behavior)
  let row = gallery.querySelector('.gallery-items-row');
  if(!row){ row = document.createElement('div'); row.className = 'gallery-items-row row'; gallery.appendChild(row); }

  // wrap items in .item-column if not already wrapped
  items.forEach((img)=>{
    if(img.closest('.item-column')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'item-column mb-4';
    img.replaceWith(wrapper);
    wrapper.appendChild(img);
    row.appendChild(wrapper);
  });

  // refresh items list to the images inside wrappers
  const imgs = Array.from(gallery.querySelectorAll('.gallery-item'));

  // collect tags
  const tags = new Set();
  imgs.forEach((img)=>{ const t = img.dataset.galleryTag; if(t) tags.add(t); });

  // build tags bar
  if(tags.size>0){
    const ul = document.createElement('ul');
    ul.className = 'my-4 tags-bar nav nav-pills';
    const liAll = document.createElement('li'); liAll.className='nav-item';
    const spanAll = document.createElement('span'); spanAll.className='nav-link active active-tag'; spanAll.dataset.imagesToggle='all'; spanAll.textContent='Tous';
    liAll.appendChild(spanAll); ul.appendChild(liAll);
    Array.from(tags).forEach(tag=>{
      const li = document.createElement('li'); li.className='nav-item';
      const sp = document.createElement('span'); sp.className='nav-link'; sp.dataset.imagesToggle=tag; sp.textContent=tag;
      li.appendChild(sp); ul.appendChild(li);
    });
    // place tags bar above the row wrapper to match original layout
    gallery.insertBefore(ul, row);

    // filter handler
    ul.addEventListener('click', (e)=>{
      const target = e.target.closest('.nav-link');
      if(!target) return;
      if(target.classList.contains('active-tag')) return;
      ul.querySelectorAll('.active-tag').forEach(n=>n.classList.remove('active','active-tag'));
      target.classList.add('active','active-tag');
      const tag = target.dataset.imagesToggle;
      imgs.forEach(img=>{
        const parent = img.closest('.item-column');
        const shouldShow = tag==='all' || img.dataset.galleryTag===tag;
        if(parent) parent.style.display = shouldShow ? '' : 'none';
        else img.style.display = shouldShow ? '' : 'none';
      });
    });
  }

  // set attributes and listeners on images
  imgs.forEach((img, idx)=>{
    img.setAttribute('tabindex','0');
    img.dataset.index = idx;
    img.addEventListener('click', ()=>{
      // Build the list of currently visible images (respecting filters)
      const visibleImgs = imgs.filter(i=>{
        const parent = i.closest('.item-column');
        const el = parent || i;
        return window.getComputedStyle(el).display !== 'none';
      });
      const images = visibleImgs.map(i=>({src:i.src, srcset:i.getAttribute('srcset'), alt:i.alt}));
      const visibleIndex = visibleImgs.findIndex(i=>i===img);
      document.dispatchEvent(new CustomEvent('nc:open-modal',{detail:{images, index:visibleIndex}}));
    });
    img.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') img.click(); });
  });
}
