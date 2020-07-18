import {expect} from 'chai';
import selectors from '../selectors/selectors.json';
import userData from '../data/userData.json';
import expectedResults from '../expectedResults/expectedResults.json';
import ContactUsPage from '../pages/contactUs.page';
import supData from '../data/supData.json'
import axios from 'axios';
describe('test for Voximplant.com', () => {

    //прогон необходимых действий перед тестом (включая ссылку на страницу сайта)
    before('opening Contact Us Frame', () => {
        ContactUsPage.before();
    });

    describe('Verify that all elements on Contact Us page are present', () => {

        it('Verify that Name field is present', function () {
            expect($$(selectors.inputFields)[0].isDisplayed()).true;
        });

        it('Verify that Email field is present', function () {
            expect($$(selectors.inputFields)[1].isDisplayed()).true;
        });

        it('Verify that Country Code dropdown button is present', function () {
            expect($(selectors.countryCodeDropdown).isDisplayed()).true;
        });

        it('Verify that Phone Field is present', function () {
            expect($(selectors.phoneNumberField).isDisplayed()).true;
        });

        it('Verify that Choose the solution field is present', function () {
            expect($$(selectors.solutionField)[0].isDisplayed()).true;
        });

        it('Verify that What are you looking for field is Present', function () {
            expect($$(selectors.solutionField)[1].isDisplayed()).true;
        });

        it('Verify that Message field are present', function () {
            expect($(selectors.messageField).isDisplayed()).true;
        });

        it('Verify that Submit button is present', function () {
            expect($(selectors.submitButton).isDisplayed()).true;
        });

        it('Verify that first Privacy policy button is present', function () {
            expect($$(selectors.linkButtons)[0].isDisplayed()).true;
        });

        it('Verify that second Privacy policy button is present', function () {
            expect($$(selectors.linkButtons)[1].isDisplayed()).true;
        });

        it('Verify that Terms of Service button is present', function () {
            expect($$(selectors.linkButtons)[2].isDisplayed()).true;
        });
    });
    
    describe('Verify that all fields in contact us frame works correctly', () => {

        //проверка того, что Name Field принимает значение которое вводит пользователь
        it('Verify that user can input data in Name Field', function () {
            $$(selectors.inputFields)[0].setValue(userData.name);
            browser.keys('tab');
            const nameFieldCheck = $$(selectors.inputFields)[0].getAttribute('class');
            expect(nameFieldCheck.includes(supData.errorAttribute)).false;
            expect($$(selectors.errorLabel)[0].getText()).is.empty;
        });

        //проверка того, что Email Field принимает валидный email введенный пользователем
        it('Verify that user able to input data in Email Field', function () {
            $$(selectors.inputFields)[1].setValue(userData.email);
            const emailFieldValue = $$(selectors.inputFields)[1].getAttribute('class');
            expect(emailFieldValue.includes(supData.errorAttribute)).false;
            expect($$(selectors.errorLabel)[1].getText()).is.empty;
        });

        /* проверка того, что пользователь может выбрать код страны из раскрывающегося списка,
        а также внести в поле ввода телефона валидный номер телефона */
        it('Verify that user able to select country and input data in Phone Field', function () {
            ContactUsPage.setPhoneField();
            const countryChecker = $(selectors.countryCodeDropdown).getText();
            expect(countryChecker).eq(expectedResults.countryCode);
            const phoneFieldValid = $(selectors.phoneFieldSuccessLabel).isDisplayed();
            expect(phoneFieldValid).true;
        });

        //дописать поля выбора используя последний селектор
        it('Verify that user can choose elements in "Choose The Solution" field', function () {
            ContactUsPage.setChooseTheSolutionField();
            const solutionCheck = $$(selectors.chooseFieldCheck)[0].getAttribute(supData.chooseAttribute);
            expect(solutionCheck).contains(supData.elemPositionAttribute)
        });

        //дописать поля выбора используя последний селекто
        it('Verify that user can choose elements in "What Are You Looking For" field', function () {
            ContactUsPage.setLookingForField();
            const lookingForCheck = $$(selectors.chooseFieldCheck)[1].getAttribute(supData.chooseAttribute);
            expect(lookingForCheck).contains(supData.elemPositionAttribute);
        });

        it('Verify that user can input text in Message Field', function () {
            $(selectors.messageField).setValue(userData.message);
            expect($$(selectors.errorLabel)[3].getText()).is.empty;
            browser.pause(5000);
        });

        it('Verify that Submit Button is clickable', function () {
            expect($(selectors.submitButton).isClickable()).true;
        });
    });

    describe('Verify that Contact Us links works correct', () => {
        it('Verify that first Privacy policy button is working correctly', function () {
            $$(selectors.linkButtons)[0].click();
            expect(browser.getTitle()).eq(expectedResults.headerVoxPrivacy);
        });

        it('Verify that first Privacy policy button is working correctly', function () {
            ContactUsPage.before();
            $$(selectors.linkButtons)[1].click();
            expect(browser.getTitle()).eq(expectedResults.headerGooglePrivacy);
        });

        it('Verify that first Privacy policy button is working correctly', function () {
            ContactUsPage.before();
            $$(selectors.linkButtons)[2].click();
            expect(browser.getTitle()).eq(expectedResults.headerGoogleTerms);
        });
    })
});