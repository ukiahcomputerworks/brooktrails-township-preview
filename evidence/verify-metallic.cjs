const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
 const base=process.env.SITE_BASE || 'file:///'+process.cwd().replaceAll('\\','/');
 const out='evidence/'+(process.env.SITE_BASE?'test-output-live':'test-output');
 fs.mkdirSync(out,{recursive:true});
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const route of ['parks','contact']){
   await page.goto(base+'/'+route+'/'+(process.env.SITE_BASE?'':'index.html')+(route==='parks'?'#parks-panel-gather':''));
   const button=page.locator(route==='parks'?'.gather-ticket:visible':'.district-desk-course');
   if(await button.locator('a,button').count())throw Error('Nested action');
   const href=await button.getAttribute('href');
   if(route==='contact'&&href!=='tel:+17074596761')throw Error('Call target changed');
   const style=await button.evaluate(el=>({background:getComputedStyle(el).backgroundImage,animation:getComputedStyle(el,'::before').animationName}));
   if(!style.background.includes('linear-gradient')||style.animation!=='emerald-metal-sweep')throw Error('Metal treatment missing');
   await button.screenshot({path:out+'/metallic-'+route+'-'+width+'.png'});
   await page.emulateMedia({reducedMotion:'reduce'});
   if(await button.evaluate(el=>getComputedStyle(el,'::before').animationName)!=='none')throw Error('Reduced motion failure');
   await page.emulateMedia({reducedMotion:'no-preference'});
   console.log(JSON.stringify({width,route,href,...style,reducedMotion:'passed'}));
  }
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
