/*
 * Generates a 6-digit hex number. 
 */
function genHex() {
    let hexColor = '';
    for (let i = 0; i < 6; i++) {
        value = getRanHex()
        hexColor = hexColor + value
    }

    return hexColor;

}

/*
 * Randomly selects value from a string of possible hex values.
 */
function getRanHex() {
    const possibleHex = '0123456789abcdef';
    randNum = Math.floor(Math.random() * 16)
    number = possibleHex[randNum];
    return number;
}

/*
 * Generates 4 hex numbers and adds hashtag to number.
 * Inserts hex values into document based on ID list.
 * Adds hex value to document in a paragraph so the user can see the     value.
 */
function getBgColor() {
    const idList = ['cOne', 'cTwo', 'cThree', 'cFour'];
    const paraList = ['valueHex1', 'valueHex2', 'valueHex3', 'valueHex4'];
    for (let i = 0; i < 4; i++) {
        let hex = "#" + genHex();
        document.getElementById(idList[i]).style.backgroundColor = hex;
        document.getElementById(paraList[i]).innerHTML = hex;
        // TODO: Make function that checks values to ensure they are not
        //       the same on any of the hex values.
    }
}
/*
 * Generates a list of hex values that are similar.
 * Uses the genHex to get a single 6-digit hex number.
 * Changes hex number to 3-pairs and converts to RGB values.
 * Adds values to a similar value list once converted and math is run on number pairs.
 * Inserts values into list based on ID list.
 * Adds hex value for user to see and use
 */
function getMonoColor() {
    const idList = ['cOne', 'cTwo', 'cThree', 'cFour'];
    const paraList = ['valueHex1', 'valueHex2', 'valueHex3', 'valueHex4'];


    let hex_notag = genHex();
    let RGB_value = hexToRGB(hex_notag);
    let monoList = makeMonoPalette(RGB_value);


    for (let i = 0; i < 4; i++) {
        document.getElementById(idList[i]).style.backgroundColor = "#" + monoList[i];
        document.getElementById(paraList[i]).innerHTML = "#" + monoList[i];
        // TODO: Make function that checks values to ensure they are not
        //       the same on any of the hex values.
    }
}

/*
 * Converts hex pair to RGB values.
 * Takes in the randomly generated hex number as a parameter.
 */
function hexToRGB(hex_notag) {
    let r = hex_notag[0] + hex_notag[1];
    let g = hex_notag[2] + hex_notag[3];
    let b = hex_notag[4] + hex_notag[5];

    r = hexToDec(r);
    g = hexToDec(g);
    b = hexToDec(b);

    rgb = [r, g, b];

    return rgb;
}

/*
 * Creates the actual monocolor palette based on original hex number.
 * Checks to make sure the rgb value is converted to a hex pair as well.
 * Ensures the first value is the same and only generates 3 similar values.
 * Returns the array of similar values. These values increase in darkness through the array.
 */
function makeMonoPalette(RGB_value) {
    let r = RGB_value[0];
    let g = RGB_value[1];
    let b = RGB_value[2];
    let hexPair_1 = '';
    let hexPair_2 = '';
    let hexPair_3 = '';
    let hexValue = '';
    let hexArray = [];

    for (let i = 0; i < 4; i++) {
        if (i < 1) {
            hexPair_1 = r.toString(16);
            hexPair_1 = checkLess16(hexPair_1);
            hexPair_2 = g.toString(16);
            hexPair_2 = checkLess16(hexPair_2);
            hexPair_3 = b.toString(16);
            hexPair_3 = checkLess16(hexPair_3);
            hexValue = hexPair_1 + hexPair_2 + hexPair_3;
            hexArray[0] = hexValue;
        }
        else {
            randNum = getRand();
            console.log(randNum); 

            r = Math.floor(r * randNum);
            g = Math.floor(g * randNum);
            b = Math.floor(b * randNum);

            hexPair_1 = r.toString(16);
            hexPair_1 = checkLess16(hexPair_1);
            hexPair_2 = g.toString(16);
            hexPair_2 = checkLess16(hexPair_2);
            hexPair_3 = b.toString(16);
            hexPair_3 = checkLess16(hexPair_3);

            hexValue = hexPair_1 + hexPair_2 + hexPair_3;
            
            hexArray.push(hexValue);
        }
    }

    return hexArray;
}

/*
 * Changes the hex pair to decimal using parseInt method.
 */
function hexToDec(hexPair) {
    let decNum = parseInt(hexPair, 16);

    return decNum;
}


/*
 *  Ensures that the hex pair is actualy a pair.
 * checks the length of the string and adds a 0 to the string if 
 *      length = 1.
 */
function checkLess16(hexPair) {
    if (hexPair.length != 2) {
        hexPair = '0' + hexPair;
        return hexPair;
    }

    else {
        return hexPair;
    }
}

/* 
 * Locks random number in range .5 and .9 to allow generated value to not be too light or too dark.
 */
function getRand() {
    let num = (Math.random()).toFixed(2);
    while (num < .5 || num > .9) {
        num = (Math.random()).toFixed(2);
    }
    return num;
}
