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
      sameCoordinates = eval('arr_' + axis).filter(point => point === find);
    };

    const firstPoint = function () {
      axis = 'x';
      findIndex = 0;
      find = eval('arr_' + axis)[findIndex];

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
      if (sameCoordinates === undefined) {
        firstPoint();
      } else if (sameCoordinates.length == 1) {
        add();
      } else {
        choose();
      }
    }
  };

  did('svg').insertAdjacentHTML(
    'beforeend',
    `<path class="one" d="M${pointsToDraw}Z"/>`
  );
}
