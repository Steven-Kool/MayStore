const select = document.querySelector('.select');
const caret = document.querySelector('.caret');
const menu = document.querySelector('.dropdown');
const options = document.querySelectorAll('.dropdown li');
const selected = document.querySelector('.selected');
const itemHolder = document.getElementById('itemHolder');
let jsonData = null; // Store the JSON data globally

// JSON function
const populateHTML = (jsonData) => {
  	if ('item' in jsonData) {
    	let items = jsonData.item;

    	if (items.length === 0) {
      	let noResultBox = `
        		<div class="list box" style="border-bottom: 2px #e92424 dashed; font-weight: 600; font-size: 18px; color: #e00000">
          		No Result Found
        		</div>`;

      	itemHolder.innerHTML = noResultBox;
    	} else {
      	let html = '';
      	for (const item of items) {
        		let typeDisplay;
        		if (item.type === 'F-l') {
          		typeDisplay = 'Foreign Liquor';
        		} else if (item.type === 'L-l') {
          		typeDisplay = 'Local Liquor';
        		} else if (item.type === 'D') {
          		typeDisplay = 'Drinks';
        		} else {
          		typeDisplay = item.type;
        		}

        		let itemBox = `
					<div class="list" style="border-bottom: 2px #c933a3 solid;">
						<div class="name box" style="border-right: 2px #c933a3 solid;">${item.name}</div>
						<div class="type box" style="border-right: 2px #c933a3 solid;">${typeDisplay}</div>
						<div class="quantity box" style="border-right: 2px #c933a3 solid;">${item.quantity}</div>
						<div class="condition box" style="border-right: 2px #c933a3 solid;">${item.condition}</div>
						<div class="price box">${item.price} KS</div>
					</div>`;

        		html += itemBox;
      	};
      	itemHolder.innerHTML = html;
    	}
  	} else {
    	let noResultBox = `
			<div class="list box" style="border-bottom: 2px #e92424 dashed; font-weight: 600; font-size: 18px; color: #e00000">
			No Result Found
			</div>`;

    	itemHolder.innerHTML = noResultBox;
  	}
};

const filterFunction = (selectedOption, jsonData) => {
	if (selectedOption === 'all') {
		return jsonData;
	} else {
		const filteredItems = jsonData.item.filter(item => item.type === selectedOption);
		return { item: filteredItems };
	}
};

// Making ajax request from the start of the loading page
const ajaxFunction = (selectedOption) => {
	const ajax = new XMLHttpRequest();

	ajax.open('GET', '/filter/', true);
	ajax.onreadystatechange = () => {
		if (ajax.readyState === 4 && ajax.status === 200) {
			jsonData = JSON.parse(ajax.responseText);
			const finalData = filterFunction(selectedOption, jsonData);
			populateHTML(finalData);
		}
	};

	ajax.send();
}; 

// Adjusting the dropdown list height
select.addEventListener('click', () => {
	select.classList.toggle('select_clicked');
	caret.classList.toggle('caret_rotate');
	menu.classList.toggle('menu_open');

	if (menu.classList.contains('menu_open')) {
		menu.style.maxHeight = menu.scrollHeight + 'px';
		menu.style.top = ((select.offsetTop + select.offsetHeight) - 17) + 'px';
	} else {
		menu.style.maxHeight = '0';
	}
});

options.forEach(option => {
	option.addEventListener('click', () => {
		const selectedOption = option.dataset.filter;

		selected.innerText = option.innerText;
		select.classList.remove('select_clicked');
		caret.classList.remove('caret_rotate');
		menu.classList.remove('menu_open');
		menu.style.maxHeight = '0';

		// Running filter function
		ajaxFunction(selectedOption);

		options.forEach(clickedOption => {
			clickedOption.classList.remove('active');
		});

		option.classList.add('active');
	});
});

// To close the dropdown list when the user click somewhere else
document.addEventListener('click', (event) => {
	const target = event.target;

	if (!select.contains(target)) {
		select.classList.remove('select_clicked');
		caret.classList.remove('caret_rotate');
		menu.classList.remove('menu_open');
		menu.style.maxHeight = '0';
	}
});

ajaxFunction('all'); // Initial AJAX request with 'all' option

// Search filter Part 
const input = document.querySelector('.searchbar');
let searchedFilteredArr = [];

input.addEventListener('keyup', (e) => {
	itemHolder.innerHTML = '';

	const searchTerm = e.target.value.toUpperCase();
	searchedFilteredArr = jsonData.item.filter(item => item['name'].toUpperCase().includes(searchTerm));
	populateHTML({ item: searchedFilteredArr });
});

// Make scroll stick header

const listScroller = document.getElementById('listScroller');
const listHolder = document.getElementById('listHolder');
const boxes = document.querySelectorAll('.boxes');

const scrollThreshould = 1;
let isScrolling = false;

listScroller.addEventListener('scroll', () => {
	const scrollTop = listScroller.scrollTop;
	const name = document.getElementById('name');
	const type = document.getElementById('type');
	const quan = document.getElementById('quantity');
	const con = document.getElementById('condition');

	if (scrollTop >= scrollThreshould && !isScrolling) {
		listScroller.style.boxShadow = 'inset 0 4px 4px rgb(17, 18, 22), inset 0 -4px 4px rgb(17, 18, 22), inset 4px 0 4px rgb(17, 18, 22), inset -4px 0 4px rgb(17, 18, 22)';
		listScroller.style.border = 'none'

      listHolder.style.borderBottom = 'none';
      listHolder.style.boxShadow = '0 4px 4px rgb(0, 0, 0)';

		name.style.borderRight = '2px #c933a3 solid';
		type.style.borderRight = '2px #c933a3 solid';
		quan.style.borderRight = '2px #c933a3 solid';
		con.style.borderRight = '2px #c933a3 solid';

		boxes.forEach(box => {
         box.classList.add('change_background');
		});

		isScrolling = true;
	}

	else if (scrollTop <= scrollThreshould && isScrolling) {
		listScroller.style.boxShadow = '3px 0 2px rgba(0, 0, 0, 0.3), -3px 0 2px rgba(0, 0, 0, 0.3), 0 3px 2px rgba(0, 0, 0, 0.3), 0 -3px 2px rgba(0, 0, 0, 0.3)';

		listHolder.style.borderBottom = '2px #000000 double';
		listHolder.style.boxShadow = 'none';

		name.style.borderRight = '2px #000000 solid';
		type.style.borderRight = '2px #000000 solid';
		quan.style.borderRight = '2px #000000 solid';
		con.style.borderRight = '2px #000000 solid';

		boxes.forEach(box => {
			box.classList.remove('change_background');
		});

		isScrolling = false;
	};
});