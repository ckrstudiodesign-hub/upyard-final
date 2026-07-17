import re

def fix():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 1. Shisha Title replacement
    html = html.replace('<div class="s-eye">WHAT WE OFFER</div>', '<div class="s-eye">PREMIUM SHISHA</div>')
    html = html.replace('<h2 class="s-title" id="exp-title">The Full <span class="g">Upyard</span> Experience</h2>', '<h2 class="s-title" id="exp-title">The Best <span class="g">Shisha</span> Experience</h2>')
    
    # 2. Delete exp-tabs
    tabs_block = """    <div class="exp-tabs reveal" role="tablist">
      <button class="exp-tab active" data-panel="nightlife" role="tab" aria-selected="true">NIGHTLIFE</button>
      <button class="exp-tab" data-panel="bar" role="tab" aria-selected="false">THE BAR</button>
      <button class="exp-tab" data-panel="shows" role="tab" aria-selected="false">LIVE SHOWS</button>
      <button class="exp-tab" data-panel="vip" role="tab" aria-selected="false">VIP & EVENTS</button>
    </div>"""
    if tabs_block in html:
        html = html.replace(tabs_block, "")
    else:
        print("COULD NOT FIND TABS BLOCK")
        
    # 3. Replace all inside exp-panels
    panels_start = '<div class="exp-panels reveal d1">'
    panels_end_tag = '    </div>\n  </section>' # this is risky, let's use regex
    
    match = re.search(r'(<div class="exp-panels reveal d1">).*?(    </div>\n  </section>)', html, re.DOTALL)
    if match:
        new_panel = """<div class="exp-panels reveal d1">
      <div class="exp-panel active" id="panel-shisha">
        <div class="exp-img" style="aspect-ratio: 9/16; height: auto; max-width: 320px; max-height: 560px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <video autoplay loop muted playsinline loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" poster="https://images.unsplash.com/photo-1510006766946-b676fde2ba4c?q=80&w=800&auto=format&fit=crop">
            <source src="assets/videos/shisha.mp4" type="video/mp4">
          </video>
        </div>
        <div class="exp-list">
          <div class="exp-item">
            <div class="exp-item-t">PREMIUM SHISHA</div>
            <div class="exp-item-d">Experience our masterfully crafted shisha, using the finest quality tobacco and expertly managed coals for a smooth, flavorful session.</div>
            <span class="exp-tag">EXPERTLY CRAFTED</span>
          </div>
          <div class="exp-item">
            <div class="exp-item-t">POPULAR FLAVORS</div>
            <div class="exp-item-d">Double Apple, Mint, Grape, Lemon Mint, Blue Mist, and Watermelon. Ask about our special house mixes for a unique flavor journey.</div>
            <span class="exp-tag">WIDE SELECTION</span>
          </div>
          <div class="exp-item">
            <div class="exp-item-t">CHILL VIBES</div>
            <div class="exp-item-d">Relax on our comfortable rooftop lounge with a premium shisha, good company, and stunning views of the Dubai skyline.</div>
            <span class="exp-tag">DAILY</span>
          </div>
        </div>
      </div>
""" + match.group(2)
        html = html[:match.start()] + new_panel + html[match.end():]
    else:
        print("COULD NOT FIND PANELS")
        
    # 4. Replace Happy Hours section
    hh_match = re.search(r'(<section id="happy-hours" aria-labelledby="happy-hours-title">).*?(  </section>)', html, re.DOTALL)
    if hh_match:
        new_hh = """<section id="happy-hours" aria-labelledby="happy-hours-title" style="position:relative; overflow:hidden; padding: 60px 0;">
    <video autoplay loop muted playsinline style="position:absolute; top:50%; left:50%; min-width:100%; min-height:100%; width:auto; height:auto; z-index:-2; transform:translate(-50%, -50%); object-fit:cover;">
      <source src="assets/videos/happy.mp4" type="video/mp4">
    </video>
    <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:-1;"></div>
    
    <div style="position:relative; z-index:1;">
      <div class="menu-head">
        <div class="s-eye" style="text-align:center;">LIMITED TIME OFFER</div>
        <h2 class="s-title" id="happy-hours-title" style="text-align:center;"><span class="hh-main">Happy Hour</span><br>
          <span class="hh-time">6PM–10PM</span>
        </h2>
        <p class="s-body" style="text-align:center; margin:0 auto; max-width: 600px; padding-bottom: 20px;">Enjoy select cocktails and table specials during our
          extended happy hours.</p>
      </div>

      <div class="happy-grid" style="display:flex; gap:18px; justify-content:center; flex-wrap:wrap; padding:24px 6%;">
        <div class="happy-card" style="max-width:260px; text-align:center;">
          <div class="hc-title" style="font-weight:700; margin-bottom:8px;">COCKTAILS</div>
          <div class="hc-desc">Selected signature cocktails at special happy hour rates.</div>
        </div>
        <div class="happy-card" style="max-width:260px; text-align:center;">
          <div class="hc-title" style="font-weight:700; margin-bottom:8px;">TABLE PACKAGES</div>
          <div class="hc-desc">Early-booking packages and VIP upgrades available — enquire for details.</div>
        </div>
        <div class="happy-card" style="max-width:260px; text-align:center;">
          <div class="hc-title" style="font-weight:700; margin-bottom:8px;">LIVE DJ SET</div>
          <div class="hc-desc">Resident DJs keep the energy flowing through happy hour.</div>
        </div>
      </div>

      <div style="text-align:center; margin-top:18px;">
        <a href="#menu-sec" class="btn-outline" target="_blank" rel="noopener">WHATSAPP FOR HAPPY HOUR
          OFFERS</a>
      </div>
    </div>
  </section>"""
        html = html[:hh_match.start()] + new_hh + html[hh_match.end():]
    else:
        print("COULD NOT FIND HAPPY HOURS")
        
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
fix()
