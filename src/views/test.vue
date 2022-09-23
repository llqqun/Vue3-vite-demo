<template>
    <div></div>
</template>

<script setup>
Function.prototype.softBind = function (obj, ...rest) {
    const fn = this;
    const bound = function (...args) {
        console.log('this:=>', this);
        console.log(obj);
        const o = !this || this === (window || global) ? obj : this;
        return fn.apply(o, [...rest, ...args]);
    };

    bound.prototype = Object.create(fn.prototype);
    return bound;
};
const foo = function () {
    console.log(this);
};
let obj = { name: 'obj' };
let obj2 = { name: 'obj2' };
let obj3 = { name: 'obj3' };
let fooBJ = foo.softBind(obj);
fooBJ();
const cs = (params) => {
    console.log(this);
    return function (params) {
        console.log(this);
    };
};
const csfn = cs();
csfn();
</script>

<style scoped lang="less"></style>
