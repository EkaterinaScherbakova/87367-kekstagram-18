'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

var NAMES = [
  'Артем',
  'Кекс',
  'Акакий',
  'Властелин',
  'Марфа Васильна',
  'Сонька'
]

var generateMock = function() {
  var mock = [];
  for (var i = 1; i <= 25; i++) {
    var element = {};
    element.url = 'photos/' + i + '.jpg';
    element.description = 'Описание фотографии';
    element.likes = Math.round(Math.random() * 185 + 15);

    var comment = {};
    comment.avatar = 'img/avatar-' + Math.round(Math.random() * 6) + '.svg';
    comment.message = MESSAGES[Math.round(Math.random() * (MESSAGES.length - 1))];
    comment.name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
    element.comments = [comment];

    mock.push(element);
  }
  return mock;
};

var createElement = function(photo) {
  var template = document.querySelector('#picture').content.querySelector('a');
  var element = template.cloneNode(true);
  var image = element.querySelector('.picture__img');
  var likes = element.querySelector('.picture__likes');
  var comments = element.querySelector('.picture__comments');
  image.src = photo.url;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;
  return element;
};

var populatePictures = function(photos) {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var element = createElement(photos[i]);
    fragment.appendChild(element);
  };

  pictures.appendChild(fragment);
};

var mock = generateMock();
populatePictures(mock);
