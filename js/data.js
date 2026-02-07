/**
 * Antigravity SPA - Data Store
 * Contains all page/view content for the single-page application
 */

export const pages = {
    // Home / Portfolio view
    home: {
        title: 'Steve Wang - Engineering Reality',
        content: `
            <!-- Cinematic Hero Section -->
            <header id="home" class="ag-hero">
                <div class="ag-hero-title">
                    <h1 class="ag-display ag-display-xl ag-typewriter">
                        <span id="typewriter-text"></span><span id="typewriter-cursor" class="ag-typewriter-cursor"></span>
                    </h1>
                    <!-- 4-Pointed Star Motif -->
                    <span class="ag-star" aria-hidden="true">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                    </span>
                </div>
                <p class="ag-mono ag-hero-subtitle">ENGINEERING REALITY</p>
            </header>

            <!-- Work Section - Bento Grid -->
            <section id="work" class="ag-section">
                <header class="ag-section-header">
                    <p class="ag-mono">Selected Projects</p>
                    <h2 class="ag-display ag-display-md ag-mt-sm">Featured Work</h2>
                </header>

                <div class="ag-bento">
                    <!-- Card 1: Swiss Railway Clock -->
                    <a href="https://github.com/fusiondrive/MondaineOC" target="_blank" rel="noopener"
                        class="ag-card ag-reveal">
                        <div class="ag-card-media">
                            <img src="./assets/swiss-clock.gif" alt="Swiss Railway Clock" loading="lazy" decoding="async">
                        </div>
                        <div class="ag-card-content">
                            <h3 class="ag-card-title">Swiss Railway Clock</h3>
                            <div class="ag-card-tags">
                                <span class="ag-tag">SwiftUI</span>
                                <span class="ag-tag">Objective-C</span>
                            </div>
                        </div>
                    </a>

                    <!-- Card 2: iMac 2019 Revival -->
                    <a href="#/project/imac-revival" data-link class="ag-card ag-reveal">
                        <div class="ag-card-media">
                            <img src="./assets/imac-teardown.jpeg" alt="iMac hardware upgrade" loading="lazy" decoding="async">
                        </div>
                        <div class="ag-card-content">
                            <h3 class="ag-card-title">iMac 2019 Revival</h3>
                            <div class="ag-card-tags">
                                <span class="ag-tag">Hardware</span>
                                <span class="ag-tag">Engineering</span>
                            </div>
                        </div>
                    </a>

                    <!-- Card 3: HackOH/IO -->
                    <a href="https://hack.osu.edu/" target="_blank" rel="noopener" class="ag-card ag-reveal">
                        <div class="ag-card-media">
                            <img src="./assets/hackohio.png" alt="HackOH/IO Website" loading="lazy" decoding="async">
                        </div>
                        <div class="ag-card-content">
                            <h3 class="ag-card-title">HackOH/IO Website</h3>
                            <div class="ag-card-tags">
                                <span class="ag-tag">Web Dev</span>
                                <span class="ag-tag">JavaScript</span>
                            </div>
                        </div>
                    </a>

                    <!-- Card 4: iMac G4 Restoration -->
                    <a href="#/project/imac-g4" data-link class="ag-card ag-reveal">
                        <div class="ag-card-media">
                            <img src="./assets/imacg4thumbnail.jpeg" alt="iMac G4 Sunflower" loading="lazy" decoding="async">
                        </div>
                        <div class="ag-card-content">
                            <h3 class="ag-card-title">iMac G4 Sunflower Restoration</h3>
                            <div class="ag-card-tags">
                                <span class="ag-tag">Vintage</span>
                                <span class="ag-tag">Restoration</span>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <!-- About / Skills Section -->
            <section id="about" class="ag-section">
                <header class="ag-section-header">
                    <p class="ag-mono">About Me</p>
                    <h2 class="ag-display ag-display-md ag-mt-sm">Skills & Tools</h2>
                </header>

                <div class="ag-skills ag-reveal">
                    <div class="ag-skill-category">
                        <h3>Languages</h3>
                        <div class="ag-skill-chips">
                            <span class="ag-skill-chip">C++</span>
                            <span class="ag-skill-chip">C</span>
                            <span class="ag-skill-chip">Java</span>
                            <span class="ag-skill-chip">Python</span>
                            <span class="ag-skill-chip">JavaScript</span>
                            <span class="ag-skill-chip">SwiftUI</span>
                            <span class="ag-skill-chip">Objective-C</span>
                        </div>
                    </div>

                    <div class="ag-skill-category">
                        <h3>Hardware</h3>
                        <div class="ag-skill-chips">
                            <span class="ag-skill-chip">Desktop/Laptop/Phone Assembly</span>
                            <span class="ag-skill-chip">Component-Level Repair</span>
                            <span class="ag-skill-chip">Hardware Upgrades</span>
                        </div>
                    </div>

                    <div class="ag-skill-category">
                        <h3>Design & Tools</h3>
                        <div class="ag-skill-chips">
                            <span class="ag-skill-chip">Eclipse</span>
                            <span class="ag-skill-chip">VSCode</span>
                            <span class="ag-skill-chip">Xcode</span>
                            <span class="ag-skill-chip">Figma</span>
                            <span class="ag-skill-chip">GitHub</span>
                            <span class="ag-skill-chip">Onshape</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Section -->
            <footer id="contact" class="ag-footer ag-section">
                <header class="ag-section-header ag-text-center">
                    <p class="ag-mono">Get In Touch</p>
                    <h2 class="ag-display ag-display-md ag-mt-sm">Let's Connect</h2>
                </header>

                <p class="ag-body ag-body-lg ag-text-center ag-reveal">
                    Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities.
                </p>

                <div class="ag-footer-links ag-reveal">
                    <a href="mailto:wang.16327@osu.edu" class="ag-icon-link" aria-label="Email">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                    </a>
                    <a href="https://github.com/fusiondrive" target="_blank" rel="noopener" class="ag-icon-link" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/steve-wang-9480b7123" target="_blank" rel="noopener" class="ag-icon-link" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                    <a href="https://drive.google.com/file/d/1k-lDc2RTfwEIp3BM451h0GSMbvEqBCfR/view?usp=sharing" target="_blank" rel="noopener" class="ag-icon-link" aria-label="Resume">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                        </svg>
                    </a>
                </div>
            </footer>
        `
    },

    // iMac G4 Restoration Article
    'imac-g4': {
        title: 'iMac G4 Sunflower Restoration - Steve Wang',
        content: `
            <article class="ag-article">
                <header class="ag-article-header">
                    <a href="#/" data-link class="ag-article-back">← Back to Projects</a>
                    
                    <div class="ag-article-pill">
                        <span>November 2023</span>
                        <span>·</span>
                        <span>Restoration</span>
                    </div>
                    
                    <h1 class="ag-article-title">iMac G4 Sunflower Restoration</h1>
                    <p class="ag-article-subtitle">A story of vintage Mac collecting, unexpected challenges, and learning by doing.</p>
                </header>

                <div class="ag-article-hero">
                    <img src="./assets/iMac G4s/imacg4thumbnail.jpeg" alt="The iconic iMac G4 Sunflower">
                </div>

                <div class="ag-article-body">
                    <p>
                        This article was originally published on <a href="https://zhuanlan.zhihu.com/p/668949075" target="_blank" rel="noopener noreferrer">Zhihu</a> on November 27, 2023. The photos and videos featured were taken on January 17, 2023.
                    </p>

                    <h2>An Unexpected Find</h2>
                    <p>
                        On January 17, while browsing the Facebook Marketplace, I came across an iMac priced at $50, thinking it was a great deal. However, the seller hadn't posted a picture of the device turned on, so I asked him about it. Upon receiving confirmation, I promptly made the purchase and opted for shipping, paying an additional $22.
                    </p>
                    <p>
                        Two days later, the seller stopped responding. Just as I thought it might be a scam, he messaged me, stating that he would personally drive to my dorm to deliver the iMac. He explained that he lacked confidence in shipping, prompting him to drive 25 miles. I was grateful for his kindness and appreciative of his generosity. What a nice person.
                    </p>

                    <img src="./assets/iMac G4s/g41d.jpeg" alt="The newly arrived iMac G4 on a cluttered desk" class="ag-article-image">

                    <h2>First Impressions & Diagnosis</h2>
                    <p>
                        The iMac, a significant and heavy item, exceeded my expectations. The desk was a bit of a mess, and it was larger than I thought. The only thing I knew was that it had a 15-inch display, so I didn't think it would take up too much space, but it actually took up 50% of the desk. Despite the clutter, I was delighted to finally meet the iMac in person. After I connected the power cord, it booted immediately with a charm!
                    </p>
                    <p>
                        What I got here was the base model of the first version of the iMac G4, with a 700 MHz PowerPC G4 processor, a 40 GB hard drive, and 256 MB of RAM. It was running Mac OS X 10.4.9, last updated in 2007. The machine boasted more than 10 ports, including mini VGA, USB 1.1, FireWire 400, and even a modem port—a true relic of its time.
                    </p>

                    <img src="./assets/iMac G4s/g4spec.jpeg" alt="Close-up of the brushed metal base" class="ag-article-image">

                    <h2>The Repair Begins</h2>
                    <p>
                        Opening this thing took me a second. The motherboard looked a bit dusty, but for a 21-year-old iMac, it was in great shape. The reason I opened it was because the power button was broken in half, giving me a reason to fix it. I tried to bend it back a bit, but it just came off. My lack of soldering skills made me struggle at that time.
                    </p>
                    <p>
                        I also took the little PRAM battery "bomb" out of the motherboard. I had heard many people say that the battery could leak electrolyte, causing corrosion and potentially damaging the entire board. Fortunately, I was lucky this time, and nothing happened. This little thing is the only item I kept after selling the iMac.
                    </p>

                    <img src="./assets/iMac G4s/brokenbutton.jpeg" alt="The power button that broke off" class="ag-article-image">

                    <h2>The Road to Restoration</h2>
                    <p>
                        Since the power button was soldered to the motherboard, its detachment left me without any tools for a proper repair. I was stuck for several days. After seeking help on an online forum to no avail, I decided to take a more direct approach. I discovered that a complete replacement motherboard with a working power button was available on eBay for about $70. Seeing this as the most practical solution, I purchased it.
                    </p>
                    <p>
                        On January 27th, the replacement motherboard arrived. The task was essentially a "heart transplant" for the iMac. After carefully swapping the boards and putting everything back together, I pressed the (new) power button. It worked like nothing even happened! I was so stoked to see the machine come back to life.
                    </p>

                    <img src="./assets/iMac G4s/replacementboard.jpeg" alt="Successfully booting up after repair" class="ag-article-image">

                    <h2>The Perfect Setup (Almost)</h2>
                    <p>
                        Oh, I forgot to mention one thing - it didn't come with all the accessories I wanted. But no worries, I managed to shell out $30 and get the perfect additions. I went for the M8541 keyboard, paired with a sleek white Pro Mouse. Now, it was absolutely perfect! To make this iMac even more perfect, I purchased the original discs set and even made a copy for the Classic Mac OS 9.2 environment.
                    </p>
                    <p>
                        When I felt everything had become perfect, reality struck me head-on. After attempting to load those CDs, the drive abruptly stopped working. It couldn't read all discs and kept displaying annoying warnings. Then, the major issue I faced was with the neck; the rubber came off and couldn't be reattached. Fixing it would require more soldering work. It was really disheartening.
                    </p>

                    <h2>Epilogue</h2>
                    <p>
                        So, even though the CD drive was only partially functional, I was able to make the system work with all the original apps. It even came with some amazing early 3D promo games for Mac, which were pretty fun. But it was such a struggle finding all those things for the iMac. I was putting in so much effort to make it all good, but things just kept changing.
                    </p>
                    <p>
                        After two months, I finally came across a super nice person who was willing to take all those things off my hands. I had spent so much time and energy on it, hoping it would find a better home. This whole experience taught me one thing though - without professionals, all I was doing was inadvertently destroying the computers.
                    </p>
                    <img src="./assets/iMac G4s/imac2019box.jpeg" alt="iMac packed for shipping" class="ag-article-image">
                    <p>
                        Guess what I have next?
                    </p>
                </div>
            </article>
        `
    },

    // iMac 2019 Revival Article
    'imac-revival': {
        title: 'iMac 2019 Revival - Steve Wang',
        content: `
            <article class="ag-article">
                <header class="ag-article-header">
                    <a href="#/" data-link class="ag-article-back">← Back to Projects</a>
                    
                    <div class="ag-article-pill">
                        <span>April 2023</span>
                        <span>·</span>
                        <span>Hardware</span>
                    </div>
                    
                    <h1 class="ag-article-title">My iMac Classic Project</h1>
                    <p class="ag-article-subtitle">How a $150 eBay Gamble Became an M1-Beating Powerhouse</p>
                </header>

                <div class="ag-article-hero">
                    <img src="./assets/imac2019/components.png" alt="The collection of upgrade components">
                </div>

                <div class="ag-article-body">
                    <h2>The Gamble</h2>
                    <p>
                        This whole adventure started back in April 2023 with a late-night eBay scroll. I stumbled upon an auction for an iMac, listed simply as a "2012" model. With six minutes left, nobody had bid on it. In "About This Mac" info it clearly showed it was a 2019 model. And I spotted these USB-C ports on on the back. A quick check of the serial number confirmed my suspicion. This wasn't a 2012 machine; it was a 2019 21.5-inch iMac 4K. For $150—less than the price of a decent 4K monitor at the time—I couldn't resist. I placed my bid and won. I decided to call it the "iMac Classic," a nod to the last of its kind, much like the iPod Classic.
                    </p>

                    <img src="./assets/imac2019/ebay.png" alt="The eBay listing" class="ag-article-image">

                    <p>
                        A week later, a giant box arrived at my student dorm's front desk. The iMac was in perfect condition, but turning it on was a painful experience. It took over three minutes to boot. Opening System Settings felt like watching a slideshow as the icons slowly loaded. The culprit was obvious: a 1TB 5400rpm mechanical hard drive. In 2019, Apple put a hard drive from a bygone era into a 4K machine, and it was strangling the computer's performance. It was so slow, I completely understood why the seller thought it was from 2012. This single, awful component was my opportunity. A plan began to form.
                    </p>

                    <h2>The Parts-Sourcing Mission</h2>
                    <p>
                        My summer trip to China became a parts-sourcing mission. The first priority was the hard drive. I knew this iMac model didn't have a slot for a super-fast NVMe SSD, so I was limited to a SATA replacement. I ended up finding a great deal on a 960GB Kioxia TC10 SSD for about 280 RMB (around $40). If you haven't heard of Kioxia, they're basically the company that used to be Toshiba's memory division—the inventors of the tech, so I knew it was a solid choice.
                    </p>
                    <p>
                        Next up was the RAM. The stock 8GB just wasn't going to cut it. I hopped on Xianyu, China's massive second-hand marketplace, and found two 16GB sticks of SK Hynix RAM, which is the same brand Apple often uses. The price was almost too good to be true, and honestly, they looked a bit sketchy. The circuit boards were a rough-looking black, not the polished finish you'd expect. I took the gamble, and for the past two years, they've worked perfectly without a single issue.
                    </p>
                    <p>
                        The final piece of the puzzle was the CPU. The stock i3-8100 was okay, but I wanted more. I knew the motherboard could handle both 8th and 9th generation Intel chips, so I started looking at options like the i7-8700 or even an i9-9900T. But then I went down a rabbit hole and discovered engineering sample (ES) CPUs. These are pre-release chips that are often sold for a fraction of the price. I found a 9th-gen i9 sample known as "QQBZ". It had 8 cores and 16 threads, basically a slightly lower-clocked version of the retail i9-9900, and it cost me about 800 RMB (around $110). This was the heart of my new machine.
                    </p>

                    <h2>Surgery Day</h2>
                    <p>
                        On August 20, 2023, with all my parts back in the US, it was surgery day. Getting into an iMac is a nerve-wracking process that involves using a roller tool to cut the screen's adhesive. One thing I learned the hard way: always buy the official Apple adhesive strips for reassembly. The cheap ones on eBay will fail, and you don't want a heavy glass screen falling off your desk.
                    </p>

                    <img src="./assets/imac2019/powersource.png" alt="iMac internals" class="ag-article-image">

                    <p>
                        Once inside, I hit my first real snag. Apple uses a tamper-evident sticker on the CPU heatsink, but the warranty was long gone, so I tore it off. The real trouble started when I tried to remove the heatsink itself. It was stuck fast. I pulled a little too hard, and the entire heatsink came off, ripping the CPU right out of its socket with it! My heart stopped. I was sure I'd destroyed the motherboard. Luckily, nothing was broken. Apple's design doesn't use the standard locking lever to hold the CPU in place, so the dried thermal paste had basically glued the two together.
                    </p>

                    <img src="./assets/imac2019/cpubend.png" alt="CPU stuck to heatsink" class="ag-article-image">

                    <p>
                        After cleaning everything up and installing the new i9, I put it all back together for a test run. It wouldn't turn on. I had to take it apart again and discovered that the new CPU had shifted slightly in the socket, causing it to bend under the pressure of the heatsink. It took two more full teardowns and reassemblies, being extra careful to apply even pressure, before I finally heard that beautiful Apple chime. The iMac Classic was alive.
                    </p>

                    <h2>The Rebirth and Epilogue</h2>
                    <p>
                        The difference was night and day. macOS amusingly identified the engineering sample CPU as an "8-Core Core i5," but the performance was no joke. In Geekbench, it was scoring around 7,000 in the multi-core test, putting it right on par with an M1 Mac. From a machine that could barely boot, I now had something that felt modern and incredibly fast.
                    </p>

                    <img src="./assets/imac2019/gb6.png" alt="Geekbench results" class="ag-article-image">

                    <p>
                        I used the iMac Classic as my daily driver for over a year. But eventually, a few quirks started to show. Sometimes, in the middle of the night, the fans would spin up to full speed for no reason while the machine was asleep. The SATA SSD, while a huge improvement, was still a bottleneck when I was working with large files, causing the system to stutter. The final straw was when I started using Onshape for 3D modeling. The stock Radeon Pro 555X GPU just couldn't keep up, and rotating models was a laggy mess.
                    </p>

                    <img src="./assets/imac2019/m4.png" alt="M4 Mac mini replacement" class="ag-article-image">

                    <p>
                        In April 2024, with the new M4 Mac mini offering incredible value, I decided it was time to retire my project. But the story has a happy ending. I listed the fully upgraded iMac Classic on eBay, was completely transparent about all the modifications, and sold it for $350. It was the perfect end to a fun and challenging project.
                    </p>
                </div>
            </article>
        `
    }
};
