document.addEventListener("DOMContentLoaded", function () {
      //prikaz kategorij
      var button = document.querySelector('.nav-button');
      var items = document.querySelector('.nav-items');
      var link = document.getElementsByTagName('a');
  
      button.addEventListener('click', function () {
          items.classList.toggle('opened');
      }, false);
  
      for (var i = 0; i < link.length; i++) {
          link[i].addEventListener('click', function (e) {
              items.classList.remove('opened');
          }, false);
      }
  
  
      //prikaz prikaz podkategorij
      var div = document.querySelector('.nav-item');
      var inner_items = document.querySelector('.inner-nav-items');
      var links = document.querySelectorAll('a');
  
      div.addEventListener('mouseenter', function () {
          inner_items.classList.add('opened');
      }, false);
      div.addEventListener('mouseleave', function () {
          inner_items.classList.remove('opened');
      }, false);
      for (var i = 0; i < links.length; i++) {
          links[i].addEventListener('click', function (e) {
              inner_items.classList.remove('opened');
          }, false);
      }
})