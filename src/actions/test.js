

const obj1 = {
    'name':'am',
    'email':'amadh@gmail.com',
    'id':1
}
const obj2 = {
    'name':'aar',
    'email':'amar2dh@gmail.com',
    'id':2
}
const obj3 = {
    'name':'am',
    'email':'amar25h@gmail.com',
    'id':3
}
const obj4 = {
    'name':'aar',
    'email':'amar25@gmail.com',
    'id':4
}
const obj5 = {
    'name':'am',
    'email':'amar25nadhl.com',
    'id':5
}

const data = {}
data[1] = obj1;
data[2] = obj2;
data[3] = obj3;
data[4] = obj4;
data[5] = obj5;

console.log(data)
delete data[3]
console.log(data)
