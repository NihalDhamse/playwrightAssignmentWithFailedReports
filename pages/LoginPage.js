class LoginPage {
/** @param {import('@playwright/test').Page} page */
constructor(page) {
this.page = page;
this.userInput = page.locator('#username');
this.passInput = page.locator('#password');
this.submitBtn = page.locator('button[type="submit"]');
}


//async goto() { await this.page.goto('/login'); }
async goto() {                                                      //1
  await this.page.goto(`${process.env.BASE_URL || ''}/login`);      //2
}                                                                   //3
async login(user, pass) {
      await this.userInput.waitFor({ state: 'visible' });           //4
await this.userInput.fill(user);
await this.passInput.fill(pass);
await this.submitBtn.click();
}
}
module.exports = LoginPage;