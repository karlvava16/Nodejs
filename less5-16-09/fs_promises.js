const simple = (val) => {
    return new Promise((reject, resolve) => {
        if (val > 0) {
            resolve('val>0');
        } else {
            reject('val<=0');
        }
    });
};

simple(100)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
