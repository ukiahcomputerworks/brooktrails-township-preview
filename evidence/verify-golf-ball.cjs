const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
const http=require('node:http');
(async()=>{
 const root=process.cwd();
 const server=http.createServer(async(req,res)=>{try{const name=decodeURIComponent(req.url.split('?')[0]);const file=path.join(root,name.endsWith('/')?name+'index.html':name);res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':file.endsWith('.png')?'image/png':'text/html');res.end(await fs.readFile(file));}catch{res.statusCode=404;res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
 try{
 for(const width of [390,768,1080,1440]){
 const page=await browser.newPage({viewport:{width,height:900}});
 await page.goto((process.env.SITE_BASE||`http://127.0.0.1:${server.address().port}`)+'/parks/');
 await page.locator('#parks-tab-golf').click();
 await page.locator('.golf-reveal').evaluate(e=>{e.classList.remove('is-playing');e.querySelector('.golf-phone').style.visibility='hidden';});
 const measure=await page.locator('.golf-reveal').evaluate(e=>{const p=e.querySelector('.golf-player').getBoundingClientRect(),b=e.querySelector('.golf-ball').getBoundingClientRect(),f=e.querySelector('.golf-flight').getBoundingClientRect();return {x:(b.left+b.width/2-p.left)/p.width,y:(b.top+b.height/2-p.top)/p.height,ballLeft:b.left,ballBottom:b.bottom,flightLeft:f.left,overflow:document.documentElement.scrollWidth>innerWidth};});
 if(Math.abs(measure.x-1.015)>.005||Math.abs(measure.y-.9)>.005||measure.overflow)throw Error(JSON.stringify({width,measure}));
 await page.locator('.golf-reveal').screenshot({path:`evidence/test-output/golf-ball-${width}.png`});
 await page.locator('.golf-player').click();
 await page.waitForTimeout(200);
 const replay=await page.locator('.golf-ball').evaluate(e=>e.getBoundingClientRect().left);
 if(Math.abs(replay-measure.ballLeft)>1)throw Error('Replay start drift at '+width);
 console.log(JSON.stringify({width,...measure,replayStartAligned:true}));
 await page.close();
 }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
