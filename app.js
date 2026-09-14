(function(){
  "use strict";
  const programs=window.USA_PROGRAMS||{};
  const template=window.USA_DAY_TEMPLATE||[];
  const failedVideoIds=new Set();
  const finishedIntroIds=new Set();
  const $=id=>document.getElementById(id);
  const els={clock:$("stationClock"),title:$("nowTitle"),meta:$("nowMeta"),time:$("programTime"),player:$("player"),card:$("stationCard"),cardTitle:$("stationCardTitle"),enter:$("enterButton"),live:$("liveButton"),start:$("startOverButton"),rewind:$("rewindButton"),share:$("shareButton"),shareStatus:$("shareStatus"),guide:$("guideRows"),next:$("nextCards"),progress:$("progressBar"),position:$("positionLabel")};

  let player=null,playerReady=false,apiRequested=false,entered=false,loadedKey="",scheduleKey="",schedule=[];
  let mode="live",shiftBaseMs=0,shiftStartedMs=0,playbackTimer=null,recoveryCount=0;

  function hash(text){let h=2166136261;for(let i=0;i<text.length;i++)h=Math.imul(h^text.charCodeAt(i),16777619);return h>>>0;}
  function dayKey(ms){const d=new Date(ms);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
  function dayStart(ms){const d=new Date(ms);return new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();}
  function pick(choices,key,index){if(!choices.length)return null;return choices[hash(`usa:${key}:${index}`)%choices.length];}
  function buildSchedule(ms){
    const key=dayKey(ms),start=dayStart(ms);
    const built=template.map((slot,index)=>{
      let choices=(slot.choices||[]).slice();
      let chosen=pick(choices,key,index);
      let item=programs[chosen];
      if(!item||!item.videoId||failedVideoIds.has(item.videoId)){
        chosen=choices.find(k=>programs[k]&&programs[k].videoId&&!failedVideoIds.has(programs[k].videoId));
        item=programs[chosen];
      }
      return {id:`${key}-${index}`,movie:item,choices,startsAtMs:start+slot.minute*60000,endsAtMs:start+(slot.minute+slot.duration)*60000,blockSeconds:slot.duration*60,type:slot.type||"show"};
    }).filter(x=>x.movie);
    return built;
  }
  function ensureSchedule(ms){const key=dayKey(ms);if(key!==scheduleKey){scheduleKey=key;schedule=buildSchedule(ms);renderGuide();}}
  function currentClock(){return mode==="live"?Date.now():shiftBaseMs+(Date.now()-shiftStartedMs);}
  function resolve(ms){ensureSchedule(ms);let block=schedule.find(x=>ms>=x.startsAtMs&&ms<x.endsAtMs)||schedule[0];if(!block)return null;const elapsed=Math.max(0,Math.floor((ms-block.startsAtMs)/1000));const introId=block.movie.introVideoId;const introSeconds=Math.max(0,Number(block.movie.introSeconds)||0);const introActive=!!introId&&!failedVideoIds.has(introId)&&!finishedIntroIds.has(introId)&&elapsed<introSeconds;const activeVideoId=introActive?introId:block.movie.videoId;const movieElapsed=Math.max(0,elapsed-(introId?introSeconds:0));const movieRuntime=Math.min(block.movie.runtimeSeconds||block.blockSeconds,block.blockSeconds);const mediaSeconds=introActive?elapsed:Math.min(movieElapsed,Math.max(0,movieRuntime-1));return {block,elapsed,runtime:movieRuntime,mediaSeconds,activeVideoId,isIntro:introActive,programActive:introActive||movieElapsed<movieRuntime};}
  function fmt(ms){return new Date(ms).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});}
  function art(item){return item&&item.videoId?`https://i.ytimg.com/vi/${item.videoId}/maxresdefault.jpg`:"";}
  function updateArt(item){document.body.style.setProperty("--program-art",`url('${art(item)}')`);}
  function renderGuide(){if(!schedule.length)return;els.guide.innerHTML=schedule.map(b=>`<article class="guide-row" data-id="${b.id}"><time>${fmt(b.startsAtMs)}</time><div><strong>${b.movie.title}</strong><span>${b.movie.collection}</span></div></article>`).join("");}
  function renderNext(block){const i=schedule.findIndex(x=>x.id===block.id);els.next.innerHTML=[1,2,3].map(step=>{const b=schedule[(i+step)%schedule.length];return `<article class="next-card" style="--card-art:url('${art(b.movie)}')"><time>${fmt(b.startsAtMs)}</time><strong>${b.movie.title}</strong><span>${b.movie.host?`Hosted by ${b.movie.host}`:b.movie.collection}</span></article>`;}).join("");}
  function showStation(message){els.card.hidden=false;els.cardTitle.textContent=message||"USA station break — next feature starts on schedule";if(els.player)els.player.style.visibility="hidden";}
  function showPlayer(){els.card.hidden=true;if(els.player)els.player.style.visibility="visible";}
  function loadApi(){if(apiRequested||playerReady)return;apiRequested=true;if(window.YT&&window.YT.Player){window.onYouTubeIframeAPIReady();return;}const s=document.createElement("script");s.src="https://www.youtube.com/iframe_api";document.head.appendChild(s);}
  function quarantineCurrent(reason){
    const state=resolve(currentClock());
    const videoId=state?.activeVideoId;
    if(!videoId||failedVideoIds.has(videoId))return;
    failedVideoIds.add(videoId);
    clearTimeout(playbackTimer);
    if(!state?.isIntro)scheduleKey="";
    loadedKey="";
    ensureSchedule(Date.now());
    recoveryCount++;
    showStation(reason||"Source unavailable — switching to another full program");
    setTimeout(()=>sync(true),150);
  }
  function verifyPlayback(videoId,allowShort){
    clearTimeout(playbackTimer);
    playbackTimer=setTimeout(()=>{
      if(!player||loadedKey.indexOf(videoId)<0)return;
      let state=-1,duration=0;
      try{state=player.getPlayerState();duration=Number(player.getDuration())||0;}catch(_){}
      if(state===YT.PlayerState.PLAYING&&(allowShort||duration>=1200)){recoveryCount=0;return;}
      quarantineCurrent(duration>0&&duration<1200?"Short clip rejected — switching to a full program":"Video did not start — switching sources");
    },8000);
  }
  function sync(force){
    const state=resolve(currentClock());if(!state)return;const {block}=state;
    els.clock.textContent=new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"});
    els.title.textContent=block.movie.title;els.meta.textContent=block.movie.host?`HOSTED BY ${block.movie.host.toUpperCase()} · ${block.movie.collection}`:block.movie.collection;els.time.textContent=`${fmt(block.startsAtMs)}–${fmt(block.endsAtMs)}`;updateArt(block.movie);renderNext(block);
    els.progress.style.width=`${Math.min(100,(state.elapsed/block.blockSeconds)*100)}%`;els.position.textContent=mode==="live"?"Synced to the shared USA channel clock":"Time shifted";
    document.querySelectorAll(".guide-row").forEach(r=>r.classList.toggle("current",r.dataset.id===block.id));
    try{localStorage.setItem("infinity_live_USA",JSON.stringify({title:block.movie.title,startsAtMs:block.startsAtMs,endsAtMs:block.endsAtMs,updatedAt:Date.now()}));}catch(_){}
    if(!state.programActive){showStation();return;}
    if(!entered)return;
    if(!playerReady){loadApi();return;}
    showPlayer();
    const key=`${block.id}:${state.activeVideoId}`;
    if(force||loadedKey!==key){loadedKey=key;player.loadVideoById({videoId:state.activeVideoId,startSeconds:state.mediaSeconds});player.setVolume(100);verifyPlayback(state.activeVideoId,state.isIntro);return;}
    if(mode==="live"&&player.getPlayerState()===YT.PlayerState.PLAYING){const drift=state.mediaSeconds-player.getCurrentTime();if(Math.abs(drift)>5)player.seekTo(state.mediaSeconds,true);}
  }
  function enter(){entered=true;els.enter.hidden=true;loadApi();sync(true);}
  function joinLive(){mode="live";loadedKey="";sync(true);}
  function startOver(){const state=resolve(Date.now());if(!state)return;mode="timeshift";shiftBaseMs=state.block.startsAtMs;shiftStartedMs=Date.now();loadedKey="";sync(true);}
  function rewind(){mode="timeshift";shiftBaseMs=currentClock()-30000;shiftStartedMs=Date.now();loadedKey="";sync(true);}
  async function share(){const state=resolve(Date.now()),title=state?state.block.movie.title:"USA Up All Night";const payload={title:`${title} · USA Up All Night`,text:`Watch ${title} on USA Up All Night.`,url:location.href};try{if(navigator.share)await navigator.share(payload);else await navigator.clipboard.writeText(location.href);window.dispatchEvent(new CustomEvent("infinity:share",{detail:{channel:"USA",title,reward:0.1}}));const n=Number(localStorage.getItem("infinity_usa_shares")||0)+1;localStorage.setItem("infinity_usa_shares",String(n));els.shareStatus.textContent=`Shared · ${n%10}/10 toward next Star Coin`; }catch(e){if(!e||e.name!=="AbortError")els.shareStatus.textContent="Share unavailable";}}

  window.onYouTubeIframeAPIReady=function(){player=new YT.Player("player",{width:"100%",height:"100%",playerVars:{playsinline:1,controls:1,rel:0,enablejsapi:1},events:{onReady:()=>{playerReady=true;if(entered)sync(true);},onStateChange:event=>{if(event.data===YT.PlayerState.PLAYING){clearTimeout(playbackTimer);let duration=0;try{duration=Number(player.getDuration())||0;}catch(_){}const state=resolve(currentClock());if(duration&&duration<1200&&!state?.isIntro)quarantineCurrent("Short clip rejected — switching to a full program");else recoveryCount=0;}if(event.data===YT.PlayerState.ENDED){const state=resolve(currentClock());if(state?.isIntro){finishedIntroIds.add(state.activeVideoId);loadedKey="";sync(true);}}},onError:()=>quarantineCurrent("Source unavailable — switching to another full program")}});};

  els.enter.addEventListener("click",enter);els.live.addEventListener("click",joinLive);els.start.addEventListener("click",startOver);els.rewind.addEventListener("click",rewind);els.share.addEventListener("click",share);
  ensureSchedule(Date.now());sync(false);loadApi();setInterval(()=>sync(false),1000);
})();