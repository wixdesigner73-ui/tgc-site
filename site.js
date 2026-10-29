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
