(function(){
var API = document.currentScript.src.replace('/widget.js','');
var dom = location.hostname;
var st = document.createElement('style');
st.textContent = '#aiw-btn,#aiw-box,#aiw-box *{cursor:auto!important}#aiw-btn{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:#2563eb;color:#fff;font-size:26px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:99999;box-shadow:0 4px 14px rgba(0,0,0,.25)}#aiw-box{position:fixed;right:20px;bottom:90px;width:320px;max-width:90vw;height:420px;background:#fff;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);display:none;flex-direction:column;z-index:99999;font-family:sans-serif}#aiw-head{background:#2563eb;color:#fff;padding:12px;border-radius:14px 14px 0 0;font-weight:600}#aiw-msgs{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px}.aiw-m{max-width:85%;padding:8px 10px;border-radius:10px;font-size:14px;line-height:1.4}.aiw-m.me{align-self:flex-end;background:#2563eb;color:#fff}.aiw-m.ai{align-self:flex-start;background:#f1f5f9;color:#111}#aiw-in{border:1px solid #ddd;border-radius:8px;padding:8px;margin:8px;font-size:14px}#aiw-in::placeholder{color:#94a3b8}#aiw-send{margin:0 8px 8px auto;display:block;background:#2563eb;color:#fff;border:0;border-radius:8px;padding:6px 14px;cursor:pointer}#aiw-lead{border-top:1px solid #eee;padding:8px;font-size:13px}#aiw-phone{width:60%;border:1px solid #ddd;border-radius:8px;padding:6px;font-size:13px}#aiw-phone-send{background:#16a34a;color:#fff;border:0;border-radius:8px;padding:6px 10px;cursor:pointer;margin-left:6px}';
document.head.appendChild(st);
var b = document.createElement('div'); b.id='aiw-btn'; b.textContent='💬'; document.body.appendChild(b);
var w = document.createElement('div'); w.id='aiw-box';
w.innerHTML = '<div id="aiw-head">Онлайн-консультант</div><div id="aiw-msgs"></div><input id="aiw-in" placeholder="Ваш вопрос..."><button id="aiw-send">Отправить</button><div id="aiw-lead">📞 Оставьте телефон — перезвоним: <input id="aiw-phone" placeholder="+7..."><button id="aiw-phone-send">Ок</button></div>';
document.body.appendChild(w);
b.onclick = function(){ w.style.display = (w.style.display==='flex') ? 'none' : 'flex'; };
function add(t, cls){ var m=document.createElement('div'); m.className='aiw-m '+cls; m.textContent=t; document.getElementById('aiw-msgs').appendChild(m); m.scrollTop=99999; }
add('Здравствуйте! Я помощник, отвечаю мгновенно. Спрашивайте про цены и сроки.','ai');
function send(){
  var i=document.getElementById('aiw-in'); var t=i.value.trim(); if(!t) return; i.value=''; add(t,'me');
  fetch(API+'/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({domain:dom,text:t})})
  .then(function(r){return r.json()})
  .then(function(j){ add(j.off ? 'Консультант временно недоступен, позвоните нам по телефону.' : j.reply, 'ai'); })
  .catch(function(){ add('Нет связи. Оставьте телефон в форме ниже — перезвоним.','ai'); });
}
document.getElementById('aiw-send').onclick = send;
document.getElementById('aiw-in').onkeydown = function(e){ if(e.key==='Enter') send(); };
document.getElementById('aiw-phone-send').onclick = function(){
  var p=document.getElementById('aiw-phone').value.trim(); if(!p) return;
  fetch(API+'/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({domain:dom,phone:p})})
  .then(function(){ add('Спасибо! Скоро перезвоним.','ai'); document.getElementById('aiw-lead').style.display='none'; });
};
})();
