import ящерка from './ящерка.png'
export const bookDatas=
[
  {
    id:1,
    title:"Book1",
    description:"description time--------------------------------------------------------------------------------------------",
    isbn:123421,
    img:ящерка,
    authorid:2,
    categoryid:4,
  },
  {
    id:2,
    title:"Book2",
    description:"description time--------------------------------------------------------------------------------------------",
    isbn:1234213443,
    img:ящерка,
    authorid:1,
    categoryid:3,
  },
  {
    id:3,
    title:"Book3",
    description:"description time--------------------------------------------------------------------------------------------",
    isbn:1233239,
    img:ящерка,
    authorid:3,
    categoryid:1,
  },
  {
    id:4,
    title:"Book4",
    description:"description time--------------------------------------------------------------------------------------------",
    isbn:1223211,
    img:ящерка,
    authorid:1,
    categoryid:2,
  },
]

export const authorDatas=
[
  {
    id:1,
    firstName:"Григорий",
    lastName:"Ефремов",
    birthDate:Date.parse("27.10.2002"),
    country:"Belarus"
  },
  {
    id:2,
    firstName:"Милана",
    lastName:"Терешко",
    birthDate:Date.parse("27.10.2007"),
    country:"Belarus"
  },
  {
    id:3,
    firstName:"Глухарь",
    lastName:"Лозицкий",
    birthDate:Date.parse("27.10.2007"),
    country:"Belarus"
  },
]

export const categoryDatas=
[
  {
    id:1,
    jenre:"Детектив"
  },
  {
    id:2,
    jenre:"Комедия"
  },
  {
    id:3,
    jenre:"Боевик"
  },
  {
    id:4,
    jenre:"Фентези"
  },
]

export const bookLoansDatas=
[
  {
    id:1,
    takenTime:Date.now(),
    returnTime:Date.parse("27.10.2024"),
    userid:1,
    bookid:2,
  },
  {
    id:2,
    takenTime:Date.now(),
    returnTime:Date.parse("27.10.2024"),
    userid:1,
    bookid:3,
  },
]

export const userDatas=
[
  {
    id:1,
    login:'user1',
    password:1111,
    email:"homenco.a6@gmail.com"
  },
  {
    id:2,
    login:'user2',
    password:12345,
    email:"homenco.a6@gmail.com"
  },
]

