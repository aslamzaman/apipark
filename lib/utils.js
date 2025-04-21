
/**
 * Create title case
 * @param {string} str
 * @returns
 */
export const titleCase = (str) => {
    return str.split(" ")
        .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
        .join(" ");
}



/**
 * Create title camel case
 * @param {string} str
 * @returns
 */
export const titleCamelCase = (str) => {
    return str.split(" ")
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join(" ");
}




/**
 * Inword unicode
 * @param {Number} number - Integer Number Maximum 9 digit
 * @returns
 */
export const inwordBangla = (number = 123456) => {
    try {
        const num = parseInt(number);
        if(!num) return 'মানটি সঠিক নয়।';
        const num_to_bd = [
            'শূন্য', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়',
            'দশ', 'এগার', 'বার', 'তের', 'চৌদ্দ', 'পনের', 'ষোল', 'সতের', 'আঠার', 'ঊনিশ',
            'বিশ', 'একুশ', 'বাইশ', 'তেইশ', 'চব্বিশ', 'পঁচিশ', 'ছাব্বিশ', 'সাতাশ', 'আঠাশ',
            'ঊনত্রিশ', 'ত্রিশ', 'একত্রিশ', 'বত্রিশ', 'তেত্রিশ', 'চৌত্রিশ', 'পঁয়ত্রিশ', 'ছত্রিশ',
            'সাঁইত্রিশ', 'আটত্রিশ', 'ঊনচল্লিশ', 'চল্লিশ', 'একচল্লিশ', 'বিয়াল্লিশ', 'তেতাল্লিশ',
            'চুয়াল্লিশ', 'পঁয়তাল্লিশ', 'ছেচল্লিশ', 'সাতচল্লিশ', 'আটচল্লিশ', 'ঊনপঞ্চাশ', 'পঞ্চাশ',
            'একান্ন', 'বায়ান্ন', 'তিপ্পান্ন', 'চুয়ান্ন', 'পঞ্চান্ন', 'ছাপ্পান্ন', 'সাতান্ন', 'আটান্ন',
            'ঊনষাট', 'ষাট', 'একষট্টি', 'বাষট্টি', 'তেষট্টি', 'চৌষট্টি', 'পঁয়ষট্টি', 'ছেষট্টি', 'সাতষট্টি',
            'আটষট্টি', 'ঊনসত্তর', 'সত্তর', 'একাত্তর', 'বাহাত্তর', 'তিয়াত্তর', 'চুয়াত্তর', 'পঁচাত্তর', 'ছিয়াত্তর',
            'সাতাত্তর', 'আটাত্তর', 'ঊনআশি', 'আশি', 'একাশি', 'বিরাশি', 'তিরাশি', 'চুরাশি', 'পঁচাশি',
            'ছিয়াশি', 'সাতাশি', 'আটাশি', 'ঊননব্বই', 'নব্বই', 'একানব্বই', 'বিরানব্বই', 'তিরানব্বই',
            'চুরানব্বই', 'পঁচানব্বই', 'ছিয়ানব্বই', 'সাতানব্বই', 'আটানব্বই', 'নিরানব্বই'
        ];
        /* ----------------- Initial validation chek   ---------------- */
        if (num.toString().length > 9) {
            return "শূন্য বাদে ১ থেকে ৯ সংখ্যার মধ্যে লিখুন।";
        }

        if (num === 0) {
            return num_to_bd[0];
        }
        if (!num) {
            return "সংখ্যা ঠিক নাই";
        }
        /* ----------------- /Initial validation chek   ---------------- */

        const nineDigit = ("0000000000" + num).slice(-9);
        //console.log(nineDigit);

        let str = '';
        //------------------------------------
        const segments = [
            { value: nineDigit.substring(0, 2), suffix: ' কোটি ' },
            { value: nineDigit.substring(2, 4), suffix: ' লক্ষ ' },
            { value: nineDigit.substring(4, 6), suffix: ' হাজার ' },
            { value: nineDigit.substring(6, 7), suffix: 'শত ' },
            { value: nineDigit.substring(7, 9), suffix: ' ' }
        ]

        segments.forEach(segment => {
            if (parseInt(segment.value) !== 0) {
                str += `${num_to_bd[parseInt(segment.value)]}${segment.suffix}`;
            }
        })
        return str.trim();
    } catch (err) {
        return 'bv¤^vi wVK bvB';
    }
};




/**
 * Inword English
 * @param {Number} number - Integer or Float
 * @returns
 */
export const inwordEnglishInd = (number=123456, textCase='lower') => {
    try {
        const num = parseInt(number);
        if(!num) return "The value is not correct.";
        let a = [
            "",
            "one ",
            "two ",
            "three ",
            "four ",
            "five ",
            "six ",
            "seven ",
            "eight ",
            "nine ",
            "ten ",
            "eleven ",
            "twelve ",
            "thirteen ",
            "fourteen ",
            "fifteen ",
            "sixteen ",
            "seventeen ",
            "eighteen ",
            "nineteen ",
        ];
        let b = [
            "",
            "",
            "twenty",
            "thirty",
            "forty",
            "fifty",
            "sixty",
            "seventy",
            "eighty",
            "ninety",
        ];
        /* ----------------- Initial validation chek   ---------------- */
        if (num.toString().length > 9) {
            return "Keep it within 9 digits.";
        }

        if (num === 0) {
            return a[0];
        }

        if (!num) {
            return "No data!";
        }
        /* ----------------- /Initial validation chek   ---------------- */

        const nineDigit = ("0000000000" + num).slice(-9);

        let str = '';
        //------------------------------------

        const fn = (n) => {
            const num = parseInt(n);
            if (num < 20) {
                return a[num];
            } else {
                const tens = Math.floor(num / 10);
                const ones = num % 10;
                return b[tens] + ' ' + a[ones];
            }
        }

        const segments = [
            { value: nineDigit.substring(0, 2), suffix: 'crore ' },
            { value: nineDigit.substring(2, 4), suffix: 'lac ' },
            { value: nineDigit.substring(4, 6), suffix: 'thousand ' },
            { value: nineDigit.substring(6, 7), suffix: 'hundred ' },
            { value: nineDigit.substring(7, 9), suffix: ' ' }
        ]

        segments.forEach(segment => {
            if (parseInt(segment.value) !== 0) {
                str += `${fn(parseInt(segment.value))}${segment.suffix}`;
            }
        })

        switch (textCase) {
            case "upper":
                return str.trim().toUpperCase();
                break;
            case "lower":
                return str.trim().toLocaleLowerCase();
                break;
            case "title":
                return str.trim().split(" ").map(item => (`${item.charAt(0).toLocaleUpperCase()}${item.slice(1, item.length).toLowerCase()}`)).join(" ");
                break;
            default:
                console.log(`Sorry, we are out of ${textCase}.`);
        }

    } catch (err) {
        return 'The number is not correct.';
    }
};




/**
 * Inword English
 * @param {Number} number - Integer or string value
 * @param {String} textCase - Upper Case: 'upper', Lower Case: 'lower', Title Case: 'title'
 * @returns
 */
export const inwordEnglishUs = (number, textCase='lower') => {
    try {
      const num = parseInt(number);
      if (!num) return "The value is not correct.";
      let a = [
        "",
        "one ",
        "two ",
        "three ",
        "four ",
        "five ",
        "six ",
        "seven ",
        "eight ",
        "nine ",
        "ten ",
        "eleven ",
        "twelve ",
        "thirteen ",
        "fourteen ",
        "fifteen ",
        "sixteen ",
        "seventeen ",
        "eighteen ",
        "nineteen ",
      ];
      let b = [
        "",
        "",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
      ];
      /* ----------------- Initial validation chek   ---------------- */
      if (num.toString().length > 9) {
        return "Over the nine digit";
      }
  
      if (num === 0) {
        return a[0];
      }
  
      if (!num) {
        return "No data!";
      }
      /* ----------------- /Initial validation chek   ---------------- */
      const strDigit = num.toString();
      const nineDigit = `0000000000${strDigit}`.slice(-9);
      console.log("Aslam ", nineDigit);
  
      // 58,96,41,357
      let str = '';
      //------------------------------------
  
      const fn = (n) => {
        const num = parseInt(n);
        if (num < 20) {
          return a[num];
        } else {
          const tens = Math.floor(num / 10);
          const ones = num % 10;
          return b[tens] + ' ' + a[ones];
        }
      }
  
      const segments = [
        { value: nineDigit.substring(0, 3), suffix: 'billion ' },
        { value: nineDigit.substring(3, 6), suffix: 'million ' },
        { value: nineDigit.substring(6, 9), suffix: ' ' }
      ]
  
  
      segments.forEach(segment => {
        const seg = segment.value;
        if (parseInt(seg) !== 0) {
          if (parseInt(seg) > 99) {
            console.log("aslam"+ seg)
            const fst = seg.charAt(0);
            const snd = seg.substring(1, 3);
            const intFst = parseInt(fst);
            const sndInt = parseInt(snd);
            str += `${a[intFst]}hundred ${fn(sndInt)}${segment.suffix}`
          } else {
            const intSeg = parseInt(seg);
            str += `${fn(intSeg)} ${segment.suffix}`
          }
        }
  
      })
  
      switch (textCase) {
        case "upper":
            return str.trim().toUpperCase();
            break;
        case "lower":
            return str.trim().toLocaleLowerCase();
            break;
        case "title":
            return str.trim().split(" ").map(item => (`${item.charAt(0).toLocaleUpperCase()}${item.slice(1, item.length).toLowerCase()}`)).join(" ");
            break;
        default:
            console.log(`Sorry, we are out of ${textCase}.`);
    }
  
    } catch (err) {
      return 'Keep the value within 9 digits.';
    }
  };
  





/**
 * formated date for input
 * @param {Date} dt  - Date- 1:'yyyy-mm-dd' or 2:'dd-mm-yyyy' or 3: 'dd/mm/yyyy' or 4: 'mm/dd/yyy' or 5: 'dd.mm.yyyy' or 6: 'January 10 2024' or 7: 'January 10, 2024' or 8: '10 January 2024'
 * @returns
 */

export const formatedDate = (dt, expr) => {
    const timestamp = Date.parse(dt);
    const initialDate = !isNaN(timestamp);
    let result = '';
    const days = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ];
    const monthArra = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    const newDate = new Date(dt);
    const fullYear = newDate.getFullYear();
    const monthIndex = newDate.getMonth();
    const date = newDate.getDate();
    switch (expr) {
        case 1:
            result = `${fullYear}-${days[monthIndex + 1]}-${days[date]}`;
            break;
        case 2:
            result = `${days[date]}-${days[monthIndex + 1]}- ${fullYear}`;
            break;
        case 3:
            result = `${days[date]}/${days[monthIndex + 1]}/${fullYear}`;
            break;
        case 4:
            result = `${days[monthIndex + 1]}/${days[date]}/${fullYear}`;
            break;
        case 5:
            result = `${days[date]}.${days[monthIndex + 1]}.${fullYear}`;
            break;
        case 6:
            result = `${monthArra[monthIndex]} ${days[date]} ${fullYear}`;
            break;
        case 7:
            result = `${monthArra[monthIndex]} ${days[date]}, ${fullYear}`;
            break;
        case 8:
            result = `${days[date]} ${monthArra[monthIndex]} ${fullYear}`;
            break;
        default:
            result = `Sorry, we are out of ${expr}.`;
    }
    return result;
}




/**
 * Date difference in days
 * @param {Date} dt1  - Small date-"yyyy-mm-dd"
 * @param {Date} dt2  - Bigger date-"yyyy-mm-dd"
 * @param {Boolean} isLastDate - True/false
 * @returns
 */
export const dateDifferenceInDays = (dt1, dt2, isLastDate) => {
    const daysDifferance = Math.round((Date.parse(dt2) - Date.parse(dt1)) / 86400000);
    return isLastDate ? daysDifferance + 1 : daysDifferance;
}


/**
 * Days add in date -> 2024-10-15 + 10 -> 2024-10-25
 * @param {Date} dt1  - Date-"yyyy-mm-dd"
 * @param {Number} days  - Number any
 * @returns
 */
export const dateAdd = (dt1, days) => {
    const daysAdd = Math.round(Date.parse(dt1) + (parseFloat(days) * 86400000));
    return new Date(daysAdd);
}



/**
 * Is date -> true/false
 * @param {Date} dt - Date-"yyyy-mm-dd"
 * @returns
 */
export const isDate = (dt) => {
    const timestamp = Date.parse(dt);
    return isNaN(timestamp) ? false : true;
}



/**
 * Sort array function
 * @param {*} a
 * @param {*} b
 * @returns
 */
export const sortArray = (a, b) => {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}


export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export const unique = (data) => [...new Set(data)];



export const convertCsvToJson = (csv, headerArray) => {
    const lines = csv.split("\n"); // Trim and split into rows
    const dataRows = lines.slice(1);  // Deduct first row
    return dataRows.map(item => {
        const values = item.split(";").map(value => value.trim());
        let result = {};
        for (let i = 0; i < headerArray.length; i++) {
            result = { ...result, [headerArray[i]]: values[i] }
        }
        return result;
    })
}



export const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}




export const createRandomArray = (data = [], limit = 100, isRandom = false) => {
    const array = [...data];

    if (isRandom) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    if (limit < 0) {
        return array.slice(limit);
    } else {
        return array.slice(0, limit);
    }
}

