import sys
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'(<section id=\"experience\".*?>).*?(</section>)', re.DOTALL)

replacement = r'''\1
    <div class="reveal" style="max-width:680px; margin-bottom:52px;">
      <div class="s-eye">PREMIUM SHISHA</div>
      <h2 class="s-title" id="exp-title">The Best <span class="g">Shisha</span> Experience</h2>
    </div>

    <div class="exp-panels reveal d1">
      <div class="exp-panel active" id="panel-shisha">
        <div class="exp-img">
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
    </div>
  \2'''

new_content = pattern.sub(replacement, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Replaced section successfully')
