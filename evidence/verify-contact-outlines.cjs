const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
 const base=process.env.SITE_BASE||'file:///'+process.cwd().replaceAll('\\','/');
 const out='evidence/'+(process.env.SITE_BASE?'test-output-live':'test-output');fs.mkdirSync(out,{recursive:true});
 for(const width of [390,1440]){
  const p=await b.newPage({viewport:{width,height:1000}});await p.goto(base+'/contact/'+(process.env.SITE_BASE?'':'index.html'));
  const cards=p.locator('.district-desk-channel');if(await cards.count()!==4)throw Error('Expected four contact cards');
  const expected=['tel:+17074592494','mailto:btcsd@btcsd.org',null,null];
  for(let i=0;i<4;i++){
   const card=cards.nth(i),edge=card.locator('.hub-metal-edge');
   if(await card.getAttribute('href')!==expected[i]||await edge.count()!==1)throw Error('Contact semantics or outline scope changed');
   if(await edge.getAttribute('aria-hidden')!=='true')throw Error('Decorative edge exposed');
   await card.scrollIntoViewIfNeeded();
   const s=await edge.evaluate(e=>({padding:getComputedStyle(e).paddingTop,mask:getComputedStyle(e).maskComposite,pointer:getComputedStyle(e).pointerEvents}));
   if(s.padding!=='1.5px'||!s.mask.includes('exclude')||s.pointer!=='none')throw Error('Incorrect edge '+JSON.stringify(s));
   const frames=[];for(const time of [0,2300]){await edge.evaluate((e,t)=>{const a=e.getAnimations()[0];a.pause();a.currentTime=t},time);frames.push(await card.screenshot({path:out+'/contact-edge-'+width+'-'+i+'-'+time+'.png'}));}
   if(frames[0].equals(frames[1]))throw Error('Shimmer not visible');
   if(i<2){await card.focus();if(await card.evaluate(e=>getComputedStyle(e).outlineStyle)==='none')throw Error('Missing focus');await card.evaluate(e=>e.blur());}
   else if(await card.getAttribute('tabindex')!==null||await card.evaluate(e=>getComputedStyle(e).cursor)==='pointer')throw Error('Informational card looks actionable');
   await p.emulateMedia({reducedMotion:'reduce'});if(await edge.evaluate(e=>getComputedStyle(e).animationName)!=='none')throw Error('Reduced motion animated');await p.emulateMedia({reducedMotion:'no-preference'});
  }
  if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow');
  await p.locator('.district-desk-channels').screenshot({path:out+'/contact-outlines-'+width+'.png'});console.log(JSON.stringify({width,cards:4,semantics:'preserved',shimmer:'passed',focus:'passed',reducedMotion:'passed',overflow:false}));await p.close();
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
