'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = [
  'Артем',
  'Кекс',
  'Акакий',
  'Властелин',
  'Марфа Васильна',
  'Сонька'
];

var generateRandomNumber = function (min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);
  return randomNumber;
};

var generateMock = function () {
  var mock = [];
  for (var i = 1; i <= 25; i++) {
    var element = {};
    element.url = 'photos/' + i + '.jpg';
    element.description = 'Описание фотографии';
    element.likes = generateRandomNumber(15, 200);

    var comment = {};
    comment.avatar = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
    comment.message = MESSAGES[generateRandomNumber(0, MESSAGES.length - 1)];
    comment.name = NAMES[generateRandomNumber(0, NAMES.length - 1)];
    element.comments = [comment];

    mock.push(element);
  }
  return mock;
};

var createPicture = function (photo) {
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

var populatePictures = function (photos) {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var element = createPicture(photos[i]);
    fragment.appendChild(element);
  }

  pictures.appendChild(fragment);
};

var createComment = function (comment) {
  var template = document.querySelector('#social-comment').content.querySelector('li');
  var element = template.cloneNode(true);
  var image = element.querySelector('img');
  var text = element.querySelector('.social__text');
  image.src = comment.avatar;
  image.alt = comment.name;
  text.textContent = comment.message;
  return element;
};

var populateComments = function (comments) {
  var container = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    var element = createComment(comments[i]);
    fragment.appendChild(element);
  }

  container.appendChild(fragment);
};

var showBigPicture = function (picture) {
  var bigPicture = document.querySelector('.big-picture');
  var image = bigPicture.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var comentsLoader = bigPicture.querySelector('.comments-loader');

  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('visually-hidden');
  comentsLoader.classList.add('visually-hidden');
  image.src = picture.url;
  likes.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  populateComments(picture.comments);
  socialCaption.textContent = picture.description;
};

var pictures = generateMock();
populatePictures(pictures);
showBigPicture(pictures[0]);
