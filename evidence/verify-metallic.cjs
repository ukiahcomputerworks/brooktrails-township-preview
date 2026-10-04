const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
 const base=process.env.SITE_BASE || 'file:///'+process.cwd().replaceAll('\\','/');
 const out='evidence/'+(process.env.SITE_BASE?'test-output-live':'test-output');
 fs.mkdirSync(out,{recursive:true});
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const route of ['','services','water','parks','planning','government','history','moving','resources','contact']){
   await page.goto(base+'/'+(route?route+'/':'')+(process.env.SITE_BASE?'':'index.html'));
   const wrong=await page.locator('.button').evaluateAll(els=>els.filter(el=>!getComputedStyle(el).backgroundImage.includes('rgb(237, 255, 207)')||getComputedStyle(el,'::before').animationName!=='emerald-metal-sweep').length);
   if(wrong)throw Error('Unmatched shared button on '+route);
  }
  await page.goto(base+'/parks/'+(process.env.SITE_BASE?'':'index.html')+'#parks-panel-golf');
  await page.waitForTimeout(3500);
  const golf=page.locator('.golf-phone');
  if(await golf.evaluate(el=>getComputedStyle(el).position)!=='absolute')throw Error('Golf reveal position changed');
  if(!await golf.evaluate(el=>getComputedStyle(el).backgroundImage.includes('rgb(237, 255, 207)')))throw Error('Golf metal missing');
  await golf.screenshot({path:out+'/metallic-golf-'+width+'.png'});
  for(const route of ['parks','contact']){
   await page.goto(base+'/'+route+'/'+(process.env.SITE_BASE?'':'index.html')+(route==='parks'?'#parks-panel-gather':''));
   if(route==='parks')await page.reload();
   if(route==='parks'){
    if(await page.locator('[data-gather-detail]>small').evaluateAll(es=>es.some(e=>e.textContent!=='Rent The')))throw Error('Rental label mismatch');
   }
   const button=page.locator(route==='parks'?'.gather-ticket:visible':'.district-desk-course');
   if(route==='contact'&&await page.locator('.secure-contact-note').count())throw Error('Removed contact callout remains');
   if(await button.locator('a,button').count())throw Error('Nested action');
   const href=await button.getAttribute('href');
   if(route==='contact'&&href!=='tel:+17074596761')throw Error('Call target changed');
   const style=await button.evaluate(el=>({background:getComputedStyle(el).backgroundImage,animation:getComputedStyle(el,'::before').animationName}));
   if(!style.background.includes('linear-gradient')||style.animation!=='emerald-metal-sweep')throw Error('Metal treatment missing');
   const frames=[];
   for(const time of [0,600]){
    await button.evaluate((el,time)=>{for(const a of el.getAnimations({subtree:true})){if(a.animationName==='emerald-metal-sweep'){a.pause();a.currentTime=time;}}},time);
    frames.push(await button.screenshot({path:out+'/metallic-'+route+'-'+width+'-'+time+'.png'}));
   }
   if(frames[0].equals(frames[1]))throw Error('Sweep produces no visible frame change');
   await page.emulateMedia({reducedMotion:'reduce'});
   if(await button.evaluate(el=>getComputedStyle(el,'::before').animationName)!=='none')throw Error('Reduced motion failure');
   await page.emulateMedia({reducedMotion:'no-preference'});
   console.log(JSON.stringify({width,route,href,...style,reducedMotion:'passed'}));
  }
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
