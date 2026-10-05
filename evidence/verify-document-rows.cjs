const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
 const live=process.env.SITE_BASE;const base=live||'file:///'+process.cwd().replaceAll('\\','/');const out='evidence/'+(live?'test-output-live':'test-output');fs.mkdirSync(out,{recursive:true});const matrix=[];
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:1000}});
  const go=route=>page.goto(base+'/'+route+(live?'/':'/index.html'));
  await go('resources');
  const rows=page.locator('[data-resource-item]');if(await rows.count()!==47)throw Error('Lost district files');
  const hrefs=await rows.locator('a').evaluateAll(es=>es.map(e=>e.getAttribute('href')));if(new Set(hrefs).size!==47)throw Error('Duplicate file rows');
  if(await page.locator('[data-document-group]').count()!==5)throw Error('Missing groups');
  if(await page.locator('[data-document-group][open]').count())throw Error('Browse groups not collapsed');
  await page.locator('[data-document-group]:not([hidden]) summary').first().focus();await page.keyboard.press('Enter');
  if(!await page.locator('[data-document-group]:not([hidden])').first().evaluate(e=>e.open))throw Error('Keyboard disclosure failed');
  await page.locator('[data-resource-search]').fill('water');
  const visible=await rows.locator('a:visible').count();if(!visible)throw Error('No direct search results');
  if(await page.locator('.document-group summary:visible').count())throw Error('Search requires group opening');
  await page.locator('[data-resource-search]').fill('zzzz-not-a-file');if(!await page.locator('[data-resource-empty]').isVisible())throw Error('Empty state missing');
  await page.locator('[data-resource-search]').fill('');if(await page.locator('[data-resource-heading]').textContent()!=='Forms & applications')throw Error('Heading did not restore');
  await page.locator('[data-resource-category="history"]').click();await page.waitForTimeout(750);
  await page.locator('[data-document-group]:not([hidden]) summary').first().click();
  await page.locator('.library-results').screenshot({path:out+'/document-groups-'+width+'.png'});
  await page.locator('[data-resource-search]').fill('water');await page.locator('.library-results').screenshot({path:out+'/document-search-'+width+'.png'});
  for(const route of ['resources','water','planning','government','parks']){
   await go(route);const documents=page.locator('.document-row');
   const audit=await documents.evaluateAll(es=>es.map(e=>({title:e.querySelector('strong')?.textContent,details:e.querySelector('small')?.textContent,edges:e.querySelectorAll(':scope>.hub-metal-edge').length,columns:getComputedStyle(e).gridTemplateColumns,small:getComputedStyle(e.querySelector('small')).display,animation:getComputedStyle(e.querySelector('.hub-metal-edge')).animationName})));
   if(!audit.length||audit.some(e=>!e.title||!/^(PDF|DOCX) · [\d.]+ (KB|MB)$/.test(e.details)||e.details.includes('0.0 MB')||e.edges!==1||e.small!=='block'))throw Error('Bad file anatomy '+route+JSON.stringify(audit));
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+route);
   await page.emulateMedia({reducedMotion:'reduce'});if(await documents.locator(':scope>.hub-metal-edge').evaluateAll(es=>es.some(e=>getComputedStyle(e).animationName!=='none')))throw Error('Reduced motion failed');await page.emulateMedia({reducedMotion:'no-preference'});
   matrix.push({route,width,rows:audit.length});
  }
  await page.close();
 }
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base+'/resources/'+(live?'':'index.html'));if(await nojs.locator('[data-resource-item]:visible').count()!==47)throw Error('No-JS files inaccessible');await nojs.close();
 fs.writeFileSync(out+'/document-row-matrix.json',JSON.stringify(matrix,null,2));console.log(JSON.stringify(matrix));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
