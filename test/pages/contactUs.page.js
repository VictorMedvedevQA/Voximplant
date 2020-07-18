import BasePage from "./base.page";
import userData from '../data/userData.json';
import selectors from "../selectors/selectors.json";
import {expect} from "chai";
import expectedResults from "../expectedResults/expectedResults.json";

class ContactUsPage extends BasePage {

    setPhoneField() {
        $(selectors.countryCodeDropdown).click();
        $(selectors.russiaCountryCode).scrollIntoView();
        $(selectors.russiaCountryCode).click();
        $(selectors.phoneNumberField).setValue(userData.phone);
    }

    setChooseTheSolutionField() {
        $$(selectors.solutionField)[0].click();
        browser.keys('ArrowDown');
        browser.keys('Enter');
    }

    setLookingForField() {
        $$(selectors.solutionField)[1].click();
        browser.keys('ArrowDown');
        browser.keys('Enter');
    }
}

export default new ContactUsPage();