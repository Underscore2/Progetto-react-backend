module.exports={
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'rootMysql84@',
    DB:'progettoreact',
    dialect:'mysql',
    pool:{
        max:3,
        min:0,
        acquire:30000,
        idle:10000
    }
}
