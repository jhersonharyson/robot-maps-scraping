const puppeteer = require('puppeteer');

async function run() {

    out = (page, browser) => {
        if (page == null) return
        const str = 'Encontrado lixo na memoria...'
        if (page.isClosed()) {
        } else{
            page.close()
            browser.close()
            console.log(str+' Brutalite nele...')
        }
    }

    let lastPage = null, lastBrowser = null

    let runner = setInterval(async _ => {
        try {
            out(lastPage, lastBrowser)
            let browser = await puppeteer.launch({ headless: false });
            let page = await browser.newPage();
            await page.setViewport({ width: 1080, height: 720});
            
            page.setDefaultNavigationTimeout = page.reload
            lastPage = page;
            lastBrowser = browser

            await page.goto('https://www.google.com.br/maps/');
            console.log('Iniciando processo e abrindo o google maps por tras dos panos...')
            await page.waitForNavigation();
            await page.waitFor('.widget-homescreen-entrypoint.noprint');

            await page.click('.widget-homescreen-entrypoint.noprint')
            console.log('Abrindo uns menus e bloqueando alguns pops-ups')
            await page.waitFor('#pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-listbox.section-scrollbox.scrollable-y.scrollable-show > div:nth-child(3) > div > div:nth-child(1) > button.section-list-item-content.section-list-item-button')
            await page.waitFor(1000)

            await page.click('#pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-listbox.section-scrollbox.scrollable-y.scrollable-show > div:nth-child(3) > div > div:nth-child(1) > button.section-list-item-content.section-list-item-button')
            console.log('Fazendo alguns ajustes...')
            await page.waitFor(3000)
            
            await page.click('#pane > div > div.widget-pane-toggle-button-container > button')
            console.log('Mais ajustes...')
            await page.waitFor(1000)

            await page.screenshot({ path: './img/' + Date.now() + '.jpg', type: 'jpeg' });
            console.log('Batendo uma self...')
            await page.waitFor(1000)
            console.log('Finalizando os paranauês...')
            await page.close();
            await browser.close();


            // setTimeout(out(page, browser),10000)

        } catch (e) {
            console.warn(e)
            await page.close();
            await browser.close();

        } finally {

        }

    }, 30000)

}

run();
