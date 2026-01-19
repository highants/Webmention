
document.addEventListener('DOMContentLoaded', () => {
    const wmList = document.getElementById('wm-list');
    const wmCount = document.getElementById('wm-count');
    const wmLoading = document.getElementById('wm-loading');

    // Configuration
    // Replace this with the actual target URL you want to fetch mentions for
    // For local testing, we often use a production URL that already has mentions, 
    // or we just simulate them.
    const TARGET_URL = 'https://username.github.io/webmention'; 
    const WEBMENTION_IO_TOKEN = null; // Optional: Add token if needed for private mentions

    // Fetch Webmentions
    async function fetchWebmentions() {
        try {
            const url = `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(TARGET_URL)}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                // If 404 or error (likely because user hasn't set up webmention.io yet), show demo data
                throw new Error('Webmention API not configured or unreachable');
            }

            const data = await response.json();
            
            if (data.children && data.children.length > 0) {
                renderMentions(data.children);
            } else {
                // If API works but no mentions, show demo data for visual impression
                renderMockMentions();
            }
        } catch (error) {
            console.log('Falling back to demo mode:', error);
            renderMockMentions();
        } finally {
            wmLoading.style.display = 'none';
        }
    }

    function renderMentions(mentions) {
        wmList.innerHTML = '';
        wmCount.innerText = `${mentions.length} Mentions`;

        mentions.forEach(mention => {
            const card = createMentionCard(mention);
            wmList.appendChild(card);
        });
    }

    function createMentionCard(mention) {
        const author = mention.author || {};
        const authorName = author.name || 'Anonymous';
        const authorPhoto = author.photo || 'https://ui-avatars.com/api/?name=' + authorName + '&background=random';
        const url = mention.url || '#';
        
        const date = new Date(mention.published || mention['wm-received']).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const content = mention.content ? (mention.content.text || mention.content.html || '') : '';
        // Simple truncation
        const displayText = content.length > 200 ? content.substring(0, 200) + '...' : content;
        
        const entry = document.createElement('div');
        entry.className = 'wm-card';
        entry.innerHTML = `
            <img src="${authorPhoto}" alt="${authorName}" class="wm-avatar">
            <div class="wm-body">
                <div class="wm-meta">
                    <a href="${url}" target="_blank" class="wm-author">${authorName}</a>
                    <span class="wm-date">${date}</span>
                </div>
                <div class="wm-text">${displayText}</div>
            </div>
        `;
        return entry;
    }

    // --- Mock Data for "Wow" Factor ---
    function renderMockMentions() {
        const mockData = [
            {
                author: { name: 'Alice Dev', photo: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
                url: '#',
                published: '2026-01-18T10:00:00Z',
                content: { text: "This design is absolutely stunning! The glassmorphism effect is perfect. Just sent a webmention to test it out." }
            },
            {
                author: { name: 'Bob Smith', photo: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
                url: '#',
                published: '2026-01-19T08:30:00Z',
                content: { text: "Nice work on the integration. Webmention is the future of decentralized comments." }
            },
            {
                author: { name: 'Charlie', photo: 'https://i.pravatar.cc/150?u=123456' },
                url: '#',
                published: '2026-01-19T11:15:00Z',
                content: { text: "テストコメントです。GitHub Pagesでも動的にコメントが表示されるのは素晴らしいですね。" }
            }
        ];
        
        // Simulate network delay for realism
        setTimeout(() => {
            renderMentions(mockData);
            // Add a small note about demo data
            const note = document.createElement('div');
            note.style.textAlign = 'center';
            note.style.fontSize = '0.8rem';
            note.style.marginTop = '1rem';
            note.style.opacity = '0.5';
            note.innerText = '(Showing demo data since no real webmentions were found)';
            wmList.appendChild(note);
        }, 800);
    }

    // Initialize
    fetchWebmentions();

    // Form Simulation
    const btn = document.querySelector('.btn-primary');
    const input = document.querySelector('input[type="url"]');
    
    btn.addEventListener('click', () => {
        if(!input.value) return;
        
        btn.innerText = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerText = 'Sent! (Check Webmention.io)';
            input.value = '';
            btn.disabled = false;
            
            setTimeout(() => {
                btn.innerText = 'Send Webmention';
            }, 3000);
        }, 1500);
    });
});
