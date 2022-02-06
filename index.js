'use strict';

//# SHORTCUT FUNCTIONS
const dqs = cls => document.querySelector(cls);
const dqsa = cls => document.querySelectorAll(cls);
const did = id => document.getElementById(id);
const getNodeValue = node => did(node).value;

//# SVG-----------------------------------------------------------------
const svgNode = did('svg');
const svgPremisesShapes = did('svg-premises-shapes');
const svgDoorsNode = did('svg-premises-doors');
const svgLegendPremisesGroupContentNode = did('svg-legend-premises-content');
const svgPremisesDescriptionGroupNode = did('svg-premises-description-group');
const svgLegendPremisesGroup = did('svg-legend-premises-group');
const svgLegendPremisesFrame = did('svg-legend-premises-groups-frame');

//# WINDOW - OPIS PLANU-------------------------------------------------
const planDescriptionRadioBtns = [
  ...document.getElementsByName('plan-description'),
];
const planDescriptionInput = did('plan-description');
const planDescriptionEnterBtn = did('plan-description-enter');

//# WINDOW - WYŚWIETLANIE - WARSTWY
const chbLegendVisability = did('legend-legend-visability');
const chbPlanTitleVisability = did('legend-plan-title-box-visability');
const chbPlanHeaderVisability = did('legend-plan-header-box-visability');
const chbPlanDescriptionVisability = did(
  'legend-plan-description-box-visability'
);
const chbPlanFooterVisability = did('legend-plan-footer-box-visability');
const chbGroupsVisability = did('legend-premises-box-visability');
const chbFloorsVisability = did('legend-floors-visability');
const chbSquareVisability = did('legend-square-scheme-visability');
const chbAllPremisesDescriptionVisability = did(
  'all-premises-description-visability'
);
const chbGridVisability = did('legend-grid-visability');
const chbSignsVisability = did('legend-signs-visability');

//# WINDOW - WYŚWIETLANIE - GRUPY LOKALI
const viewGroupsNode = did('view-premises-groups');

//# WINDOW - PALETA KOLORÓW
const wrapColorPalette = did('color-palette');
let colorPaletteBadges;
const activeColorsGroupsNode = did('active-colors-badges');
const additionalColorsGroupsNode = did('additional-colors-badges');
const btnAddActiveColorNode = did('colorToActive');
const btnDeleteColorNode = did('colorErase');
const colorPickerBtn = did('inputColor');
const colorPickerIco = did('colorPickerIco');

//# WINDOW - EDYCJA GRUP
const wrapPremisesGroupsEdition = dqs('.premises-groups-edition-content');

//# WINDOW - EDYCJA LOKALI
const premisesEditionSelectBtn = did('premises-edition-select');
const wrapPremisesEditionColorBadges = did('premises-edition--colors');
const premisesMergingSelectBtn = did('premises-merging-select');
const inputPremisesName = did('premises-name');
const inputPremisesMetreage = did('premises-metreage');
const inputPremisesDoorsWidth = did('premises-doors--width');
const premisesDoorsCounter = did('premises-doors--counter');
const btnDoorsDelete = did('button-doors-delete');
const btnDoorsAdd = did('button-doors-add');
const btnDoorsPrevious = did('button-doors-previous');
const btnDoorsNext = did('button-doors-next');
const btnPremisesMerge = did('button-merge');
const btnPremisesDevide = did('button-devide');
const btnPremisesInputsConfirm = did('btn-input-premises-confirm');
const btnbtnDoorsWidthConfirm = did('btn-doors-width-confirm');
const btnStrokeLock = did('stroke-lock');
const btnStrokeSwitch = did('stroke-switch');
const wrapDescriptionEditionbtn = did('edition-description');
const btnsDescriptionFontSize = dqsa('[data-fontSize]');
const mergePremisesBtn = did('button-merge');
const firstRoomMergeBtn = did('first-room-merge');
const secondRoomMergeBtn = did('second-room-merge');
const noRoomDoorsBtn = did('no-room-doors');
const bothRoomDoorsBtn = did('both-room-doors');
const premisesMergeEnterBtn = did('merge-enter');

//#VARIABLES------------------------------------------------------------
const premises = [
  {
    name: 'P 001',
    fontSize: 'S',
    id: 'P001',
    coordinates: [426, 314, 477, 314, 477, 359, 426, 359],
    color: 'rgb(235, 32, 101)',
    descriptionCoors: [],
    measurements: '60',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[449, 356, 1]],
  },
  {
    name: 'P 002',
    fontSize: 'S',
    id: 'P002',
    coordinates: [477, 314, 530, 314, 530, 359, 477, 359],
    color: 'rgb(144, 200, 79)',
    descriptionCoors: [],
    measurements: '63',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: true,
    strokeWhite: true,
    doors: [[497, 356, 1]],
  },
  {
    name: 'P 0.03',
    fontSize: 'L',
    id: 'P003',
    coordinates: [
      620, 231, 620, 314, 575, 314, 575, 359, 530, 359, 530, 314, 426, 314, 426,
      267, 417, 267, 417, 231,
    ],
    color: 'rgb(40, 96, 255)',
    descriptionCoors: [],
    measurements: '220',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [[544, 356, 1]],
  },
  {
    name: 'P 004',
    fontSize: 'S',
    id: 'P004',
    coordinates: [575, 314, 620, 314, 620, 359, 575, 359],
    color: 'rgb(203, 203, 203)',
    descriptionCoors: [],
    measurements: '55',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: true,
    strokeWhite: false,
    doors: [[605, 356, 0.5]],
  },
  {
    name: 'O 001L',
    fontSize: 'XL',
    id: 'O001L',
    coordinates: [
      815, 162, 815, 188, 824, 188, 824, 203, 834, 203, 834, 314, 649, 314, 649,
      359, 620, 359, 620, 231, 530, 231, 530, 171, 505, 171, 505, 179, 474, 179,
      474, 116, 575, 116, 575, 101, 615, 101, 615, 116, 649, 116, 649, 101, 694,
      101, 694, 110, 827, 110, 827, 138, 834, 138, 834, 162,
    ],
    color: 'rgb(13, 151, 13)',
    descriptionCoors: [],
    measurements: '679',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [
      [625, 356, 0.5],
      [621, 115, 1],
      [744, 109, 2],
    ],
  },
  {
    name: 'O 0.01',
    fontSize: 'M',
    id: 'O001',
    coordinates: [718, 314, 718, 359, 662, 359, 662, 354, 649, 354, 649, 314],
    color: 'rgb(193, 20, 20)',
    descriptionCoors: [],
    measurements: '83',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[692, 356, 1]],
  },
  {
    name: 'O 002',
    fontSize: 'S',
    id: 'O002',
    coordinates: [718, 314, 762, 314, 762, 359, 718, 359],
    color: 'rgb(255, 235, 59)',
    descriptionCoors: [],
    measurements: '55',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [[730, 356, 1]],
  },
  {
    name: 'O 003',
    fontSize: 'S',
    id: 'O003',
    coordinates: [762, 314, 795, 314, 795, 359, 762, 359],
    color: 'rgb(40, 96, 255)',
    descriptionCoors: [],
    measurements: '42',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[774, 356, 0.5]],
  },
  {
    name: 'O 004',
    fontSize: 'S',
    id: 'O004',
    coordinates: [795, 314, 834, 314, 834, 359, 795, 359],
    color: 'rgb(193, 20, 20)',
    descriptionCoors: [],
    measurements: '57',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[810, 356, 0.8]],
  },
  {
    name: 'H 001',
    fontSize: 'M',
    id: 'H001',
    coordinates: [397, 403, 475, 403, 475, 456, 397, 456],
    color: 'rgb(193, 20, 20)',
    descriptionCoors: [],
    measurements: '102',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[442, 402, 1]],
  },
  {
    name: 'H 002',
    fontSize: 'S',
    id: 'H002',
    coordinates: [475, 403, 507, 403, 507, 456, 475, 456],
    color: 'rgb(203, 203, 203)',
    descriptionCoors: [],
    measurements: '51',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [[496, 431, 1, 'rotate']],
  },
  {
    name: 'H 0.03',
    fontSize: 'M',
    id: 'H003',
    coordinates: [
      496, 475, 496, 498, 507, 498, 507, 525, 411, 525, 411, 489, 397, 489, 397,
      456, 507, 456, 507, 475,
    ],
    color: 'rgb(40, 96, 255)',
    descriptionCoors: [],
    measurements: '96',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[502, 510, 0.5, 'rotate']],
  },
  {
    name: 'H 004',
    fontSize: 'S',
    id: 'H004',
    coordinates: [
      411, 525, 411, 519, 397, 519, 397, 525, 397, 527, 397, 555, 507, 555, 507,
      525,
    ],
    color: 'rgb(255, 235, 59)',
    descriptionCoors: [],
    measurements: '71',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [
      [496, 535, 1, 'rotate'],
      [427, 552, 1],
    ],
  },
  {
    name: 'H 005',
    fontSize: 'S',
    id: 'H005',
    coordinates: [566, 403, 612, 403, 612, 433, 566, 433],
    color: 'rgb(13, 151, 13)',
    descriptionCoors: [],
    measurements: '43',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[579, 402, 1]],
  },
  {
    name: 'H 006',
    fontSize: 'S',
    id: 'H006',
    coordinates: [651, 403, 651, 475, 624, 475, 624, 442, 612, 442, 612, 403],
    color: 'rgb(40, 96, 255)',
    descriptionCoors: [],
    measurements: '68',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[617, 402, 1]],
  },
  {
    name: 'H 007',
    fontSize: 'S',
    id: 'H007',
    coordinates: [651, 403, 675, 403, 675, 456, 651, 456],
    color: 'rgb(193, 20, 20)',
    descriptionCoors: [],
    measurements: '30',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[658, 402, 0.5]],
  },
  {
    name: 'H 008',
    fontSize: 'S',
    id: 'H008',
    coordinates: [714, 403, 714, 480, 687, 480, 687, 456, 675, 456, 675, 403],
    color: 'rgb(255, 235, 59)',
    descriptionCoors: [],
    measurements: '52',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [[685, 402, 1]],
  },
  {
    name: 'H 009',
    fontSize: 'S',
    id: 'H009',
    coordinates: [736, 462, 757, 462, 757, 480, 714, 480, 714, 403, 736, 403],
    color: 'rgb(203, 203, 203)',
    descriptionCoors: [],
    measurements: '41',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [[720, 402, 0.5]],
  },
  {
    name: 'H 010',
    fontSize: 'S',
    id: 'H010',
    coordinates: [764, 403, 764, 455, 757, 455, 757, 462, 736, 462, 736, 403],
    color: 'rgb(13, 151, 13)',
    descriptionCoors: [],
    measurements: '53',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[745, 402, 0.5]],
  },
  {
    name: 'H 011',
    fontSize: 'M',
    id: 'H011',
    coordinates: [877, 403, 877, 452, 774, 452, 774, 410, 784, 410, 784, 403],
    color: 'rgb(255, 152, 0)',
    descriptionCoors: [],
    measurements: '133',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [
      [793, 402, 1],
      [866, 416, 1, 'rotate'],
    ],
  },
  {
    name: 'H 012',
    fontSize: 'S',
    id: 'H012',
    coordinates: [877, 478, 877, 525, 812, 525, 812, 452, 845, 452, 845, 478],
    color: 'rgb(13, 151, 13)',
    descriptionCoors: [],
    measurements: '124',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [
      [839, 456, 0.5, 'rotate'],
      [866, 498, 1, 'rotate'],
    ],
  },
  {
    name: 'H 013',
    fontSize: 'S',
    id: 'H013',
    coordinates: [819, 525, 877, 525, 877, 555, 819, 555],
    color: 'rgb(193, 20, 20)',
    descriptionCoors: [],
    measurements: '55',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[838, 552, 1]],
  },
  {
    name: 'H 014',
    fontSize: 'S',
    id: 'H014',
    coordinates: [819, 525, 819, 555, 774, 555, 774, 452, 812, 452, 812, 525],
    color: 'rgb(255, 152, 0)',
    descriptionCoors: [],
    measurements: '97',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[783, 552, 1]],
  },
  {
    name: 'H 015',
    fontSize: 'M',
    id: 'H015',
    coordinates: [766, 486, 766, 555, 687, 555, 687, 480, 757, 480, 757, 486],
    color: 'rgb(40, 96, 255)',
    descriptionCoors: [],
    measurements: '145',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [
      [695, 552, 1],
      [747, 552, 0.5],
    ],
  },
  {
    name: 'H 016',
    fontSize: 'S',
    id: 'H016',
    coordinates: [566, 525, 624, 525, 624, 555, 566, 555],
    color: 'rgb(255, 152, 0)',
    descriptionCoors: [],
    measurements: '59',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [[585, 552, 1]],
  },
  {
    name: 'H 017',
    fontSize: 'S',
    id: 'H017',
    coordinates: [566, 498, 624, 498, 624, 525, 566, 525],
    color: 'rgb(40, 96, 255)',
    descriptionCoors: [],
    measurements: '59',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[565, 510, 0.5]],
  },
  {
    name: 'H 018',
    fontSize: 'S',
    id: 'H018',
    coordinates: [612, 433, 612, 442, 607, 442, 607, 485, 566, 485, 566, 433],
    color: 'rgb(203, 203, 203)',
    descriptionCoors: [],
    measurements: '64',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [[565, 457, 1]],
  },
  {
    name: 'G 001',
    fontSize: 'S',
    id: 'G001',
    coordinates: [738, 598, 778, 598, 778, 746, 738, 746],
    color: 'rgb(255, 235, 59)',
    descriptionCoors: [],
    measurements: '168',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [
      [748, 743, 1],
      [748, 597, 1],
      [728, 668, 1, 'rotate'],
    ],
  },
  {
    name: 'G 002',
    fontSize: 'L',
    id: 'G002',
    coordinates: [778, 598, 876, 598, 876, 671, 778, 671],
    color: 'rgb(193, 20, 20)',
    descriptionCoors: [],
    measurements: '217',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [
      [821, 597, 1],
      [865, 613, 1, 'rotate'],
    ],
  },
  {
    name: 'G 003',
    fontSize: 'L',
    id: 'G003',
    coordinates: [778, 671, 876, 671, 876, 746, 778, 746],
    color: 'rgb(193, 20, 20)',
    descriptionCoors: [],
    measurements: '217',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [
      [822, 743, 1],
      [865, 701, 1, 'rotate'],
    ],
  },
  {
    name: 'F 001',
    fontSize: 'M',
    id: 'F001',
    coordinates: [397, 596, 451, 596, 451, 750, 397, 750],
    color: 'rgb(255, 235, 59)',
    descriptionCoors: [],
    measurements: '198',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: false,
    doors: [
      [415, 595, 1],
      [415, 747, 1],
    ],
  },
  {
    name: 'F 002',
    fontSize: 'L',
    id: 'F002',
    coordinates: [
      565, 596, 565, 725, 507, 725, 507, 716, 498, 716, 498, 750, 451, 750, 451,
      596,
    ],
    color: 'rgb(13, 151, 13)',
    descriptionCoors: [],
    measurements: '374',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [
      [466, 747, 1],
      [487, 595, 1],
    ],
  },
  {
    name: 'F 003A',
    fontSize: 'L',
    id: 'F003A',
    coordinates: [675, 669, 675, 750, 565, 750, 565, 633, 611, 633, 611, 669],
    color: 'rgb(40, 96, 255)',
    descriptionCoors: [],
    measurements: '46',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[606, 747, 1]],
  },
  {
    name: 'F 003B',
    fontSize: 'S',
    id: 'F003B',
    coordinates: [565, 596, 611, 596, 611, 633, 565, 633],
    color: 'rgb(40, 96, 255)',
    descriptionCoors: [],
    measurements: '278',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [[577, 595, 1]],
  },

  {
    name: 'F 004',
    fontSize: 'M',
    id: 'F004',
    coordinates: [611, 596, 675, 596, 675, 669, 611, 669],
    color: 'rgb(13, 151, 13)',
    descriptionCoors: [],
    measurements: '99',
    logo: '',
    strokeCoors: [], // na ten moment w cssesie
    strokeLocked: false,
    strokeWhite: true,
    doors: [
      [664, 623, 1, 'rotate'],
      [620, 595, 1],
    ],
  },
];

const descriptionFontSize = { S: 0.6, M: 0.9, L: 1.3, XL: 1.8 };

let premisesGroups = [
  {
    rgb: 'rgb(255, 235, 59)',
    name: 'Negocjowane',
    premisesList: [],
    isVisible: true,
  },
  {
    rgb: 'rgb(13, 151, 13)',
    name: 'Wolne',
    premisesList: [],
    isVisible: true,
  },
  {
    rgb: 'rgb(40, 96, 255)',
    name: 'Najemcy',
    premisesList: [],
    isVisible: true,
  },
  {
    rgb: 'rgb(193, 20, 20)',
    name: 'Nowi najemcy',
    premisesList: [],
    isVisible: true,
  },
  {
    rgb: 'rgb(255, 152, 0)',
    name: 'Pom. techniczne',
    premisesList: [],
    isVisible: true,
  },
  {
    rgb: 'rgb(203, 203, 203)',
    name: 'Niewykończone',
    premisesList: [],
    isVisible: true,
  },
];

let activeColors = [
  'rgb(255, 235, 59)',
  'rgb(13, 151, 13)',
  'rgb(40, 96, 255)',
  'rgb(193, 20, 20)',
  'rgb(255, 152, 0)',
  'rgb(203, 203, 203)',
  'rgb(235, 32, 101)',
  'rgb(144, 200, 79)',
];

let additionalColors = [
  // 'rgb(235, 32, 101)',
  'rgb(163, 46, 183)',
  'rgb(110, 64, 189)',
  // 'rgb(70, 87, 187)',
  'rgb(34, 151, 244)',
  // 'rgb(4, 192, 216)',
  'rgb(4, 226, 254)',
  'rgb(9, 159, 145)',
  'rgb(83, 182, 87)',
  // 'rgb(144, 200, 79)',
  'rgb(208, 223, 60)',
  'rgb(255, 193, 7)',
  'rgb(133, 96, 84)',
  'rgb(106, 135, 149)',
];

const emptyColorBadge = '#4a4a4a';

const grid = {
  widthStart: 0,
  widthEnd: 740,
  heightStart: 0,
  heightEnd: 680,
  step: 20,
};

let activeObject = '';
let selectedColor = '';
let doorsCounter = 0; // zmienna potrzebna do "przechodznia" w edycji koljnych drzwi
let radioButtonMarker = ''; // zmienna pozwalająca odznaczyć radiobutton w widoku opis planu
let newGroupCounter = 0; // zmienna potrzebna do ustalenia nazwy domyślnej dla nowej grupy, każda kolejna grupa ma wyższy numer
let scale = 20; // skala 1 metr = 20px - wykorzystywana do wyrysowania drzwi i kiedyś siatki

const visibleGroups = function () {
  return premisesGroups.filter(group => group.isVisible === true);
};

const notVisibleGroups = function () {
  return premisesGroups.filter(group => group.isVisible !== true);
};

const getShapesNodesFromPremises = function (premisesArray) {
  return premisesArray.map(room => did(`${room.id}`));
};

const getDoorsNodesFromPremises = function (premisesArray) {
  return premisesArray
    .map(room =>
      Array.from(svgDoorsNode.querySelectorAll(`[data-name="${room.id}"]`))
    )
    .flat();
};

const getDescriptionNodesFromPremises = function (premisesArray) {
  // prettier-ignore
  return premisesArray.map(room => svgPremisesDescriptionGroupNode.querySelector(`[data-name="${room.id}"]`)
  );
};

//.-------------------------------------------------------------------------------SVG-

const clearNodeContent = function (
  node = dqs(`.description-group[data-name="${activeObject.id}"]`)
) {
  node.innerHTML = '';
};

/**
 * @description renderuje wypełnienie(tylko) lokalu na warstwie svg
 * @param room - pojedynczy obiekt lokalu
 * @on_node svgPremisesNode
 */
const drawPremisesShape = function (room) {
  const html = `<polygon id="${room.id}" data-name="${room.id}" data-color="${room.color}" class="premises" points="${room.coordinates}" fill="${room.color}"/>`;

  svgPremisesShapes.insertAdjacentHTML('beforeend', html);
};

/**
 * @description renderuje (tylko) kontur lokalu na warstwie svg
 * @param {*} room - pojedynczy obiekt lokalu
 */
const drawPremisesStroke = function (room) {
  const premisesNode = did(room.id);

  room.strokeWhite === true
    ? premisesNode.classList.toggle(`stroke-light`)
    : premisesNode.classList.toggle(`stroke-dark`);
};

/**
 * @description renderuje (tylko) drzwi lokalu na warstwie svg
 * @param {*} room - pojedynczy obiekt lokalu
 */
// const drawPremisesDoors_oldFunction = function (room) {
//   room.doorsCoors.map(doors => {
//     const html = `<polygon class="doors" data-name="${room.id}" points="${doors}" fill="${room.color}"/>`;
//     svgDoorsNode.insertAdjacentHTML('beforeend', html);
//   });
// };

const drawPremisesDoors = function (room) {
  room.doors.map(doors => {
    let cssClass = 'doors';
    if (doors[doors.length - 1] === 'rotate') cssClass = 'doors doors_rotate';

    // prettier ignore
    const html = `<rect class="${cssClass}" data-name="${room.id}"
    x="${doors[0]}" y="${doors[1]}" width="${(doors[2] * scale).toFixed(
      2
    )}" height="4" fill="${room.color}"/>`;

    svgDoorsNode.insertAdjacentHTML('beforeend', html);
  });
};

/**
 * @description pobiera kolor konturu i opisu dla lokalu z premises.strokeWhite ustala jaki kolor konturu i opisu ma być ustawiony
 * @param {*} room - pojedynczy obiekt lokalu
 */
const getStrokeColor = room =>
  room.strokeWhite ? 'stroke-light' : 'stroke-dark';

const clearWrapPremisesDescription = function (room) {
  dqs(`.description-group[data-name='${room.id}']`).remove();
};

/**
 * @description renderuje <g> grupę/wrap dla opisu lokalu. grupa tylko w htmlu, na planie niewidoczna
 * @param {*} room - pojedynczy obiekt lokalu
 */
const drawWrapPremisesDescription = function (room) {
  svgPremisesDescriptionGroupNode.insertAdjacentHTML(
    'beforeend',
    `<g class="description-group" data-name="${room.id}"></g>`
  );
};

/**
 * @description renderuje nazwę w opisie lokalu na svg
 * @param {*} room - pojedynczy obiekt lokalu
 */
const drawDescriptionName = function (room) {
  const strokeColor = getStrokeColor(room);

  svgPremisesDescriptionGroupNode
    .querySelector(`[data-name="${room.id}"].description-group`)
    .insertAdjacentHTML(
      'beforeend',
      `<text class="name fontSize-${room.fontSize} ${strokeColor}">${room.name}</text>`
    );
};

/**
 * @description renderuje metraż w opisie lokalu na svg
 * @param {*} room - pojedynczy obiekt lokalu
 */
const drawDescriptionMeasurement = function (room) {
  const strokeColor = getStrokeColor(room);

  svgPremisesDescriptionGroupNode
    .querySelector(`[data-name="${room.id}"].description-group`)
    .insertAdjacentHTML(
      'beforeend',
      `<text class="measurement fontSize-${room.fontSize} ${strokeColor}" >${room.measurements} m</text>`
    );
};

/**
 * @description ustala współrzędne dla opis lokalu na svg
 * @param {*} room - pojedynczy obiekt lokalu, descriptionType - typ opisu [nazwa, metraż]
 */
const setDescriptionCoordinates = function (room, descriptionType) {
  let lineheight;

  if (descriptionType === 'measurement') {
    lineheight = 16 * descriptionFontSize[room.fontSize];
  } else {
    lineheight = 0;
  }

  const premisesBox = did(room.id);
  const elementBox = dqs(
    `[data-name="${room.id}"].description-group .${descriptionType}`
  );
  // const [newElement] = dqsa(`[data-name="${room.id}"].description .${element}`);

  // console.log(elementBox);
  // console.log(newElement);

  const premisesWidth = premisesBox.getBBox().width;
  const premisesHeight = premisesBox.getBBox().height;
  const premisesX = premisesBox.getBBox().x;
  const premisesY = premisesBox.getBBox().y;

  const elementWidth = elementBox.getBBox().width;
  const elementHeight = elementBox.getBBox().height;

  const x = Math.round(premisesX + premisesWidth / 2 - elementWidth / 2);
  const y = Math.round(
    premisesY + premisesHeight / 2 + lineheight - elementHeight / 4
  );

  // ustawienie właściwych współrzędnych dla opisu
  elementBox.setAttribute('transform', `translate(${x},${y})`);

  if (descriptionType === 'measurement') {
    const strokeColor = getStrokeColor(room);
    const supperX = premisesX + premisesWidth / 2 + elementWidth / 2;
    const supperY = y - lineheight / 2;
    const supperFontSize = 8 * descriptionFontSize[room.fontSize];

    svgPremisesDescriptionGroupNode
      .querySelector(`[data-name="${room.id}"].description-group`)
      .insertAdjacentHTML(
        'beforeend',
        `<text class="superscript ${strokeColor}" transform="translate(${supperX},${supperY})" style="font-size:${supperFontSize}px">2</text>`
      );
  }
};

const drawCompleteRoomDescription = function (room) {
  drawDescriptionName(room);
  drawDescriptionMeasurement(room);
  setDescriptionCoordinates(room, 'name');
  setDescriptionCoordinates(room, 'measurement');
};

/**
 * @description wywołuje wszystkie niezbędne funckje by narysować kompletny lokal z jego wszystkimi elementami na warstwie svg
 * @param {*} room - pojedynczy obiekt lokalu, descriptionType - typ opisu [nazwa, metraż]
 */
const drawCompletePremises = function (premises) {
  Array.isArray(premises) ? (premises = premises) : (premises = [premises]);

  premises.map(room => {
    setStrokeColor(room);
    drawPremisesShape(room);
    drawPremisesStroke(room);
    drawPremisesDoors(room);
    drawWrapPremisesDescription(room);
    drawCompleteRoomDescription(room);
  });
};

/**
 * @description toggle widoczności dla każdej grupy lokali na planie
 * @param clickedNode - przychodzi z eventListenera
 * @window WYŚWIETLANIE - GRUPY LOKALI
 */
const changeSVGGroupVisability = function (target, wrapper) {
  // w tym przypadku:
  //# wrapper - zawsze wskazuje całą linijkę grupy, ma atrybut data-color
  //# target - wskazuje klinięty node, jest zmienny

  // wyszukiwanie grup lokali z danym kolorem (node z kolorem to wrapper całej linii i przychodzi jako parametr z funkcji listenera)
  const clickedColor = wrapper.getAttribute('data-color');
  const [groupWithClickedColor] = premisesGroups.filter(
    room => room.rgb === clickedColor
  );

  // 1
  // zmiana stanu chcecked (true/false) dla grupy w premisesGroups, potem jest to wykorzystane do renderowania legendy groupy lokali na svg. renderowane są tylko grupy z chcecked === true.
  groupWithClickedColor.isVisible
    ? (groupWithClickedColor.isVisible = false)
    : (groupWithClickedColor.isVisible = true);

  // ustalenie lokali dla których zmieniam widoczność opisu
  const premisesWithClickedColor = premises.filter(
    room => room.color === clickedColor
  );
  const shapeNodesWithClickedColor = premisesWithClickedColor.map(room =>
    did(`${room.id}`)
  );

  // obsługa checkboxa
  // poniżej rozpoznanie czy kliknięto , checkboxa
  if (target.getAttribute('type') !== 'checkbox') {
    // jeśli NIE zmieniam zaznaczenie checkboxa ręcznie
    wrapper.querySelector('input').checked
      ? (wrapper.querySelector('input').checked = false)
      : (wrapper.querySelector('input').checked = true);
  }

  // 2 obsługa lokali i szczegółów
  showShapes();
  hideShapesInHiddenGroups();
  showDoors();
  hideDoorsInHiddenGroups();
  if (chbAllPremisesDescriptionVisability.checked) {
    showDescription();
    hideDescriptionInHiddenGroups();
  }
  // 3 obsługa legendy lokali
  drawVisibleGroups_SvgLegend();
};

const findPremisesInHideGroups = function () {
  const hideGroups = notVisibleGroups();
  const hideColors = hideGroups.map(group => group.rgb);
  const hidePremises = hideColors
    .map(rgb => premises.filter(room => room.color === rgb))
    .flat();
  return hidePremises;
};

const hideShapesInHiddenGroups = function () {
  const hidePremises = findPremisesInHideGroups();
  const nodesToHide = getShapesNodesFromPremises(hidePremises);
  nodesToHide.map(node => node.classList.add('dont-display'));
};

const hideDoorsInHiddenGroups = function () {
  const hidePremises = findPremisesInHideGroups();
  const nodesToHide = getDoorsNodesFromPremises(hidePremises);
  nodesToHide.map(node => node.classList.add('dont-display'));
};

const hideDescriptionInHiddenGroups = function () {
  const hidePremises = findPremisesInHideGroups();
  const nodesToHide = getDescriptionNodesFromPremises(hidePremises);
  hideDescriptions(nodesToHide);
};

const hideDescriptions = function (
  nodesToHide = svgPremisesDescriptionGroupNode.children
) {
  [...nodesToHide].forEach(node => node.classList.add('dont-display'));
};

const showShapes = function (shapesNodes = svgPremisesShapes.childNodes) {
  shapesNodes.forEach(node => node.classList.remove('dont-display'));
};

const showDoors = function (doorsNodes = svgDoorsNode.childNodes) {
  doorsNodes.forEach(node => node.classList.remove('dont-display'));
};

const showDescription = function (
  descriptionNodes = svgPremisesDescriptionGroupNode.childNodes
) {
  descriptionNodes.forEach(node => node.classList.remove('dont-display'));
};

/**
 * @description toggle widoczności dla grup/kolorów opisów lokali (wypełnień/kształtów)
 * @param premisesArr - przychodzi z eventListenera
 * @window WYŚWIETLANIE - GRUPY LOKALI
 */
const switchDescriptionVisability = function (boolean, premisesArr) {
  const descriptionNodes = getDescriptionNodesFromPremises(premisesArr);

  boolean
    ? showDescription(descriptionNodes)
    : hideDescriptions(descriptionNodes);
};

/**
 * @description 'rysuje' na svg JEDNĄ grupę lokali w boxie w legendzie
 */
const drawSVGLegendGroups = function (iteration, name, color) {
  // console.log(iteration, name, color);
  // console.log(premisesGroups);

  const rectXCoor = 57; // position unchanging
  const rectYCoor = 190; // + iteration*25
  const textXCoor = 91; // position unchanging
  const textYCoor = 203; // + iteration*25
  const html = `<g data-color="${color}">
  <rect class="cls-11" x="57" y="${
    rectYCoor + iteration * 25
  }" width="19" height="19" style="fill:${color}"/>
  <text class="cls-5" transform="translate(91 ${203 + iteration * 25})">
    ${name.toUpperCase()}
  </text>
  </g>`;

  svgLegendPremisesGroupContentNode.insertAdjacentHTML('beforeend', html);
};

/**
 * @description 'rysuje' na svg, ramkę dla boxa z grupami lokali
 */
const drawSVGLegendGroupsFrame = function () {
  // height
  const linesInFrame = svgLegendPremisesGroupContentNode.childElementCount;
  const lineHeight = 25;
  const marginTop = 11;
  const marginBottom = 5;
  let frameHeight = marginTop + linesInFrame * lineHeight + marginBottom;

  // width
  const legendsElementWidth = [
    ...svgLegendPremisesGroupContentNode.querySelectorAll('[data-color]'),
  ].map(line => line.getBBox().width);
  const widestElement = Math.max(...legendsElementWidth);
  const marginsLR = 16;
  let frameWidth = widestElement + marginsLR;

  if (linesInFrame === 0) {
    frameHeight = 0;
    frameWidth = 0;
    svgLegendPremisesGroup.style.visibility = 'hidden';
  } else {
    svgLegendPremisesGroup.style.visibility = 'visible';
    // setting frame height
    svgLegendPremisesFrame.setAttribute('height', frameHeight);
    // setting frame height
    svgLegendPremisesFrame.setAttribute('width', frameWidth);
  }
};

/**
 * @description 'rysuje' na svg WSZYSTKIE grupy lokali w boxie w legendzie
 */
const drawVisibleGroups_SvgLegend = function () {
  svgLegendPremisesGroupContentNode.textContent = '';
  const visibleGroups = premisesGroups.filter(room => room.isVisible === true);

  for (let i = 0; i < visibleGroups.length; i++) {
    let elementName = visibleGroups[i].name.slice(0, 23);
    let elementColor = visibleGroups[i].rgb;

    drawSVGLegendGroups(i, elementName, elementColor);
  }

  drawSVGLegendGroupsFrame();
};

//.---------------------------------------------------------------------EDYCJA-LOKALI-
/**
 * @description renderuje/wypełnia listę w tagu select nazwami lokali z obiektu premises, segreguje lokale na budynki
 * @param {*} array - tablica z lokalami, domyślnie premises. przygotowane pod listę do łączenie lokali gdzie tablica lokali będzie okrojona o aktyny lokal
 * @param {*} node - węzeł/miejsce w które wstrzykujemy kod / listę
 */
const renderPremisesSelectionList = function (array = premises, node) {
  //! dodać sortowanie alfabetyczne
  let firstLetter = array[0].id.charAt(0);
  let html = `<optgroup class="merge-option" label="Budynek ${firstLetter}">`;

  array.map(room => {
    if (room.id.charAt(0) === firstLetter) {
      html += `<option class="merge-option" value="${room.id}">${room.name}</option>`;
    } else {
      firstLetter = room.id.charAt(0);
      html += `</optgroup><optgroup class="merge-option" label="Budynek ${firstLetter}"><option class="merge-option" value="${room.id}">${room.name}</option>`;
    }
  });
  node.insertAdjacentHTML('beforeend', html);
};

/**
 * @description ustala wartość zmiennej activeObject
 * @param {*} array - tablica z lokalami, domyślnie premises. przygotowane pod listę do łączenie lokali gdzie tablica lokali będzie okrojona o aktyny lokal
 * @param {*} id - szukana wartość, dzięki której filtrujemy lokale aby znaleźć ten interesujący
 */
const setActiveObject = function (array, id) {
  [activeObject] = array.filter(object => object.id === id);
};

/**
 * @description pobiera wartość nazwa lokalu wybranego z listy, określa wartość zmiennej activeObject, uruchamia funkcję displayPermisesDetails
 * window EDYCJA LOKALI
 */
const setPremisesDetail = function () {
  const selectedRoom = getNodeValue('premises-edition-select');
  setActiveObject(premises, selectedRoom);
  displayPermisesDetails(activeObject);
  setPremisesForMerge(activeObject);
  firstRoomMergeBtn.textContent = activeObject.name;
};

const setSecondRoomName = function () {
  // ustawienie wartości drugiego lokalu do połączenia i wstawienie jej do przycisku z opcjami pozostawienia drzwi
  const [secondRoom] = premises.filter(room => room.id === this.value);
  secondRoomMergeBtn.textContent = secondRoom.name;
  //aktywować przyciski z opcjami drzwi
  activateDoorsOptionBtns();
};

premisesEditionSelectBtn.addEventListener('change', setPremisesDetail);
premisesMergingSelectBtn.addEventListener('change', setSecondRoomName);

function activateDoorsOptionBtns() {
  firstRoomMergeBtn.classList.add('active');
  secondRoomMergeBtn.classList.add('active');
  noRoomDoorsBtn.classList.add('active');
  bothRoomDoorsBtn.classList.add('active');
  dqsa('.merging-doors-radio').forEach(radio => (radio.disabled = false));
}

const clearPremisesDetail = function () {
  activeObject = '';
  premisesEditionSelectBtn.value = 'None';
  renderColorBadgesInPremisesEdition();
  inputPremisesName.value = '';
  inputPremisesMetreage.value = '';
  inputPremisesDoorsWidth.value = '';
  premisesDoorsCounter.textContent = '';
  unmarkFontSizeIco();
  btnDoorsAdd.classList.remove('active');
  btnDoorsDelete.classList.remove('active');
  btnDoorsPrevious.classList.remove('active');
  btnDoorsNext.classList.remove('active');
  btnPremisesMerge.classList.remove('active');
  btnPremisesDevide.classList.remove('active');
  deactivateButtonsIcon('window-premises-edition');
};

/**
 * @description ustala wartość pola input 'premises-name' na nazwę lokalu przekazanego jako parametr
 * @param {*} room - lokal
 * @node 'premises-name'
 * @window EDYCJA LOKALI
 */
const displayPremisesName = function (room) {
  inputPremisesName.value = room.name;
};

const clearColorBadges = function (colorType = 'additional') {
  switch (colorType) {
    case 'additional':
      additionalColorsGroupsNode.innerHTML = '';
      break;

    case 'active':
      activeColorsGroupsNode.innerHTML = '';
      break;

    case 'edition':
      wrapPremisesEditionColorBadges.innerHTML = '';
      break;

    default:
      break;
  }
};

/**
 * @description renderuje color-badge
 * @param {*} array_colors - array z kolorami do wyrenderowania
 * @param {*} node - węzeł / miejsce w którym renderuje
 * @param {*} active - czy badge ma być aktywny czy nie (hover + clickable)
 */
const renderColorBadges = function (array_colors, node, active = true) {
  let clsString = 'color-badge';

  array_colors.map(color => {
    if (active) clsString = 'color-badge active';

    const html = `<div style="background:${color}" class="${clsString}" data-color="${color}" title="${color}"></div>`;

    node.insertAdjacentHTML('beforeend', html);
  });
};

const renderActiveColorBadges = function () {
  clearColorBadges('active');
  renderColorBadges(activeColors, activeColorsGroupsNode);
};

const renderAdditionalColorBadges = function () {
  clearColorBadges();
  renderColorBadges(additionalColors, additionalColorsGroupsNode);
};

const renderEmptyColorBadge = function () {
  renderColorBadges([emptyColorBadge], additionalColorsGroupsNode, false);
};

const renderColorBadgesInPremisesEdition = function () {
  clearColorBadges('edition');
  renderColorBadges(activeColors, wrapPremisesEditionColorBadges, false);
};

/**
 * @description usuwa zaznaczenie (biały outline) z color badga - usuwa klasę 'marked-badge'
 * @param {*} nodesArray - array z nodami
 */
const unmarkColorBadge = function (nodesArray) {
  nodesArray.forEach(node => node.classList.remove('marked-badge'));
};

/**
 * @description przestawia zaznaczenie (biały outline) z color badga - toggle dla klasy 'marked-badge'
 * @param {*} node - node
 */
const toggleMarkColorBadge = function (node) {
  node.classList.toggle('marked-badge');
};

/**
 * @description wykrywa jaki kolor lokalu powinien być wyświetlony i go zaznacza, wcześniej czyszcząc wszystkie zaznaczenia
 * @param {*} room - wybrany lokal
 * @window EDYCJA LOKALU
 */
const markPremisesColorBadge = function (room) {
  unmarkColorBadge(
    wrapPremisesEditionColorBadges.querySelectorAll('[data-color]')
  );

  toggleMarkColorBadge(
    wrapPremisesEditionColorBadges.querySelector(`[data-color="${room.color}"]`)
  );
};

/**
 * @description ustala wartość pola input 'premises-metreage' na wartość metrtażu lokalu przekazanego jako parametr
 * @param {*} room - lokal
 * @node '#premises-metreage'
 * @window EDYCJA LOKALU
 */
const displayPremisesMeasurement = function (room) {
  inputPremisesMetreage.value = room.measurements;
};

/**
 * @description odznacza wszystkie ikony font-size
 * @window EDYCJA LOKALU
 */
const unmarkFontSizeIco = function () {
  dqsa(`[data-fontSize]`).forEach(element =>
    element.classList.remove('text-active')
  );
};

/**
 * @description zaznacza właściwą ikone font-size dla opisu lokalu, wcześniej odznaczając wszystkie ikony
 * @param {*} room - lokal
 * @window EDYCJA LOKALU
 */
const markFontSizeIco = function (room) {
  unmarkFontSizeIco();

  const fontSize = room.fontSize;
  dqs(`[data-fontSize="${fontSize}"]`).classList.add('text-active');
};

/**
 * @description wyświetla właściwą ikone dla koloru konturu i opisu
 * @param {*} room - lokal
 * @window EDYCJA LOKALU
 */
const displayStrokeIcon = function (room) {
  if (room.strokeWhite === true) {
    did('stroke-white').classList.remove('i-rotate');
  } else {
    did('stroke-white').classList.add('i-rotate');
  }
};

/**
 * @description wyświetla właściwą ikone kłódki dla koloru konturu i opisu lokalu
 * @param {*} room - lokal
 * @window EDYCJA LOKALU
 */
const displayStrokePadlock = function (room) {
  const padlock = did('stroke-padlock');
  if (room.strokeLocked === true) {
    padlock.classList.remove('fa-lock-open');
    padlock.classList.add('fa-lock');
  } else {
    padlock.classList.add('fa-lock-open');
    padlock.classList.remove('fa-lock');
  }
};

/**
 * @description getter szerokośći drzwi dla przekazanego lokalu
 * @param {*} room - lokal
 * @window EDYCJA LOKALU
 */
const getDoorsWidth = room => room.doors[doorsCounter][2];

const setDoorsWidth = (room, width) => {
  width = width.replace(',', '.');
  room.doors[doorsCounter][2] = Number(width);
};
/**
 * @description wyświetla licznik aktywych drzwi oraz całkowitą liczbę drzwi dla lokalu
 * @param {*} room - lokal
 * @window EDYCJA LOKALU
 */
const displayDoorsNumber = function (room) {
  premisesDoorsCounter.innerHTML = ` ${doorsCounter + 1} z ${
    room.doors.length
  }`;
};

/**
 * @description wyświetla szerokość drzwi dla lokalu
 * @param {*} room - lokal
 * @window EDYCJA LOKALU
 */
const displayDoorsWidth = function (room) {
  inputPremisesDoorsWidth.value = getDoorsWidth(room);
};

/**
 * @description resetuje zmienną pomocniczą dla obługi liczby drzwi
 */
const doorsCounterReset = function () {
  doorsCounter = 0;
};

/**
 * @description wykorzystując zmienną pomocniczą doorsCounter zwiększa licznik aktywnych drzwi o jeden - w następstwie tego wyświetla szerokość KOLEJNYCH drzwi
 */
const doorsCounterIncrease = function () {
  doorsCounter++;
  if (doorsCounter === activeObject.doors.length) {
    doorsCounterReset();
  }

  displayDoorsWidth(activeObject);
  displayDoorsNumber(activeObject);
};

/**
 * @description wykorzystując zmienną pomocniczą doorsCounter zmniejsza licznik aktywnych drzwi o jeden - w następstwie tego wyświetla szerokość POPRZEDNIch drzwi
 */
const doorsCounterDecrease = function () {
  doorsCounter--;
  if (doorsCounter < 0) doorsCounter = activeObject.doors.length - 1;

  displayDoorsWidth(activeObject);
  displayDoorsNumber(activeObject);
};

/**
 * @description aktywuje przyciski do obsługi drzwi (usuń, kolejne, poprzednie)
 * @param {*} room - lokal
 * @window EDYCJA LOKALU
 */
const activateDoorsButtons = function (room) {
  if (room.doors.length > 0) {
    btnDoorsDelete.classList.add('active');
    btnDoorsPrevious.classList.remove('active');
    btnDoorsNext.classList.remove('active');
  }
  if (room.doors.length > 1) {
    btnDoorsPrevious.classList.add('active');
    btnDoorsNext.classList.add('active');
  }
  btnDoorsAdd.classList.add('active');
};

/**
 * @description aktywuje przyciski łączenia/dzielenia lokali
 * @window EDYCJA LOKALU
 */
const activateMergeDevideButton = function () {
  btnPremisesMerge.classList.add('active');
  btnPremisesDevide.classList.add('active');
};

/**
 * @description aktywuje dowolny przycisk z ikoną
 * @param id żądanego przycisku
 */
const activateButtonsIcon = function (id) {
  did(id)
    .querySelectorAll('.button-icon')
    .forEach(node => node.classList.add('active'));
};

const deactivateButtonsIcon = function (id) {
  did(id)
    .querySelectorAll('.button-icon')
    .forEach(node => node.classList.remove('active'));
};

/**
 * @description aktywuje color-badge
 * @param nodes węzły/nody z badgami któe należy aktywować
 * @window EDYCJA LOKALU
 */
const activateColorBadges = function (nodes) {
  nodes.forEach(node => node.classList.add('active'));
};

const renderAllColorBadges = function () {
  renderActiveColorBadges(); // paleta kolorów aktywne
  renderAdditionalColorBadges(); // paleta kolorów nieuzywane
  renderEmptyColorBadge(); // paleta kolorów - empty badge
  renderColorBadgesInPremisesEdition(); // edycja lokali
};

const enableInput = function (id) {
  did(id).disabled = false;
};

const btnPremisesEditionListener = function () {
  btnsDescriptionFontSize.forEach(btn =>
    btn.addEventListener('click', function (event) {
      setDescriptionSize(event.target.getAttribute('data-fontsize'));
    })
  );
  //! dopisać pozostałe przyciski
};

/**
 * @description wywołuje wszyswtkie potrzebne funkcje do wyświetlenia szczegółów o lokalu
 */
const displayPermisesDetails = function (room) {
  btnPremisesEditionListener();
  enableInput('premises-doors--width');
  enableInput('premises-name');
  enableInput('premises-metreage');
  markPremisesColorBadge(room);
  displayPremisesName(room);
  displayPremisesMeasurement(room);
  markFontSizeIco(room);
  displayStrokeIcon(room);
  displayStrokePadlock(room);
  doorsCounterReset();
  displayDoorsNumber(room);
  displayDoorsWidth(room);
  //
  activateDoorsButtons(room);
  activateMergeDevideButton();
  activateButtonsIcon('window-premises-edition');
  activateColorBadges(
    wrapPremisesEditionColorBadges.querySelectorAll('.color-badge')
  );
  addListenersPremisesEditionColorBadges();
};

const findPremisesShapeNodeSVG = function (id) {
  const node = svgPremisesShapes.querySelector(`#${id}`);
  return node;
};

const findPremisesDoorsNodeSVG = function (id) {
  const node = svgDoorsNode.querySelector(`[data-name='${id}']`);
  return node;
};

const removeAllDoors = function (room) {
  room.doors.forEach(() => findPremisesDoorsNodeSVG(room.id).remove());
};

const findNextColor = function (color) {
  // ustawia wartość activeObject
  let nextIndex;
  const actualIndex = activeColors.indexOf(color);

  if (actualIndex < activeColors.length - 1) {
    nextIndex = actualIndex + 1;
  } else {
    nextIndex = 0;
  }

  // actualIndex < activeColors.length - 1
  //   ? (nextIndex = actualIndex + 1)
  //   : (nextIndex = 0);
  // console.log(actualIndex);

  return activeColors[nextIndex];
};

const changeRoomColorClick = function () {
  // ustawia wartość activeObject
  setActiveObject(premises, this.id);

  // zmien kolor na znalezioną wartość
  changeRoomColor(findNextColor(activeObject.color));

  // ustaw aktywny lokal do edycji
  premisesEditionSelectBtn.value = this.id;
  setPremisesDetail();
};

const changeRoomColor = function (newColor) {
  if (activeObject) {
    // ustaw kolor lokalu
    activeObject.color = newColor;

    //oczyszczenie nodów związanych z lokalami
    findPremisesShapeNodeSVG(activeObject.id).remove();
    removeAllDoors(activeObject);
    clearWrapPremisesDescription(activeObject);

    // narysuj pełny lokal
    drawCompletePremises(activeObject);
    premisesGroupsViewUpdate();
    // jeśli chb opisy lokali jest odznaczony ukryj opisy
    if (!chbAllPremisesDescriptionVisability.checked) {
      // showAllDescription();
      hideDescriptions();
    }
    //dodaje eventlistenera do lokalu
    findPremisesShapeNodeSVG(activeObject.id).addEventListener(
      'click',
      changeRoomColorClick
    );

    // dodaje obsługę outlineów badgy
    markPremisesColorBadge(activeObject);
  }
};

const setRoomDescription = function () {
  if (activeObject) {
    // wartości w obiekcie
    const activeObjectName = activeObject.name;
    const activeObjectMetreage = activeObject.measurements;

    // wartości w polach input
    const inputName = inputPremisesName.value;
    const inputMetreage = inputPremisesMetreage.value;

    if (
      inputName !== activeObjectName ||
      inputMetreage !== activeObjectMetreage
    ) {
      activeObject.name = inputName;
      activeObject.measurements = inputMetreage;

      //usuwa aktualny opis
      const roomDescriptionNode = dqs(
        `.description-group[data-name="${activeObject.id}"]`
      );
      clearNodeContent();
      // wyrenderować nowy opis
      drawCompleteRoomDescription(activeObject);
    }
  }
};

const setDescriptionSize = function (newFontSize) {
  if (activeObject) {
    activeObject.fontSize = newFontSize;
    //usuwa aktualny opis
    const roomDescriptionNode = dqs(
      `.description-group[data-name="${activeObject.id}"]`
    );
    clearNodeContent();
    // wyrenderować nowy opis
    drawCompleteRoomDescription(activeObject);
    markFontSizeIco(activeObject);
  }
};

const changeDoorsWidth = function () {
  if (activeObject) {
    // wez szerokokość drzwi
    const newWidth = inputPremisesDoorsWidth.value;
    // ustaw w obiekcie nową szerokość dla określonych drzwi
    setDoorsWidth(activeObject, newWidth);
    // skasuj stare drzwi
    removeAllDoors(activeObject);
    // narysuj nowe drzwi
    drawPremisesDoors(activeObject);
  }
  console.log(activeObject);
};

const clearPremisesMergeOptionList = function () {
  const options = premisesMergingSelectNode.querySelectorAll('.merge-option');
  options.forEach(option => option.remove());
};

const takesCoordinatesMerge = function () {
  const firstRoomCoordinates = activeObject.coordinates;

  const [secondRoom] = premises.filter(
    room => room.id === premisesMergingSelectBtn.value
  );
  const secondRoomCoordinates = secondRoom.coordinates;

  removeDuplicateCoordinates(firstRoomCoordinates, secondRoomCoordinates);
  // groupingCoordinates(firstRoomCoordinates.concat(secondRoomCoordinates));
};

// removeDuplicateCoordinates();
function removeDuplicateCoordinates(firstRoom, secondRoom) {
  //! niewłaściwe usuwanie duplikatów, powoduje usuniecie duplikatu tylko z jednego lokalu a potrzebujemy z obu
  // function convertToString(coors) {
  //   const stringPairsCoors = coors
  //     .map(function (coor, index) {
  //       if (index % 2 === 0) return `${coor},${coors[index + 1]}`;
  //     })
  //     .filter(Boolean);
  //   return stringPairsCoors;
  // }
  // const coordinatesString = convertToString(firstRoom).concat(
  //   convertToString(secondRoom)
  // );

  // const coordinatesSet = new Set(coordinatesString);
  // const singleCoordinates = Array.from(coordinatesSet).join(',').split(',');
  // ! poprawka usuwania duplikatów

  // let stringArray; // tablica w podwójnych stringów x,y ze wszpółrzędnymi obu lokali

  function convertToString(coors) {
    const stringPairsCoors = coors
      .map(function (coor, index) {
        if (index % 2 === 0) return `${coor},${coors[index + 1]}`;
      })
      .filter(Boolean);
    return stringPairsCoors;
  }
  let duplikaty = [];
  let premises_01_array = convertToString(firstRoom);
  let premises_02_array = convertToString(secondRoom);

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

  groupingCoordinates(
    premises_01_array
      .map(coor => coor.split(','))
      .flat()
      .concat(premises_02_array.map(coor => coor.split(',')).flat())
  );
}

function groupingCoordinates(coordinatesSet) {
  const coordinates = {
    x: [],
    y: [],
  };

  let xCoordinates = [];
  let yCoordinates = [];

  coordinatesSet.forEach((coor, index) =>
    index % 2 === 0
      ? (coordinates.x.push(coor), xCoordinates.push(coor))
      : (coordinates.y.push(coor), yCoordinates.push(coor))
  );
  // orderingCoordinates(coordinates);
  orderingCoordinates_stare({ x: coordinates.x, y: coordinates.y });
  // orderingCoordinates_stare();
}
// orderingCoordinates_nowe();

function orderingCoordinates_nowe(
  coordinates = {
    x: [426, 477, 477, 426, 477, 530, 530, 477],
    y: [314, 314, 359, 359, 314, 314, 359, 359],
  }
) {
  // coordinates: [426, 314, 477, 314, 477, 359, 426, 359],
  // coordinates: [477, 314, 530, 314, 530, 359, 477, 359],

  let pointsToDraw = [];
  let point;
  let sameAsPoint;
  let index;
  let direction = {
    active: 'x',
    opposite: 'y',
  };

  // sprawdzenie czy figura jest prostokątem - czy wchodzimy w skomplikowaną logikę czy w prostą
  if (new Set(coordinates.x) || new Set(coordinates.y))
    console.log('figura to prostokąt');

  //! rozpisac logike dla prostokąta:

  function firstPoint() {
    index = 0;
    add(
      coordinates[direction.active][index],
      coordinates[direction.opposite][index]
    );
  }

  function add(first, second) {
    // jako pierwszy do tablicy pointToDraw trafia punkt o wspolrzednej x - tak jest to przyjete w konwencji svg
    direction.active === 'x'
      ? (pointsToDraw.push(first), pointsToDraw.push(second))
      : (pointsToDraw.push(second), pointsToDraw.push(first));

    // changeDirection();
    // setSameAsPoints();
  }
  firstPoint();

  // while (coordinates.x.length > 0 || coordinates.y.length > 0) {
  //   if (sameAsPoint === undefined) {
  //     firstPoint();
  //   } else break;
  //   // } else if (sameCoordinates.length == 1) {
  //   // add();
  //   // } else {
  //   // manyPoints();
  // }
  // }
}
// orderingCoordinates_stare();
// ----------------------------------------
function orderingCoordinates_stare(
  coordinates = {
    x: [
      815, 815, 824, 824, 834, 834, 649, 620, 620, 530, 530, 505, 505, 474, 474,
      575, 575, 615, 615, 649, 649, 694, 694, 827, 827, 834, 834, 718, 718, 662,
      662, 649,
    ],
    y: [
      162, 188, 188, 203, 203, 314, 359, 359, 231, 231, 171, 171, 179, 179, 116,
      116, 101, 101, 116, 116, 101, 101, 110, 110, 138, 138, 162, 314, 359, 359,
      354, 354,
    ],
  }
) {
  let pointsToDraw = [];
  let sameCoordinates; // znalezione wspórzędne o tej samej wartości
  let axis = 'x'; //zmienna określająca kierunek szukania, zaczynamy od X-ów
  let inactiveAxis = 'y'; // druga, niekatywna oś
  let find; // wartość (współrzęna punktu) której szukam
  let findIndex; // index dla wartośći find

  function setInactiveAxis() {
    if (axis === 'x') return (inactiveAxis = 'y');
    else return (inactiveAxis = 'x');
  }

  function setSameCoordinates() {
    sameCoordinates = coordinates[axis].filter(point => point === find);
  }

  function addingPointsToDraw(active, inactive) {
    // ustawiam nieaktywna os
    inactiveAxis = setInactiveAxis();
    // dodawac najpierw X a potem y
    axis === 'x'
      ? (pointsToDraw.push(active), pointsToDraw.push(inactive))
      : (pointsToDraw.push(inactive), pointsToDraw.push(active));
  }

  function deletingInputCoordinatesByIndex() {
    coordinates[axis] = coordinates[axis].filter(
      (point, index) => index != findIndex
    );
    coordinates[inactiveAxis] = coordinates[inactiveAxis].filter(
      (point, index) => index != findIndex
    );
  }

  function changeDirection() {
    // UAKTUALNIENIE wartości find i axis w zależności od axis
    axis === 'x'
      ? ((find = pointsToDraw[pointsToDraw.length - 1]), (axis = 'y'))
      : ((find = pointsToDraw[pointsToDraw.length - 2]), (axis = 'x'));
    // SAMESCOORDINATES
    setSameCoordinates();
    // ustalenie nieaktywnej osi
    inactiveAxis = setInactiveAxis();
  }

  function firstPoint() {
    findIndex = 0;
    find = coordinates[axis][findIndex];
    addingPointsToDraw(
      coordinates[axis][findIndex],
      coordinates[inactiveAxis][findIndex]
    ); // dodawanie wynikowych punktów
    deletingInputCoordinatesByIndex(); // usuwanie dodanych punktów
    changeDirection();
    setSameCoordinates(); // aktualizacja sameCoordinates
  }

  function lastPoint() {
    // add
    // FINDINDEX aktualizacja
    findIndex = coordinates[axis].indexOf(find);

    addingPointsToDraw(
      coordinates[axis][findIndex],
      coordinates[inactiveAxis][findIndex]
    ); // DODAWANIE współrzędnych do pointsToDraw
    deletingInputCoordinatesByIndex(); // USUWANIE współrzędnych z tabel wejściowych
    changeDirection();
  }

  function manyPoints() {
    // choose
    //
    let sameCoordinatesIndexes = []; // indexy z aktywnej osi dla wszystkich wartosći = find
    // let outputSameIndexes = [];
    let outputSameCoordinates = [];
    let inactiveFound;
    let inactiveSameCoordinates; // odpowiedniki dla sameCoordinates na nieaktywnej osi
    let outputLastInactive;
    let inactiveIndex;

    //. dąże do tego aby uzyskac tablice [inactiveSameCoordinates] ze wspolrzednymi z niekatywnej osi, ktore maja druga wspolrzedna = find, np find to 359 a os y, to szukam wszystkich wspolrzednych na osi x dla ktorych odpowiadajaca wsporzedna to 359
    // x_coordinates: [426, 477, 477, 426, 477, 530, 530, 477],
    // y_coordinates: [314, 314, 359, 359, 314, 314, 359, 359],
    // w powyzszym bylyby to: 477, 426, 530, 477
    // wyszukiwanie indexów dla coordinates takich jak find, te indeksy pozwolą wybrać właściwe wspolrzedne z sieci nieaktywnej

    // pobieram indexy, punktów które odpowiadają wartościom sameCoordinates
    coordinates[axis].map(function (coord, index) {
      if (coord === find) sameCoordinatesIndexes.push(index);
    });

    // pobieram wspolrzedne na nieaktywnej osi, za pomoca sameCoordinatesIndexes (indeksow dla wspolrzednych rownych find) - te wwspolrzedne zweryfikują ktory punkt zostanie dodany do pointToDraw
    inactiveSameCoordinates = sameCoordinatesIndexes.map(
      point => coordinates[inactiveAxis][point]
    );

    //. dodaje do outputSameCoordinates ostani punkt dodany do tablicy wynikowej pointsToDraw
    // pointsToDraw.filter((point, index) => {
    //   if (point === find) {
    //     // outputSameIndexes.push(index);
    //     axis === 'x'
    //       ? outputSameCoordinates.push(pointsToDraw[index + 1])
    //       : outputSameCoordinates.push(pointsToDraw[index - 1]);
    //   }
    // });
    axis === 'x'
      ? outputSameCoordinates.push(pointsToDraw.at(-1))
      : outputSameCoordinates.push(pointsToDraw.at(-2));

    //. oto tablica, do uzyskania któej dążyłem
    // na podstawie znalezionych indexów, pobieram wartośći z osi nieaktywnej i dodaje ostani punkt (wczesniej dodany do pointsToDraw)
    inactiveSameCoordinates = inactiveSameCoordinates.concat(
      outputSameCoordinates
    );

    //. sortowanie
    // w tej chwili w tablcy inactiveCoordinates mam wszystkie wartości z osi nieaktywnej, któe odpowiadają sameCoodrinates z osi aktywnej
    // sortowanie rosnąco - sortuje od najmniejszej wartosci do najwiekszej, po to by pozniej wybrac wlasciwy punkt korzystajac z algorytmu
    inactiveSameCoordinates.sort((a, b) => a - b);
    outputLastInactive =
      axis === 'x'
        ? pointsToDraw[pointsToDraw.length - 1]
        : pointsToDraw[pointsToDraw.length - 2];

    inactiveIndex = inactiveSameCoordinates.indexOf(outputLastInactive);

    //. algorytm wybierania wlasciwego punktu: trzeba dodkonać analizy na podstawie inactiveIndex:
    // jeśli parzysty to interesujący mnie punkt będzie miał inactiveIndex + 1,
    // jeśli index jest nieparzysty to interesujący mnie punkt będzie miał inactiveIndex - 1
    // w ten sposób znajdujemy wspórzędną niaktywnej osi następnego punktu do narysowania
    inactiveIndex % 2 === 0
      ? (inactiveFound = inactiveSameCoordinates[inactiveIndex + 1])
      : (inactiveFound = inactiveSameCoordinates[inactiveIndex - 1]);

    //. DODAWANIE PUNKTU
    // ważne! do tablicy pointsToDraw zawsze najpierw dodaje współrzędne X a potem Y
    addingPointsToDraw(find, inactiveFound);

    //. wyznaczenie punktu do usuniecia
    //! tu chyba jest niezgodnosc z algorytmu, w przerabianym przykladzie pobralem punkt z indexem 1, a usunalem z indexem 5, obia mialy dokladnie te same wspolrzedne i ne wiem czy ma to zanaczenie ale jednak
    for (let id of sameCoordinatesIndexes) {
      if (coordinates[inactiveAxis][id] === inactiveFound) findIndex = id;
    }

    // USUWANIE
    // żeby to zrobić muszę zaktualizować wartość findIndex
    deletingInputCoordinatesByIndex();

    // AKTUALIZACJA sameCoordinates
    changeDirection();
  }

  firstPoint();
  while (coordinates[axis].length > 0 || coordinates[inactiveAxis].length > 0) {
    if (sameCoordinates[0] === undefined) {
      console.log('undefined');
      changeDirection();
    } else if (sameCoordinates.length == 1) {
      lastPoint();
    } else {
      manyPoints();
    }
  }

  console.log(pointsToDraw);

  did('svg').insertAdjacentHTML(
    'beforeend',
    `<path class="one" d="M${pointsToDraw}Z"/>`
  );

  // did('svg').insertAdjacentHTML(
  //   'beforeend',
  //   `<path class="one" d="M 426, 314, 426, 359, 477, 359, 530, 359, 530, 314, 477, 314Z"/>`
  // );

  // '426', '314', '426', '359', '477', '359', '477', '314', '530', '314', '530', '359'
}

function orderingCoordinates(
  xCoordinates = [50, 100, 150, 200, 200, 150, 100, 50],
  yCoordinates = [20, 20, 20, 20, 40, 40, 40, 40]
) {
  let pointsToDraw = [];
  let arr_x = xCoordinates;
  let arr_y = yCoordinates;
  let sameCoordinates; // znalezione wspórzędne o tej samej wartości
  let axis; //zmienna określająca kierunek szukania, zaczynamy od X-ów
  let find; // wartość (współrzęna punktu) której szukam
  let findIndex; // index dla wartośći find
  let inactiveAxis; // druga, niekatywna oś

  const setInactiveAxis = function () {
    if (axis === 'x') return (inactiveAxis = 'y');
    else return (inactiveAxis = 'x');
  };

  const setSameCoordinates = function () {
    //! POWININNO SIĘ UŻYWAĆ EVAL, MYŚLĘ ZE AXIS POWINO MIEĆ WARTOŚĆ arr_X i arr_Y,
    //! ale na samym końcu pojawia sie wartosc x, wiec trzeba to sprawdzic
    sameCoordinates = axis === 'x' ? filtered(arr_x) : filtered(arr_y);

    function filtered(arr) {
      return arr.filter(point => point === find);
    }
  };

  function findCurrentArray() {
    if (axis === 'x') return arr_x;
    else arr_y;
  }

  function findSecondArray() {
    if (axis === 'x') return arr_y;
    else return arr_x;
  }

  const firstPoint = function () {
    axis = 'x';
    findIndex = 0;
    find = findCurrentArray()[findIndex];

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
    findIndex = axis === 'x' ? arr_x.indexOf(find) : arr_y.indexOf(find);

    // DODAWANIE współrzędnych do pointsToDraw
    pointsToDraw.push(arr_x[findIndex]);
    pointsToDraw.push(arr_y[findIndex]);
    console.log('a:', arr_x[findIndex], arr_y[findIndex]);

    // USUWANIE współrzędnych z tabel wejściowych
    arr_x = arr_x.filter((point, index) => index != findIndex);
    arr_y = arr_y.filter((point, index) => index != findIndex);
    changeDirection();
  };

  const choose = function () {
    const coordinates = {
      x: [2, 4, 6],
      y: [1, 3, 5],
    };
    let sameCoordinatesIndexes = []; // indexy z aktywnej osi dla wartosći = find
    let outputSameIndexes = [];
    let outputSameCoordinates = [];
    let inactiveFound;
    let inactiveSameCoordinates;
    let outputLastInactive;
    let inactiveIndex;
    // let index = 0;
    // let axis = 'x';

    // console.log(coordinates[axis].shift());
    // console.log(coordinates[axis].map(point => point + 1));
    // console.log(coordinates[axis]);
    // axis = 'y';
    // console.log(coordinates[axis].filter(point => point > 4));

    // pobieram indexy, punktów które odpowiadają wartościom sameCoordinates
    axis === 'x' ? maped(arr_x) : maped(arr_y);

    function maped(arr) {
      arr.map(function (coord, index) {
        if (coord === find) sameCoordinatesIndexes.push(index);
      });
    }

    // ustalenie nieaktywnej osi
    inactiveAxis = setInactiveAxis();

    inactiveSameCoordinates = sameCoordinatesIndexes.map(point =>
      axis === 'x' ? arr_y[point] : arr_x[point]
    );

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
    outputLastInactive =
      axis === 'x'
        ? pointsToDraw[pointsToDraw.length - 1]
        : pointsToDraw[pointsToDraw.length - 2];

    inactiveIndex = inactiveSameCoordinates.indexOf(outputLastInactive);

    // trzeba dodkonać analizy na podstawie inactiveIndex;
    // jeśli parzysty to interesujący mnie punkt będzie miał inactiveIndex + 1,
    // jeśli index jest nieparzysty to interesujący mnie punkt będzie miał inactiveIndex - 1
    // w ten sposób znajdujemy wspórzędną niaktywnej osi następnego punktu do narysowania

    inactiveIndex % 2 === 0
      ? (inactiveFound = inactiveSameCoordinates[inactiveIndex + 1])
      : (inactiveFound = inactiveSameCoordinates[inactiveIndex - 1]);

    //. DODAWANIE PUNKTU
    // ważne! do tablicy pointsToDraw zawsze najpierw dodaje współrzędne X a potem Y
    axis === 'x'
      ? (pointsToDraw.push(find),
        pointsToDraw.push(inactiveFound),
        console.log('m:', find, inactiveFound))
      : (pointsToDraw.push(inactiveFound),
        pointsToDraw.push(find),
        console.log('m:', inactiveFound, find));

    for (let id of sameCoordinatesIndexes) {
      if (findSecondArray()[id] === inactiveFound) findIndex = id;
    }

    //. USUWANIE
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
    if (sameCoordinates === undefined) {
      firstPoint();
    } else if (sameCoordinates.length == 1) {
      add();
    } else {
      choose();
    }
  }

  did('svg').insertAdjacentHTML(
    'beforeend',
    `<path class="one" d="M${pointsToDraw}Z"/>`
  );
  console.log(pointsToDraw);
}

const setPremisesForMerge = function (selectedRoom) {
  const premisesForMerge = premises.filter(room => room != selectedRoom);
  const option = premisesMergingSelectBtn.querySelector('option');
  // usuwanie opcji wyboru jeżeli istnieje przynajmniej jedna taka opcja
  if (option.nextElementSibling) {
    clearPremisesMergeOptionList();
  }
  // render nowej uaktualnionej listy opcji listy
  renderPremisesSelectionList(premisesForMerge, premisesMergingSelectBtn); // edycja lokali
};

// ------------------------------------------------------------------- RENDER
renderPremisesSelectionList(undefined, premisesEditionSelectBtn); // edycja lokali

mergePremisesBtn.addEventListener('click', function () {
  did('merge-premises-section').classList.remove('dont-display');
});

premisesMergeEnterBtn.addEventListener('click', takesCoordinatesMerge);

//.-----------------------------------------------------------------------EDYCJA-GRUP-
/**
 * @description dla JEDNEJ grupy lokali wypełnia listę z lokalami
 * @param array domyślenie premises - obiekt z danymi o lokalach
 * @param groups domyślenie premisesGroups - obiekt z danymi o grupach
 * @param color kolor grupy
 * @window EDYCJA GRUP
 */
const fillGroupPremisesList = function (
  array = premises,
  groups = premisesGroups,
  color
) {
  const premisesWithColor = array.filter(room => room.color === color);
  const [groupsWithColor] = groups.filter(group => group.rgb === color);

  premisesWithColor.map(room => groupsWithColor.premisesList.push(room.name));
};

// usuniecie wszystkich wczesniejszych danych
const clearPremisesGroupsLists = function () {
  premisesGroups.map(group => (group.premisesList = []));
};

/**
 * @description wywołuje fillPremisesGroupList dla wszystkich kolorów w active kolors
 * @window EDYCJA GRUP
 */
const fillAllGroupsPremisesList = function () {
  clearPremisesGroupsLists();

  const groupColors = premisesGroups.map(group => group.rgb);
  groupColors.map(rgb => fillGroupPremisesList(undefined, undefined, rgb));
};

/**
 * @description renderuje pełną linijkę dla grupy lokali
 * @param group obiekt z danymi o grupach
 * @window EDYCJA GRUP
 */
const renderGroupPremises = function (group) {
  // ! na razie edycja na bazie contenteditable
  wrapPremisesGroupsEdition.insertAdjacentHTML(
    'beforeend',
    `<div class="window-line-flex-left paragraph-spacing--small" data-color="${group.rgb}">
    <div class="color-badge active" style="background:${group.rgb}" title="Zmień kolor grupy" data-color="${group.rgb}"></div>
    <div class="modal--group-color-change dont-display"></div>
    <label class="flex-grow-1" for="" contenteditable="true" nowrap>${group.name}</label>
    <span class="text-small" title="Liczba lokali">${group.premisesList.length}</span>
    <button class="button-icon button-small showPremisesList" title="Lista lokali w grupie">
    <i class="fas fa-list"></i></button>
    <button class="button-icon button-small eraseGroup" title="Usuń grupę">
    <i class="fas fa-times"></i></button></div>`
  );
};

/**
 * @description wywołuje renderGroupPremises dla przekazanej tablicy z grupami (object)
 * @param array obiekt z danymi o grupach
 * @window EDYCJA GRUP
 */
const renderAllGroupPremises = function (array) {
  fillAllGroupsPremisesList();

  wrapPremisesGroupsEdition.innerHTML = '';
  array.map(group => {
    renderGroupPremises(group);
  });

  badgeColorGroupListener();
  showPremisesListBtnListener();
  btnEraseGroupListener();
  labelGroupPremisesListener();
};

const insertModalGroupColorChangeContent = function (modalNode, currentColor) {
  // const allColorBadges = activeColors.concat(additionalColors);
  const renderActiveColors = activeColors.filter(
    color => color !== currentColor
  );

  const renderAdditionalColors = additionalColors.filter(
    color => color !== currentColor
  );

  let html =
    '<div class="window-modal"><div class="modal-column"><div class="modal-active-badges">';

  renderActiveColors.map(color => {
    html += `<div class="color-badge active" data-color="${color}" style="background:${color}"></div>`;
  });

  html +=
    '</div><div class="line-horizontal"></div><div class="modal-additional-badges">';

  renderAdditionalColors.map(color => {
    html += `<div class="color-badge active" data-color="${color}" style="background:${color}"></div>`;
  });

  html +=
    '</div></div><button class="button-icon button-small" title="Zamknij okno" ><i class="fas fa-times"></i></button></div>';
  modalNode.insertAdjacentHTML('beforeend', html);

  // dodaje event listenera do color-badgy w oknie modal
  modalGroupColorChangeListener(modalNode.firstChild);
};

const setGroupColor = function (badgeClicked, oldColor, newColor) {
  const [oldGroup] = premisesGroups.filter(group => group.rgb === oldColor);
  const [newGroup] = premisesGroups.filter(group => group.rgb === newColor);
  const oldPremises = premises.filter(room => room.color === oldColor);
  const newPremises = premises.filter(room => room.color === newColor);

  const setNewColorToOldPremises = function () {
    oldPremises.map(room => ((room.color = newColor), setStrokeColor(room)));
  };

  if (!newGroup) {
    setNewColorToOldPremises();
    [oldGroup].map(group => (group.rgb = `${newColor}`));
    changeBadgeColorType(oldColor); // usuń oldColor z grupy activeColors + dodaj old Color do additionalColors

    if (additionalColors.some(color => color === newColor)) {
      addColorToActiveColors(newColor);
    }
  } else {
    const decision = window.prompt(
      `Chcesz grupie ${oldGroup.name} zmienić kolor na ${newColor}. Jednak ten kolor jest przypisany do grupy ${newGroup.name}.\nW tej sytuacji możesz:\n\nNaciśnij 0 - doszło do pomyłki, anuluj operacje,\n\nNaciśnij 1 - POŁĄCZ GRUPY. (Powstanie jedna grupa z nazwą ${oldGroup.name} z kolorem ${newColor}). Wszystkie lokale należące do obu grup otrzymają ten kolor,\n\nNaciśnij 2 - ZAMIEŃ KOLORY W GRUPACH`
    );

    switch (decision) {
      case '0':
        // closeModalGroupColorChange(badgeClicked);
        break;

      case '1':
        setNewColorToOldPremises(); // nowy kolor dla lokali
        premisesGroups = premisesGroups.filter(group => group.rgb !== oldColor); // usuwa stary kolor grupy
        changeBadgeColorType(oldColor); // usuń oldColor z grupy activeColors + dodaj old Color do additionalColors
        break;

      case '2':
        setNewColorToOldPremises();
        newPremises.map(room => (room.color = oldColor));
        oldGroup.rgb = newColor;
        newGroup.rgb = oldColor;
        break;

      default:
    }
  }
  // premisesGroups.map(group => (group.isVisible = true));

  const visibleColors = premisesGroups
    .filter(group => group.isVisible === true)
    .map(group => group.rgb);

  // find premises with colors from array
  const notVisiblePremises = visibleColors
    .map(rgb => premises.filter(room => room.color !== rgb))
    .flat();

  renderAllColorBadges(); //?renderowanie - tylko których

  clearNodeContent(svgPremisesShapes);
  clearNodeContent(svgDoorsNode);
  clearNodeContent(svgPremisesDescriptionGroupNode);

  premisesGroupsViewUpdate(); // wyswietlanie grup aktualizacja
  addColorPaletteBadgesListener(); // dodaje event listenera do color badgy
  clearPremisesDetail(); // czyści detale w okienku edycja lokali
  drawCompletePremises(premises); // rysuje wszystkie lokale na svg
  // obsług awidoczności
  showShapes();
  hideShapesInHiddenGroups();
  showDoors();
  hideDoorsInHiddenGroups();
  if (chbAllPremisesDescriptionVisability.checked) {
    showDescription();
    hideDescriptionInHiddenGroups();
  } else {
    hideDescriptions();
  }
  addListenersSVGPremisesShapes(); // dodaje listenera do premises shape
};

const checkButtonClicked = function (event) {
  let newColor;
  const badgeClicked = event.target;

  // czy kliknięto badga z kolorem
  if (badgeClicked.hasAttribute('data-color')) {
    newColor = badgeClicked.getAttribute('data-color');
    setGroupColor(badgeClicked, selectedColor, newColor);
  } else {
    // jeśli nie kliknięto badga to jedyna opcja to zamknięcie modala a także wtdy gdy operacje na kolorach zostały zakończone
    closeModalGroupColorChange(badgeClicked);
  }

  selectedColor = '';
};

const modalGroupColorChangeListener = function (targetNode) {
  targetNode.addEventListener('click', function (event) {
    checkButtonClicked(event);
  });
};

const displayModalGroupColorChange = function (badge) {
  const badgeColor = badge.parentNode.getAttribute('data-color');
  const targetNode = badge.nextElementSibling;

  selectedColor = badgeColor; // zmienna wykorzystywana (w tym przypadku) przy zmianie kolorów dla grupy
  insertModalGroupColorChangeContent(targetNode, badgeColor);
  targetNode.classList.remove('dont-display');

  // dodaje blur dla całego okna
  hidePremisesGroups('add');
  //usuwam blur dla grupy z otwartym modalem
  targetNode.parentNode.classList.remove('hidden');
};

const closeModalGroupColorChange = function (badge) {
  const modalWrap = badge.closest('.modal--group-color-change');
  modalWrap.innerHTML = '';
  modalWrap.classList.add('dont-display');

  // usuwam blur dla całego okna
  hidePremisesGroups();
};

const hidePremisesGroups = function (decision) {
  const targetWindow = wrapPremisesGroupsEdition.querySelectorAll(
    '.window-line-flex-left.paragraph-spacing--small'
  );
  switch (decision) {
    case 'add':
      targetWindow.forEach(line => line.classList.add('hidden'));
      break;

    default:
      targetWindow.forEach(line => line.classList.remove('hidden'));
      break;
  }
};

/**
 * @description usuwa node z daną grupą
 * @param group obiekt z danymi o grupach
 * @window EDYCJA GRUP
 */
const clearGroupPremises = function () {
  const premisesColorGroups = [
    ...wrapPremisesGroupsEdition.querySelectorAll('[data-color]'),
  ];

  premisesColorGroups.map(group => group.remove());
};

/**
 * @description dodaje nową grupę: we wszystkie miejsca gdzie występują grupy lokali
 * @param group obiekt z danymi o grupie domyślnie rgb: 'rgb(255,255,255)', name: 'Nowa grupa', premisesList: []
 * @window EDYCJA GRUP
 */
const addGroupPremises = function (
  group = {
    rgb: 'rgb(74, 74, 74)',
    name: 'Nowa grupa_',
    premisesList: [],
    isVisible: true,
  }
) {
  // zmiana nazwy - licznik dl "Nowa Grupa_"
  ++newGroupCounter;
  group.name = `${group.name}0${newGroupCounter}`;

  // dodawanie nowej grupy do obiektu premisesGroups
  premisesGroups.push({
    rgb: group.rgb,
    name: group.name,
    premisesList: group.premisesList,
    isVisible: group.isVisible,
  });

  // dodaje grupę do okna edycja-grup
  renderAllGroupPremises(premisesGroups);

  // dodaje grupę do okna widoki--grupy-lokali
  renderViewPremisesGroups(group);

  viewGroupsNode.lastChild.addEventListener('click', function (event) {
    changeSVGGroupVisability(event.target, this);
  });

  // dodaje grupę do svg-legenda
  drawVisibleGroups_SvgLegend();
};

/**
 * @description wyświetla modal z listą lokali
 * @param {*} that - this z elementu DOM klikniętego przez użytkownika
 */
const showGroupPremisesList = function (targetNode) {
  // //! przepisać na wyświetlanie modalu
  const color = targetNode.parentNode.getAttribute('data-color');
  const [group] = premisesGroups.filter(group => group.rgb === color);
  window.alert(
    `Grupa ${group.name} o kolorze ${color}: \n${group.premisesList}`
  );
};

/**
 * @description usuwa całkowicie grupę lokali, jeśłi nie ma żądnego lokalu w kolorze grupy, jeśli jest wyświetla alert
 * @param that - kliknięty node
 * @node wrapPremisesGroupsEdition.line-horizontal/sibling
 * @window EDYCJA GRUP
 */
const eraseGroupPremises = function (targetNode) {
  const color = targetNode.parentNode.getAttribute('data-color');

  // sprawdzenie czy w grupie są jakieś lokale
  const [group] = premisesGroups.filter(group => group.rgb === color);
  group.premisesList.length === 0
    ? ((premisesGroups = premisesGroups.filter(group => group.rgb !== color)),
      premisesGroupsViewUpdate())
    : window.alert(
        `NIE MOŻNA USUNĄĆ GRUPY \nDo grupy ${group.name} o kolorze ${color} \nnależą lokale: ${group.premisesList}`
      );

  //! dopisać usuwanie w obiekcie grup
  //! dopisać usuwanie w oknie edycja grup
  //! dopisać usuwanie w oknie wyświetlanie - grupy lokali
  //! dopisać usuwanie na planie svg w oknie legenda
};

/**
 * @description ustala wartośći kolor(dla któej grupy jest zmieniana nazwa) i text (nowa nazwa) i wywołuje funkcję setNewGroupPremisesName z argumentami kolor i text
 * @call getColorAndTextFromLabel
 * @window EDYCJA GRUP
 */
function getColorAndTextFromLabel() {
  const color = this.parentNode.getAttribute('data-color');
  const text = this.textContent;
  setNewGroupPremisesName(color, text);
}

/**
 * @description zmienia nazwę grupy we wszystkich potrzebnych miejscach: obiekt premisesGroups, edycja grup, wyświetlanie grupy lokalo i w legendzie na svg
 * @call getColorAndTextFromLabel
 * @window EDYCJA GRUP
 */
const setNewGroupPremisesName = function (color, newName) {
  // zmień nazwę grupy w obiekcie premisesGroups
  const [groupForChange] = premisesGroups.filter(group => group.rgb === color);
  groupForChange.name = newName;

  // wyczysć grupy w edycji grup
  clearGroupPremises();
  // wyczysć panel--wyswietlanie-grupy-lokali
  clearContentViewPremisesGroups();

  // WYRENDERUJ grupy
  // powyższe wywołąnie skróćone do:
  premisesGroupsViewUpdate();
};

const premisesGroupsViewUpdate = function () {
  renderAllGroupPremises(premisesGroups);
  renderAllViewPremisesGroups(premisesGroups);
  drawVisibleGroups_SvgLegend();
};

//#------------------------------------------------------------EDYCJA-GRUP---LISTENERY

/**
 * @description dodaje listenera do wszystkich elementów z klasą showPremisesList w nodzie wrapPremisesGroupsEdition
 * @call showGroupPremisesList
 * @window EDYCJA GRUP
 */
const showPremisesListBtnListener = function () {
  const groups = [
    ...wrapPremisesGroupsEdition.querySelectorAll('.showPremisesList'),
  ];
  groups.map(node =>
    node.addEventListener('click', function (event) {
      showGroupPremisesList(event.currentTarget);
    })
  );
};

/**
 * @description dodaje listenera do wszystkich elementów z klasą showPremisesList w nodzie wrapPremisesGroupsEdition
 * @call showGroupPremisesList
 * @window EDYCJA GRUP
 */
const btnEraseGroupListener = function () {
  wrapPremisesGroupsEdition.querySelectorAll('.eraseGroup').forEach(node =>
    node.addEventListener('click', function (event) {
      eraseGroupPremises(event.currentTarget);
    })
  );
};

/**
 * @description dodaje listenera do wszystkich elementów contnenteitable w nodzie wrapPremisesGroupsEdition
 * @call getColorAndTextFromLabel
 * @window EDYCJA GRUP
 */
const labelGroupPremisesListener = function () {
  [
    ...wrapPremisesGroupsEdition.querySelectorAll('[contenteditable="true"]'),
  ].map(label => label.addEventListener('blur', getColorAndTextFromLabel));
};

const badgeColorGroupListener = function () {
  const colorBadges = [
    ...wrapPremisesGroupsEdition.querySelectorAll('.color-badge'),
  ];
  colorBadges.map(badge =>
    badge.addEventListener('click', function (event) {
      displayModalGroupColorChange(event.target);
    })
  );
};

//#------------------------------------------------------------EDYCJA-GRUP---WYWOŁANIA

renderAllGroupPremises(premisesGroups);

//.--------------------------------------------------------------------PALETY-KOLORÓW-
/**
 * @description ustawia eventListenery dla elementów  color-badge
 * @call selectAdditionalColor
 * @window OPIS PLANU
 */
const addColorPaletteBadgesListener = function () {
  colorPaletteBadges = wrapColorPalette.querySelectorAll('[data-color]');
  colorPaletteBadges.forEach(node => {
    node.addEventListener('click', markColorBadge);
  });
};

// const numberToHEX = function (color) {
//   let hex = Number(color).toString(16);
//   hex.length < 2 ? (hex = '0' + hex) : hex;
//   return hex;
// };

// const rgbToHEX = function (red, green, blue) {
//   const redHEX = numberToHEX(red);
//   const greenHEX = numberToHEX(green);
//   const blueHEX = numberToHEX(blue);

//   return `#${redHEX}${greenHEX}${blueHEX}`;
// };

const getRGBValuesFromString = function (str) {
  const rgbArray = str.replace('rgb(', '').replace(')', '').split(',');
  return rgbArray;
};

function setContrastForStroke(rgb) {
  const rgbArray = getRGBValuesFromString(rgb);
  const contrastRatio = Math.sqrt(
    rgbArray[0] * rgbArray[0] * 0.241 +
      rgbArray[1] * rgbArray[1] * 0.691 +
      rgbArray[2] * rgbArray[2] * 0.068
  );
  return contrastRatio < 130 ? true : false;
}

const setStrokeColor = function (room) {
  if (!room.strokeLocked) {
    //changes possible only when strokeLocked is false
    room.strokeWhite = setContrastForStroke(room.color);
  }
};

const toggleStrokePadlock = function () {
  if (activeObject) {
    activeObject.strokeLocked
      ? (activeObject.strokeLocked = false)
      : (activeObject.strokeLocked = true);
    displayStrokePadlock(activeObject);
  }
};

const toggleStrokeColor = function () {
  if (activeObject && !activeObject.strokeLocked) {
    activeObject.strokeWhite
      ? (activeObject.strokeWhite = false)
      : (activeObject.strokeWhite = true);

    // wyswietl aktualną ikonkę konturu
    displayStrokeIcon(activeObject);

    // wyczysc cały lokal
    findPremisesShapeNodeSVG(activeObject.id).remove();
    removeAllDoors(activeObject);
    clearWrapPremisesDescription(activeObject);

    // narysuj pełny lokal
    drawPremisesShape(activeObject);
    drawPremisesStroke(activeObject);
    drawPremisesDoors(activeObject);
    drawWrapPremisesDescription(activeObject);
    drawCompleteRoomDescription(activeObject);

    //dodaje eventlistenera do lokalu
    findPremisesShapeNodeSVG(activeObject.id).addEventListener(
      'click',
      changeRoomColorClick
    );
  }
};

// const setColorPickerDefaultValue = function (color) {
//   let hexValue;
//   if (color.startsWith('#')) hexValue = color;
//   else {
//     const rgbArray = getRGBValuesFromString(color);
//     hexValue = rgbToHEX(rgbArray[0], rgbArray[1], rgbArray[2]);
//   }
//   inputColorBtn.setAttribute('value', `${hexValue}`);
// };

const hexToRGB = function (hex) {
  const red = parseInt(hex[1] + hex[2], 16);
  const green = parseInt(hex[3] + hex[4], 16);
  const blue = parseInt(hex[5] + hex[6], 16);
  const rgbValue = `rgb(${red}, ${green}, ${blue})`;
  return rgbValue;
};

/**
 * @description zaznacza wybrany kolor badge (biały outline dookoła badga)
 * @window OPIS PLANU
 */
const markColorBadge = function () {
  const colorBadgesNodes = [...colorPaletteBadges];
  // dla każdej
  unmarkColorBadge(colorBadgesNodes.filter(node => node != this));

  selectedColor = this.getAttribute('data-color');

  toggleMarkColorBadge(this);

  // dodaje kolor jako startowy do kolorPickera
  //! działa tylko do momentu dodania nowego koloru do kolorów dodatkowych, potem input color przestaje reagować
  // setColorPickerDefaultValue(selectedColor);

  btnAddActiveColorNode.classList.remove('active');
  btnAddActiveColorNode.disabled = true;

  btnDeleteColorNode.classList.add('active');
  btnDeleteColorNode.disabled = false;

  // dla additional
  if (this.parentNode.id === 'additional-colors-badges') {
    btnAddActiveColorNode.classList.add('active');
    btnAddActiveColorNode.disabled = false;
  }
  // jeśłi nic nie jest zaznaczone
  if (!colorBadgesNodes.some(node => node.classList.contains('marked-badge'))) {
    btnDeleteColorNode.disabled = true;
    btnAddActiveColorNode.disabled = true;
    btnDeleteColorNode.classList.remove('active');
    btnAddActiveColorNode.classList.remove('active');
    selectedColor = '';
  }
};

/**
 * @description usuwa badge z danym kolorem z okien (paleta kolorów aktywne i dodatkowe) + z edycja lokalu (kolor lokalu)
 * @field ...
 */
const deleteBadgeColor = function (color = selectedColor) {
  const removeBadge = function (nodes) {
    let colorBadgesNodes = [...nodes.querySelectorAll('.color-badge')];

    let [selectedNode] = colorBadgesNodes.filter(
      node => node.getAttribute('data-color') === `${color}`
    );
    selectedNode.remove();
  };
  // usuwa badga z okna paleta kolorów obojętnie czy kolor był w aktywnych czy w dodatkowych - kolor nadal pozostaje w tablicy jesli był aktywny
  removeBadge(wrapColorPalette);

  // obsługa przycisków w paleta kolorów
  btnAddActiveColorNode.classList.remove('active');
  btnDeleteColorNode.classList.remove('active');
  btnDeleteColorNode.disabled = true;
  btnAddActiveColorNode.disabled = true;

  activeColors.some(rgb => rgb === color)
    ? (activeColors = activeColors.filter(rgb => rgb != color))
    : (additionalColors = additionalColors.filter(rgb => rgb != color));

  // // usuwa kolor z tablicy kolorów dodatkowych
  //   additionalColors = additionalColors.filter(rgb => rgb != color);

  //   // usuwa kolor z tablicy kolorów dodatkowych
  //   activeColors = activeColors.filter(rgb => rgb != color);

  // próba usunięcia badga z edycja lokalu (kolor lokalu) - zadziała tylko gdy kolor był w aktywnych, jeśli w dodatkowych wyłapie błąd
  try {
    removeBadge(wrapPremisesEditionColorBadges);
  } catch (error) {
    // console.error(error);
  }
};

/**
 * @description przenosi color badga z dodatkowych do aktywnych w oknie: paleta kolorów i dodaje badga do okna: edycja lokalu - kolor lokalu
 * @field ...
 */
const addColorToActiveColors = function (color = selectedColor) {
  let active = false; // active oznacza czy badge jest aktywny czyli klikalny

  // usuwa badge z danym kolorem, żeby się nie wyświetlał w dwóch miejscach
  deleteBadgeColor(color);

  // dodaje nowy kolor do tabeli aktywnych kolorów
  activeColors.push(color);

  renderColorBadges([color], activeColorsGroupsNode, true); // renderuje badge dla nowego koloru w aktywnych kolorach

  // renderuje BADGE DO EDYCJI LOKALI
  if (activeObject) active = true; // jeśli activeObject jest ustawiony, w edycji lokali badge powinien być klikalny
  renderColorBadges([color], wrapPremisesEditionColorBadges, active);

  btnAddActiveColorNode.classList.remove('active');
  btnDeleteColorNode.classList.remove('active');
  btnDeleteColorNode.disabled = true;
  btnAddActiveColorNode.disabled = true;
  addColorPaletteBadgesListener();
  if (activeObject) {
    removeListenersPremisesEditionColorBadges();
    addListenersPremisesEditionColorBadges();
  }
};

const changeBadgeColorType = function (rgb) {
  if (rgb !== hexToRGB(emptyColorBadge)) {
    if (activeColors.some(color => color === rgb)) {
      activeColors = activeColors.filter(color => color !== rgb);
      additionalColors.push(rgb);
    } else {
      activeColors.push(rgb);
      additionalColors = additionalColors.filter(color => color !== rgb);
    }
  }
};

/**
 * @description obsługa zdarzenia :hover dla ikony zasłaniającej input kolor w oknie: paleta kolorów
 * @field ...
 */
const colorPickerBtnMouseOver = function () {
  did('colorPickerIco').style.color = 'white';
  did('colorPickerIco').style.backgroundColor = '#1492e6';
};

/**
 * @description obsługa zdarzenia blur / mouseout dla ikony zasłaniającej input kolor w oknie: paleta kolorów
 * @field ...
 */
const colorPickerBtnMouseOut = function () {
  did('colorPickerIco').style.color = 'rgb(151, 151, 151)';
  did('colorPickerIco').style.backgroundColor = '#4a4a4a';
};

/**
 * @description obsługa input kolor. pobiera wybrany kolor w kolor pickerze i ustawia go dla ostatniego badga w oknie: paleta kolorów -- dodatkowe
 * @field ...
 */
const getColorFromColorPicker = function () {
  // emptyBadge - badge bez koloru, ostatni badge w dodatkowych
  const emptyBadge = additionalColorsGroupsNode.lastChild;
  const newColor = hexToRGB(this.value);
  const allColors = activeColors.concat(additionalColors);

  // sprawdzenie czy kolor z colorPickera już nie występuje w kolorach dodatkowych
  allColors.some(color => color === newColor)
    ? // jeśłi występuje NIE DODAWAJ
      window.alert(`wybrany kolor już jest dostępny w palecie. Nie dodam!`)
    : // jeśli NIE występuje - DODAJ
      // pobiera wartość koloru z pickera i ustawią jako tło dla ostatniego dziecka z kolorów dodatkowych, czyli pustego badża
      ((emptyBadge.style.backgroundColor = newColor),
      // dodaje kolor do obiektu additionalColors
      additionalColors.push(newColor),
      // dodaje klase active, która dodaje hover do badga
      emptyBadge.classList.add('active'),
      // ustawiam atrybut data-color na kolor z colorPickera
      emptyBadge.setAttribute('data-color', newColor),
      // dodaje listenera do badga, który pozwala go aktywować
      addColorPaletteBadgesListener(),
      // dodaje następny pusty color-badge
      renderColorBadges([emptyColorBadge], additionalColorsGroupsNode, false),
      //wyczyść ewentualne zaznaczenia/outline'y color-badgy jesli są
      unmarkColorBadge(wrapColorPalette.querySelectorAll('[data-color]')));
};

/**
 * @description ustawia eventListenery dla elementu input-color w oknie: paleta kolorów:
 * getColorFromColorPicker,
 * colorPickerBtnMouseOver,
 * colorPickerBtnMouseOut,
 * @field ...
 */
const inputColorBtnListeners = function () {
  colorPickerBtn.addEventListener('change', getColorFromColorPicker);
  colorPickerBtn.addEventListener('mouseover', colorPickerBtnMouseOver);
  colorPickerBtn.addEventListener('mouseleave', colorPickerBtnMouseOut);
};

inputColorBtnListeners();

//.-------------------------------------------------------------WYŚWIETLANIE--WARSTWY-

// anonimowy callback obsługujący włączanie/wyłączanie widoczności na
// svg elementów legendy (legenda, tytuł planu, nagłówek planu, opis
// planu, stopka planu, box grupy lokali, box kondygnacji, box schemat
// placu)
chbLegendVisability.addEventListener('click', () => {
  chbLegendVisability.checked === true
    ? (addVisability('svg-legend-premises-group', chbGroupsVisability),
      addVisability('svg-floors-group', chbFloorsVisability),
      addVisability('svg-square-group', chbSquareVisability),
      addVisability('svg-title', chbPlanTitleVisability),
      addVisability('svg-header', chbPlanHeaderVisability),
      addVisability('svg-description', chbPlanDescriptionVisability),
      addVisability('svg-footer', chbPlanFooterVisability))
    : (removeVisability('svg-legend-premises-group', chbGroupsVisability),
      removeVisability('svg-floors-group', chbFloorsVisability),
      removeVisability('svg-square-group', chbSquareVisability),
      removeVisability('svg-title', chbPlanTitleVisability),
      removeVisability('svg-header', chbPlanHeaderVisability),
      removeVisability('svg-description', chbPlanDescriptionVisability),
      removeVisability('svg-footer', chbPlanFooterVisability));
});

//@callback -> toggle widoczności dla #svg tytuł planu
chbPlanTitleVisability.addEventListener('click', () => {
  toggleVisability('#svg-title');
});

//@callback -> toggle widoczności dla #svg nagłówek planu
chbPlanHeaderVisability.addEventListener('click', () => {
  toggleVisability('#svg-header');
});

//@callback -> toggle widoczności dla #svg opis planu
chbPlanDescriptionVisability.addEventListener('click', () => {
  toggleVisability('#svg-description');
});

//@callback -> toggle widoczności dla #svg stopka planu
chbPlanFooterVisability.addEventListener('click', () => {
  toggleVisability('#svg-footer');
});

//@callback -> toggle widoczności dla #svg box z grupami lokali
chbGroupsVisability.addEventListener('click', () => {
  toggleVisability('#svg-legend-premises-group');
});

//@callback -> toggle widoczności dla #svg box kondygnacje
chbFloorsVisability.addEventListener('click', () => {
  toggleVisability('#svg-floors-group');
});

//@callback -> toggle widoczności dla #svg box schemat placu
chbSquareVisability.addEventListener('click', () => {
  toggleVisability('#svg-square-group');
});

//@callback -> toggle widoczności dla #svg siatka
chbGridVisability.addEventListener('click', () => {
  toggleVisability('#svg-grid-group');
});

//@callback -> toggle widoczności dla #svg oznaczenia
chbSignsVisability.addEventListener('click', () => {
  toggleVisability('#svg-signs-group');
});

//.--------------------------------------------------------WYŚWIETLANIE--GRUPY-LOKALI-
/**
 * @description renderuje JEDNĄ grupę/linijkę z grupą lokali
 * @window WYŚWIETLANIE--GRUPY-LOKALI
 * @node viewPremisesGroupsNode
 */
const renderViewPremisesGroups = function (group) {
  let checkbox = '';
  if (group.isVisible === true) checkbox = 'checked';
  const html = `<div class="window-line-flex-space" data-color="${group.rgb}">
  <input id="${group.name}" type="checkbox" name="" ${checkbox}/>
  <div class="color-badge--half-size" style="background:${group.rgb}"></div>
  <label class="flex-grow-1 dont-select">${group.name}</label>
  <span class="rotate" title="Przesuń">...</span>
  </div>`;

  viewGroupsNode.insertAdjacentHTML('beforeend', html);
};

/**
 * @description wywołuje renderViewPremisesGroups() dla przekazanej gruyp lokali
 * @param Array w/ data
 * @window ...
 * @node ...
 */
const renderAllViewPremisesGroups = function (groups) {
  clearContentViewPremisesGroups();
  groups.map(group => renderViewPremisesGroups(group));
  viewGroupsAddListener();
};

/**
 * @description wywołuje renderViewPremisesGroups() dla przekazanej gruyp lokali
 * @param Array w/ data
 * @window WYŚWIETLANIE--GRUPY-LOKALI
 * @node viewPremisesGroupsNode / data-color
 */
const clearContentViewPremisesGroups = function () {
  viewGroupsNode
    .querySelectorAll('[data-color]')
    .forEach(node => node.remove());
};

/**
 * @description przestawia widoczność (on/off) dla wszystkich HTMLnodes z podanym selektorem
 * @param html selector
 * @toggle .dont-display
 */
const toggleVisability = function (selector) {
  document
    .querySelectorAll(selector)
    .forEach(node => node.classList.toggle('dont-display'));
  console.log('toggle');
};

/**
 * @description przestawia widoczność (on/off) dla wszystkich HTMLnodes description-group. funkcja sprawdza które grupy lokali są widoczne na planie i tylko dla nich zmienia widoczność. w tym różni się od funkcji toggleVisability, ktora tego nie robi. sprawdzanie które grupy są wyświetlane obecne na planie jest kluczowe dla poprawnego działania widocznośći bo widoczność opisów jest zmieniana również przy zmianie widocznośći dla grupy lokali wyświetlanie -- grupy lokali
 * @param html selector
 * @toggle .dont-display
 */
const changeDescriptionVisability = function () {
  const checkbox = this;

  const getNodesAndChangeVisability = function (colorsArray) {
    colorsArray.map(function (color) {
      const premises_DefinedColor = premises.filter(
        room => room.color === color
      );
      switchDescriptionVisability(checkbox.checked, premises_DefinedColor);
    });
  };

  // zebranie do tablicy kolorów lokali bez grup
  const colorsWithoutGroups = activeColors
    .map(function (color) {
      if (!premisesGroups.some(group => group.rgb === color)) return color;
    })
    .filter(Boolean);

  // zebranie do tablicy kolorów lokali w widocznych grupach
  const colorsVisibleGroups = premisesGroups
    .filter(group => group.isVisible === true)
    .map(group => group.rgb);

  // zmiana widoczności OPISÓW dla lokali bez grup
  getNodesAndChangeVisability(colorsWithoutGroups);

  // zmiana widoczności OPISÓW dla lokali w widocznych grupach
  getNodesAndChangeVisability(colorsVisibleGroups);
};

//@callback -> toggle widoczności dla #svg opisy wszystkich lokali
chbAllPremisesDescriptionVisability.addEventListener(
  'click',
  changeDescriptionVisability
);

/**
 * @description włącza widoczność (on) dla wszystkich HTMLnodes z podanym id + zaznacza checkboks
 * @param html id
 * @remove .dont-display
 * @window WIDOKI
 */
const addVisability = function (nodeId, checkboxNode) {
  did(nodeId).classList.remove('dont-display');
  checkboxNode.checked = true;
};

/**
 * @description wyłącza widoczność (off) dla wszystkich HTMLnodes z podanym id + odznacza checkboks
 * @param html id
 * @add .dont-display
 * @window WIDOKI
 */
const removeVisability = function (nodeId, checkboxNode) {
  did(nodeId).classList.add('dont-display');
  checkboxNode.checked = false;
};

/**
@call toggle widoczności dla każdej grupy lokali na planie
 */
const viewGroupsAddListener = function () {
  viewGroupsNode.querySelectorAll('[data-color]').forEach(node =>
    node.addEventListener('click', function (event) {
      changeSVGGroupVisability(event.target, this);
    })
  );
};

//.------------------------------------------------------------------------OPIS-PLANU-

/**
 * @description obsługuje (zaznacza/odznacza) checkboxy, uaktywnia pole inputu, wyznacza max-length dla poszczególnych pozycji opisu planu
 * @param
 * @window OPIS-PLANU
 * @node vsvgPlanDescriptionRadioBtns
 */
const activateInputDescription = function () {
  const [radioBtnChecked] = planDescriptionRadioBtns.filter(
    button => button.checked
  );

  if (radioBtnChecked.getAttribute('value') === radioButtonMarker) {
    radioBtnChecked.checked = false;
    radioButtonMarker = '';
    planDescriptionInput.disabled = true;
    planDescriptionInput.placehoder = true;
    planDescriptionInput.value = '';
    planDescriptionEnterBtn.classList.remove('active');
  } else {
    radioButtonMarker = radioBtnChecked.getAttribute('value');
  }

  if (planDescriptionRadioBtns.some(button => button.checked)) {
    planDescriptionInput.disabled = false;
    planDescriptionInput.placehoder = false;
    planDescriptionInput.focus();
    switch (radioBtnChecked.value) {
      case 'title':
        planDescriptionInput.setAttribute('maxlength', '30');
        break;
      case 'header':
        planDescriptionInput.setAttribute('maxlength', '60');
        break;
      case 'description':
        planDescriptionInput.setAttribute('maxlength', '20');
        break;
      case 'footer':
        planDescriptionInput.setAttribute('maxlength', '90');
        break;
    }
  }
};

/**
 * @description aktywuje/dezaktywuje btn OK opisu planu
 * @param
 * @window OPIS-PLANU
 * @node planDescriptionEnterBtn
 */
const activateDescriptionEnter = function () {
  if (planDescriptionInput.value) {
    planDescriptionEnterBtn.classList.add('active');
  } else {
    planDescriptionEnterBtn.classList.remove('active');
  }
};

/**
 * @description ustawia listenera na polu input/text żęby aktywował przycisk OK (uaktywnia się tylko input nie jest pusty)
 * @param
 * @callback activateDescriptionEnter
 * @window OPIS-PLANU
 * @node planDescriptionInput
 */
const planDescriptionInputListener = function () {
  planDescriptionInput.addEventListener('input', activateDescriptionEnter);
};

/**
 * @description znajduje zaznaczony checkbox, wywołuje funkcję displayPlanDescriptionValue i kasuje wartość w polu input/text
 * @param
 * @window OPIS-PLANU
 * @node planDescriptionRadioBtns
 */
const findRadioDescription = function () {
  const [radioBtnChecked] = planDescriptionRadioBtns.filter(
    button => button.checked
  );

  displayPlanDescriptionValue(
    radioBtnChecked.value,
    planDescriptionInput.value
  );

  planDescriptionInput.value = '';
};

/**
 * @description znajduje właściwy element na SVG w którym ma być zmieniony tekst i zmienia
 * @param
 * @window SVG
 * @node SVG-różne w zależności od parametru
 */
const displayPlanDescriptionValue = function (descriptionType, value) {
  const element = did(`svg-${descriptionType}`);
  //! dopisać przewarzanie stringa
  element.textContent = value;
};

/**
 * @description ustawia listenera (click) na btn OK i uruchamia
 * @param
 * @callback findRadioDescription
 * @window OPIS-PLANU
 * @node planDescriptionEnterBtn
 */
const planDescriptionEnterListener = function () {
  planDescriptionEnterBtn.addEventListener('click', findRadioDescription);
};

planDescriptionInputListener(); // opis planu
planDescriptionEnterListener(); // opis planu

//.------------------------------------------------------------------ PREMISES-DETAIL

//.-------------------------------------------------------------------------- ON LOAD
drawCompletePremises(premises); // svg
drawVisibleGroups_SvgLegend(); //svg-legenda

renderAllViewPremisesGroups(premisesGroups); // panel--wyswietlanie--grupy-lokali
// console.log('rendergrup');
renderAllColorBadges();

addColorPaletteBadgesListener(); // paleta kolorów

function handlerChangeRoomColor() {
  if (activeObject) {
    const newColor = this.getAttribute('data-color');
    changeRoomColor(newColor);
  }
}

const addListenersPremisesEditionColorBadges = function () {
  removeListenersPremisesEditionColorBadges();
  wrapPremisesEditionColorBadges
    .querySelectorAll('[data-color]')
    .forEach(badge => badge.addEventListener('click', handlerChangeRoomColor));
};

const removeListenersPremisesEditionColorBadges = function () {
  wrapPremisesEditionColorBadges
    .querySelectorAll('[data-color]')
    .forEach(badge =>
      badge.removeEventListener('click', handlerChangeRoomColor)
    );
};

const addListenersSVGPremisesShapes = function () {
  svgPremisesShapes
    .querySelectorAll('polygon')
    .forEach(shape => shape.addEventListener('click', changeRoomColorClick));
};

addListenersSVGPremisesShapes();
btnPremisesInputsConfirm.onclick = setRoomDescription;
btnStrokeLock.onclick = toggleStrokePadlock;
btnStrokeSwitch.onclick = toggleStrokeColor;
btnbtnDoorsWidthConfirm.onclick = changeDoorsWidth;
//. próby z odwracaniem tekstu
// dqs('.H008.name').setAttribute('text-anchor', 'middle');
// dqs('.H008.name').setAttribute('transform', 'translate(678,437) rotate(90)');

//. próby ze zmianą koloru lokalu na click

//.-----------------------------------------------------------------
const arrayRemove = function (array, value) {
  return array.filter(item => item != value);
};
//.-----------------------------------------------------------------
