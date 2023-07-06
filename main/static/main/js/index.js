const observer = new IntersectionObserver((entries, observer) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         if (entry.target.classList.contains('hidden_down')) {
               entry.target.classList.add('show_down');
         }

         if (entry.target.classList.contains('hidden_slide')) {
               entry.target.classList.add('show_slide');
         }

         if (entry.target.classList.contains('hidden_up')) {
               entry.target.classList.add('show_up');
         }

         if (entry.target.classList.contains('hidden_liner')) {
               entry.target.classList.add('show_liner');
         }
      }
   });
});

const hiddenDowns = document.querySelectorAll('.hidden_down');
const hiddenSlides = document.querySelectorAll('.hidden_slide');
const hiddenUps = document.querySelectorAll('.hidden_up');
const hiddenLiners = document.querySelectorAll('.hidden_liner');

hiddenDowns.forEach((el) => observer.observe(el));
hiddenSlides.forEach((el) => observer.observe(el));
hiddenUps.forEach((el) => observer.observe(el));
hiddenLiners.forEach((el) => observer.observe(el));

//  make scroll look better

const listScroller = document.getElementById('listScroller');
const listHolder = document.getElementById('listHolder');
const boxes = document.querySelectorAll('.scrollHeader');
const scrollThreshold = 1; // Adjust this threshold value as needed
let isScrolling = false;

listScroller.addEventListener('scroll', () => {
   const scrollTop = listScroller.scrollTop;
   const item = document.getElementById('item');
   const quan = document.getElementById('quantity');

   if (scrollTop >= scrollThreshold && !isScrolling) {
      listHolder.style.borderBottom = 'none';
      listHolder.style.boxShadow = '0 4px 4px rgb(0, 0, 0)';

      item.style.borderRight = '2px #252525 solid';
      quan.style.borderRight = '2px #252525 solid';

      boxes.forEach(box => {
         box.classList.add('change_background');
      });

      isScrolling = true;
   }
   
   else if (scrollTop < scrollThreshold && isScrolling) {
      listHolder.style.borderBottom = '2px #d267e7 solid';
      listHolder.style.boxShadow = 'none';

      item.style.borderRight = '2px #d267e7 solid';
      quan.style.borderRight = '2px #d267e7 solid';

      boxes.forEach(box => {
         box.classList.remove('change_background');
      });

      isScrolling = false;
   }
});
