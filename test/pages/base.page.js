import selectors from '../selectors/selectors.json';

export default class BasePage {
    before() {
        browser.url('/pricing');
        browser.waitUntil(() => $(selectors.contactUsButton).isDisplayed());
        $(selectors.contactUsButton).click();
        browser.waitUntil(() => $(selectors.headerFrame).isDisplayed());
    }
}