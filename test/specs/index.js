var assert = require('assert');

describe('desafio-angular', () => {

    before(function () {
        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');
        var chaiWebdriver = require('chai-webdriverio').default;
        chai.use(chaiWebdriver(chaiAsPromised));
        expect = chai.expect;
        chai.Should();
    });

    it('has the expected page title', () => {
        browser.url('/');
        expect(browser.getTitle()).to.be.equal('Desafio Angular');
    });
    it('stepper', () => {
        browser.url('/');
        expect(browser.isEnabled('#next-1')).to.not.be.ok;
        $('#superhero').setValue('test1');
        $('#serie').setValue('test2');
        $('#cookies').setValue('test3');
        $('#quote').setValue('quote');
        expect(browser.isEnabled('#next-1')).to.be.ok;
        $('#next-1').click();

        expect(browser.isEnabled('#next-2')).to.not.be.ok;
        $('#movie-0').waitForExist(5000);
        $('#movie-0').click();
        expect(browser.isEnabled('#next-2')).to.be.ok;
        $('#next-2').click();

        /*
        expect(browser.isEnabled('#next-3')).to.not.be.ok;
        $('#season-5').waitForExist(10 * 1000);

        $('#serie-title').waitForText(10 * 1000);
        expect('#serie-title').to.have.text('Game of Thrones (2011–)');
        
        $('#season-5').click();
        expect(browser.isEnabled('#next-3')).to.be.ok;
        $('#next-3').click();

        expect(browser.isEnabled('#next-4')).to.not.be.ok;
        $('#food-any').click();
        expect(browser.isEnabled('#next-4')).to.be.ok;
        $('#next-4').click();
        */
    });
});