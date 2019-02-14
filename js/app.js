'use strict';

function Creature(creature){
  this.name = creature.title;
  this.image_url = creature.image_url;
  this.description = creature.description;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
}

Creature.allCreatures = [];
const keywords = [];
console.log('typeof keywords', typeof keywords);

Creature.prototype.render = function() {
  $('main').append('<div class="clone"></div>');

  let creatureClone = $('div[class="clone"]');
  let creatureHtml = $('#photo-template').html();

  creatureClone.html(creatureHtml);

  creatureClone.find('h2').text(this.name);
  creatureClone.find('img').attr('src', this.image_url);
  creatureClone.find('p').text(this.description);
  creatureClone.removeClass('clone');
  creatureClone.attr('class', this.name);

  if (keywords.includes(this.keyword) === false){
    keywords.push(this.keyword);
  }
}


function populateSelectOptions() {
  console.log(typeof keywords);
  console.log(keywords);
  console.log(keywords.length);
  for (let i=0; i<keywords.length; i++){
    $('select').append(`<option>${keywords[i]}</option>`);
  }
}


Creature.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Creature.allCreatures.push(new Creature(obj));
      })
    })
    .then(Creature.loadCreatures)
}

Creature.loadCreatures = () => {
  Creature.allCreatures.forEach(creature => creature.render())
}

$(() => Creature.readJson());
populateSelectOptions();

