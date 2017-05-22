var assert = require('assert');

describe('fixture', () => {
    it('has the expected page title', () => {
        browser.url('/');
        assert.equal(browser.getTitle(), 'Desafio Angular');
    });
    it('first page', () => {
        browser.url('/');
        $('#superhero').setValue('test1');
        $('#serie').setValue('test2');
        $('#cookies').setValue('test3');
        $('#quote').setValue('quote');
    });
});