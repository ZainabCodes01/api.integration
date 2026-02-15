//Callback Function
function filterEven(number, callback) {
    setTimeout(() => {
        if (number % 2 == 0) {
            console.log("it is even number", number);
        }
        else {
            console.log("it is odd number", number);
        }
    }, 2000);
}

filterEven(5, (result) => {
    console.log("The result is: ", result);
});
filterEven(8, (result) => {
    console.log("The result is: ", result);
});



// Nested Callback Function (Callback Hell)
function registerUser(name, callback) {
    console.log("fetch user data...");
    setTimeout(() => {
        console.log("User data fetched successfully");
        callback();
    }, 2000);
};

function fetchUserData(callback) {
    console.log("fetch user data...");
    setTimeout(() => {
        console.log("User data fetched successfully");
        callback();
    }, 2000);
};

function heyerror(callback) {
    console.log("Error occurred");
    setTimeout(() => {
        callback();
    }, 2000);
};

function hey() {
    console.log("Hey successfully done");
};

registerUser("Zainab", function () {
    fetchUserData(function () {
        heyerror(function () {
            hey();
        });
    });
});



// Promise Function / Promise Chaining

function register() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("User registered successfully:");
            resolve("done");
        }, 2000);
    });
}

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("User registered successfully:");
            resolve("done");
        }, 2000);
    });
}

register()
    .then((res) => {
        return fetchData();
    })
    .then((res) => {
        console.log(res);
    })

// console.log("Start");
// register() .then((res) => {
// console.log("Registration Result:", res);
// fetchData().then((res) => {
//     console.log("Fetch User Data Result:", res);});
// });


// Async/Await Function

function getData(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("User registered successfully:");
            resolve("done");
        }, 2000);
    });
}

async function data() {
    await getData("hey");
    await getData("hello");
    await getData("hi");
    console.log("All data fetched successfully");
}


   //Use of Array Methods

// let marks = [85,97,44,37,76,60]; 
//  let sum =0;
//   for(let i=0; i<marks.length; i++){
//     sum += marks[i];
//   } 
//   let avg = sum / marks.length;

// let items = [250, 645, 300, 900, 50];
// for(let i=0; i < items.length; i++){
//     let offer = items[i] / 10;
//     items[i] -= offer;
// }
// console.log(items);
 
// let companies = ["Google" , "Facebook", "Amazon", "Microsoft"];
// console.log(companies.push( "uber"));
// console.log(companies);