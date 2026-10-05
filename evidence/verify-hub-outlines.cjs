const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
const base=process.env.SITE_BASE||'file:///'+process.cwd().replaceAll('\\','/');
const out='evidence/'+(process.env.SITE_BASE?'test-output-live':'test-output');fs.mkdirSync(out,{recursive:true});
for(const width of [390,1440]){
const page=await browser.newPage({viewport:{width,height:1000}});
await page.goto(base+'/'+(process.env.SITE_BASE?'':'index.html'));
if(await page.locator('.hub-springboard .hub-metal-edge').count()!==4)throw Error('Outline scope differs from four requested hubs');
for(const [kind,href] of [['current','services/'],['trailhead','parks/'],['docket','government/'],['compass','history/']]){
const link=page.locator('.hub-'+kind),edge=link.locator('.hub-metal-edge');
if(await link.getAttribute('href')!==href)throw Error('Hub destination changed');
await link.scrollIntoViewIfNeeded();await page.waitForTimeout(400);
const style=await edge.evaluate(el=>({thickness:getComputedStyle(el).paddingTop,mask:getComputedStyle(el).maskComposite,pointer:getComputedStyle(el).pointerEvents}));
if(style.thickness!=='1.5px'||!style.mask.includes('exclude')||style.pointer!=='none')throw Error('Outline thickness, mask or click behavior incorrect: '+JSON.stringify(style));
const frames=[];
for(const time of [0,2300]){
await edge.evaluate((el,time)=>{const a=el.getAnimations()[0];a.pause();a.currentTime=time;},time);
frames.push(await link.screenshot({path:out+'/hub-outline-'+kind+'-'+width+'-'+time+'.png'}));
}
if(frames[0].equals(frames[1]))throw Error('No visible metallic shimmer');
await page.keyboard.press('Tab');await link.focus();
if(await link.evaluate(el=>getComputedStyle(el).outlineStyle)==='none')throw Error('Missing keyboard focus');
await page.emulateMedia({reducedMotion:'reduce'});
if(await edge.evaluate(el=>getComputedStyle(el).animationName)!=='none')throw Error('Reduced-motion edge still animated');
await page.emulateMedia({reducedMotion:'no-preference'});
await link.evaluate(el=>el.blur());
console.log(JSON.stringify({width,kind,href,...style,shimmer:'passed',focus:'passed',reducedMotion:'passed'}));
}
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Page overflow');
await page.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
