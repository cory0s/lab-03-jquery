'use strict';

//Global variables and arrays
Creature.allCreatures = [];
let keywords = [];
let horns = [];
let jsonPage = '../data/page-1.json'
let source = document.getElementById('photo-template').innerHTML;
let template = Handlebars.compile(source);

// Creature constructor function
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

// Renders creature objects w/ Handlebars
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

// Load JSON data to page
Creature.readJson = () => {
  keywords = [];
  Creature.allCreatures = [];
  // $('div').remove();
  // $('option').remove();
  // $('#sort').empty();

  $.get(jsonPage, 'json')
    .then(data => {
      data.forEach(obj => {
        Creature.allCreatures.push(new Creature(obj));
      })
      Creature.allCreatures.sort((a,b) => a.name.localeCompare(b.name));  
    })
    .then(Creature.loadCreatures)
}

// Render creature objects to DOM
Creature.loadCreatures = () => {

  $('div').remove();
  $('option').remove();
  $('#sort').empty();

  Creature.allCreatures.forEach(creature => creature.render());

  // Add default creature type and sort by selection dropdowns
  $('#keywords').append(`<option selected="selected" disabled="disabled">Select Creature Type</option>`);
  $('#sort').append(`<option selected="selected" disabled="disabled">Sort By</option>`)
  $('#sort').append(`<option>Title</option>`);
  $('#sort').append(`<option>Horns</option>`);

  // Populate keywords to "Select Creature Type" dropdown
  for (let i=0; i<keywords.length; i++){
    $('#keywords').append(`<option>${keywords[i]}</option>`);
  }
}

//--------------------EVENT LISTENERS-------------------------------//

// Event listener displays only keyword select images
$('#keywords').on('change', function(){
  let $selection = $(this).val();
  $('div').hide()
  $(`div[class="${$selection}"]`).show()
})

// Event listener loads second page of creatures
$('button').on('click', function(){
  //$('div').remove();
  //$('option').remove();
  //$('#photo-template').remove();
  if (jsonPage === '../data/page-1.json'){
    jsonPage = '../data/page-2.json'
  } else {
    jsonPage = '../data/page-1.json';
  }
  $(() => Creature.readJson());
})

//Event listener sorts selection by # of horns or name
$('#sort').on('change', function(){
  let $selection = $(this).val();

  if($selection === 'Horns'){
    Creature.allCreatures.sort((a,b) => a.horns - b.horns);
    console.log('Horn sort', Creature.allCreatures);
    Creature.loadCreatures();
  } else if ($selection === 'Title'){
    Creature.allCreatures.sort((a,b) => a.name.localeCompare(b.name)); 
    console.log('Title sort', Creature.allCreatures);
    Creature.loadCreatures();
  }
})

$(() => Creature.readJson());


