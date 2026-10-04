const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
const base=process.env.SITE_BASE||'file:///'+process.cwd().replaceAll('\\','/');
for(const width of [390,1080,1440]){
const p=await b.newPage({viewport:{width,height:width===1080?583:900}});
await p.goto(base+'/parks/'+(process.env.SITE_BASE?'':'index.html')+'#parks-panel-story');
if(await p.locator('.story-deck-parks [role=tab]').count()!==4)throw Error('Duplicate Parks choice remains');
const panel=p.locator('#parks-panel-care');
if(!await panel.isVisible())throw Error('Legacy stewardship hash lost');
if(await p.locator('#parks-panel-story').count())throw Error('Duplicate panel remains');
await panel.screenshot({path:'evidence/'+(process.env.SITE_BASE?'test-output-live':'test-output')+'/steward-'+width+'.png'});
await panel.locator('summary').click();
if(await panel.locator('.story-deck-links a:visible').count()!==3)throw Error('Underlying records lost');
if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow');
console.log(JSON.stringify({width,choices:4,records:3,legacyHash:'passed'}));
await p.close();
}
await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
