"""Apply focused SEO improvements after rebuilding the static JNIT site."""

from __future__ import annotations

from html import escape
from pathlib import Path
import json
import re


ROOT = Path(__file__).resolve().parent.parent
SITE = "https://jnit.co.za/"
VERSION = "20260928"


def read(name: str) -> str:
    return (ROOT / name).read_text(encoding="utf-8-sig")


def write(name: str, value: str) -> None:
    (ROOT / name).write_text(value, encoding="utf-8", newline="\n")


def one_replace(value: str, old: str, new: str) -> str:
    if value.count(old) != 1:
        raise ValueError(f"Expected exactly one match for {old[:65]!r}; found {value.count(old)}")
    return value.replace(old, new, 1)


def set_metadata(name: str, title: str, description: str) -> None:
    html = read(name)
    title = escape(title)
    description = escape(description, quote=True)
    patterns = [
        (r"<title>.*?</title>", f"<title>{title}</title>"),
        (r'<meta\s+name="description"\s+content="[^"]*"\s*/?>', f'<meta name="description" content="{description}">'),
        (r'<meta\s+property="og:title"\s+content="[^"]*"\s*/?>', f'<meta property="og:title" content="{title}">'),
        (r'<meta\s+property="og:description"\s+content="[^"]*"\s*/?>', f'<meta property="og:description" content="{description}">'),
    ]
    for pattern, replacement in patterns:
        html, count = re.subn(pattern, replacement, html, count=1, flags=re.S | re.I)
        if count != 1:
            raise ValueError(f"Missing metadata {pattern} in {name}")
    write(name, html)


metadata = {
    "index.html": (
        "Websites, Applications & Cloud Engineering | JNIT South Africa",
        "JNIT designs business websites, builds web and mobile applications, and engineers the cloud behind products we develop or deploy for clients in South Africa.",
    ),
    "services.html": (
        "Cloud Engineering & Application Delivery | JNIT",
        "JNIT designs, develops and deploys digital products. Explore AWS cloud engineering, Terraform, DevOps and application delivery, with Azure or Google Cloud when required.",
    ),
    "web-development.html": (
        "Website Design & Development in Johannesburg | JNIT",
        "Business websites, online stores and custom web experiences from JNIT in Johannesburg. Explore working design concepts and website packages from R3,500.",
    ),
    "applications.html": (
        "Custom Web & Mobile Application Development | JNIT",
        "JNIT develops web platforms, mobile applications and connected workflows. Explore our current work, including JNIT Ledger, LifeWallet and PawWatch.",
    ),
    "work.html": (
        "Applications, Cloud Engineering & Website Concepts | JNIT Work",
        "Explore JNIT's own builds and working concepts: JNIT Ledger, LifeWallet, PawWatch, CloudOps and website design demonstrations, with each project's status made clear.",
    ),
    "tools.html": (
        "Free Cloud, Security & Website Planning Tools | JNIT",
        "Use JNIT's free calculators, checklists and references for cloud cost, subnets, backups, website launches, passwords and security planning.",
    ),
    "cloudops.html": (
        "JNIT CloudOps | AWS & Terraform Engineering Demonstration",
        "Explore captured evidence from JNIT CloudOps: an AWS and Terraform demonstration covering deployment, observability and security. The runtime was retired after validation.",
    ),
    "quote.html": (
        "Discuss a Website, App or Cloud Project | JNIT",
        "Tell JNIT about a business website, custom application or cloud-supported product. Prepare a project brief or contact us by email or WhatsApp.",
    ),
    "cidr-calculator.html": (
        "Free CIDR & Subnet Calculator | JNIT Toolkit",
        "Calculate a network address, subnet mask, usable hosts and address range from an IPv4 CIDR block with JNIT's free subnet calculator.",
    ),
    "cloud-cost-estimator.html": (
        "Free Cloud Cost Estimator | JNIT Toolkit",
        "Build an indicative monthly cloud cost estimate from compute, storage and service assumptions. Adjust quantities and rates in JNIT's free planning tool.",
    ),
    "dns-email-check.html": (
        "Free DNS & Email Health Check | JNIT Toolkit",
        "Review public MX, SPF, DMARC and DKIM records for a domain and identify email configuration items that may need attention.",
    ),
    "migration-effort-estimator.html": (
        "Cloud Migration Effort Estimator | JNIT Toolkit",
        "Estimate cloud migration effort from workload size, dependencies and delivery risk. Use the result as a starting point for project discovery.",
    ),
    "password-policy-builder.html": (
        "Free Password Policy Builder | JNIT Toolkit",
        "Draft a practical password policy outline for an application or team, including access controls, MFA and risk considerations.",
    ),
    "port-reference.html": (
        "Common Network Ports Reference | JNIT Toolkit",
        "Look up common network ports, services and exposure considerations with JNIT's searchable port reference.",
    ),
    "recovery-objective-planner.html": (
        "Recovery Objective Planner | JNIT Toolkit",
        "Translate business impact into indicative recovery time and recovery point objectives. Compare priorities before designing a recovery plan.",
    ),
    "security-header-check.html": (
        "HTTP Security Header Check | JNIT Toolkit",
        "Review HTTP response headers and learn which web security protections are present or missing with JNIT's free header checker.",
    ),
}

for name, (title, description) in metadata.items():
    set_metadata(name, title, description)


# Use clear service language in visible headings while retaining the approved
# editorial layout and the separate brand tagline on the home page.
visible = {
    "services.html": [
        ("<p class=\"next-eyebrow\">Services / built together</p>", "<p class=\"next-eyebrow\">Cloud engineering &amp; digital product delivery</p>"),
        ("<h1>The experience in front.<br><em>The engineering behind it.</em></h1>", "<h1>Digital products built.<br><em>Cloud foundations engineered.</em></h1>"),
    ],
    "web-development.html": [
        ("<p class=\"next-eyebrow\">Websites & commerce</p>", "<p class=\"next-eyebrow\">Website design &amp; development / Johannesburg</p>"),
        ("<h1>A first impression.<br><em>A lasting connection.</em></h1>", "<h1>Websites that make<br><em>a lasting connection.</em></h1>"),
    ],
    "applications.html": [
        ("<h1>Useful by design.<br /><em>Built around your world.</em></h1>", "<h1>Web &amp; mobile applications.<br /><em>Built around your world.</em></h1>"),
    ],
}
for name, changes in visible.items():
    html = read(name)
    for old, new in changes:
        html = one_replace(html, old, new)
    write(name, html)


# These are verified site facts. No premises, opening hours, awards, ratings or
# social account URLs are assumed.
graph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": SITE + "#website",
            "url": SITE,
            "name": "JNIT Cloud Solutions",
            "alternateName": "JNIT",
            "publisher": {"@id": SITE + "#organisation"},
        },
        {
            "@type": "Organization",
            "@id": SITE + "#organisation",
            "name": "JNIT Cloud Solutions (Pty) Ltd",
            "url": SITE,
            "logo": SITE + "01-Logos/JNIT-Stacked-Transparent.png",
            "email": "info@jnit.co.za",
            "telephone": "+27833297992",
        },
    ],
}
index = read("index.html")
if 'application/ld+json' in index:
    raise ValueError("Home page already has structured data; review before adding another graph")
index = one_replace(index, "</head>", f'<script type="application/ld+json">{json.dumps(graph, separators=(",", ":"))}</script></head>')
write("index.html", index)


# Working concepts stay accessible from the portfolio but are not presented as
# standalone businesses in search results. The generic hash-driven quick-tool
# shell is likewise replaced in search by useful pages with distinct URLs.
for name in ("demo-construction.html", "demo-wellness.html", "demo-restaurant.html", "demo-3d.html", "quick-tool.html", "404.html"):
    html = read(name)
    if '<meta name="robots"' not in html:
        html = one_replace(html, "</head>", '<meta name="robots" content="noindex,follow"></head>')
    write(name, html)


guide_content = {
    "backup-storage-calculator.html": {
        "tool_id": "backup-storage",
        "title": "Backup Storage Calculator | Estimate Retained Capacity | JNIT",
        "description": "Estimate retained backup storage from data size, daily changes, retention, growth and deduplication. Free planning calculator from JNIT.",
        "heading": "Backup storage calculator",
        "category": "Cloud planning",
        "summary": "Estimate the storage needed for a backup plan before choosing a service or budget. Adjust each assumption to match your workload.",
        "content": """
<section class="seo-guide next-wrap" aria-labelledby="backup-guide-title">
  <div class="seo-guide-heading"><p class="next-eyebrow">Understand the estimate</p><h2 id="backup-guide-title">Plan capacity around your actual retention.</h2><p>Backup storage depends on more than today's dataset. Change rate, the number of retained copies and expected growth all affect the result.</p></div>
  <div class="seo-guide-grid">
    <article><h3>What to enter</h3><p>Start with the protected data size in gigabytes. Add the estimated daily change rate, the number of daily restore points, weekly full copies, annual growth and any measured compression or deduplication saving.</p></article>
    <article><h3>What the result means</h3><p>The tool grows the initial dataset by your annual assumption, adds estimated daily changes and weekly full copies, then applies your chosen saving percentage. The result is an indicative retained capacity in gigabytes.</p></article>
    <article><h3>Where it stops</h3><p>Real storage can differ because of retention rules, changed blocks, backup format, provider overhead and recovery copies. This estimates capacity, not backup service price, transfer fees or restore time.</p></article>
  </div>
  <div class="seo-guide-example"><div><p class="next-eyebrow">Worked example</p><h3>1,000 GB of protected data</h3><p>With 20% expected growth, 5% daily change, 30 daily restore points, four weekly full copies and 30% assumed savings, the simple model estimates about <strong>5,460 GB</strong> retained. Replace those defaults with measurements from your own environment.</p></div><div><h3>Next steps</h3><p>Estimate running costs separately with the <a href="cloud-cost-estimator.html">cloud cost estimator</a>. For an application JNIT develops or deploys, <a href="quote.html">discuss backup and recovery requirements</a> during planning.</p></div></div>
</section>""",
    },
    "website-launch-checklist.html": {
        "tool_id": "website-launch",
        "title": "Website Launch Checklist | Free Pre-Launch Review | JNIT",
        "description": "Work through a practical website launch checklist covering content, accessibility, mobile behaviour, forms, HTTPS, security and handover.",
        "heading": "Website launch checklist",
        "category": "Web operations",
        "summary": "A focused final review before a website goes live. Mark each item only after checking it on the actual release candidate.",
        "content": """
<section class="seo-guide next-wrap" aria-labelledby="launch-guide-title">
  <div class="seo-guide-heading"><p class="next-eyebrow">Before you publish</p><h2 id="launch-guide-title">A launch is more than pressing publish.</h2><p>The checklist covers ten common controls. Use it with real devices and a production-like environment, then record who owns the open items.</p></div>
  <div class="seo-guide-grid">
    <article><h3>People can use it</h3><p>Review important journeys on a phone and desktop. Navigate with a keyboard, check headings and image descriptions, and make sure forms show useful error and confirmation messages.</p></article>
    <article><h3>Search and security are ready</h3><p>Check the live domain, HTTPS redirects, page titles, descriptions and security headers. Review analytics and the privacy notice against the data the site actually collects.</p></article>
    <article><h3>The team can operate it</h3><p>Document backups, a rollback path, monitoring and the owner for future content and software updates. Keep evidence of any launch issue that needs follow-up.</p></article>
  </div>
  <div class="seo-guide-example"><div><p class="next-eyebrow">Practical order</p><h3>Check, fix, then re-check</h3><p>Complete the interactive checklist above on your release candidate. Investigate unchecked items before launch, and re-test the affected journey after each fix. A checked box is a reminder of work done, not an automated scan.</p></div><div><h3>Useful companions</h3><p>Review <a href="security-header-check.html">HTTP security headers</a> and explore JNIT's <a href="web-development.html">website design and development</a> service.</p></div></div>
</section>""",
    },
    "password-generator.html": {
        "tool_id": "password-generator",
        "title": "Random Password Generator & Strength Estimate | JNIT",
        "description": "Generate a random password in your browser and review an indicative strength estimate. Choose length and character options with JNIT's free tool.",
        "heading": "Password generator & strength",
        "category": "Security utility",
        "summary": "Create a unique password using your browser's secure random number generator. Choose the length and character groups your service accepts.",
        "content": """
<section class="seo-guide next-wrap" aria-labelledby="password-guide-title">
  <div class="seo-guide-heading"><p class="next-eyebrow">Use a unique password</p><h2 id="password-guide-title">Make it long, random and one of a kind.</h2><p>Use the generator for a new credential, then store the result in a trusted password manager. Set the length according to the destination service's requirements.</p></div>
  <div class="seo-guide-grid">
    <article><h3>What the generator does</h3><p>Your browser creates random values and selects characters from the groups you choose. The resulting password is displayed locally so you can copy it into your password manager or account setup.</p></article>
    <article><h3>How to use the estimate</h3><p>The rating is a mathematical indication based on length and character variety. It cannot determine whether a password has already been exposed, reused, guessed from a pattern or copied elsewhere.</p></article>
    <article><h3>Keep the account protected</h3><p>Use a different password for every account, enable multi-factor authentication where available, and avoid sharing passwords by chat or email. Follow your organisation's password policy for work accounts.</p></article>
  </div>
  <div class="seo-guide-example"><div><p class="next-eyebrow">Important distinction</p><h3>Generated versus existing passwords</h3><p>The strength estimate for an existing password is only approximate. For a current sensitive account, it is safer to assess or change the credential inside your trusted password manager or account provider.</p></div><div><h3>Related planning</h3><p>Use the <a href="password-policy-builder.html">password policy builder</a> to outline access and MFA requirements for an application or team.</p></div></div>
</section>""",
    },
}

shell = read("quick-tool.html")
for name, tool in guide_content.items():
    html = shell
    html = one_replace(html, '<body class="next-site toolkit">', f'<body class="next-site toolkit" data-tool-id="{tool["tool_id"]}">')
    html = one_replace(html, '← Toolkit <span>/</span> Quick utility', f'← Toolkit <span>/</span> {escape(tool["category"])}')
    html = one_replace(html, '<span id="quick-category">Practical utility</span>', f'<span id="quick-category">{escape(tool["category"])}</span>')
    html = one_replace(html, '<h1 id="quick-title">JNIT quick tool.</h1>', f'<h1 id="quick-title">{escape(tool["heading"])}</h1>')
    html = one_replace(html, '<p id="quick-description">A practical tool that runs privately in your browser.</p>', f'<p id="quick-description">{escape(tool["summary"])}</p>')
    html = one_replace(html, '</main>', tool["content"].strip() + '</main>')
    html = one_replace(html, '<meta name="robots" content="noindex,follow">', '')
    html = one_replace(html, '<title>JNIT Quick Tool | JNIT Toolkit</title>', f'<title>{escape(tool["title"])}</title>')
    html = one_replace(html, '<meta name="description" content="Practical calculators, planning tools and references from JNIT Cloud Solutions.">', f'<meta name="description" content="{escape(tool["description"], quote=True)}">')
    html = one_replace(html, '<link rel="canonical" href="https://jnit.co.za/quick-tool.html">', f'<link rel="canonical" href="{SITE}{name}">')
    html = one_replace(html, '<meta property="og:title" content="JNIT Quick Tool | JNIT Toolkit">', f'<meta property="og:title" content="{escape(tool["title"], quote=True)}">')
    html = one_replace(html, '<meta property="og:description" content="Practical calculators, planning tools and references from JNIT Cloud Solutions.">', f'<meta property="og:description" content="{escape(tool["description"], quote=True)}">')
    html = one_replace(html, '<meta property="og:url" content="https://jnit.co.za/quick-tool.html">', f'<meta property="og:url" content="{SITE}{name}">')
    html = one_replace(html, '<link rel="stylesheet" href="jnit-tools.css?v=20260926">', f'<link rel="stylesheet" href="jnit-tools.css?v=20260926"><link rel="stylesheet" href="jnit-seo.css?v={VERSION}">')
    html = one_replace(html, 'quick-tool.js?v=20260926', f'quick-tool.js?v={VERSION}')
    write(name, html)


tools = read("tools.html")
for name, tool in guide_content.items():
    old = f'href="quick-tool.html#{tool["tool_id"]}"'
    tools = one_replace(tools, old, f'href="{name}"')
write("tools.html", tools)


script = read("quick-tool.js")
script = one_replace(script, "const id=location.hash.slice(1)||'backup-storage';", "const id=document.body.dataset.toolId||location.hash.slice(1)||'backup-storage';")
script = one_replace(script, "document.title=`${active.title} | JNIT`;", "if(!document.body.dataset.toolId)document.title=`${active.title} | JNIT`;")
write("quick-tool.js", script)


# Exclude only pages that intentionally ask crawlers not to index them.
indexable = sorted(p.name for p in ROOT.glob("*.html") if p.name not in {
    "404.html", "store-backup.html", "quick-tool.html",
    "demo-construction.html", "demo-wellness.html", "demo-restaurant.html", "demo-3d.html",
})
sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for name in indexable:
    path = "" if name == "index.html" else name
    sitemap += f"  <url><loc>{SITE}{path}</loc></url>\n"
sitemap += "</urlset>\n"
write("sitemap.xml", sitemap)

# A new analytics file must be fetched when the upload replaces the old one.
for page in ROOT.glob("*.html"):
    if page.name == "store-backup.html":
        continue
    html = read(page.name).replace('site-metrics.js?v=20260926', f'site-metrics.js?v={VERSION}')
    if page.name == "quick-tool.html":
        html = html.replace('quick-tool.js?v=20260926', f'quick-tool.js?v={VERSION}')
    write(page.name, html)

print(f"Updated {len(metadata)} page descriptions, three tool pages, structured data and {len(indexable)} sitemap entries.")
