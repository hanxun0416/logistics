import Mock from 'mockjs'
const Random = Mock.Random

//待报价
const unoffer = function () {
    let array = ['萨达萨达是', '发给对方']
    let newsList = []
    for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            from: Random.city(true),
            to: Random.city(true),
            fromDate: Random.date(),
            toDate: Random.date(),
            goods: array,
            count: Random.natural(0, 30),
            weight: Random.natural(0, 30),
            price: ''
        }
        newsList.push(newNewsObject)
    }

    return newsList
}

//已报价
const offered = function () {
    let array = ['萨达萨达是', '发给对方']
    let newsList = []
    for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            from: Random.city(true),
            to: Random.city(true),
            fromDate: Random.date(),
            toDate: Random.date(),
            goods: array,
            count: Random.natural(0, 30),
            weight: Random.natural(0, 30),
            price: Random.natural(500, 5000)
        }
        newsList.push(newNewsObject)
    }

    return newsList
}
//全部订单
const allOrder = function () {
    let array = ['萨达萨达是', '发给对方']
    let newsList = []
    for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            orderNum: Random.natural(1000, 5000),
            orderDate: Random.date('yyyy-MM-dd HH:mm'),
            type: Random.natural(1, 4),
            from: Random.city(true),
            to: Random.city(true),
            goods: array,
            size: Random.natural(500, 5000),
            count: Random.natural(0, 30),
            weight: Random.natural(0, 30),
        }
        newsList.push(newNewsObject)
    }

    return newsList
}
//订单1
const order1 = function () {
    let array = ['萨达萨达是', '发给对方']
    let newsList = []
    for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            orderNum: Random.natural(1000, 5000),
            orderDate: Random.date('yyyy-MM-dd HH:mm'),
            type: 1,
            from: Random.city(true),
            to: Random.city(true),
            goods: array,
            size: Random.natural(500, 5000),
            count: Random.natural(0, 30),
            weight: Random.natural(0, 30),
        }
        newsList.push(newNewsObject)
    }

    return newsList
}
//订单2
const order2 = function () {
    let array = ['萨达萨达是', '发给对方']
    let newsList = []
    for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            orderNum: Random.natural(1000, 5000),
            orderDate: Random.date('yyyy-MM-dd HH:mm'),
            type: 2,
            from: Random.city(true),
            to: Random.city(true),
            goods: array,
            size: Random.natural(500, 5000),
            count: Random.natural(0, 30),
            weight: Random.natural(0, 30),
        }
        newsList.push(newNewsObject)
    }

    return newsList
}
//订单3
const order3 = function () {
    let array = ['萨达萨达是', '发给对方']
    let newsList = []
    for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            orderNum: Random.natural(1000, 5000),
            orderDate: Random.date('yyyy-MM-dd HH:mm'),
            type: 3,
            from: Random.city(true),
            to: Random.city(true),
            goods: array,
            size: Random.natural(500, 5000),
            count: Random.natural(0, 30),
            weight: Random.natural(0, 30),
        }
        newsList.push(newNewsObject)
    }

    return newsList
}
//order4
const order4 = function () {
    let array = ['萨达萨达是', '发给对方']
    let newsList = []
    for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            orderNum: Random.natural(1000, 5000),
            orderDate: Random.date('yyyy-MM-dd HH:mm'),
            type: 4,
            from: Random.city(true),
            to: Random.city(true),
            goods: array,
            size: Random.natural(500, 5000),
            count: Random.natural(0, 30),
            weight: Random.natural(0, 30),
        }
        newsList.push(newNewsObject)
    }

    return newsList
}
const unSetlle = function () {
    let newsList = []
    for (let i = 0; i < 5; i++) {
        let newNewsObject = {
            orderNum: Random.natural(1000, 5000),
            orderDate: Random.date('yyyy-MM-dd HH:mm'),
            from: Random.city(true),
            to: Random.city(true),
            price: Random.natural(500, 5000),
            courierNumber: Random.natural(65464654, 955555550),
        }
        newsList.push(newNewsObject)
    }

    return newsList
}

const sendCar = function () {
    let newsList = []
    for (let i = 0; i < 12; i++) {
        let newNewsObject = {
            carId: Random.natural(65464654, 955555550),
            name: Random.cname(),
            mobile: Random.natural(13222222222, 18555522222),
        }
        newsList.push(newNewsObject)
    }

    return newsList
}

//未实名入驻
const sendCar = function () {
    let newsList = []
    for (let i = 0; i < 12; i++) {
        let newNewsObject = {
            carId: Random.natural(65464654, 955555550),
            name: Random.cname(),
            mobile: Random.natural(13222222222, 18555522222),
        }
        newsList.push(newNewsObject)
    }

    return newsList
}

Mock.mock('/offer/unoffer', unoffer)
Mock.mock('/offer/offered', offered)
Mock.mock('/order/allOrder', allOrder)
Mock.mock('/order/order1', order1)
Mock.mock('/order/order2', order2)
Mock.mock('/order/order3', order3)
Mock.mock('/order/order4', order4)
Mock.mock('/settle/unSetlle', unSetlle)
Mock.mock('/order/sendCar', sendCar)