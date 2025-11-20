class HomePage {
constructor(page) {
this.page = page;
this.newItemBtn = page.locator('#new-item');
}
async createNew() {
await this.newItemBtn.click();
}
}
module.exports = HomePage;