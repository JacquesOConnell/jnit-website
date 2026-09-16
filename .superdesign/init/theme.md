# Tokens
Paper #f5f6f8; ink #101827; cobalt #1261ff; dark showcase #0c1422; light accent #83b1ff. Manrope headings, DM Sans body. Desktop 5vw gutters, mobile 6vw. Hero 8.7vw, section 4.3vw. Border radii 3px. 760px mobile, 1050px tablet. Reduced-motion support.
# Target style sources
```css
/* Sales-led homepage. Other pages retain the shared JNIT design system. */
.sell-site{--paper:#f5f6f8;--ink:#101827;--accent:#1261ff;background:var(--paper);color:var(--ink)}
.sell-site .site-header{background:var(--paper);border:0;box-shadow:none}
.sell-site main{overflow:hidden}.sell-site section{scroll-margin-top:90px}
.sell-site h1,.sell-site h2,.sell-site h3{font-family:Manrope,sans-serif}
.sell-site .eyebrow{font-size:11px;letter-spacing:.14em;font-weight:700;color:var(--accent)}
.sell-site a:focus-visible{outline:3px solid #1261ff;outline-offset:6px}
.sell-hero{padding:28px 5vw 0}
.sell-kicker{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #ccd1da;padding:24px 0;font-size:10px;letter-spacing:.1em}
.sell-kicker i{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--accent);margin-right:8px}
.sell-kicker a{font-size:12px;letter-spacing:0;text-decoration:none;color:var(--ink)}
.sell-heading{display:grid;grid-template-columns:1fr 260px;align-items:end;gap:35px;padding:30px 0 65px}
.sell-site .sell-heading h1{font-size:clamp(56px,8.7vw,150px);letter-spacing:-.078em;line-height:1.03;margin:0;font-weight:800;color:var(--ink)}
.sell-heading h1 em{color:var(--accent);font-style:normal}
.sell-intro>p:first-child{font-size:20px;line-height:1.35;font-weight:600;color:var(--ink)}
.sell-intro p{font-size:14px;line-height:1.65;color:#586170;margin:0 0 20px}
.sell-link{display:inline-flex;align-items:center;justify-content:space-between;gap:28px;text-decoration:none;color:inherit;font-weight:700;font-size:14px;padding:12px 0;border-bottom:1px solid currentColor}
.sell-link span{font-size:25px;transition:transform .25s}.sell-link:hover span{transform:translate(3px,-3px)}
.preview-stage{height:390px;position:relative;background:var(--accent);border-radius:4px;isolation:isolate}
.preview-stage:before{content:"DESIGNED TO BE DIFFERENT.";position:absolute;left:24px;bottom:20px;color:#ffffffb3;font-size:10px;letter-spacing:.18em}
.stage-site{position:absolute;width:49%;display:block;background:#fff;box-shadow:0 20px 40px #091c5238;text-decoration:none;color:#151c28;transition:transform .4s}
.stage-site>span{display:flex;justify-content:space-between;padding:11px 15px;font-size:9px;font-weight:700;letter-spacing:.08em}.stage-site b{font-size:8px;color:#667080}
.stage-site img{display:block;width:100%;height:auto;aspect-ratio:1.8;object-fit:cover;object-position:top}
.stage-wellness{left:5%;top:17px;transform:rotate(-6deg)}.stage-build{right:5%;top:58px;transform:rotate(5deg)}
.stage-wellness:hover{transform:rotate(-2deg) translateY(-12px);z-index:2}.stage-build:hover{transform:rotate(1deg) translateY(-12px)}
.stage-note{position:absolute;right:18px;top:20px;color:white;font-size:9px;letter-spacing:.07em;display:flex;gap:12px;align-items:center}.stage-note a{color:white;text-decoration:none;font-size:27px}
.sell-baseline{display:flex;justify-content:space-between;padding:24px 0;font-size:12px;border-bottom:1px solid #ccd1da}.sell-baseline a{color:var(--accent);text-decoration:none;font-weight:600}
.sell-manifesto{display:grid;grid-template-columns:1fr 1fr;padding:100px 5vw;gap:20px 8vw}
.sell-manifesto>.eyebrow{grid-column:1/-1}.sell-site .sell-manifesto h2{font-size:clamp(34px,4.3vw,72px);font-weight:700;line-height:1.12;letter-spacing:-.055em;margin:0}.sell-manifesto em{color:var(--accent);font-style:normal}
.sell-manifesto>div{max-width:460px}.sell-manifesto>div p{color:#59616f;font-size:16px;line-height:1.8;margin:0 0 16px}
.sell-work{background:#0c1422;color:#f8f9fc;padding:90px 5vw}
.sell-section-head{display:flex;justify-content:space-between;align-items:end;gap:60px;margin-bottom:64px}.sell-site .sell-section-head h2{font-size:clamp(36px,4.8vw,78px);line-height:1.08;letter-spacing:-.055em;margin:18px 0 0;font-weight:700}.sell-section-head h2 em{font-style:normal;color:#83b1ff}.sell-section-head>p{max-width:330px;color:#aeb9c9;font-size:14px;line-height:1.8}
.work-show{display:grid;grid-template-columns:1.5fr 1fr;gap:6vw;align-items:center;padding:56px 0;border-top:1px solid #ffffff26}
.work-visual{display:block;padding:28px;background:#2a3039;text-decoration:none;color:#fff;border-radius:3px;transition:background .3s}.work-visual:hover{background:#3d4755}.work-visual img{width:100%;height:auto;display:block;box-shadow:0 15px 30px #0004}
.work-browser{display:flex;justify-content:space-between;font-size:9px;letter-spacing:.12em;padding:0 0 16px;color:#d4dbe4}
.work-story .work-number{font-size:10px;letter-spacing:.14em;color:#9aacc4}.sell-site .work-story h3{font-size:clamp(29px,3.3vw,52px);line-height:1.08;letter-spacing:-.045em;color:white;margin:22px 0}
.work-story p{color:#aeb9c9;font-size:15px;line-height:1.8;max-width:400px}.work-story ul{list-style:none;padding:0;margin:20px 0;color:#d3dbe8;font-size:12px;line-height:2.2}.work-story li:before{content:"＋";color:#83b1ff;margin-right:9px}.work-story .sell-link{color:#fff}
.work-enquire{display:block;color:#83b1ff;text-decoration:none;font-size:12px;margin-top:18px}
.work-show-wellness{grid-template-columns:1fr 1.5fr}.work-show-wellness .work-visual{order:2;background:#b3bdb4}.work-show-wellness .work-story{order:1}
.dining-poster{min-height:410px;background:#e7ded0;color:#37271c;text-decoration:none;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center;padding:40px 20px;border:12px solid #8b6d4a}
.dining-poster>span{font:600 18px Georgia,serif;letter-spacing:.08em}.dining-poster small{display:block;font:8px Manrope,sans-serif;letter-spacing:.25em;margin-top:8px}.dining-poster strong{font:normal clamp(34px,4vw,66px)/1.04 Georgia,serif;letter-spacing:-.04em}.dining-poster>b{font-size:9px;letter-spacing:.16em;border-bottom:1px solid;padding-bottom:8px}
.demo-disclosure{font-size:12px;line-height:1.7;color:#aeb9c9;border-top:1px solid #ffffff26;padding-top:26px}
.sell-site .website-offer{padding:95px 5vw;background:var(--paper)}
.sell-site .package-card{box-shadow:none;border-radius:3px;border-color:#ccd1da}.sell-site .package-card.recommended{background:var(--accent);border-color:var(--accent);box-shadow:none}.sell-site .recommended .package-label,.sell-site .recommended p:not(.package-label),.sell-site .recommended .price small,.sell-site .recommended .price span{color:#fff}.sell-site .recommended .button{background:#fff;color:#101827}.sell-site .popular{font-size:9px;letter-spacing:.03em;background:#101827;border-radius:0}.sell-site .package-card .button{border-radius:3px}
.sell-process{padding:90px 5vw;background:#e9edf3;display:grid;grid-template-columns:1fr 1fr;gap:8vw}.sell-site .sell-process h2{font-size:clamp(36px,4.3vw,64px);line-height:1.08;letter-spacing:-.05em;margin:20px 0 40px}.sell-process ol{list-style:none;padding:0;margin:0}.sell-process li{display:flex;gap:22px;padding:25px 0;border-top:1px solid #bcc5d2}.sell-process li>span{font-size:12px;color:var(--accent)}.sell-process h3{font-size:19px;margin:0 0 12px}.sell-process p{font-size:14px;color:#59616f;line-height:1.8;margin:0}
.sell-beyond{padding:95px 5vw;display:grid;grid-template-columns:1fr 1fr;gap:8vw}.sell-site .sell-beyond h2{font-size:clamp(34px,3.5vw,55px);line-height:1.14;letter-spacing:-.05em}.sell-beyond em{font-style:normal;color:#687383}.sell-beyond>div>p:not(.eyebrow){font-size:15px;line-height:1.8;color:#59616f;max-width:420px}.beyond-list>a{display:grid;grid-template-columns:25px 1fr 20px;gap:16px 12px;border-top:1px solid #ccd1da;padding:24px 0;text-decoration:none;color:var(--ink)}.beyond-list>a>span{font-size:10px;color:var(--accent)}.beyond-list h3{font-size:20px;margin:0}.beyond-list p{grid-column:2/3;margin:0;font-size:13px;color:#59616f;line-height:1.7}.scope-note{font-size:12px!important}
.sell-close{margin:0 5vw 80px;padding:50px;background:var(--accent);color:white}.sell-close .eyebrow{color:#fff}.sell-site .sell-close h2{font-size:clamp(60px,9vw,150px);line-height:.95;letter-spacing:-.065em;font-weight:800;margin:45px 0}.sell-close h2 em{font-style:normal;color:#c7dcff}.sell-close h2>span{float:right}.sell-close>div{display:flex;align-items:center;gap:35px}.sell-close p{font-size:15px;line-height:1.7;margin-right:auto}.sell-close .button{background:white;color:#101827;border-radius:3px}.sell-close .sell-link{color:white;white-space:nowrap}
.sell-site .premium-footer .footer-invite{display:none}.sell-site .premium-footer{background:#0c1422}.sell-site .button{box-shadow:none}
@media(prefers-reduced-motion:no-preference){.sell-heading h1{animation:sales-entry .75s both}.sell-intro{animation:sales-entry .75s .15s both}.preview-stage{animation:sales-entry .85s .2s both}@keyframes sales-entry{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}}
@media(min-width:1500px){.preview-stage{height:480px}}
@media(max-width:1050px){.sell-heading{grid-template-columns:1fr 220px;gap:25px}.sell-site .sell-heading h1{font-size:8.2vw}.preview-stage{height:320px}.sell-intro>p:first-child{font-size:17px}.sell-intro p{font-size:12px}.work-show{gap:4vw}.work-visual{padding:18px}.sell-close>div{flex-wrap:wrap}.sell-close p{width:100%;margin:0}}
@media(max-width:760px){.sell-kicker{font-size:8px;line-height:1.7}.sell-kicker>a{display:none}.sell-heading{grid-template-columns:1fr;padding:30px 0 40px}.sell-site .sell-heading h1{font-size:clamp(43px,10.4vw,80px);letter-spacing:-.065em}.sell-intro{max-width:470px}.sell-intro>p:first-child{font-size:19px}.sell-intro p{font-size:15px}.preview-stage{height:250px}.stage-site{width:64%}.stage-wellness{left:3%;top:15px}.stage-build{right:3%;top:90px}.stage-site>span{font-size:7px;padding:8px}.stage-site b{display:none}.stage-note{font-size:7px;right:10px;top:10px}.preview-stage:before{display:none}.sell-baseline{font-size:11px;gap:15px;line-height:1.6}.sell-baseline>span{max-width:175px}.sell-manifesto,.sell-beyond,.sell-process{grid-template-columns:1fr;padding:60px 6vw;gap:25px}.sell-section-head{display:block;margin-bottom:35px}.sell-section-head>p{margin-top:25px}.sell-work{padding:60px 6vw}.work-show,.work-show-wellness{grid-template-columns:1fr;gap:30px;padding:35px 0}.work-show-wellness .work-visual,.work-show-wellness .work-story{order:initial}.sell-site .work-story h3{font-size:36px;margin:16px 0}.dining-poster{min-height:340px}.dining-poster strong{font-size:48px}.sell-site .website-offer{padding:60px 6vw}.sell-site .package-grid{grid-template-columns:1fr}.sell-close{padding:30px 24px;margin:0 5vw 50px}.sell-site .sell-close h2{font-size:16vw}.sell-close h2>span{font-size:45px}.sell-close>div{gap:20px}.sell-process .sell-link{margin-bottom:20px}}
@media(prefers-reduced-motion:reduce){.sell-site *{animation:none!important;scroll-behavior:auto!important}.stage-site{transition:none}}

/* JNIT: a distinct digital studio presentation, scoped to the commercial homepage. */
.commercial-home{--studio-blue:#0f6fff;--studio-ink:#081b3d;background:#f7f9fc}
.commercial-home .site-header{position:relative;background:#f7f9fc;padding:20px 5vw}
.commercial-home .site-header .brand small{font-size:11px;letter-spacing:.15em}
.commercial-home .site-header nav{gap:20px}
.studio-hero{background:#081b3d;color:#f7f9fc;padding:28px 5vw 0;overflow:hidden}
.studio-hero-top{display:flex;justify-content:space-between;gap:20px;padding-bottom:28px;border-bottom:1px solid #ffffff24;font-size:12px;letter-spacing:.12em}
.studio-hero a{color:inherit;text-decoration:none}.studio-hero-top a{letter-spacing:0;color:#b6d1f0;font-size:14px}
.studio-hero-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:6vw;align-items:center;padding:65px 0 72px}
.studio-hero .eyebrow{color:#b7cee8;font-size:12px}.studio-hero .eyebrow span{background:#56b6ff}
.studio-hero h1{font:800 clamp(4.8rem,8.6vw,9.3rem)/.91 Manrope,sans-serif;letter-spacing:-.075em;margin:25px 0 30px}
.studio-hero h1 em{font-style:normal;color:#56b6ff}
.studio-lead{max-width:480px;font-size:18px;line-height:1.7;color:#b8c9e0}
.studio-hero .actions{gap:24px;margin-top:30px;flex-wrap:wrap}.studio-hero .button{border-radius:8px;background:#0f6fff;color:#fff;padding:19px 24px;font-size:15px}
.studio-secondary{font-size:15px}.studio-secondary span{margin-left:14px}
.studio-feature{display:block;border:1px solid #527cac;border-radius:20px;overflow:hidden;background:#0e294e;transform:rotate(2deg);box-shadow:18px 22px 0 #0f6fff;transition:transform .25s}
.studio-feature:hover{transform:rotate(0deg) translateY(-5px)}
.studio-feature-label{display:flex;justify-content:space-between;padding:20px;font-size:11px;letter-spacing:.12em;color:#b6d1f0}
.studio-feature img{display:block;width:100%;height:auto;aspect-ratio:1.37;object-fit:cover;object-position:top}
.studio-feature-caption{display:flex;align-items:center;justify-content:space-between;padding:25px 28px}
.studio-feature-caption small{font-size:10px;letter-spacing:.15em;color:#94b6e2}
.studio-feature-caption h2{font:700 clamp(1.7rem,2.5vw,2.7rem)/1.05 Manrope,sans-serif;letter-spacing:-.04em;margin:10px 0 0}
.studio-round{display:grid;place-items:center;width:52px;height:52px;border:1px solid #6285b0;border-radius:50%;font-size:26px}
.studio-hero-bottom{display:flex;justify-content:space-between;gap:20px;padding:25px 0;border-top:1px solid #ffffff24;font-size:13px;color:#b6cce6}.studio-hero-bottom>a{color:#56b6ff}
.commercial-home .section{padding:90px 5vw}.commercial-home .section-heading h2{font:800 clamp(2.3rem,4.3vw,4.5rem)/1.04 Manrope,sans-serif;letter-spacing:-.06em}.commercial-home .section-heading>p{font-size:16px;line-height:1.7}
.commercial-home .intro-section{padding-top:75px;padding-bottom:75px}.commercial-home .outcome-grid{border:0;gap:26px;background:transparent;margin-top:35px}.commercial-home .outcome-grid article{background:transparent;padding:25px 0;border-top:2px solid #0f6fff}.commercial-home .outcome-grid h3{margin:18px 0 12px}
.commercial-home .demo-showcase{background:#eaf0f8;border-top:1px solid #d6e0ed}.commercial-home .demo-grid{gap:28px}.commercial-home .demo-card{border:0;background:white;border-radius:16px;overflow:hidden}.commercial-home .demo-browser{height:325px;background:#dbe5f0}.commercial-home .demo-shot{height:285px}.commercial-home .demo-meta{padding:30px}.commercial-home .demo-meta h3{font-size:1.65rem}.commercial-home .demo-meta p{font-size:15px}.commercial-home .demo-meta>b{font-size:14px;color:#0f6fff}
.commercial-home .website-offer{background:#f7f9fc}.commercial-home .package-card{border-radius:16px}.commercial-home .package-card.recommended{background:#081b3d;color:white;border-color:#081b3d;box-shadow:0 20px 50px #081b3d24}.commercial-home .recommended p:not(.package-label),.commercial-home .recommended .price small,.commercial-home .recommended .price span{color:#bdcde1}.commercial-home .recommended .package-label{color:#56b6ff}.commercial-home .recommended li{border-color:#ffffff22}.commercial-home .recommended ul{border-color:#ffffff22}.commercial-home .popular{border-radius:0 14px 0 10px;background:#0f6fff}.commercial-home .package-label,.commercial-home .pricing-note{font-size:13px}.commercial-home .package-card li{font-size:15px}.commercial-home .price strong{font-size:2.8rem}
.studio-services{background:#081b3d;color:#f7f9fc}.studio-services .eyebrow{color:#56b6ff}.commercial-home .studio-services .section-heading>p{color:#b8c9e0}.studio-service-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:#38506d;border:1px solid #38506d;margin-top:45px}.studio-service-grid article{background:#0a2348;padding:30px 24px;display:flex;flex-direction:column;transition:background .2s}.studio-service-grid article:hover{background:#123764}.studio-service-grid article>span{font-size:12px;color:#56b6ff}.studio-service-grid h3{font:700 1.35rem/1.2 Manrope,sans-serif;letter-spacing:-.025em;margin:35px 0 15px}.studio-service-grid p{color:#b8c9e0;font-size:15px;line-height:1.7;flex:1}.studio-service-grid a{color:#fff;font-size:14px;text-decoration:none;margin-top:20px}
.commercial-home .trust-cta{border-radius:20px;background:#0f6fff;margin:0 5vw 80px}.commercial-home .trust-cta>p:not(.eyebrow){color:#e0ecff}.commercial-home footer{padding:45px 5vw}
@media(min-width:1100px){.commercial-home .site-header nav a{font-size:13px}}
@media(max-width:1100px){.studio-service-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.studio-hero-grid{gap:40px}.studio-hero h1{font-size:7vw}.studio-feature{box-shadow:10px 14px 0 #0f6fff}.studio-hero-bottom{flex-wrap:wrap}}
@media(max-width:760px){.studio-hero-grid{grid-template-columns:1fr;padding:40px 0 50px}.studio-hero h1{font-size:clamp(4rem,15vw,6.5rem)}.studio-feature{margin:15px 14px 0 0;transform:none}.studio-hero-top{font-size:10px;letter-spacing:.04em}.studio-hero-top a{font-size:12px}.studio-lead{font-size:17px}.studio-hero-bottom{display:grid;grid-template-columns:1fr 1fr;font-size:12px;line-height:1.6}.commercial-home .section{padding:60px 6vw}.commercial-home .section-heading{display:block}.commercial-home .section-heading>p{margin-top:22px}.commercial-home .demo-grid{grid-template-columns:1fr}.commercial-home .demo-card:last-child{grid-column:auto}.commercial-home .demo-browser,.commercial-home .demo-card:last-child .demo-browser{height:300px}.commercial-home .demo-shot,.commercial-home .demo-card:last-child .demo-shot{height:260px}.commercial-home .trust-cta{margin:0 5vw 55px}.studio-service-grid{grid-template-columns:1fr}.studio-service-grid h3{margin-top:22px}.studio-service-grid article{padding:28px}.commercial-home .package-card{padding:30px 24px}}
@media(prefers-reduced-motion:reduce){.studio-feature,.commercial-home .demo-card{transition:none;transform:none}}


```
