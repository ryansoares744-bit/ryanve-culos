// Camada de dados — usa a API (/api/*) quando disponível; senão, modo local automático.
window.RVAPI = (function () {
  const L = window.RVDADOS; // implementação local (fallback)
  function headers(){const s=L.getSessao();const h={'Content-Type':'application/json'};if(s&&s.token)h['Authorization']='Bearer '+s.token;return h;}
  const M = Object.assign({}, L, { __db:null, __local:false });

  M.init = function(){
    const ctl = new AbortController();
    const timer = setTimeout(()=>ctl.abort(), 6000);
    return fetch('/api/db',{headers:headers(),signal:ctl.signal})
      .then(r=>{clearTimeout(timer);if(!r.ok)throw new Error('api '+r.status);return r.json();})
      .then(db=>{db.contatos=db.contatos||[];db.veiculos=db.veiculos||[];M.__db=db;M.__local=false;return M;})
      .catch(()=>{ // sem backend configurado → modo local (localStorage)
        clearTimeout(timer);
        console.warn('RVAPI: backend indisponível — usando modo local.');
        M.__db=L.loadDB();M.__local=true;return M;
      });
  };
  M.loadDB=function(){return M.__db;};
  M.saveDB=function(db){
    M.__db=db;
    if(M.__local){L.saveDB(db);return;}
    fetch('/api/db',{method:'POST',headers:headers(),body:JSON.stringify(db)})
      .then(r=>{if(r.ok)return;return r.text().then(t=>{alert('Erro ao salvar ('+r.status+'): '+t.slice(0,300)+'\n\nTire um print desta mensagem.');});})
      .catch(e=>alert('Sem conexão com o servidor: '+e));
  };
  M.resetDB=function(){
    if(M.__local){const db=L.resetDB();M.__db=db;return Promise.resolve(db);}
    return fetch('/api/db?reset=1',{method:'POST',headers:headers()})
      .then(r=>{if(!r.ok)throw new Error('reset');return r.json();})
      .then(db=>{db.contatos=db.contatos||[];M.__db=db;return db;});
  };
  M.addContato=function(db,c){
    db.contatos.unshift(Object.assign({id:Date.now(),data:Date.now(),statusAt:'novo',obs:''},c));
    if(M.__local){L.saveDB(db);return;}
    fetch('/api/contato',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(c)}).catch(()=>{});
  };
  M.hit=function(veiculoId){
    if(M.__local){L.saveDB(M.__db);return;}
    fetch('/api/hit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({veiculoId:veiculoId||null})}).catch(()=>{});
  };
  M.login=function(email,senha){
    if(M.__local){
      const cfg=M.__db.config;
      if(email.toLowerCase()===cfg.adminEmail.toLowerCase()&&senha===cfg.adminSenha){
        const s={email,em:Date.now()};L.setSessao(s);return Promise.resolve(s);
      }
      return Promise.reject(new Error('login'));
    }
    return fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,senha})})
      .then(r=>{if(!r.ok)throw new Error('login');return r.json();})
      .then(s=>{L.setSessao(s);return s;});
  };
  // Comprime a foto; com backend envia ao servidor, sem backend guarda localmente
  M.comprimirImagem=function(file,cb){
    L.comprimirImagem(file,(dataUrl)=>{
      if(M.__local){cb(dataUrl);return;}
      fetch('/api/upload',{method:'POST',headers:headers(),body:JSON.stringify({data:dataUrl,name:file.name||'foto.jpg'})})
        .then(r=>{if(!r.ok)return r.text().then(t=>{throw new Error('('+r.status+') '+t.slice(0,300));});return r.json();})
        .then(j=>cb(j.url))
        .catch(e=>{alert('Falha no upload da foto: '+e.message+'\n\nTire um print desta mensagem. A foto foi guardada temporariamente no navegador.');cb(dataUrl);});
    });
  };
  return M;
})();
