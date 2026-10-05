const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
 const live=process.env.SITE_BASE;
 const base=live||'file:///'+process.cwd().replaceAll('\\','/');
 const out='evidence/'+(live?'test-output-live':'test-output');fs.mkdirSync(out,{recursive:true});
 const results=[];
 for(const width of [390,1440])for(const route of ['','services','water','parks','planning','moving','government','history','resources','archive','contact']){
  const page=await browser.newPage({viewport:{width,height:1000}});
  await page.goto(base+'/'+route+(live?'/':(route?'/index.html':'index.html')));
  await page.evaluate(()=>{const style=document.createElement('style');style.textContent='.reveal-ready{opacity:1!important;transform:none!important;transition:none!important}';document.head.append(style);});
  const metrics=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,sections:[...document.querySelectorAll('.page-hero,.section,.landscape-band,.history-band,.site-footer')].map(e=>({class:e.className,height:Math.round(e.getBoundingClientRect().height),top:getComputedStyle(e).paddingTop,bottom:getComputedStyle(e).paddingBottom})),heroMinimum:document.querySelector('.page-hero-grid')?getComputedStyle(document.querySelector('.page-hero-grid')).minHeight:null}));
  if(metrics.overflow)throw Error('Horizontal overflow '+route+' '+width);
  if(!process.env.SPACING_BASELINE){
   for(const s of metrics.sections.filter(s=>s.class.includes('page-hero')||s.class.split(' ').includes('section'))){if(parseFloat(s.top)>73)throw Error('Excess section padding '+route+' '+width+' '+JSON.stringify(s));}
   const empty=await page.locator('.story-deck-stage').evaluateAll(es=>es.some(e=>getComputedStyle(e).minHeight==='544px'));if(empty)throw Error('Forced mobile empty stage '+route);
  }
  await page.screenshot({path:out+'/spacing-'+(route||'home')+'-'+width+'.png',fullPage:true});
  results.push({route:route||'home',width,...metrics});await page.close();
 }
 fs.writeFileSync(out+'/spacing-report'+(process.env.SPACING_BASELINE?'-before':'')+'.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results.map(({route,width,height,overflow})=>({route,width,height,overflow})),null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
