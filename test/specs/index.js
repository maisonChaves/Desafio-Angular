var assert = require('assert');

describe('desafio-angular', () => {

    before(function () {
        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);
        expect = chai.expect;
        chai.Should();
    });

    it('has the expected page title', () => {
        browser.url('/');
        expect(browser.getTitle()).to.be.equal('Desafio Angular');
    });
    it('page 01', () => {
        browser.url('/');
        expect(browser.isEnabled('#next-1')).to.not.be.ok;
        $('#superhero').setValue('test1');
        $('#serie').setValue('test2');
        $('#cookies').setValue('test3');
        $('#quote').setValue('quote');
        expect(browser.isEnabled('#next-1')).to.be.ok;
        $('#next-1').click();
    });
    it('page 02', () => {
        expect(browser.isEnabled('#next-2')).to.not.be.ok;
        $('#movie-0').click();
        expect(browser.isEnabled('#next-2')).to.be.ok;
        $('#next-2').click();
    });
});