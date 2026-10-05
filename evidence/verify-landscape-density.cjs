const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
const base=process.env.SITE_BASE||'file:///'+process.cwd().replaceAll('\\','/');
const out='evidence/'+(process.env.SITE_BASE?'test-output-live':'test-output');fs.mkdirSync(out,{recursive:true});
for(const width of [390,768,1440]){
const p=await b.newPage({viewport:{width,height:1000}});
await p.goto(base+'/'+(process.env.SITE_BASE?'':'index.html'));
const section=p.locator('.landscape-band');
const stats=await section.locator('.stat-stack strong').allTextContents();
if(stats.join(',')!=='2,500,60,47')throw Error('Statistics changed');
const s=await section.evaluate(e=>({height:e.getBoundingClientRect().height,padding:getComputedStyle(e).paddingTop,rows:[...e.querySelectorAll('.stat-stack>div')].map(el=>({display:getComputedStyle(el).display,height:el.getBoundingClientRect().height})),overflow:document.documentElement.scrollWidth>innerWidth}));
if(s.overflow)throw Error('Overflow');
if(width<1024&&(s.padding!=='32px'||s.rows.some(x=>x.display!=='grid'||x.height>110)))throw Error('Mobile density regression '+JSON.stringify(s));
await section.screenshot({path:out+'/landscape-density-'+width+'.png'});
console.log(JSON.stringify({width,stats,...s}));await p.close();
}
await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
