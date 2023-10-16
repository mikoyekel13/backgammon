function copyArray(arr) {
    const arr1 = arr.map(item => item);
    return arr1;
}

const arr = [1,2,'a','b'];
const arr1 = copyArray(arr);
arr1.push('hello');
console.log(arr);
console.log(arr1);

/////////////

function copyObject(obj) {
    let keys = Object.keys(obj);
    let values = keys.map(item => obj[item]);
    const obj1 = {};
    for (let i in values) {
        obj1[keys[i]] = values[i];
    }
    return obj1;
}

const obj = {
    "hi": true,
    "hello": false
};
const obj1 = copyObject(obj);
obj1['not'] = 'maybe';
console.log(obj);
console.log(obj1);

///////////////

function compareArraysWithOrder(arr1, arr2) {
    if (arr1.length == arr2.length) {
        for (let i in arr1) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

function compareArraysWithoutOrder(arr1, arr2) {
    if (arr1.length == arr2.length) {
        for (let i in arr2) {
            if (!arr1.includes(arr2[i])) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

const arr2 = [1,2,3];
const arr3 = [1,2,3,4];
const arr4 = [1,2,3];
const arr5 = [1,3,2];
console.log(compareArraysWithOrder(arr2,arr3));
console.log(compareArraysWithOrder(arr2,arr4));
console.log(compareArraysWithOrder(arr2,arr5));
console.log(compareArraysWithoutOrder(arr2,arr3));
console.log(compareArraysWithoutOrder(arr2,arr4));
console.log(compareArraysWithoutOrder(arr2,arr5));

////////////////

function compareObjects(obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    const obj1Values = Object.values(obj1);
    const obj2Keys = Object.keys(obj2);
    const obj2Values = Object.values(obj2);
    if (!compareArraysWithoutOrder(obj1Keys, obj2Keys) || !compareArraysWithoutOrder(obj1Values, obj2Values)) {
        return false;
    }
    return true;
}
const obj2 = {
    1: 1,
    2: 2,
    3: 3
}
const obj3 = {
    1: 1,
    2: 2,
    3: 4
}
const obj4 = {
    1: 1,
    2: 2,
    3: 3
}
const obj5 = {
    1: 1,
    3: 3,
    2: 2
}
console.log(compareObjects(obj2, obj3));
console.log(compareObjects(obj2, obj4));
console.log(compareObjects(obj2, obj5));

///////////

function permitedUser(obj) {
    let checker = true;
    ['password', 'birthdate', 'username'].forEach(function(item) {
        if(!Object.keys(obj).includes(item)) {
            checker = false;
        }
    });
    return checker;
}

user1 = {
    birthdate: "Mark",
    password: "1234",
    username: "Mark1234"
}
user2 = {
    birthdate: "Mark",
    password: "1234",
    name: "Mark1234"
}

console.log(permitedUser(user1));
console.log(permitedUser(user2));

//////////

function simpleStringify(obj) {
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    let str = '{';
    for (let i = 0; i < keys.length - 1; i++) {
        str = str.concat(`"${keys[i]}":"${values[i]}",`);
    }
    str = str.concat(`"${keys[keys.length - 1]}":"${values[keys.length - 1]}"}`);
    return str;
}

function simpleParse(str) {
    let obj = {};
    let arr = str.slice(1, str.length - 1).split(",");
    for (let item of arr) {
        let arr2 = item.split(":");
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}

console.log(JSON.stringify(user1));
console.log(simpleStringify(user1));
console.log(simpleParse(JSON.stringify(user1)));
console.log(simpleParse(JSON.stringify(user2)));


const phoneRegex = /^\d{10}$|^\d{3}\-\d{3}\-\d{4}$|^\(\d{3}\) \d{3}\-\d{4}$/;
const phone1 = "0523465577"; //t
const phone2 = "053-306-6666"; //t
const phone3 = "(058) 627-5920"; //t
const phone4 = "05234655779"; //f
const phone5 = "052346557z7"; //f
const phone6 = "(052)3465577"; //f
const phone7 = "052-3465-577"; //f

console.log(phoneRegex.test(phone1));
console.log(phoneRegex.test(phone2));
console.log(phoneRegex.test(phone3));
console.log(phoneRegex.test(phone4));
console.log(phoneRegex.test(phone5));
console.log(phoneRegex.test(phone6));
console.log(phoneRegex.test(phone7));

const emailRegex = /^\w+@\w+\.(org|com|net)$/;
const email1 = "aaaaaaaaa@gmail.com";
const email2 = "aaaaaaaa3434a@walla.net";
const email3 = "b@b.org";
const email4 = "aaaaaaaaagmail.com";
const email5 = "aaaaaaaaa@gmail.co.il";
const email6 = "aaaaa?aaa@gmail.org";

console.log(emailRegex.test(email1)); //t
console.log(emailRegex.test(email2)); //t
console.log(emailRegex.test(email3)); //t
console.log(emailRegex.test(email4)); //f
console.log(emailRegex.test(email5)); //f
console.log(emailRegex.test(email6)); //f

const threeMultiplyRegex = /^.{12}(.{3})*$/;
const check1 = "123456789123"; 
const check2 = "123456789"; 
const check3 = "123456789123456";
const check4 = "123456789123abc3h4590opt"; 
const check5 = "123456789g"; 
const check6 = "123456789123??????"; 
const check7 = "12345678912345"

console.log(threeMultiplyRegex.test(check1)); //t
console.log(threeMultiplyRegex.test(check2)); //f
console.log(threeMultiplyRegex.test(check3)); //t
console.log(threeMultiplyRegex.test(check4)); //t
console.log(threeMultiplyRegex.test(check5)); //f
console.log(threeMultiplyRegex.test(check6)); //t
console.log(threeMultiplyRegex.test(check7)); //f

const pwREgex = /^(?=\w{8,})(?=\w*[A-Z])(?=\w*[a-z])(?=\w*\d)(?!\w*\W)/;
const pwCheck1 = "Aa123456";
const pwCheck2 = "12345678AAbb";
const pwCheck3 = "Aa12345";
const pwCheck4 = "Aa123456BBBBBBBBbb";
const pwCheck5 = "Aa123456-";
const pwCheck6 = "a1234567";
const pwCheck7 = "12B34c56";
const pwCheck8 = "AajiasdjisSDDsfKn";
const pwCheck9 = "adfdsfsfdaf89898";
const pwCheck10 = "Aa1-2345786";

console.log(pwREgex.test(pwCheck1)); //t
console.log(pwREgex.test(pwCheck2)); //t
console.log(pwREgex.test(pwCheck3)); //f
console.log(pwREgex.test(pwCheck4)); //t
console.log(pwREgex.test(pwCheck5)); //f
console.log(pwREgex.test(pwCheck6)); //f
console.log(pwREgex.test(pwCheck7)); //t
console.log(pwREgex.test(pwCheck8)); //f
console.log(pwREgex.test(pwCheck9)); //f
console.log(pwREgex.test(pwCheck10)); //f