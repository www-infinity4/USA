(function(){
  "use strict";

  window.USA_PROGRAMS={
    rhondaLittleShop:{id:"USA-UAN-RHONDA-LITTLESHOP",title:"Rhonda Shear Up All Night presents The Little Shop of Horrors",year:1960,collection:"Up All Night · horror comedy double feature",runtimeSeconds:4350,videoId:"ZVJ9pBJ3-Yw",introVideoId:"O8NiYplAZW8",introSeconds:600,host:"Rhonda Shear",rating:"Not R",cleared:true},
    elviraCreature:{id:"USA-UAN-ELVIRA-CREATURE",title:"Elvira presents Creature from the Haunted Sea",year:1961,collection:"Movie Macabre-style horror comedy",runtimeSeconds:4500,videoId:"ZtO-rpcUcuc",introVideoId:"FXPO_2-rBrk",introSeconds:420,host:"Elvira",rating:"TV-14",cleared:true},
    elviraHauntedHill:{id:"USA-UAN-ELVIRA-HAUNTED",title:"Elvira presents House on Haunted Hill",year:1959,collection:"Movie Macabre-style Vincent Price feature",runtimeSeconds:4500,videoId:"Jsnw-RNGKFY",introVideoId:"bYQh-zO0WP8",introSeconds:420,host:"Elvira",rating:"TV-14",cleared:true},
    elviraFullClassic:{id:"USA-UAN-ELVIRA-FULL",title:"Classic Horror Hosted by Elvira — Full Episodes",year:2026,collection:"Elvira's Movie Macabre · complete hosted presentation",runtimeSeconds:7200,videoId:"4Eu2x6n3cRk",host:"Elvira",rating:"TV-14",cleared:true},
    elviraFullBMovie:{id:"USA-UAN-ELVIRA-BMOVIE",title:"Classic B-Movie Horror Hosted by Elvira",year:2026,collection:"Elvira · complete hosted presentation",runtimeSeconds:7200,videoId:"rq6VRiu3UbI",host:"Elvira",rating:"TV-14",cleared:true},
    hitchcockDouble:{id:"USA-HITCHCOCK-DOUBLE",title:"Alfred Hitchcock Presents — Two Complete Episodes",year:1955,collection:"Hitchcock-hosted mystery double feature",runtimeSeconds:3180,videoId:"kfRywnwq1j8",host:"Alfred Hitchcock",rating:"TV-PG",cleared:true},
    littleShop:{id:"USA-MOV-LITTLESHOP",title:"The Little Shop of Horrors",year:1960,collection:"Roger Corman horror comedy",runtimeSeconds:4350,videoId:"ZVJ9pBJ3-Yw",host:"",rating:"Not R",cleared:true},
    creature:{id:"USA-MOV-CREATURE",title:"Creature from the Haunted Sea",year:1961,collection:"Roger Corman horror comedy",runtimeSeconds:4500,videoId:"ZtO-rpcUcuc",host:"",rating:"TV-14",cleared:true},
    hauntedHill:{id:"USA-MOV-HAUNTEDHILL",title:"House on Haunted Hill",year:1959,collection:"Vincent Price mystery-horror",runtimeSeconds:4500,videoId:"Jsnw-RNGKFY",host:"",rating:"TV-14",cleared:true}
  };

  const RHONDA=["rhondaLittleShop"];
  const ELVIRA=["elviraCreature","elviraHauntedHill","elviraFullClassic","elviraFullBMovie"];
  const HITCHCOCK=["hitchcockDouble"];
  const HOSTED=["rhondaLittleShop","elviraCreature","elviraHauntedHill","elviraFullClassic","elviraFullBMovie","hitchcockDouble"];
  const MOVIES=["littleShop","creature","hauntedHill","hitchcockDouble"];

  window.USA_DAY_TEMPLATE=[
    {minute:0,duration:120,choices:ELVIRA,type:"hosted"},
    {minute:120,duration:120,choices:HITCHCOCK,type:"hosted"},
    {minute:240,duration:120,choices:RHONDA,type:"hosted"},
    {minute:360,duration:120,choices:MOVIES,type:"movie"},
    {minute:480,duration:120,choices:MOVIES,type:"movie"},
    {minute:600,duration:120,choices:MOVIES,type:"movie"},
    {minute:720,duration:120,choices:MOVIES,type:"movie"},
    {minute:840,duration:120,choices:MOVIES,type:"movie"},
    {minute:960,duration:120,choices:MOVIES,type:"movie"},
    {minute:1080,duration:120,choices:HOSTED,type:"hosted"},
    {minute:1200,duration:120,choices:ELVIRA,type:"hosted"},
    {minute:1320,duration:120,choices:RHONDA,type:"hosted"}
  ];

  window.USA_SOURCE_TARGETS=[
    {show:"USA Up All Night",host:"Rhonda Shear",status:"active-archive-segments",rule:"Use the host segment as an introduction, followed by a separately identified complete non-R movie."},
    {show:"Elvira's Movie Macabre",host:"Elvira",status:"active-hosted-and-intro-pairs"},
    {show:"Alfred Hitchcock Presents",host:"Alfred Hitchcock",status:"active-complete-episodes"},
    {show:"USA Up All Night",host:"Gilbert Gottfried",status:"archive-target",rule:"Add only when a complete host segment or hosted broadcast is verified."}
  ];

  window.INFINITY_CHANNEL={id:"USA",name:"USA Up All Night",era:"late-night horror comedy, mystery and B-movie presentation",reset:"12:00 AM viewer local time",sourcePolicy:"Complete hosted programs or clearly identified host-introduction plus full-movie pairs. No trailers, chopped movie clips, or R-rated features.",lateNightPolicy:"Hosted presentation is prioritized from 10 PM through 6 AM."};
})();