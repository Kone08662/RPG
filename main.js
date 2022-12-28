//express
let express = require('express');//載入express模組
let app = express();


//port
const port = process.env.PORT || 3000;


//cors
const cors = require("cors");//處理跨域
app.use(cors());


//static
app.use(express.static('public'));//在express 提供靜態檔案服務


//body-parser
let bodyParser = require('body-parser')//載入body-parser模組 => 將輸入到body的請求（request）解析出來
app.use(bodyParser.json()); //將request進來的data 轉成 json()
app.use(bodyParser.urlencoded({ extended: true })); //處理類型為前端的表單(form) 默認送出的數據類型


//EJS
let engine = require('ejs-locals');//載入ejs-locals模組
app.engine('ejs', engine);
app.set('views', './views') //讀取 EJS 檔案位置
app.set('view engine', 'ejs');//告訴 Express 要用哪一個引擎去 Run


//session
const session = require('express-session');
app.use(session({
  secret: 'apwjdpiajwidjs',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 1000 * 100 } //100分鐘到期
}));


//mySQL
let sql = require('mssql');//載入mssql模組
let config = { //資料庫設定
  sever: 'xxxxxxxx.net',
  user: 'xxxxx',
  password: 'xxxx',
  database: 'xxxxxxx'
  /*
  trustServerCertificate: true,
  cryptoCredentialsDetails: {
    minVersion: 'TLSv1'
  }//node --tls-min-v1.0 .\main.js => 疑似SQL版本與NODE相差過大
  */
};
const sqlConn = new sql.ConnectionPool(config);


//監聽 port 
app.listen(port, () => {
  console.log(`開始 on port ${port}!`);
});



//準備開始(首頁)
app.get('/', function (req, res) {

  console.log('-----準備開始RPG!-----');

  res.render('prepare', {   //導入prepare.ejs

    'title': '準備開始大冒險!',//標題
    'narrative': '',//敘述
    'imgSrc': 'start.gif',//圖片檔案名稱
    'buttonValue': '開始大冒險!'//按鈕名稱

  })

})



//選擇職業
app.get('/jobChoice', function (req, res) {

  console.log('-----進入選擇職業-----');

  sqlConn.connect().then(() => {//連接SQL

    let sqlQuery = 'SELECT TOP 2 * FROM job ORDER BY NEWID();';//選2個職業
    let sqlRequest = new sql.Request(sqlConn);

    sqlRequest.query(sqlQuery).then((result) => {//查詢資料庫

      res.render('jobChoice', {   //導入jobChoice.ejs

        'title': '選擇職業!',//標題
        'narrative': '請幫助阿偉選擇職業',//敘述
        'job': [result.recordset[0].profession, result.recordset[1].profession],//職業
        'imgPath': [result.recordset[0].id, result.recordset[1].id]//職業圖片檔案名稱

      })

      sqlConn.close();

    }).catch((error) => { //sql 查詢錯誤訊息

      console.log('sql 查詢錯誤 (/jobChoice)');
      console.log(error);
      sqlConn.close();

    })

  }).catch((error) => { //sql 連接錯誤訊息

    console.log('sql 連接錯誤 (/jobChoice)');
    console.log(error);
    sqlConn.close();

  })

})



//進入迷宮
app.post('/challenge', function (req, res) {

  console.log('-----進入迷宮-----');

  let jobID = Object.entries(req.body)[0][0].replace(".x", "");//剛選的職業ID

  sqlConn.connect().then(() => {  //連接SQL

    let sqlQuery = `SELECT TOP 1 * FROM mapAdjectives,maps ORDER BY NEWID(); SELECT * FROM job where id=${jobID};`;//查詢迷宮+職業相關
    let sqlRequest = new sql.Request(sqlConn);

    sqlRequest.query(sqlQuery).then((result) => {//查詢資料庫

      //session設定-職業相關
      req.session.jobId = jobID;//職業ID
      req.session.profession = result.recordsets[1][0].profession;//職業名稱
      req.session.hp = result.recordsets[1][0].hp;//職業血量
      req.session.attack = result.recordsets[1][0].attack;//職業攻擊力

      //session設定-狀態相關
      req.session.time = 0;//遭遇次數

      //session設定-迷宮相關
      req.session.mazeName = result.recordset[0].mapAdjective + result.recordset[0].map;//迷宮名稱

      console.log(
        `職業ID : ${req.session.jobId}  職業名稱 : ${req.session.profession}  職業血量 : ${req.session.hp}  職業攻擊力 : ${req.session.attack}  遭遇次數 : ${req.session.time}`
      );

      //隨機選擇 monster or chance(action路徑)
      actionPath = () => {
        let actionPathArr = ['monster', 'chance'];
        let result = `/challenge/${actionPathArr[Math.floor(Math.random() * 2)]}`;
        return result;
      };

      res.render('challenge', {   //導入challenge.ejs

        'title': '進入迷宮!',//標題
        'narrative': `進入了 "${result.recordset[0].mapAdjective}${result.recordset[0].map}" 阿偉覺得這裡陰森又恐怖,接下來該怎麼做?`,//敘述
        'imgSrc': 'challenge.jpg',//圖片檔案名稱
        'actionPath': actionPath(),//隨機選擇路徑
        'buttonValue': ['左轉', '直走', '右轉']//按鈕名稱

      })

      sqlConn.close();

    }).catch((error) => { //sql 查詢錯誤訊息

      console.log('sql 查詢錯誤 (/challenge)');
      console.log(error);
      sqlConn.close();

    })

  }).catch((error) => { //sql 連接錯誤訊息

    console.log('sql 連接錯誤 (/challenge)');
    console.log(error);
    sqlConn.close();

  })

})



//遭遇怪物
app.get('/challenge/monster', function (req, res) {

  console.log('-----遭遇怪物-----');

  req.session.time++//遭遇次數+1

  if (req.session.time >= 5) {//遭遇5次事件 通關!

    console.log('-----成功通關-----');

    res.render('gameEnd', {   //導入gameEnd.ejs

      'title': 'GAME PASS!',//標題
      'narrative': `小偉依靠你的幫助成功走出了 "${req.session.mazeName}"!`,//敘述
      'imgSrc': 'gamePass.jpg',//圖片檔案名稱
      'buttonValue': '再來一次!'//按鈕名稱

    })

  } else {

    sqlConn.connect().then(() => {//連接SQL

      let sqlQuery = 'SELECT TOP 1 * FROM monster ORDER BY NEWID();';//選1個怪物
      let sqlRequest = new sql.Request(sqlConn);

      sqlRequest.query(sqlQuery).then((result) => {//查詢資料庫

        //session設定-怪物相關
        req.session.monsterName = result.recordset[0].name;//怪物名稱
        req.session.monsterHp = result.recordset[0].hp;//怪物血量
        req.session.monsterAttack = result.recordset[0].attack;//怪物攻擊力

        console.log(
          `怪物名稱 : ${req.session.monsterName}  怪物血量 : ${req.session.monsterHp}  怪物攻擊力 : ${req.session.monsterAttack}  遭遇次數 : ${req.session.time}`
        );

        res.render('monster', {   //導入monster.ejs

          'title': '遭遇怪物!',//標題
          'narrative': `阿偉遇到了 "${result.recordset[0].name}" ,接下來該怎麼做?`,//敘述
          'imgSrc': `/monster/${result.recordset[0].id}.jpg`,//怪物圖片檔案名稱
          'monsterName': result.recordset[0].name,//怪物名稱
          'actionPath': actionPath(),//隨機選擇路徑
          'buttonValue': ['攻擊', '逃走']//按鈕名稱

        })

        sqlConn.close();

      }).catch((error) => { //sql 查詢錯誤訊息

        console.log('sql 查詢錯誤 (/jobChoice)');
        console.log(error);
        sqlConn.close();

      })

    }).catch((error) => { //sql 連接錯誤訊息

      console.log('sql 連接錯誤 (/jobChoice)');
      console.log(error);
      sqlConn.close();

    })

  }

})



//怪物對決
app.get('/challenge/monsterDuel', function (req, res) {

  console.log('-----進入對決-----');

  let { hp, attack, monsterHp, monsterAttack, monsterName } = req.session;//取session
  let duelTimes = 0;//對決次數

  while (monsterHp > 0 && hp > 0) {//對拚

    duelTimes++//對決次數++
    monsterHp -= attack;//怪物血量 - 職業攻擊力
    req.session.hp = hp -= monsterAttack;//職業血量 - 怪物攻擊力 (結束後存回session

    console.log(`怪物血量 : ${monsterHp} 職業血量 : ${hp} 次數 : ${duelTimes}`)

  }

  console.log(`職業剩餘血量 : ${hp}`)

  if (hp <= 0) {//gmae over

    console.log('-----GAME OVER-----');

    res.render('gameEnd', {   //導入gameEnd.ejs

      'title': 'GAME OVER',//標題
      'narrative': `小偉被 "${monsterName}" 擊敗!`,//敘述
      'imgSrc': 'gameOver.jpg',//圖片檔案名稱
      'buttonValue': '重新開始'//按鈕名稱

    })

  } else if (hp > 0) {//win

    console.log('-----打敗怪物-----');

    res.render('challenge', {   //導入challenge.ejs

      'title': '獲勝!',//標題
      'narrative': `阿偉擊敗了 "${monsterName}" ,接下來該往哪走?`,//敘述
      'imgSrc': 'win.jpg',//圖片檔案名稱
      'actionPath': actionPath(),//隨機選擇路徑
      'buttonValue': ['左轉', '直走', '右轉']//按鈕名稱

    })

  } else {//不符合上面2種

    console.log('error');
    res.end('error');

  }

})




app.get('/challenge/chance', function (req, res) {

  console.log('-----得到機會-----');

  req.session.time++//遭遇次數+1

  sqlConn.connect().then(() => {//連接SQL

    let sqlQuery = 'SELECT TOP 1 * FROM chance ORDER BY NEWID();';//選1個增益效果
    let sqlRequest = new sql.Request(sqlConn);

    sqlRequest.query(sqlQuery).then((result) => {//查詢資料庫

      let { jobId, profession, hp, attack, time } = req.session;//取session
      req.session.hp = hp += result.recordset[0].increasehp//增加血量
      req.session.attack = attack += result.recordset[0].increaseattack//增加攻擊力

      console.log(
        `職業ID : ${jobId}  職業名稱 : ${profession}  職業血量 : ${hp}  職業攻擊力 : ${attack}  遭遇次數 : ${time}`
      );

      res.render('challenge', {   //導入challenge.ejs

        'title': '獲得祝福!',//標題
        'narrative': `阿偉獲得了祝福,血量跟攻擊力上升了! 接下來該往哪走?`,//敘述
        'imgSrc': 'bless.jpg',//圖片檔案名稱
        'actionPath': actionPath(),//隨機選擇路徑
        'buttonValue': ['左轉', '直走', '右轉']//按鈕名稱

      })

      sqlConn.close();

    }).catch((error) => { //sql 查詢錯誤訊息

      console.log('sql 查詢錯誤 (/chance)');
      console.log(error);
      sqlConn.close();

    })

  }).catch((error) => { //sql 連接錯誤訊息

    console.log('sql 連接錯誤 (/chance)');
    console.log(error);
    sqlConn.close();

  })

})







