'use strict';

Creature.allCreatures = [];
let keywords = [];
let jsonPage = '../data/page-1.json'
let source = document.getElementById('photo-template').innerHTML;
let template = Handlebars.compile(source);


function Creature(creature){
  this.name = creature.title;
  this.image_url = creature.image_url;
  this.description = creature.description;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
  if (!keywords.includes(this.keyword)){
    keywords.push(this.keyword);
  }
}

Creature.prototype.render = function() {
  let context = {title: this.name, img_url: this.image_url, description: this.description, keyword: this.keyword};
  let html = template(context);
  $('main').append(html);

  // $('main').append('<div class="clone"></div>');
  // let creatureClone = $('div[class="clone"]');
  // let creatureHtml = $('#photo-template').html();

  // creatureClone.html(creatureHtml);

  // creatureClone.find('h2').text(this.name);
  // creatureClone.find('img').attr('src', this.image_url);
  // creatureClone.find('p').text(this.description);
  // creatureClone.removeClass('clone');
  // creatureClone.attr('class', this.keyword);
}

Creature.readJson = () => {
  keywords = [];
  Creature.allCreatures = [];
  $.get(jsonPage, 'json')
    .then(data => {
      data.forEach(obj => {
        Creature.allCreatures.push(new Creature(obj));
      })
    })
    .then(Creature.loadCreatures)
}

Creature.loadCreatures = () => {
  Creature.allCreatures.forEach(creature => creature.render())
  for (let i=0; i<keywords.length; i++){
    $('select').append(`<option>${keywords[i]}</option>`);
  }
}

$(() => Creature.readJson());

$('select').on('change', function(){
  let $selection = $(this).val();
  $('div').hide()
  $(`div[class="${$selection}"]`).show()
})

$('button').on('click', function(){
  $('div').remove();
  $('option').remove();
  $('#photo-template').remove();
  if (jsonPage === '../data/page-1.json'){
    jsonPage = '../data/page-2.json'
  } else {
    jsonPage = '../data/page-1.json';
  }
  $(() => Creature.readJson());
})

