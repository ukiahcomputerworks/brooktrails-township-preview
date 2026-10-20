const {chromium}=require('playwright');
const fs=require('fs');
(async()=>{
const phase=process.env.DENSITY_PHASE||'before',live=process.env.SITE_BASE;
const root=process.cwd(),out='evidence/test-output/density';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const routes=['','services/','water/','parks/','planning/','moving/','government/','history/','resources/','ordinance-63/','contact/','404.html','deliverables/town-manager-proposal.html','deliverables/content-migration-review.html'];
const results=[];
for(const width of [1440,768,390,320]){
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
 for(const route of routes){
 await page.goto(live?live+'/'+route:'file:///'+root.replaceAll('\\','/')+'/'+route+(route.endsWith('.html')?'':'index.html'));
 await page.addStyleTag({content:'.reveal-ready{opacity:1!important;transform:none!important}'});
 const metrics=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,sections:[...document.querySelectorAll('.home-hero,.page-hero,.section,.intent-section,.landscape-band,.history-band,.library-search-stage,.site-footer')].map(e=>({class:e.className,height:Math.round(e.getBoundingClientRect().height),top:parseFloat(getComputedStyle(e).paddingTop),bottom:parseFloat(getComputedStyle(e).paddingBottom)})),components:[...document.querySelectorAll('.story-deck-stage,.service-card,.hub-springboard,.document-row')].map(e=>({class:e.className,height:Math.round(e.getBoundingClientRect().height),minHeight:getComputedStyle(e).minHeight})),roles:['h1','h2','p','.button'].map(s=>{const e=document.querySelector(s);return e?{selector:s,font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize,line:getComputedStyle(e).lineHeight}:null})}));
 results.push({route:route||'home',width,...metrics});
 if(phase!=='before'&&metrics.overflow)throw Error('Overflow '+route+' '+width);
 if(phase!=='before'&&metrics.sections.some(e=>e.top>16.1||e.bottom>16.1))throw Error('Excess padding '+route+' '+width);
 if([1440,390,320].includes(width))await page.screenshot({path:out+'/'+phase+'-'+(route||'home').replaceAll('/','_')+'-'+width+'.png',fullPage:true});
 }
 await page.close();
}
fs.writeFileSync(out+'/'+phase+'.json',JSON.stringify(results,null,2));await browser.close();console.log(phase+': '+results.length+' route/viewport checks');
})().catch(e=>{console.error(e);process.exit(1)});
