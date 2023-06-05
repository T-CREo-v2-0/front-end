
/**
 * Scrapes Twitter User ID and Tweet ID 
 */
chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {
        if (msg.type === 'scrape') {
            const { url } = msg;
            const { hostname, pathname } = new URL(url);
            if (hostname === 'twitter.com') {
                const [username, tweetId] = pathname.split('/').filter((x) => x);
                const userId = document.querySelector('div[data-testid="primaryColumn"]')?.getAttribute('data-testid');
                port.postMessage({ type: 'scrape', userId, username, tweetId });
            }
        }
    });
});
