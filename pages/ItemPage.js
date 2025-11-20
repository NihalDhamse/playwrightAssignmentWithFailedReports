class ItemPage {
constructor(page) {
this.page = page;
this.title = page.locator('#title');
this.desc = page.locator('#description');
this.save = page.locator('#save');
this.resultText = page.locator('#result');
}
async createItem(title, desc) {
await this.title.fill(title);
await this.desc.fill(desc);
await this.save.click();
await this.page.waitForSelector('#result');
return (await this.resultText.textContent()).trim();
}
}
module.exports = ItemPage;