'use strict';
// document.designMode = 'on'; //działa na całość
// document.getElementById('edition-wrap').designMode = 'on'; //działa na wybrane html nie na svg

// gid→	const var = document.getElementById('id')
// dqs→	const var = document.querySelector('selector');
// dqa→	const var = document.querySelectorAll('selector');
// dce→	const var = document.createElement('element');

let colors = [
  'rgb(140, 29, 19)',
  'rgb(105, 123, 40)',
  'rgb(226, 132, 18)',
  'rgb(128, 128, 128)',
  'rgb(0, 0, 128)',
  'rgb(255, 255, 0)',
];
const dqs = cls => document.querySelector(cls);
const dqsa = cls => document.querySelectorAll(cls);
const did = cls => document.getElementById(cls);
let premises = Array.from(dqsa('.premises')); // tablica ze wszystkimi lokalami jakie są w HTMLu

let addedColor = '';
let class_1;
let class_2;
let new_metreage;
let newPermises_01 = [];
let devidedPermises;
let activeClass = '';
let premisesForDevide = [];
let devideWindowDisplay = false;

const updatePremises = function () {
  premises = Array.from(dqsa('.premises'));
};

const premises_option_filler = function (el) {
  const elementHtml = did(`${el}`);
  elementHtml.textContent = '';

  premises.map(function (el) {
    elementHtml.insertAdjacentHTML(
      'beforeend',
      `<option value='.${el.classList[0]}'>${el.classList[0]}</option>`
    );
  });
};

const setContenteditableTrue = function (that) {
  that.setAttribute('contenteditable', 'true');
};

const colorChange = function () {
  premises.map(el => {
    el.addEventListener('click', function () {
      const cls = el.classList.value
        .replace('premises', '')
        .replace('kontur', '')
        .trim();

      // po kliknięciu zmienia się kolor, pobierany z tabeli [colors] bez końca, po ostatnim pobierany jest pierwszy
      const descriptions = Array.from(dqsa(`.${cls}.description`)); //opisy lokalu
      const outline = dqs(`.${cls}.kontur`); // kontur lokalu
      const doors = Array.from(dqsa(`.${cls}.doors`)); // kontur lokalu

      // jeśli kolor wypełnienia lokalu jest ostatnim w tabeli
      if (el.style.fill == colors[colors.length - 1]) {
        this.style.fill = colors[0];
        doors.map(el => (el.style.fill = this.style.fill));

        // jeśli kolor wypełnienia lokalu nie jest ostatnim w tabeli
      } else {
        this.style.fill = colors[colors.indexOf(this.style.fill) + 1];
        doors.map(el => (el.style.fill = this.style.fill));
      }

      // jeśli występuje jasne tło wypełnienia lokalu podpis zmieniamy na czarny
      if (this.style.fill == 'rgb(255, 255, 0)') {
        outline.style.stroke = 'black';
        descriptions.map(el => (el.style.fill = 'black'));

        // jeśli tło lokalu jest ciemne i podpis zostaje biały
      } else {
        outline.style.stroke = 'white';
        descriptions.map(el => (el.style.fill = 'white'));
      }
    });
  });
};

const displayElements = function (name) {
  const element = did(name);
  const checkbox = did(`grupa${name}`);

  if (checkbox.checked == true) {
    element.classList.remove('no-display');
  } else {
    element.classList.add('no-display');
  }
};

const setColors = function () {
  let tempArr; // tymczasowa tablica
  const doors = Array.from(dqsa('.doors'));
  premises.map(function (el, ind) {
    // ind = 2;
    el.style.fill = colors[ind];
    doors[ind].style.fill = el.style.fill;
    // dla żółtego koloru zmiana koloru opisów i konturu na czarny
    if (colors[ind] === 'rgb(255, 255, 0)') {
      el.style.stroke = 'rgb(0, 0, 0)';
      tempArr = Array.from(dqsa(`.${el.classList[0]}.description`));
      tempArr.map(el => (el.style.fill = 'rgb(0, 0, 0)'));
    }
  });
  if (doors.length > premises.length)
    doors[doors.length - 1].style.fill =
      premises[premises.length - 1].style.fill;
};

const changeLegendColorsView = function (color, id) {
  const premisesWColor = premises.filter(el => el.style.fill === color);
  // tablica z lokalami o interesującym nas kolorze
  const descriptionsTemp = premisesWColor.map(el =>
    Array.from(dqsa(`.${el.classList[0]}.description`))
  ); // wielopoziomowa tablica z elementami opisu powiązanymi z lokalem poprzez numer (klasę);
  const descriptionsWClass = descriptionsTemp.flat();
  // płaska tablica z elementami opisu powiązanymi z lokalem poprzez numer (klasę);
  const doorsTemp = premisesWColor.map(el =>
    Array.from(dqsa(`.${el.classList[0]}.doors`))
  ); // wielopoziomowa tablica z drzwiami powiązanymi z lokalem poprzez numer (klasę);
  const doorsWClass = doorsTemp.flat();
  // płaska tablica z drzwiami powiązanymi z lokalem poprzez numer (klasę);
  const str = id.split('_'); // pomocnicza tablica do szukania odpowiednich klas
  const legendNode = did('legend_permises'); // node id
  const legendElementsArr = Array.from(did('legend_permises').children); // wszystkie elementy w grupie legend_permises
  const activeElements = Array.from(
    did('legend_permises').querySelectorAll(`.legend_line_${str[2]}`)
  ); // text + rect
  let indexOf;
  legendElementsArr.indexOf(activeElements[0]) >
  legendElementsArr.indexOf(activeElements[1])
    ? (indexOf = legendElementsArr.indexOf(activeElements[0]))
    : (indexOf = legendElementsArr.indexOf(activeElements[1]));
  const elementsToMove = legendElementsArr.filter((e, i) => i > indexOf);
  let visibleElements = Array.from(
    legendNode.querySelectorAll(':not(.no-display)')
  );
  const visibleRects = visibleElements.filter(el => el.nodeName === 'rect');
  const visibleTexts = visibleElements.filter(el => el.nodeName === 'text');
  const rowClass = id.replace('color_palette_', 'legend_line_');
  const labelClass = id.replace('color_palette_', 'colorLayer_');
  const textInsert = dqs(`.${labelClass}`).textContent.toUpperCase();

  // jesli checkbox NIE ZAZNACZONY - odejmowanie elementów
  if (!did(id).checked) {
    // lokale na planie
    premisesWColor.map(el => el.classList.add('no-display')); // wypełnienie
    descriptionsWClass.map(el => el.classList.add('no-display')); // opis
    doorsWClass.map(el => el.classList.add('no-display')); // doors
    colors = colors.filter((e, i) => i != colors.indexOf(color)); // usuniecie koloru z tabeli kolorów
    // elementy legendy
    activeElements.map(el => el.remove());
    // console.log(activeElements);
    // console.log(colors);
    elementsToMove.map(function (el) {
      if (el.nodeName === 'rect')
        el.setAttribute('y', el.getAttribute('y') - 24.5);
      else el.setAttribute('y', el.getAttribute('y') - 24);
    });
    // jesli checkbox ZAZNACZONY // dodawanie elementów
  } else {
    // lokale na planie
    premisesWColor.map(el => el.classList.remove('no-display'));
    descriptionsWClass.map(el => el.classList.remove('no-display'));
    doorsWClass.map(el => el.classList.remove('no-display')); // doors
    // dodanie koloru z tabeli kolorów
    colors.push(color);
    // elementy legendy
    if (legendElementsArr.length > 1) {
      legendNode.insertAdjacentHTML(
        'beforeend',
        `<text class="tekst-5 ${rowClass} no_select" x='91.17' y='${
          Number(visibleTexts[visibleTexts.length - 1].getAttribute('y')) + 24
        }'> ${textInsert} </text>
    <rect fill="${color}" class="${rowClass}" x="57.33" y="${
          Number(visibleRects[visibleRects.length - 1].getAttribute('y')) + 24.5
        }" width="18.61" height="18.61"/>`
      );
    } else {
      legendNode.insertAdjacentHTML(
        'beforeend',
        `<text class="tekst-5 ${rowClass} no_select" x='91.17' y='203.49'> ${textInsert} </text>
    <rect fill="${color}" class="${rowClass}" x="57.33" y="190.23" width="18.61" height="18.61"/>`
      );
    }
  }
  drawFrame('legend_permises');
};

//! funckja nieużywana
const displayLegendColorsView = function (colors, premises) {
  // zebrać kolory ze wszystkich wyswietlanych lokali
  const colorsInUse = new Set();
  premises.forEach(element => {
    colorsInUse.add(element.style.fill);
  });
  //* dotąd działa
  // wyswietlić tylko te elementy legendy któe odpowiadaja wyswietlanym kolorom
};

const drawFrame = function (id) {
  const childNodes = Array.from(did(id).children).length / 2;
  const setHigh = Math.round(24.52 * childNodes + 15.3);

  dqs('.frame').setAttribute('height', `${setHigh}`);
};

const editPlanText = function () {
  const arr = dqsa('input[name="plan_texts"]');
  const edit = did('insertTitle').value;
  for (let ar of arr) {
    if (ar.checked && edit !== '') {
      if (ar.value === 'plan_date') {
        dqs(`.${ar.value}`).textContent = edit;
        dqs(`.${ar.value}`).classList.remove('no-display');
        did('insertTitle').value = '';
      }
      dqs(`.${ar.value}`).textContent = edit;
      did('insertTitle').value = '';
    }
  }
};

const editDescription = function () {
  const cls = did('premises-desc').value;
  const edit = did('edit-desc').value;

  if (edit !== '') dqs(`${cls}.description`).textContent = edit;
  did('edit-desc').value = '';
  centerDescriptionX(cls);
  //ZMIANA KLASY
  const elementsWithOldClass = Array.from(dqsa(`${cls}`));

  elementsWithOldClass.map(function (el) {
    el.classList.value = el.classList.value.replace(
      `${cls}`.replace(/[.]/g, ''),
      `${edit}`.replace(/[ .&;$%@"<>()+,]/g, '')
    );
  });

  updatePremises();
  fillerOptionUpdater();
};

const fillerOptionUpdater = function () {
  premises_option_filler('premises-desc');
  premises_option_filler('premises-1');
  premises_option_filler('premises-2');
  premises_option_filler('premises-devide');
};

const centerDescriptionX = function (cls) {
  //1. szerokość lokalu /2
  const halfPremisesWidth = dqs(`${cls}.premises`).getBBox().width / 2;
  //2. szerokość opisu /2
  const halfDescription = dqs(`${cls}.description.name`).clientWidth / 2;
  //3. Przesuniecie względem x -> Wspolrzedna X + 1/2 szerokosci lokalu - 1/2 szerokośći opisu
  let translateX =
    dqs(`${cls}.premises`).getBBox().x + halfPremisesWidth - halfDescription;

  // lokal niesymetryczne / trzeba skorygować nieco miejsce podpisu
  if (cls === '.H003') translateX -= 20;
  if (cls === '.P001J') translateX -= 6;

  //4. przesuniecie opisu P001L wględem x
  dqs(`${cls}.description.name`).setAttribute(
    'transform',
    `translate(${translateX})`
  );
};

const centerDescriptionY = function (cls) {
  //1. wysokość lokalu /2
  const halfPremisesHeight = dqs(`${cls}.premises`).getBBox().height / 2;
  //2. wysokość opisu /2
  const halfDescription = 10;
  // !nie wiedzieć czemu nie można pobrać wysokośći elementu, może dlatego że to teks i zależy od wielkośći czcionki? Na razei na sztywno wbite 10ox. Poniżej instrukcja któa nie działa
  // document.querySelector(`${cls}.name`).clientHeight / 2;
  //3. Przesuniecie względem y -> punkt startowy + połowa wysokośći lokalu - 1/2 wysokośći opisu
  let translateY =
    dqs(`${cls}.premises`).getBBox().y + halfPremisesHeight - halfDescription;
  // lokal niesymetryczne i trzeba skorygować nieco miejsce podpisy
  // if (cls === '.H003') translate -= 20;
  // if (cls === '.P001J') translateX -= 6;

  //4. przesuniecie opisu P001L wględem x
  dqs(`${cls}.description.name`).setAttribute(
    'transform',
    `translate(0,${translateY})`
  );
};

const colorLayerEdit = function (string_1, string_2) {
  // set names for premises color group
  const textarr = string_1.split('_');
  let cls = '.legend_line_' + textarr[1];
  dqs(`${cls}`).textContent = string_2.toUpperCase();
};

const mergingPremises = function (premises_1, premises_2) {
  showWindow('modal-merge');
  // wywołąnie z łączenia:
  // mergingPremises(document.getElementById('premises-1').value,document.getElementById('premises-2').value)

  // wywołąnie z dzielenia
  // mergingPremises('.P001L', '.aa')"
  // tablica z punktami dla lokalu 1
  let premises_01_array = dqs(`${premises_1}.premises`)
    .getAttribute('points')
    .trim()
    .split(' ');
  // tablica z punktami dla lokalu 2
  let premises_02_array = dqs(`${premises_2}.premises`)
    .getAttribute('points')
    .trim()
    .split(' ');

  // ZMIENNE
  let points_to_merge = []; // punkty do narysowania
  let duplikaty = []; // tablica z duplikatami punktów
  let premises_01_array_clear; // tablica lok.1 bez duplikatów
  let premises_02_array_clear; // tablica lok.2 bez duplikatów
  let coordinates_X = []; // wsporzedne x (bez duplikatów)
  let coordinates_Y = []; // wsporzedne y (bez duplikatów)
  let findAxis; // pomocnicza zmienna, ktora okresla czy szukamy nastepnego x czy y

  /////////////////////////////////////////////////////////////////////////////////////
  // WYSZUKANIE DUPLIKATÓW W OBU LOKALACH
  for (let i = 0; i < premises_01_array.length; i++) {
    if (premises_02_array.some(el => el === premises_01_array[i])) {
      duplikaty.push(premises_01_array[i]);
    }
  }
  // USUWANIE DUPLIKATÓW Z OBU TABLIC
  for (let i = 0; i < duplikaty.length; i++) {
    premises_01_array = premises_01_array.filter(el => el != duplikaty[i]);
    premises_02_array = premises_02_array.filter(el => el != duplikaty[i]);
  }

  // POŁĄCZENIE TABLIC + OBRÓBKA => jedna tablica z pojedynczymi stringami
  // PODZIELENIE TABLICY NA 2 ODRĘBNE TABLICE ZE WSPÓŁRZĘDNYMI X i Y
  premises_01_array
    .concat(premises_02_array)
    .map(el => el.split(','))
    .flat()
    .filter((el, ind) =>
      ind % 2 == 0 ? coordinates_X.push(el) : coordinates_Y.push(el)
    );

  // find first()
  points_to_merge.push(coordinates_X[0], coordinates_Y[0]);
  coordinates_X.shift();
  coordinates_Y.shift();
  // updatePoints()
  while (coordinates_X.length > 0 || coordinates_Y.length > 0) {
    // sprawdzenie czy we współrzęnych istnieje kolejny x czy kolejny y, z ostatniego dodanego punktu
    coordinates_X.some(el => el == points_to_merge[points_to_merge.length - 2])
      ? (findAxis = coordinates_X.findIndex(
          el => el == points_to_merge[points_to_merge.length - 2]
        ))
      : (findAxis = coordinates_Y.findIndex(
          el => el == points_to_merge[points_to_merge.length - 1]
        ));
    // aktualizacja punktów w tablicach
    points_to_merge.push(coordinates_X[findAxis], coordinates_Y[findAxis]);
    coordinates_X = coordinates_X.filter((e, i) => i !== findAxis);
    coordinates_Y = coordinates_Y.filter((e, i) => i !== findAxis);
  }
  points_to_merge = points_to_merge.join(' ');

  // usuwanie starych elementów lokali
  let to_remove = dqsa(`${premises_1}.premises`);
  for (let obj of to_remove) {
    obj.remove();
  }

  to_remove = dqsa(`${premises_2}.premises`);
  for (let obj of to_remove) {
    obj.remove();
  }

  //rysowanie nowego lokalu
  did('Lokale_wypelnienia').insertAdjacentHTML(
    'beforeend',
    `<polygon points="${points_to_merge}" />`
  );

  class_1 = premises_1.slice(1);
  class_2 = premises_2.slice(1);
};

const describeNew = function () {
  const number = did('new_number').value;
  const metreage = did('new_metreage').value;
  const newDoors =
    Number(did('new_doors_width').value.replaceAll(',', '.')) * 20;
  const new_permises = did('Lokale_wypelnienia').lastChild;
  // dodaje nową klasę z numerem lokalu
  const classNumber = number.replace(/[ .&;$%@"<>()+,]/g, '');
  new_permises.classList.add(`${classNumber}`, 'premises', 'kontur');

  const doors_arr = dqsa('input[name="doors"]');

  // opis _ numer / ROZWIĄZANIE TYMCZASOWE, NIEDOSKONAŁĘ
  // 1. pobrać lokalizację opisu z obu lokali i wyliczyć średnią pozycję x i y.
  const x_name =
    Number(dqs(`.premises.${classNumber}`).getBBox().width / 2) +
    Number(dqs(`.premises.${classNumber}`).getBBox().x);

  const y_name =
    (Number(dqs(`.${class_1}.name`).getAttribute('y')) +
      Number(dqs(`.${class_2}.name`).getAttribute('y'))) /
    2;

  if (did('calc_metreage').checked)
    new_metreage =
      Number(dqs(`.${class_1}.metreage`).textContent.slice(0, -1)) +
      Number(dqs(`.${class_2}.metreage`).textContent.slice(0, -1));
  else {
    new_metreage = metreage;
  }

  const html_number = `<text class="${classNumber} description name no_select" x="${x_name}" y="${y_name}">${number}</text>`;

  const html_metreage = `<text class="${classNumber} description metreage no_select" transform="translate(${x_name} ${
    y_name + 16
  })">${new_metreage}m</text><text class="${classNumber} description square no_select" transform="translate(${
    x_name + 31
  } ${y_name + 11}) scale(0.58)">2</text>`;

  // ustawienie koloru działa lepiej w ten sposób niż dopisane na sztywno w htmlu powyżej
  dqs(`.${classNumber}`).style.fill = colors[0]; // ustawia kolor
  // colorChange(`.${classNumber}`); // uruchamia możłiwość zmiany koloru

  // wprowadznie opisu i metrażu
  did('Lokale_opisy').insertAdjacentHTML(
    'beforeend',
    `${html_number}${html_metreage}`
  );

  // wprowadznie drzwi
  for (let node of doors_arr) {
    if (node.checked) {
      // jeśli zostają drzwi z pierwszego lokalu
      if (node.value === 'class_1') {
        Array.from(dqsa(`.${class_1}.doors`)).map(el => {
          el.classList.add(`${classNumber}`);
          el.style.fill = colors[0];
          el.classList.remove(`${class_1}`);
        });
      }
      // jeśli zostają drzwi z drugiego lokalu
      if (node.value === 'class_2') {
        Array.from(dqsa(`.${class_2}.doors`)).map(el => {
          el.classList.add(`${classNumber}`);
          el.style.fill = colors[0];
          el.classList.remove(`${class_2}`);
        });
      }
      // jeśli zostają drzwi z obu lokali
      if (node.value === 'Add') {
        Array.from(dqsa(`.${class_1}.doors`))
          .concat(Array.from(dqsa(`.${class_2}.doors`)))
          .map(el => {
            el.classList.add(`${classNumber}`);
            el.style.fill = colors[0];
            el.classList.remove(`${class_1}`);
            el.classList.remove(`${class_2}`);
          });
      }
      // jeśli rysujemy nowe drzwi
      if (node.value === 'None') {
        Array.from(dqsa(`.${class_1}.doors`))
          .concat(Array.from(dqsa(`.${class_2}.doors`)))
          .map(el => {
            el.remove();
          });
        drawNewDoors(classNumber, newDoors);
      }
    }
    updatePremises();
  }

  // czyszczeni pól
  did('new_number').value = '';
  did('new_metreage').value = '';
  did('new_doors_width').value = '';

  // usuwam opisy lokali
  Array.from(dqsa(`.${class_1}`)).map(el => el.remove());
  Array.from(dqsa(`.${class_2}`)).map(el => el.remove());
  updatePremises(); // update tablicy ze wszystkimi lokalami
  fillerOptionUpdater();
  colorChange();
  hideWindow('modal-merge');
};

const drawNewDoors = function (cl, doorsWidth) {
  const coorX = dqs(`.${cl}`).getBBox().x;
  const coorY = dqs(`.${cl}`).getBBox().y;

  document
    .getElementById('drzwi')
    .insertAdjacentHTML(
      'beforeend',
      `<rect class="${cl} doors draggable" fill="blue" x="${coorX}" y="${coorY}" width="${doorsWidth}" height="15"/>`
    );
};

function makeDraggable(evt) {
  evt.target.addEventListener('mousedown', startDrag);
  evt.target.addEventListener('mousemove', drag);
  evt.target.addEventListener('mouseup', endDrag);

  let selectedElement = null;
  let offset;

  function getMousePosition(evt) {
    const CTM = evt.target.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d,
    };
  }

  function startDrag(evt) {
    if (evt.target.classList.contains('draggable')) {
      selectedElement = evt.target;
      offset = getMousePosition(evt);
      offset.x -= parseFloat(selectedElement.getAttribute('x'));
      offset.y -= parseFloat(selectedElement.getAttribute('y'));
    }
  }

  function drag(evt) {
    if (selectedElement) {
      evt.preventDefault();
      const coord = getMousePosition(evt);
      selectedElement.setAttribute('x', coord.x - offset.x);
      selectedElement.setAttribute('y', coord.y - offset.y);
    }
  }

  function endDrag(evt) {
    evt.target.classList.remove('draggable');
    selectedElement = null;
  }
}

const clearCalc_metreage = function () {
  did('calc_metreage').checked = false;
};

const checkValue = function (value) {
  if (value === '') did('calc_metreage').checked = true;
};

const showWindow = function (cls) {
  // pokazuje okienko z dodawaniem dodatkowego koloru do palety
  dqs(`.${cls}`).classList.add('animation-modal');
  // dqs('.overlay').classList.remove('no-display');
  dqs(`.${cls}`).classList.remove('no-display');
  // dqs('.overlay').addEventListener('click', hideWindow);
  const elements = Array.from(dqsa('.additional'));
  // WYBIERANIE KOLORU DO DODANIA
  elements.map(el =>
    el.addEventListener('click', function () {
      addedColor = window
        .getComputedStyle(this)
        .getPropertyValue('background-color');
    })
  );
};

const hideWindow = function (modal) {
  // zamyka okienko z dodawaniem dodatkowego koloru do palety
  dqs(`.${modal}`).classList.add('no-display');
  dqs(`.${modal}`).classList.remove('animation-modal');
  // dqs('.overlay').classList.add('no-display');
};

const addingColor = function () {
  // DODAWANIE DO TABLICY KOLORÓW
  // addedColor = 'rgb(235, 71, 205)';
  colors.push(addedColor);
  // DODAWANIE DO LEGENDY SVG
  // oblicz nr klasy legend_line_# potrzebne do wstawienia do html
  const legendLineNr = did('legend_permises').childElementCount / 2 + 1;
  let visibleElements = Array.from(
    did('legend_permises').querySelectorAll(':not(.no-display)')
  );
  const visibleRects = visibleElements.filter(el => el.nodeName === 'rect');
  const visibleTexts = visibleElements.filter(el => el.nodeName === 'text');
  const textYPosition =
    Number(visibleTexts[visibleTexts.length - 1].getAttribute('y')) + 24;
  const rectYPosition =
    Number(visibleRects[visibleRects.length - 1].getAttribute('y')) + 24.5;

  const html = `<text class="tekst-5 legend_line_${legendLineNr} no_select" x="91.17" y='${textYPosition}'>NAZWA</text><rect class="legend_line_${legendLineNr}" x="57.33" y="${rectYPosition}" style="fill:${addedColor}" width="18.61" height="18.61"/>`;

  did('legend_permises').insertAdjacentHTML('beforeend', html);
  // DODAWANIE DO panelu-zarządzania__widoki-lokale
  dqs('.premises_views_list').insertAdjacentHTML(
    'beforeend',
    `<li><input id="color_palette_${legendLineNr}" class="checkbox" name="color_palette" type="checkbox" onclick="changeLegendColorsView(window.getComputedStyle(document.querySelector(\`.\${this.id}\`)).getPropertyValue(\'background-color\'), this.id)" checked /><div class="color_palette_${legendLineNr}" style="background-color:${addedColor}"></div><label class="colorLayer_${legendLineNr}" ondblclick="this.setAttribute(\'contenteditable\', \'true\')" onblur="colorLayerEdit(this.classList[0],this.textContent)">Nazwa</label></li>`
  );
  //! dodane wiersze troche źle ukłądają się w pionie, różnica 1-2 px
  // DODAWANIE DO panelu-zarządzania__paleta-kolorów
  did('premises_colors_button').insertAdjacentHTML(
    'beforebegin',
    `<div class="color_palette_7" style="background-color:${addedColor}"></div>`
  );

  //POZOSTAŁE
  drawFrame('legend_permises');
};

const clsNoDots = function (str) {
  return str.replace(/[.]/g, '');
};

const devidePremises = function (cls) {
  showWindow('modal-devide');

  activeClass = cls;
  //. 1 wybierz lokal do podziału
  // cls = clsNoDots(cls);
  // . 2 wyświetl activePionts (punkty do rysowania lokalu)
  const coordinates = [
    dqs(cls).getBBox().x,
    dqs(cls).getBBox().y,
    dqs(cls).getBBox().width,
    dqs(cls).getBBox().height,
  ];

  const borders = {
    top: coordinates[1],
    right: coordinates[0] + coordinates[2],
    bottom: coordinates[1] + coordinates[3],
    left: coordinates[0],
  };

  let scale = 20;
  let corX = [];
  let corY = [];
  let activePoints = [];

  // tworzy wszystkie współrzęne X w zakresie między granicami
  for (let i = borders.left; i < borders.right; i += scale) {
    corX.push(i);
  }
  // wypełnienie lokalu współrzędnymi do samych wartości granicznych, żeby zachować minimalny odstęp między punktami (w tym, przypadku 8px) sprawdza odległość ostatniej wartości i jeśli jest więskza od 8px dodaje wartość graniczną, jeśli mniejsza usuwa ostatnią wartość z tablicy i wstawia w jej miejsce wartość graniczną
  if (corX[corX.length - 1] != borders.right) {
    if (Math.abs(borders.right - (corX.length - 1)) > 8) {
      corX.push(borders.right);
    } else {
      corX.pop();
      corX.push(borders.right);
    }
  }

  // tworzy wszystkie współrzęne Y w zakresie między granicami
  for (let i = borders.top; i < borders.bottom; i += scale) {
    corY.push(i);
  }
  // patrz wyżej
  if (corY[corY.length - 1] != borders.bottom) {
    if (Math.abs(borders.bottom - (corY.length - 1)) > 8) {
      corY.push(borders.bottom);
    } else {
      corY.pop();
      corY.push(borders.bottom);
    }
  }

  // tworzy współrzęne aktywnych punktów
  corX.map(function (x) {
    for (let y of corY) {
      activePoints.push(x);
      activePoints.push(y);
    }
  });

  // console.log(borders.right);
  // console.log(borders.bottom);
  // console.log(activePoints);

  //. 2 no_display czy usunąć dany lokal? dla wypełnienia, drzwi, opisów
  Array.from(dqsa(`${cls}.description`)).map(el => el.remove()); // usuwa opisy
  Array.from(dqsa(`${cls}.doors`)).map(el => el.remove()); // usuwa drzwi
  dqs(cls).style.fill = 'rgb(233, 233, 233)'; // zmienia kolor lokalu
  dqs(cls).classList.remove('kontur'); // usuwa kontur
  dqs(cls).classList.add('no_select'); // usuwa denerwujące zaznaczenie

  //. 3 wyswietl aktywne punkty w granicach lokalu
  for (let i = 0; i < activePoints.length; i += 2) {
    document
      .getElementById('svg')
      .insertAdjacentHTML(
        'beforeend',
        ` <use id="ap_00" class="activePoint" x="${activePoints[i]}" y="${
          activePoints[i + 1]
        }" xlink:href="#point"/>`
      );
  }

  //. 4 narysuj 1 lokal
  const points = dqsa('.activePoint');
  for (let i = 0; i < points.length; i++) {
    points[i].addEventListener('click', function () {
      newPermises_01.push(Number(points[i].getAttribute('x')));
      newPermises_01.push(Number(points[i].getAttribute('y')));
      drawing();
    });
  }
};

const prepareToGenerate = function () {
  const cls = did('Lokale_wypelnienia')
    .lastElementChild.classList.value.replace(' premises kontur', '')
    .trim();

  generatePremises(activeClass, `.${cls}`); // z kropkami mają być
  devideWindowDisplay = true;
};

const generatePremises = function (premises_1, premises_2) {
  // tablica z punktami dla lokalu 1
  let premises_01_array = dqs(`${premises_1}.premises`)
    .getAttribute('points')
    .trim()
    .split(' ');
  // tablica z punktami dla lokalu 2
  let premises_02_array = dqs(`${premises_2}.premises`)
    .getAttribute('points')
    .trim()
    .split(' ');

  premises_02_array = premises_02_array.filter(
    (item, index) => premises_02_array.indexOf(item) === index
  );

  // ZMIENNE
  let points_to_merge = []; // punkty do narysowania
  let duplikaty = []; // tablica z duplikatami punktów
  let premises_01_array_clear; // tablica lok.1 bez duplikatów
  let premises_02_array_clear; // tablica lok.2 bez duplikatów
  let coordinates_X = []; // wsporzedne x (bez duplikatów)
  let coordinates_Y = []; // wsporzedne y (bez duplikatów)
  let findAxis; // pomocnicza zmienna, ktora okresla czy szukamy nastepnego x czy y

  // WYSZUKANIE DUPLIKATÓW W OBU LOKALACH

  for (let i = 0; i < premises_01_array.length; i++) {
    if (premises_02_array.some(el => el === premises_01_array[i])) {
      duplikaty.push(premises_01_array[i]);
    }
  }

  // USUWANIE DUPLIKATÓW Z OBU TABLIC
  for (let j = 0; j < duplikaty.length; j++) {
    premises_01_array = premises_01_array.filter(el => el !== duplikaty[j]);
    premises_02_array = premises_02_array.filter(el => el !== duplikaty[j]);
  }

  // POŁĄCZENIE TABLIC + OBRÓBKA => jedna tablica z pojedynczymi stringami
  // PODZIELENIE TABLICY NA 2 ODRĘBNE TABLICE ZE WSPÓŁRZĘDNYMI X i Y
  premises_01_array
    .concat(premises_02_array)
    .map(el => el.split(','))
    .flat()
    .filter((el, ind) =>
      ind % 2 == 0 ? coordinates_X.push(el) : coordinates_Y.push(el)
    );

  // find first()
  points_to_merge.push(coordinates_X[0], coordinates_Y[0]);
  coordinates_X.shift();
  coordinates_Y.shift();

  // updatePoints()
  while (coordinates_X.length > 0 || coordinates_Y.length > 0) {
    // sprawdzenie czy we współrzęnych istnieje kolejny x czy kolejny y, z ostatniego dodanego punktu
    coordinates_X.some(el => el == points_to_merge[points_to_merge.length - 2])
      ? (findAxis = coordinates_X.findIndex(
          el => el == points_to_merge[points_to_merge.length - 2]
        ))
      : (findAxis = coordinates_Y.findIndex(
          el => el == points_to_merge[points_to_merge.length - 1]
        ));
    // aktualizacja punktów w tablicach
    points_to_merge.push(coordinates_X[findAxis], coordinates_Y[findAxis]);
    coordinates_X = coordinates_X.filter((e, i) => i !== findAxis);
    coordinates_Y = coordinates_Y.filter((e, i) => i !== findAxis);
  }
  points_to_merge = points_to_merge.join(' ');

  // // usuwanie starych elementów lokali

  //rysowanie nowego lokalu
  did('Lokale_wypelnienia').insertAdjacentHTML(
    'beforeend',
    `<polygon class="working premises kontur" style="fill: rgb(105, 123, 40)" points="${points_to_merge}" />`
  );

  dqs(`${activeClass}.premises`).remove();
  activeClass = 'working';
  // class_1 = premises_1.slice(1);
  // class_2 = premises_2.slice(1);
};

const drawing = function () {
  Array.from(dqsa('.one')).map(el => el.remove()); // uniknięcie duplikowania elementów
  // wspolrzedne dla nowego lokalu są w tabeli newPermises_01
  // najlepiej byłoby je mieć jako string "xxx,yyy xxx,yyy ..."

  document
    .getElementById('svg')
    .insertAdjacentHTML(
      'beforeend',
      `<path class="one" d="M${newPermises_01}"/>`
    );
};

const stopDraw = function () {
  // 5 stop draw
  let newPermisesStr = '';
  // usunąć active points
  Array.from(dqsa('.activePoint')).map(el => el.remove());
  // zmienić path na polygone na razie z tymczasową klasą

  // usuwa path z klasą one (to był roboczy obiekt potrzebny jedynie do  narysowania lokalu)
  dqs('.one').remove();

  // tworzę string z bardziej przejrzystymi wspórzędnymi, później łatwiej będzie wygenerować automatycznie 2 lokal
  for (let i = 0; i < newPermises_01.length; i = i + 2) {
    newPermisesStr += `${newPermises_01[i]},${newPermises_01[i + 1]} `;
  }
  newPermisesStr = newPermisesStr.trim();

  // tworzę właściwy nowy lokal
  document
    .getElementById('Lokale_wypelnienia')
    .insertAdjacentHTML(
      'beforeend',
      `<polygon class="working premises kontur" style="fill: rgb(105, 123, 40)" points="${newPermisesStr}"/>`
    );
  newPermises_01 = [];
};

// zmiana głównej klasy lokalu np P001L na nową
const changePermisesMainClass = function (oldClass, newClass) {
  const oldClasses = dqs(`.${oldClass}.premises`).classList.value;
  const newClasses = oldClasses.replace(`${oldClass}`, `${newClass}`);
  dqs(`.${oldClass}.premises`).classList.value = `${newClasses}`;
};

const describeDevide = function () {
  // activeClass to teraz dzielony (stary) lokal
  const oldPermises = clsNoDots(activeClass);
  const str = did('new_number_01').value; // tymczasowa zmienna
  const newClass = str.replace(/[ .&;$%@"<>()+,]/g, '');
  const newText = str.toUpperCase();
  const metreage = did('metreage_01').value;
  const doorsWidth = did('doors_01_width').value * 20;

  // if (activeClass === 'working') {
  //   oldPermises = '';
  //   newClass = activeClass;
  // } else {
  //   oldPermises = ;
  //   newClass =
  // }

  // dodawanie opisu i centrowanie opisu
  centeringDescription('working', newClass, newText);

  // zmiana głównej klasy lokalu (wypełnienia)
  changePermisesMainClass('working', newClass);

  // metraż nowego lokalu
  centeringMetreage(newClass, metreage);

  //. nowy lokal do tablicy lokali
  //. drzwi do lokalu
  drawNewDoors(newClass, doorsWidth);

  // updaty
  updatePremises();
  premises_option_filler('premises-desc');
  premises_option_filler('premises-1');
  premises_option_filler('premises-2');
  premises_option_filler('premises-devide');
  colorChange();
  // updaty koniec
  premisesForDevide.push(oldPermises), premisesForDevide.push(newClass);

  // czyszczenie danych input
  did('new_number_01').value = '';
  did('metreage_01').value = '';
  did('doors_01_width').value = '';

  if (devideWindowDisplay) {
    hideWindow('modal-devide');
    devideWindowDisplay = false;
  }
};
// wyrównywanie w pionie i w poziomie nazwy lokalu (pierwsza linijka opisu)
const centeringDescription = function (
  premises_cls,
  description_cls,
  premisesText
) {
  did('Lokale_opisy').insertAdjacentHTML(
    'beforeend',
    `<text class="${description_cls} description name no_select" x="425" y="235" >${premisesText}</text>`
  );

  const premises = dqs(`.${premises_cls}.premises`);
  const description = dqs(`.${description_cls}.name`);

  const premisesWidth = premises.getBBox().width;
  const premisesHeight = premises.getBBox().height;
  const premisesX = premises.getBBox().x;
  const premisesY = premises.getBBox().y;

  const descriptionWidth = description.getBBox().width;
  const descriptionHeight = description.getBBox().height;

  const x = Math.round(premisesX + premisesWidth / 2 - descriptionWidth / 2);
  const y = Math.round(premisesY + premisesHeight / 2 - descriptionHeight / 4);

  // ustawienie właściwych współrzędnych dla opisu
  dqs(`.${description_cls}`).setAttribute('x', x);
  dqs(`.${description_cls}`).setAttribute('y', y);
};

// wyrównywanie w pionie i w poziomie metrażu lokalu (druga linijka opisu)
const centeringMetreage = function (premises, metreage) {
  const prem = dqs(`.${premises}.premises`); //lokal
  const premisesX = prem.getBBox().x; // x lokalu
  const premisesWidth = prem.getBBox().width; // szerokość lokalu
  const descriptionNameY = dqs(`.${premises}.name`).getAttribute('y'); // wysokość opisu name
  const lineSpace = 16; //interlinia 16 px

  // tymczasowy opis metrażu żeby wyliczyć jego szerokość
  did('Lokale_opisy').insertAdjacentHTML(
    'beforeend',
    `<text class="${premises} description metreage no_select" x="0" y="0" >${metreage}m</text>
    <text class="${premises} description square no_select" transform="translate(0 16) scale(0.58)">2
    </text>`
  );

  const metreageWidth = dqs(`.${premises}.metreage`).getBBox().width;
  const squareWidth = dqs(`.${premises}.square`).getBBox().width;
  const metreageX = Math.round(
    premisesX + premisesWidth / 2 - (metreageWidth + squareWidth) / 2
  );
  const squareX = metreageX + metreageWidth;

  dqs(`.${premises}.metreage`).setAttribute('x', metreageX);
  dqs(`.${premises}.metreage`).setAttribute('y', +descriptionNameY + lineSpace);
  dqs(`.${premises}.square`).setAttribute(
    'transform',
    `translate(${squareX}, ${
      dqs(`.${premises}.metreage`).getAttribute('y') - 5
    }) scale(0.58)`
  );
};

const clearTextPlaceholders = function () {
  const textInputs = Array.from(dqsa("[type='text']"));
  textInputs.map(function (input) {
    input.addEventListener('click', function () {
      if (this.getAttribute('placeholder') == ' ...') {
        this.setAttribute('placeholder', '');
      }
    });
    input.addEventListener('blur', function () {
      if (this.textContent === '') {
        this.setAttribute('placeholder', ' ...');
      }
    });
  });
};

// function clearPlaceholder(that) {
//   if (that.getAttribute('placeholder') == ' ...') {
//     that.setAttribute('placeholder', '');
//   }
// }

clearTextPlaceholders();
fillerOptionUpdater();
setColors();
colorChange();
displayLegendColorsView(colors, premises);
//
//
//
//
//! czy punkt należy do linii poniżej
// const offsetX = 363; // trzeba przeliczyć bo na razie jest na sztywno a to 20% z viewportu
// console.log(document.elementFromPoint(317 + offsetX, 294));

// const element = dqs('.color_palette_1').style;
// console.log(element);
// console.log(window.getComputedStyle(element, null));

// ! NOWY ALGORYTM ZNAJDOWANIA ŚCIEŻKI
{
  // TESTOWE dane wejściowe
  let x = [
    457, 417, 457, 578, 417, 457, 500, 578, 578, 578, 612, 457, 612, 500,
  ];
  let y = [
    233, 273, 173, 310, 233, 273, 140, 140, 233, 273, 233, 310, 273, 173,
  ];

  // dane wyjściowe
  let pointsToDraw = [];

  const findPoints = function (arr_x, arr_y) {
    // zmienne pomocnicze
    // let x = arrX;
    // let y = arrY;
    let sameCoordinates;
    let axis; //zmienna określająca kierunek szukania, zaczynamy od X-ów
    let find; // wartość (współrzęna punktu) której szukam
    let findIndex; // index dla wartośći find
    let inactiveAxis; // druga, niekatywna oś

    const setInactiveAxis = function () {
      if (axis === 'x') return (inactiveAxis = 'y');
      else return (inactiveAxis = 'x');
    };

    const setSameCoordinates = function () {
      sameCoordinates = eval('arr_' + axis).filter(point => point === find);
      /* 
      sameCoordinates = arr_x.filter(point => point === arr_x[0])
      */
    };

    const firstPoint = function () {
      axis = 'x';
      findIndex = 0;
      find = eval('arr_' + axis)[findIndex]; // = arr_x[0]

      // dodawanie wynikowych punktów
      pointsToDraw.push(arr_x[findIndex]);
      pointsToDraw.push(arr_y[findIndex]);

      // usuwanie dodanych punktów
      arr_x.shift();
      arr_y.shift();
      //aktualizacja sameCoordinates
      setSameCoordinates();
    };

    const add = function () {
      // FINDINDEX aktualizacja
      findIndex = eval('arr_' + axis).indexOf(find);

      // DODAWANIE współrzędnych do pointsToDraw
      pointsToDraw.push(arr_x[findIndex]);
      pointsToDraw.push(arr_y[findIndex]);
      // USUWANIE współrzędnych z tabel wejściowych
      arr_x = arr_x.filter((point, index) => index != findIndex);
      arr_y = arr_y.filter((point, index) => index != findIndex);
      changeDirection();
    };

    const choose = function () {
      // pobieram indexy, punktów które odpowiadają wartościom sameCoordinates
      let sameCoordinatesIndexes = []; // indexy z aktywnej osi dla wartosći = find
      eval('arr_' + axis).map(function (coord, index) {
        if (coord === find) sameCoordinatesIndexes.push(index);
      });
      // ustalenie nieaktywnej osi
      inactiveAxis = setInactiveAxis();

      let inactiveSameCoordinates = sameCoordinatesIndexes.map(
        point => eval('arr_' + inactiveAxis)[point]
      );

      let outputSameIndexes = [];
      let outputSameCoordinates = [];
      pointsToDraw.filter((point, index) => {
        if (point === find) {
          outputSameIndexes.push(index);
          axis === 'x'
            ? outputSameCoordinates.push(pointsToDraw[index + 1])
            : outputSameCoordinates.push(pointsToDraw[index - 1]);
        }
      });

      // na podstawie znalezionych indexów, pobieram wartośći z osi nieaktywnej i dodaje ostani punkt (wczesniej dodany do pointsToDraw)

      inactiveSameCoordinates = inactiveSameCoordinates.concat(
        outputSameCoordinates
      );
      // w tej chwili w tablcy inactiveCoordinates mam wszystkie wartości z osi nieaktywnej, któe odpowiadają sameCoodrinates z osi aktywnej

      // sortowanie rosnąco
      inactiveSameCoordinates.sort((a, b) => a - b);
      let outputLastInactive =
        axis === 'x'
          ? pointsToDraw[pointsToDraw.length - 1]
          : pointsToDraw[pointsToDraw.length - 2];

      let inactiveIndex = inactiveSameCoordinates.indexOf(outputLastInactive);

      // trzeba dodkonać analizy na podstawie inactiveIndex;
      // jeśli parzysty to interesujący mnie punkt będzie miał inactiveIndex + 1,
      // jeśli index jest nieparzysty to interesujący mnie punkt będzie miał inactiveIndex - 1
      // w ten sposób znajdujemy wspórzędną niaktywnej osi następnego punktu do narysowania
      let inactiveFound;
      inactiveIndex % 2 === 0
        ? (inactiveFound = inactiveSameCoordinates[inactiveIndex + 1])
        : (inactiveFound = inactiveSameCoordinates[inactiveIndex - 1]);

      // DODAWANIE PUNKTU
      // ważne! do tablicy pointsToDraw zawsze najpierw dodaje współrzędne X a potem Y
      axis === 'x'
        ? (pointsToDraw.push(find), pointsToDraw.push(inactiveFound))
        : (pointsToDraw.push(inactiveFound), pointsToDraw.push(find));

      for (let id of sameCoordinatesIndexes) {
        if (eval('arr_' + inactiveAxis)[id] === inactiveFound) findIndex = id;
      }

      // USUWANIE
      // żeby to zrobić muszę zaktualizować wartość findIndex
      arr_x = arr_x.filter((point, index) => index != findIndex);
      arr_y = arr_y.filter((point, index) => index != findIndex);

      // AKTUALIZACJA sameCoordinates
      changeDirection();
    };

    const changeDirection = function () {
      // UAKTUALNIENIE wartości find i axis w zależności od axis
      axis === 'x'
        ? ((find = pointsToDraw[pointsToDraw.length - 1]), (axis = 'y'))
        : ((find = pointsToDraw[pointsToDraw.length - 2]), (axis = 'x'));
      // SAMESCOORDINATES
      setSameCoordinates();
    };

    while (arr_x.length > 0 || arr_y.length > 0) {
      // for (let i = 0; i < looper; i++) {
      if (sameCoordinates === undefined) {
        firstPoint();
        // } else if (sameCoordinates.length % 2 == 0) {
        //   changeDirection();
      } else if (sameCoordinates.length == 1) {
        add();
      } else {
        choose();
      }
    }
  };
  //  findPoints(x, y, 16);

  did('svg').insertAdjacentHTML(
    'beforeend',
    `<path class="one" d="M${pointsToDraw}Z"/>`
  );
}

let str = '23231j kSDs23d ":;-_23.,';

const makeClassName = function (str) {
  str = str.substring(str.search(/\D/));
  str = str.replace(/[^a-zA-Z0-9]/g, '');
  return str;
};

str = makeClassName(str);
console.log(str);

//! przygotowanie do delegowanie eventListenera
// const svg = document.querySelector('#svg');
// svg.addEventListener('click', e => console.log(e.target));
// teraz nie klikają opisy bo są z klasą no_select
// dopisać założenie if classList.contains(permises kontur) wywołaj changeColor
