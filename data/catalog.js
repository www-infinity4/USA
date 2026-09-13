(function(){
  "use strict";

  window.USA_PROGRAMS={
    rhondaBoo1:{id:"USA-UAN-RHONDA-BOO1",title:"Rhonda Shear's Up All Night — Halloween Boo-Bash Part 1",year:2025,collection:"Up All Night · Rhonda Shear · Kings of Horror",runtimeSeconds:7200,videoId:"_Wh5N8fkjog",host:"Rhonda Shear",cleared:true},
    rhondaBoo2:{id:"USA-UAN-RHONDA-BOO2",title:"Rhonda Shear's Up All Night — Halloween Boo-Bash Part 2",year:2025,collection:"Up All Night · Rhonda Shear · Kings of Horror",runtimeSeconds:7200,videoId:"MjzS37lYHE8",host:"Rhonda Shear",cleared:true},
    elvira1:{id:"USA-UAN-ELVIRA-1",title:"Elvira's Movie Macabre — Classic Horror Hosted by Elvira",year:2026,collection:"Movie Macabre · Elvira · Shout! Studios",runtimeSeconds:7200,videoId:"Qgt-Niv_Zr0",host:"Elvira",cleared:true},
    elvira2:{id:"USA-UAN-ELVIRA-2",title:"Elvira's Movie Macabre — Shout! Studios Marathon",year:2026,collection:"Movie Macabre · Elvira · Shout! Studios",runtimeSeconds:7200,videoId:"98-aeyH1SaE",host:"Elvira",cleared:true},

    hisGirlFriday:{id:"USA-MOV-HGF",title:"His Girl Friday",year:1940,collection:"Retro Movie Matinee · Shout! Studios",runtimeSeconds:5520,videoId:"E21hRISkLBA",host:"",cleared:true},
    charade:{id:"USA-MOV-CHARADE",title:"Charade",year:1963,collection:"Retro Movie Matinee · Shout! Studios",runtimeSeconds:6780,videoId:"SLQc9kSkRmo",host:"",cleared:true},
    detour:{id:"USA-MOV-DETOUR",title:"Detour",year:1945,collection:"Retro Movie Matinee · Film Noir",runtimeSeconds:4080,videoId:"QqBPGnSXF8Q",host:"",cleared:true},
    general:{id:"USA-MOV-GENERAL",title:"The General",year:1926,collection:"Retro Movie Matinee · Buster Keaton",runtimeSeconds:4500,videoId:"2JHydgbK9lQ",host:"",cleared:true},
    scarletStreet:{id:"USA-MOV-SCARLET",title:"Scarlet Street",year:1945,collection:"Retro Movie Matinee · Fritz Lang",runtimeSeconds:6120,videoId:"9srGe68u4qQ",host:"",cleared:true},
    doa:{id:"USA-MOV-DOA",title:"D.O.A.",year:1949,collection:"Retro Movie Matinee · Film Noir",runtimeSeconds:4980,videoId:"BhbPMf7Jz10",host:"",cleared:true}
  };

  const HOSTED=["rhondaBoo1","elvira1","rhondaBoo2","elvira2"];
  const RHONDA=["rhondaBoo1","rhondaBoo2"];
  const ELVIRA=["elvira1","elvira2"];
  const MOVIES=["hisGirlFriday","charade","detour","general","scarletStreet","doa"];

  // USA identity: movie channel by day, true hosted Up All Night from 10 PM through 6 AM.
  // Two-hour blocks preserve the old late-night double/triple-feature feel without chopping a program into short clips.
  window.USA_DAY_TEMPLATE=[
    {minute:0,duration:120,choices:RHONDA,type:"hosted"},
    {minute:120,duration:120,choices:ELVIRA,type:"hosted"},
    {minute:240,duration:120,choices:HOSTED,type:"hosted"},
    {minute:360,duration:120,choices:MOVIES,type:"movie"},
    {minute:480,duration:120,choices:MOVIES,type:"movie"},
    {minute:600,duration:120,choices:MOVIES,type:"movie"},
    {minute:720,duration:120,choices:MOVIES,type:"movie"},
    {minute:840,duration:120,choices:MOVIES,type:"movie"},
    {minute:960,duration:120,choices:MOVIES,type:"movie"},
    {minute:1080,duration:120,choices:MOVIES,type:"movie"},
    {minute:1200,duration:120,choices:ELVIRA,type:"hosted"},
    {minute:1320,duration:120,choices:RHONDA,type:"hosted"}
  ];

  window.USA_SOURCE_TARGETS=[
    {show:"USA Up All Night",host:"Gilbert Gottfried",status:"archive-target",rule:"Add only a genuine full hosted broadcast or rights-cleared archive source; do not substitute short bumper clips."},
    {show:"USA Up All Night",host:"Rhonda Shear",status:"active-official-revival",provider:"Kings of Horror / Shear Media"},
    {show:"Movie Macabre",host:"Elvira",status:"official-licensed-stream",provider:"Shout! Studios"}
  ];

  window.INFINITY_CHANNEL={
    id:"USA",
    name:"USA Up All Night",
    era:"1989–1998 spirit with current licensed host revivals",
    reset:"12:00 AM viewer local time",
    sourcePolicy:"Full hosted programs and full movies only. No trailers, chopped clips, or random bumper compilations.",
    hostPolicy:"Rhonda Shear and Elvira are the active playable host pools. Gilbert Gottfried remains a priority archive target when a genuine full hosted broadcast is verified.",
    lateNightPolicy:"10 PM–6 AM is always hosted Up All Night programming."
  };
})();