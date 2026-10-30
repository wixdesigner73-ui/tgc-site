/* Shared by all inner pages. Wix replaces all of this with built-in menu + Wix Forms. */

/* Mobile menu */
(function(){
  const b=document.getElementById('menuBtn'), n=document.getElementById('nav');
  if(!b||!n) return;
  b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Close':'Menu'});
  n.addEventListener('click',e=>{if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded',false);b.textContent='Menu'}});
})();

/* Forms (preview only: in Wix these connect to Wix Forms / Contacts) */
document.querySelectorAll('form[data-form]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const email=form.querySelector('[name=email]'), consent=form.querySelector('[name=consent]'), err=form.querySelector('.err');
    if(!email.value || !email.checkValidity()){err.textContent='Enter an email address like name@example.com.';email.focus();return;}
    if(consent && !consent.checked){err.textContent='Tick the box so we can email you.';return;}
    err.textContent='';
    form.hidden=true;
    form.parentElement.querySelector('.thanks').hidden=false;
  });
});

/* Store: category filter */
(function(){
  const chips=[...document.querySelectorAll('.chip')], items=[...document.querySelectorAll('.product[data-cat]')];
  chips.forEach(c=>c.addEventListener('click',()=>{
    chips.forEach(x=>x.setAttribute('aria-pressed',x===c));
    items.forEach(p=>p.hidden=c.dataset.filter!=='all'&&p.dataset.cat!==c.dataset.filter);
  }));
})();

/* Store: product page (thumbnails, size, quantity, add to cart message) */
(function(){
  const main=document.getElementById('mainImg');
  if(!main) return;
  const thumbs=[...document.querySelectorAll('#thumbs button')];
  thumbs.forEach(t=>t.addEventListener('click',()=>{main.src=t.dataset.src;thumbs.forEach(x=>x.setAttribute('aria-current',x===t))}));
  const sizes=[...document.querySelectorAll('#sizes button')];
  sizes.forEach(s=>s.addEventListener('click',()=>sizes.forEach(x=>x.setAttribute('aria-pressed',x===s))));
  const out=document.getElementById('qtyOut');
  document.querySelectorAll('.qty [data-step]').forEach(b=>b.addEventListener('click',()=>{out.textContent=Math.max(1,+out.textContent+ +b.dataset.step)}));
  const add=document.getElementById('addBtn'), note=document.getElementById('addNote');
  add.addEventListener('click',()=>{
    const size=sizes.find(s=>s.getAttribute('aria-pressed')==='true');
    note.textContent=size?'Added to cart (preview only).':'Choose a size first.';
  });
})();
