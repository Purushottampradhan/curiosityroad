const { __values } = require("tslib");

let myPromise = new Promise((myResolve, myReject)=> {
  let x = 0;

// The producing code (this may take some time)

  if (x == 0) {
    myResolve("OK");
  } else {
    myReject("Error");
  }
});
myPromise.then(
  value=>{console.log(value)},
  error=>{console.log(error)}
)
 function f() {

  return  new Promise((resolve, reject) => {
    // resolve("done!");
    reject('not done')
  });

  let result =  promise; // wait until the promise resolves (*)
return result
  console.log(result)
}

async function aaaaA(){
  try {
    let data= await f()   
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
aaaaA()

