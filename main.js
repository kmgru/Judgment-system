'use strict'

{
  let year;
  let group;
  let must = [];
  let creditList;

  //ボタンを押すとデータの受取
  document.querySelector('button').addEventListener('click', () => {

    document.querySelectorAll('input.year').forEach((radio) => {
      if (radio.checked === true) {
        year = parseInt(radio.value, 10);  //学年
      }
    });
    if (year != 1 && year != 2 && year != 3 && year != 4) {
      alert('1:エラーが発生しました。自動でリロードします。');
      setTimeout(function () {
        window.location.reload();
      });
    }

    document.querySelectorAll('input.group').forEach((radio) => {
      if (radio.checked === true) {
        group = parseInt(radio.value, 10);  //学群
      }
    });
    if (group != 1 && group != 2 && group != 3 && group != 4 && group != 5 && group != 6 && group != 7 && group != 8) {
      alert('2:エラーが発生しました。自動でリロードします。');
      setTimeout(function () {
        window.location.reload();
      });
    }

    let i = 0;
    document.querySelectorAll('input.credit').forEach((checkbox) => {
      if (checkbox.checked === true) {
        must[i] = checkbox.value;  //必須単位
        i++;
      }
    });

    //テスト用
    // console.log(year);
    // console.log(group);
    // console.log(must);

    //取得単位表の代入
    creditList = document.querySelector('textarea').value.split('\n');

    // テキストの解析
    //科目と単位に分ける
    const subject = [];
    const credits = [];

    const requiredWords = ['科目分類', '修得済', '履修中', '合計'];

    const allExist = requiredWords.every(word => creditList[0].includes(word));
    if (allExist && creditList.length === 53) {
      for (let i = 1; i < 53; i++) {
        if (i % 2 === 0) {
          credits.push(creditList[i].trim().split(/\s+/));
        } else {
          subject.push(creditList[i]);
        }
      }

      //テスト
      console.log(subject);
      console.log(credits);

      //学年に応じた条件の変更
      let english;
      let nature;
      let engineering;
      const month = (new Date()).getMonth();
      const semester = (month <= 7 && month >= 3) === true ? 100 : 200;
      if (year === 1) {
        if (semester === 100) {
          english = 2;
          nature = 4;
          engineering = 6
        } else {
          english = 4;
          nature = 6;
          engineering = 10
        }
      }
      if (year === 2) {
        if (semester === 100) {
          english = 6;
        } else {
          english = 8;
        }
        nature = 6;
        engineering = 10
      }
      if (year > 2) {
        english = 8;
        nature = 6;
        engineering = 10
      }

      //プログラムに応じた条件の変更
      //学群必修
      let Pmust
      if (group === 1 || (group >= 3 && group <= 5)) {
        Pmust = 12;
        if (semester === 100) {
          Pmust = 4;      //不明
        }
      } else {
        Pmust = 10;
        if (group === 1 && semester === 100) {
          Pmust = 4;
        }
      }

      //専門必修
      //学年ごとにする必要あり
      const groupToSmust = {
        123: 8,
        223: 20,
        133: 30,
        233: 36,

        124: 13,
        224: 25,
        134: 33,
        234: 35,

        125: 4,
        225: 6,
        135: 6,
        235: 8,

        126: 13,
        226: 22,
        136: 26,
        236: 28,

        127: 7,
        227: 17,
        137: 25,
        237: 31,

        128: 8,
        228: 14,
        138: 26,
        238: 38,
      }
      let Smust = groupToSmust[year * 10 + group + semester] || 0;

      //テスト
      // console.log(Pmust);
      // console.log(Smust);

      //卒業要件との比較
      let condition = 0;
      let credit;
      for (let i = 0; i < subject.length; i++) {
        credit = parseFloat(credits[i][2]);
        if (subject[i] === '英語' && credit < english) {
          condition++;
          const result = document.createElement('p');
          result.textContent = (`英語の履修ができていません。`);
          result.classList.add('resultCss');
          document.querySelector('section').appendChild(result);
          console.log('english');
        }
        if (subject[i] === '自然必修' && credit < nature) {
          condition++;
          const result = document.createElement('p');
          result.textContent = (`自然必修の履修ができていません。`);
          result.classList.add('resultCss');
          document.querySelector('section').appendChild(result);
          console.log('nature');
        }
        if (subject[i] === '工基必修' && credit < engineering) {
          condition++;
          const result = document.createElement('p');
          result.textContent = (`工基必修の履修ができていません。`);
          result.classList.add('resultCss');
          document.querySelector('section').appendChild(result);
          console.log('engineering')
        }
        if (subject[i] === '学群必修' && credit < Pmust) {
          condition++;
          const result = document.createElement('p');
          result.textContent = (`学群必修の履修ができていません。`);
          result.classList.add('resultCss');
          document.querySelector('section').appendChild(result);
          console.log('Pmust');
        }
        if (subject[i] === '専門必修' && credit < Smust) {
          condition++;
          const result = document.createElement('p');
          result.textContent = (`専門必修の履修ができていません。`);
          result.classList.add('resultCss');
          document.querySelector('section').appendChild(result);
          console.log('Smust');
        }
      }

      //mustの判定
      let natureChice = 0;
      let desgin3 = 0;
      let desgin4 = 0;
      let desgin5 = 0;
      let mustList = [];
      let j = 0;
      for (let i = 0; i < must.length; i++) {
        if (must[i] === 'physics') {
          natureChice++;
          mustList[j] = '物理学Ⅰ';
          j++;
        }
        if (must[i] === 'chemical') {
          natureChice++;
          mustList[j] = '化学Ⅰ';
          j++;
        }
        if (must[i] === 'biology') {
          natureChice++;
          mustList[j] = '生物学Ⅰ';
          j++;
        }
        if (must[i] === 'desgin3a') {
          desgin3++;
          mustList[j] = '工学デザイン実習Ⅲa';
          j++;
        }
        if (must[i] === 'desgin3b') {
          desgin3++;
          mustList[j] = '工学デザイン実習Ⅲb';
          j++;
        }
        if (must[i] === 'desgin3c') {
          desgin3++;
          mustList[j] = '工学デザイン実習Ⅲc';
          j++;
        }
        if (must[i] === 'desgin4a') {
          desgin4++;
          mustList[j] = '工学デザイン実習Ⅳa';
          j++;
        }
        if (must[i] === 'desgin4b') {
          desgin4++;
          mustList[j] = '工学デザイン実習Ⅳb';
          j++;
        }
        if (must[i] === 'desgin4c') {
          desgin4++;
          mustList[j] = '工学デザイン実習Ⅳc';
          j++;
        }
        if (must[i] === 'desgin5a') {
          desgin5++;
          mustList[j] = '工学デザイン実習Ⅴa';
          j++;
        }
        if (must[i] === 'desgin5b') {
          desgin5++;
          mustList[j] = '工学デザイン実習Ⅴb';
          j++;
        }
        if (must[i] === 'desgin5c') {
          desgin5++;
          mustList[j] = '工学デザイン実習Ⅴc';
          j++;
        }
      }

      const natureList = [
        '物理学Ⅰ', '化学Ⅰ', '生物学Ⅰ',
        '工学デザイン実習Ⅲa', '工学デザイン実習Ⅲb', '工学デザイン実習Ⅲc',
        '工学デザイン実習Ⅳa', '工学デザイン実習Ⅳb', '工学デザイン実習Ⅳc',
        '工学デザイン実習Ⅴa', '工学デザイン実習Ⅴb', '工学デザイン実習Ⅴc',
      ];

      j = 0;
      if (natureChice < 2) {
        condition++;
        const result = document.createElement('p');
        result.textContent = (`自然選択必修の履修ができていません。以下から${2 - natureChice}つ選び履修してください。`);
        result.classList.add('resultCss');
        document.querySelector('section').appendChild(result);
        for (let k = 0; k < 3; k++) {
          if (mustList[j] != natureList[k]) {
            const resultRest = document.createElement('p');
            resultRest.textContent = natureList[k];

            resultRest.classList.add('resultRestCss');
            document.querySelector('section').appendChild(resultRest);
            // console.log(mustList[j], j, natureList[k]);
          } else {
            if (j < mustList.length - 1) {
              j++;
            } else {
              j = mustList.length - 1;
            }
          }
        }
      }
      if (group === 5) {
        if (desgin3 < 1) {
          condition++;
          const result = document.createElement('p');
          result.textContent = (`専門選択必修の履修ができていません。以下から１つ選び履修してください。`);
          result.classList.add('resultCss');
          document.querySelector('section').appendChild(result);
          for (let k = 3; k < 6; k++) {
            if (mustList[j] != natureList[k]) {
              const resultRest = document.createElement('p');
              resultRest.textContent = natureList[k];

              resultRest.classList.add('resultRestCss');
              document.querySelector('section').appendChild(resultRest);
              // console.log(mustList[j], j, natureList[k]);
            } else {
              if (j < mustList.length - 1) {
                j++;
              } else {
                j = mustList.length - 1;
              }
            }
          }
        }
        if (desgin4 < 1) {
          condition++;
          const result = document.createElement('p');
          result.textContent = (`専門選択必修の履修ができていません。以下から１つ選び履修してください。`);
          result.classList.add('resultCss');
          document.querySelector('section').appendChild(result);
          for (let k = 6; k < 9; k++) {
            if (mustList[j] != natureList[k]) {
              const resultRest = document.createElement('p');
              resultRest.textContent = natureList[k];

              resultRest.classList.add('resultRestCss');
              document.querySelector('section').appendChild(resultRest);
              // console.log(mustList[j], j, natureList[k]);
            } else {
              if (j < mustList.length - 1) {
                j++;
              } else {
                j = mustList.length - 1;
              }
            }
          }
        }
        if (desgin5 < 1) {
          condition++;
          const result = document.createElement('p');
          result.textContent = (`専門選択必修の履修ができていません。以下から１つ選び履修してください。`);
          result.classList.add('resultCss');
          document.querySelector('section').appendChild(result);
          for (let k = 9; k < 12; k++) {
            if (mustList[j] != natureList[k]) {
              const resultRest = document.createElement('p');
              resultRest.textContent = natureList[k];

              resultRest.classList.add('resultRestCss');
              document.querySelector('section').appendChild(resultRest);
              // console.log(mustList[j], j, natureList[k]);
            } else {
              if (j < mustList.length - 1) {
                j++;
              } else {
                j = mustList.length - 1;
              }
            }
          }
        }
      }

      //テスト
      console.log(subject.length);

      //残留単位
      // let rest = 0;const rest = document.createElement('p');
      const rest = document.createElement('p');
      rest.textContent = (`選択科目：残り単位数`);
      rest.classList.add('resultCss2');
      document.querySelector('section').appendChild(rest);
      for (let i = 0; i < subject.length; i++) {
        credit = parseFloat(credits[i][2]);
        if (subject[i] === '人文社会' && credit < 12) {
          // rest = 12 - credit;
          // console.log(`${subject[i]}：残り${rest}`);
          const rest = document.createElement('p');
          rest.textContent = (`${subject[i]}：残り${12 - credit}`);
          rest.classList.add('resultCss2');
          document.querySelector('section').appendChild(rest);
        }
        if (subject[i] === '外語選択' && credit < 2) {
          // rest = 2 - credit;
          // console.log(`${subject[i]}：残り${rest}`);
          const rest = document.createElement('p');
          rest.textContent = (`${subject[i]}：残り${2 - credit}`);
          rest.classList.add('resultCss2');
          document.querySelector('section').appendChild(rest);
        }
        if (subject[i] === '自然科学' && credit < 20) {
          // rest = 20 - credit;
          // console.log(`${subject[i]}：残り${rest}`);
          const rest = document.createElement('p');
          rest.textContent = (`${subject[i]}：残り${20 - credit}`);
          rest.classList.add('resultCss2');
          document.querySelector('section').appendChild(rest);
        }
        if (subject[i] === '学群共通' && credit < 20) {
          // rest = 20 - credit;
          // console.log(`${subject[i]}：残り${rest}`);
          const rest = document.createElement('p');
          rest.textContent = (`${subject[i]}：残り${20 - credit}`);
          rest.classList.add('resultCss2');
          document.querySelector('section').appendChild(rest);
        }
        if (subject[i] === '専門' && credit < 52) {
          // rest = 52 - credit;
          // console.log(`${subject[i]}：残り${rest}`);
          const rest = document.createElement('p');
          rest.textContent = (`${subject[i]}：残り${52 - credit}`);
          rest.classList.add('resultCss2');
          document.querySelector('section').appendChild(rest);
        }
        if (subject[i] === '合計' && credit < 98) {
          // rest = 98 - credit;
          // console.log(`${subject[i]}：残り${rest}`);
          const rest = document.createElement('p');
          rest.textContent = (`${subject[i]}：残り${98 - credit}`);
          rest.classList.add('resultCss2');
          document.querySelector('section').appendChild(rest);
        }
      }

      //判定結果
      const result = document.createElement('p');
      result.textContent = condition === 0 ? '卒業見込みあり' : '卒業見込みなし';
      result.classList.add('lastResult');
      document.querySelector('section').appendChild(result);
    } else {
      alert('3:エラーが発生しました。自動でリロードします。');
      setTimeout(function () {
        window.location.reload();
      });
    }

  });

}