/**
 * 抓取灾害天气预警级别信息
 * @author rexer
 * @date 2017-03-30
 * @version 0.0.1
 */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const request = require('request');
const Crawler = require('crawler');
const url = require('url');

const TARGET_HOST = 'http://www.tianqi.com';
const OUTPUT_PATH = path.join(__dirname, '../output');
const IMG_PATH = path.join(OUTPUT_PATH, 'images');
const JSON_FILE = path.join(OUTPUT_PATH, 'result.json');
const SQL_FILE = path.join(OUTPUT_PATH, 'insert.sql');

/**
 *
 * 获取地址
 * @param {String} url
 */
function grapUri(url) {
    // 地址队列
    let uris = [];
    let c = new Crawler({
        callback: function(error, res, done) {
            if (error) throw err;
            let $ = res.$;
            // parser
            let $target = $('.box_fh1 li.name a');
            $target.each((i, ele) => {
                let uri = TARGET_HOST + ele.attribs.href;
                uris.push(uri);
            });
            console.log(`获取地址完成，共计[${uris.length}]:\n${uris.join('\n')}`);
            // 爬取具体内容
            grap(uris);
        }
    });

    c.queue(url);
}

function grap(uris) {
    let count = 0,
        result = [],
        alertWiz = {}; //各个灾害天气的分级
    let c = new Crawler({
        maxConnections: 20,
        callback: function(error, res, done) {
            if (error) throw err;
            count++;

            console.log(`[${count}]开始>>>`);

            let $ = res.$,

                // parser
                $target = $('.tq_fhbox'),
                title = $target.find('.top h3').text(),
                alertType = title.substr(0, title.indexOf('预警信号')),
                $list = $target.find('.box');

            alertWiz[alertType] = [];

            $list.each((i, ele) => {
                let $this = $(ele),
                    imgUrl = TARGET_HOST + $this.find('.pic img').attr('src'),
                    subtitle = $this.find('h4').text(),
                    alertLevel = subtitle.substr(subtitle.length - 6, 2),
                    alertName = alertType + alertLevel,
                    text = $this.find('.f1').text().substr(3),
                    $guides = $this.find('p span'),
                    guides = [];

                $guides.each((i, ele) => {
                    guides.push($(ele).text());
                });

                // result
                let alert = {
                    alertType: alertType,
                    alertLevel: alertLevel,
                    text: text,
                    guide: guides.join('<br>')
                };
                result.push(alert);

                alertWiz[alertType].push(alertLevel);

                // 保存图片
                let extname = imgUrl.substr(imgUrl.lastIndexOf('.')) || '.jpg';
                getImg(imgUrl, alertName + extname);

                console.log(alertName);
            });

            console.log('<<<完成');

            done();

            if (count === uris.length) {
                // 保存结果
                write2local(JSON.stringify(result), JSON_FILE);
                toSQL(result);
                console.log(alertWiz);
            }
        }
    });

    c.queue(uris);
}

/**
 * 保存图片
 *
 * @param {any} url
 * @param {any} filename
 */
function getImg(url, filename) {
    request.head(url, (err, res, body) => {
        if (err) throw err;
        request(url).pipe(fs.createWriteStream(path.join(IMG_PATH, filename)));
    });
}

/**
 * 保存结果
 *
 * @param {any} json
 * @param {any} file
 */
function write2local(data, file) {
    fs.writeFile(file, data, 'utf8', (err) => {
        if (err) throw err;
        console.log('已保存: ' + file);
    });
}

/**
 * json 2 sql
 *
 * @param {any} json
 */
function toSQL(json) {
    let sqls = ['truncate t_alert_signal_const'];
    for (let i = 0; i < json.length; i++) {
        let item = json[i];
        let sql = `insert into t_alert_signal_const(signalType,signalLevel,text,guide) values('${item.alertType}','${item.alertLevel}','${item.text}','${item.guide}')`;
        sqls.push(sql);
    }
    // 保存
    write2local(sqls.join(';\n'), SQL_FILE);
}

// BEGIN

// 初始化路径
if (!fs.existsSync(IMG_PATH)) {
    mkdirp.sync(IMG_PATH);
}

grapUri(TARGET_HOST + '/yujingjibie');
