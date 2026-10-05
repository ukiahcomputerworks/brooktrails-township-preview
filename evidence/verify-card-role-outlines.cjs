const {chromium}=require('playwright');const fs=require('node:fs');
(async()=>{
 const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});const live=process.env.SITE_BASE;
 const base=live||'file:///'+process.cwd().replaceAll('\\','/');const out='evidence/'+(live?'test-output-live':'test-output');fs.mkdirSync(out,{recursive:true});const matrix=[];
 for(const width of [390,1440])for(const route of ['','services','water','parks','planning','moving','government','history','resources','archive','contact']){
  const p=await b.newPage({viewport:{width,height:1000}});await p.goto(base+'/'+route+(live?'/':route?'/index.html':'index.html'));await p.mouse.move(0,0);
  const cards=p.locator('.metal-outline-card');
  const audit=await cards.evaluateAll(es=>es.map(e=>{const edges=e.querySelectorAll(':scope>.hub-metal-edge'),s=edges[0]?getComputedStyle(edges[0]):null;return {role:e.className,edges:edges.length,hidden:edges[0]?.getAttribute('aria-hidden'),thickness:s?.paddingTop,pointer:s?.pointerEvents,mask:s?.maskComposite};}));
  if(audit.some(e=>e.edges!==1||e.hidden!=='true'||e.thickness!=='1.5px'||e.pointer!=='none'||!e.mask.includes('exclude')))throw Error('Card edge mismatch '+route+' '+width+JSON.stringify(audit));
  if(await p.locator('.nav-list .hub-metal-edge,.text-link .hub-metal-edge,.document-list .hub-metal-edge,.source-archive summary .hub-metal-edge').count())throw Error('Outline leaked into unrelated role');
  const roles={};for(const card of audit)roles[card.role]=(roles[card.role]||0)+1;matrix.push({route:route||'home',width,cards:audit.length,roles});
  if(route==='government'){
   const members=p.locator('.board-member');if(await members.count()!==5)throw Error('Board rows changed');
   for(let i=0;i<5;i++){const row=members.nth(i),trigger=row.locator('button');await trigger.click();if(await trigger.getAttribute('aria-expanded')!=='true')throw Error('Portrait toggle failed');const portrait=row.locator('.board-member-portrait');if(await portrait.getAttribute('aria-hidden')!=='false')throw Error('Portrait hidden');await p.mouse.move(0,0);await trigger.evaluate(e=>e.blur());await p.keyboard.press('Escape');}
   await p.addStyleTag({content:'.site-header{visibility:hidden}.reveal-ready{opacity:1!important;transform:none!important;transition:none!important}'});
   await p.mouse.move(0,0);await p.evaluate(()=>document.activeElement?.blur());await p.waitForTimeout(250);
   await members.first().scrollIntoViewIfNeeded();await p.locator('.board-member-list').screenshot({path:out+'/board-outlines-'+width+'.png'});
   const edge=members.first().locator(':scope>.hub-metal-edge');const frames=[];for(const t of [0,2300]){await edge.evaluate((e,t)=>{const a=e.getAnimations()[0];a.pause();a.currentTime=t},t);frames.push(await members.first().screenshot());}if(frames[0].equals(frames[1]))throw Error('No visible Board shimmer');
  }
  if(route==='parks'){await p.locator('#parks-tab-gather').click();await p.locator('[data-gather-choice="grove"]').click();if(await p.locator('[data-gather-choice="grove"]').getAttribute('aria-pressed')!=='true')throw Error('Venue selection changed');}
  await p.emulateMedia({reducedMotion:'reduce'});if(await cards.locator(':scope>.hub-metal-edge').evaluateAll(es=>es.some(e=>getComputedStyle(e).animationName!=='none')))throw Error('Reduced motion still animates');
  if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+route+' '+width);await p.close();
 }
 fs.writeFileSync(out+'/card-outline-matrix.json',JSON.stringify(matrix,null,2));console.log(JSON.stringify(matrix));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
