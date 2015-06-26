module.exports = function() {
    'use strict';

    this.title = element(by.model('movie.title'));
    this.releaseYear = element(by.model('movie.releaseYear'));
    this.description = element(by.model('movie.description'));
    this.save = element(by.css('.btn-primary'));
    //this.ptor = protractor.getInstance();

    this.open = function() {
        browser.get('/movies/new');
    };

    this.addMovie = function(title, desc) {
        this.open();
        this.title.clear();
        this.title.sendKeys(title);
        this.description.click().then(function(){
            browser.actions().sendKeys(desc).perform();
        });
        this.releaseYear.clear();
        this.releaseYear.sendKeys(releaseYear);
        this.save.click();
    };
};

//var ptor = protractor.getInstance();

//Get the texteditor of commentary
//expect(element(by.id('commentaryEditorTextArea')).isPresent()).toBe(true);
//expect(element(by.model('commentary.content')).isPresent()).toBe(true);
//put the focus
//element(by.model('commentary.content')).click();
//send a text: don't use sendkeys of the element.
//ptor.actions().sendKeys('Prueba comentario').perform();
//write in console the text put in the previous step:
//element(by.model('commentary.content')).getText().then(console.log);
//check if the text has been put.
