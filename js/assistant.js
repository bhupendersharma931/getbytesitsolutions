/* GetBytes Assistant — self-contained chat widget.
   Works with NO backend (smart scripted answers).
   To enable real AI: deploy the backend in /backend and set ASSISTANT_ENDPOINT below. */
(function () {
  var ASSISTANT_ENDPOINT = ""; // e.g. "https://api.getbytesitsolutions.com/assistant"  (leave "" for scripted mode)

  // ---------- styles ----------
  var css = document.createElement("style");
  css.textContent = `
  .gb-launch{position:fixed;right:18px;bottom:18px;z-index:140;height:54px;padding:0 18px;border:none;border-radius:30px;
    background:var(--red,#E5331F);color:#fff;font-family:var(--mono,monospace);font-weight:700;font-size:.9rem;cursor:pointer;
    display:flex;align-items:center;gap:9px;box-shadow:0 12px 30px -8px rgba(0,0,0,.5);transition:transform .2s}
  .gb-launch:hover{transform:translateY(-2px)}
  .gb-launch .blink{width:9px;height:16px;background:#fff;display:inline-block;animation:gbbl 1.1s steps(1) infinite}
  @keyframes gbbl{50%{opacity:0}}
  .gb-panel{position:fixed;right:18px;bottom:84px;z-index:141;width:min(380px,calc(100vw - 36px));height:min(540px,70vh);
    background:var(--surface,#11161D);border:1px solid var(--line,#222B36);border-radius:16px;display:none;flex-direction:column;
    overflow:hidden;box-shadow:0 24px 60px -20px rgba(0,0,0,.6);font-family:var(--body,system-ui)}
  .gb-panel.open{display:flex}
  .gb-head{display:flex;align-items:center;gap:10px;padding:14px 16px;background:var(--titlebar,#161B22);border-bottom:1px solid var(--line,#222B36)}
  .gb-head .d{width:10px;height:10px;border-radius:50%;background:#27c93f}
  .gb-head b{font-family:var(--mono,monospace);font-size:.9rem;color:var(--text,#E6EDF3)}
  .gb-head .x{margin-left:auto;background:none;border:0;color:var(--muted,#8B98A8);font-size:1.3rem;cursor:pointer;line-height:1}
  .gb-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
  .gb-m{max-width:85%;padding:10px 13px;border-radius:12px;font-size:.92rem;line-height:1.5}
  .gb-bot{align-self:flex-start;background:var(--editor,#0D1117);border:1px solid var(--line,#222B36);color:var(--text,#E6EDF3)}
  .gb-user{align-self:flex-end;background:var(--red,#E5331F);color:#fff}
  .gb-m a{color:var(--blue-deep,#3B9BF0);text-decoration:underline}
  .gb-bot a{color:var(--red,#E5331F)}
  .gb-chips{display:flex;flex-wrap:wrap;gap:7px;padding:0 16px 10px}
  .gb-chips button{background:transparent;border:1px solid var(--line,#222B36);color:var(--muted,#8B98A8);font-family:var(--mono,monospace);
    font-size:.76rem;padding:6px 11px;border-radius:20px;cursor:pointer}
  .gb-chips button:hover{color:var(--text);border-color:var(--red,#E5331F)}
  .gb-input{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line,#222B36)}
  .gb-input input{flex:1;background:var(--bg,#0B0F14);border:1px solid var(--line,#222B36);border-radius:8px;padding:11px 12px;
    color:var(--text,#E6EDF3);font-family:var(--body,system-ui);font-size:.92rem}
  .gb-input input:focus{outline:none;border-color:var(--red,#E5331F)}
  .gb-input button{background:var(--red,#E5331F);color:#fff;border:0;border-radius:8px;padding:0 16px;font-weight:700;cursor:pointer;font-family:var(--mono,monospace)}
  `;
  document.head.appendChild(css);

  // nudge WhatsApp button up so they stack
  var bumpWA = function () { var w = document.querySelector(".wa-fab"); if (w) w.style.bottom = "150px"; };

  // ---------- knowledge base (scripted mode) ----------
  var KB = [
    { k:["hi","hello","hey","hii","namaste"], a:"Hi! I'm the GetBytes assistant 👋 Ask me about our <b>services</b>, <b>pricing</b>, <b>technologies</b>, or how to <b>contact</b> us." },
    { k:["service","services","offer","do you","what do"], a:"We build: <b>Web Applications</b>, <b>Mobile Apps</b>, <b>ERP &amp; Management</b> systems, <b>SEO &amp; Marketing</b>, <b>Web Hosting</b>, and <b>Custom Software</b>. See <a href='services.html'>Services</a>." },
    { k:["price","pricing","cost","budget","quote","charge","rate"], a:"Starter sites start around <b>₹14,999</b>, Business/e-commerce around <b>₹39,999</b>, and Enterprise/ERP is custom. Try our <a href='quote.html'>quote calculator</a> for an instant estimate." },
    { k:["web","website","cms","ecommerce","e-commerce"], a:"We build custom websites, CMS and e-commerce platforms that are fast, secure and SEO-ready. More on <a href='service-web.html'>Web Applications</a>." },
    { k:["mobile","app","android","ios","flutter"], a:"We build native &amp; cross-platform Android and iOS apps. More on <a href='service-mobile.html'>Mobile Apps</a>." },
    { k:["erp","school","college","hospital","institute","management"], a:"We build ERP and management systems for schools, colleges, hospitals and institutes — tailored to your workflow. Tell us your needs via <a href='contact.html'>Contact</a>." },
    { k:["seo","marketing","traffic","google","rank"], a:"We do technical SEO, content and paid campaigns to grow qualified traffic. More on <a href='service-seo.html'>SEO &amp; Marketing</a>." },
    { k:["host","hosting","server","uptime","ssl"], a:"Reliable, secured hosting with 99.9% uptime, SSL and daily backups. More on <a href='service-hosting.html'>Web Hosting</a>." },
    { k:["tech","stack","technolog","language","framework"], a:"Our stack includes <b>.NET / C#</b>, <b>React</b>, <b>Node.js</b>, <b>PHP/Laravel</b>, <b>Java</b>, <b>Flutter</b> and <b>SQL Server</b>." },
    { k:["contact","email","reach","talk","call","phone","whatsapp"], a:"Email <a href='mailto:info@getbytesitsolutions.com'>info@getbytesitsolutions.com</a> or use the <a href='contact.html'>Contact</a> page. We reply within one business day." },
    { k:["time","long","duration","deliver","timeline","weeks"], a:"Most websites take 2–4 weeks; larger web apps and ERP systems are scoped individually after a quick discovery call." },
    { k:["where","location","delhi","based","office"], a:"We're based in <b>Delhi, India</b>, working with clients across the country." },
    { k:["who","about","company"], a:"GetBytes IT Solutions is a Delhi-based software studio building web, mobile and enterprise software. More on <a href='about.html'>About</a>." }
  ];
  function reply(text) {
    var t = text.toLowerCase();
    for (var i=0;i<KB.length;i++){ for (var j=0;j<KB[i].k.length;j++){ if (t.indexOf(KB[i].k[j])!==-1) return KB[i].a; } }
    return "I'm not sure about that one — but a human can help! Email <a href='mailto:info@getbytesitsolutions.com'>info@getbytesitsolutions.com</a> or use the <a href='contact.html'>Contact</a> page. You can also ask me about services, pricing, technologies or timelines.";
  }

  // ---------- build UI ----------
  var launch = document.createElement("button");
  launch.className = "gb-launch"; launch.innerHTML = '<span class="blink"></span> Ask GetBytes';
  var panel = document.createElement("div"); panel.className = "gb-panel";
  panel.innerHTML =
    '<div class="gb-head"><span class="d"></span><b>GetBytes Assistant</b><button class="x" aria-label="Close">×</button></div>'+
    '<div class="gb-msgs"></div>'+
    '<div class="gb-chips"><button>Services</button><button>Pricing</button><button>Technologies</button><button>Contact</button></div>'+
    '<div class="gb-input"><input type="text" placeholder="Type a message…" aria-label="Message"><button>Send</button></div>';
  document.body.appendChild(launch); document.body.appendChild(panel);

  var msgs = panel.querySelector(".gb-msgs");
  var input = panel.querySelector(".gb-input input");
  var history = [];
  function add(text, who){ var m=document.createElement("div"); m.className="gb-m "+(who==="user"?"gb-user":"gb-bot"); m.innerHTML=text; msgs.appendChild(m); msgs.scrollTop=msgs.scrollHeight; }

  function botAnswer(text){
    if (ASSISTANT_ENDPOINT){
      add("…","bot"); var thinking=msgs.lastChild;
      fetch(ASSISTANT_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message:text,history:history})})
        .then(function(r){return r.json();}).then(function(d){ thinking.innerHTML=(d.reply||reply(text)); })
        .catch(function(){ thinking.innerHTML=reply(text); })
        .finally(function(){ history.push({role:"assistant",content:thinking.textContent}); });
    } else {
      setTimeout(function(){ add(reply(text),"bot"); }, 250);
    }
  }
  function send(text){ text=(text||input.value).trim(); if(!text) return; add(text,"user"); history.push({role:"user",content:text}); input.value=""; botAnswer(text); }

  launch.addEventListener("click", function(){
    panel.classList.toggle("open"); bumpWA();
    if (panel.classList.contains("open") && !msgs.childNodes.length){
      add("Hi! I'm the GetBytes assistant. How can I help with your project today?","bot");
    }
  });
  panel.querySelector(".x").addEventListener("click", function(){ panel.classList.remove("open"); var w=document.querySelector(".wa-fab"); if(w) w.style.bottom="18px"; });
  panel.querySelector(".gb-input button").addEventListener("click", function(){ send(); });
  input.addEventListener("keydown", function(e){ if(e.key==="Enter") send(); });
  panel.querySelectorAll(".gb-chips button").forEach(function(b){ b.addEventListener("click", function(){ send(b.textContent); }); });
})();
