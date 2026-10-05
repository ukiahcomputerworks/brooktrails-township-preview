const {chromium}=require('playwright');const fs=require('node:fs');
(async()=>{
 const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});const live=process.env.SITE_BASE;
 const base=live||'file:///'+process.cwd().replaceAll('\\','/');const out='evidence/'+(live?'test-output-live':'test-output');fs.mkdirSync(out,{recursive:true});
 for(const width of [390,1440]){
  const p=await b.newPage({viewport:{width,height:1000}});await p.goto(base+'/resources/'+(live?'':'index.html'));
  const shelves=p.locator('.library-shelf');if(await shelves.count()!==7)throw Error('Expected seven shelves');
  for(let i=0;i<7;i++){
   const shelf=shelves.nth(i),edge=shelf.locator('.hub-metal-edge');await p.mouse.move(0,0);await shelf.scrollIntoViewIfNeeded();
   if(await edge.count()!==1||await edge.getAttribute('aria-hidden')!=='true')throw Error('Missing decorative edge');
   const s=await edge.evaluate(e=>({padding:getComputedStyle(e).paddingTop,mask:getComputedStyle(e).maskComposite,pointer:getComputedStyle(e).pointerEvents}));if(s.padding!=='1.5px'||!s.mask.includes('exclude')||s.pointer!=='none')throw Error('Wrong perimeter '+JSON.stringify(s));
   if(i===0){const frames=[];for(const t of [0,2300]){await edge.evaluate((e,t)=>{const a=e.getAnimations()[0];a.pause();a.currentTime=t},t);frames.push(await shelf.screenshot({path:out+'/shelf-edge-'+width+'-'+t+'.png'}));}if(frames[0].equals(frames[1]))throw Error('No visible glint');}
   await shelf.focus();if(await shelf.evaluate(e=>getComputedStyle(e).outlineStyle)==='none')throw Error('Missing keyboard focus');
   await shelf.click();if(await shelf.getAttribute('aria-pressed')!=='true'||await p.locator('.library-shelf[aria-pressed="true"]').count()!==1)throw Error('Selection changed');
   if(await p.locator('[data-resource-heading]').textContent()!==await shelf.locator('strong').textContent())throw Error('Heading mismatch');
   const count=String([15,22,27,19,14,16,17][i]);if((await p.locator('[data-resource-count]').textContent()).split(' ')[0]!==count)throw Error('Filter count changed');
   if(width===390){await p.waitForFunction(()=>document.querySelector('.library-results').getBoundingClientRect().top<300);if(!await p.locator('[data-resource-heading]').evaluate(e=>e===document.activeElement))throw Error('Result focus missing');}
   if(await shelf.evaluate(e=>getComputedStyle(e,'::before').zIndex)!=='5')throw Error('Selection glow hidden by metal edge');
  }
  await p.emulateMedia({reducedMotion:'reduce'});if(await shelves.first().locator('.hub-metal-edge').evaluate(e=>getComputedStyle(e).animationName)!=='none')throw Error('Reduced motion still animates');
  await p.waitForTimeout(700);await p.addStyleTag({content:'.site-header{visibility:hidden}'});
  await p.locator('.library-shelves').screenshot({path:out+'/shelf-outlines-'+width+'.png'});if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow');
  console.log(JSON.stringify({width,shelves:7,filterCounts:'preserved',selectedGlow:'passed',shimmer:'passed',focus:'passed',autoScroll:width===390?'passed':'mobile-only',reducedMotion:'passed',overflow:false}));await p.close();
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
