/*
 * @Author: duxin
 * @Date: 2021-12-31 10:52:48
 * @Description: 指定文件路径生成gitbook summary.md文档
 */

/**
 * 0. 根据目录结构生成summary文件
 *      1. 有无限层级结构
 * 1. 排除指定的文件夹
 *      1. 默认排除的文件夹
 *      2. 手动指定的文件夹
 *      3. 特定格式的文件夹  比如.ns结尾的
*/

const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
class SummaryMaker {
    constructor(entry, options) {
        this.dirMap = {};
        this.init(entry, options);
    }
    formatDirConstruct(filePath) {
        // 根据file path 设置到合理的位置
        // 得到的是文件在项目根路径下的相对路径 ./1-level-dir/2-level-dir/.../file.xx
        const path = filePath;
        filePath = filePath.startsWith('./') ? filePath.substring(2) : filePath;
        const pathInfo = filePath.split('/');
        const [dir, ...args] = pathInfo;
        let title = dir;
        if (pathInfo.length > 1) {
            title = args[args.length - 1].split('.')[0];
        }
        // 输出来看 貌似是按照顺序的 暂时不需要处理顺序
        return `${Array((pathInfo.length - 1) * 4).fill('\xa0').join('')}* [${title}](${path})`
    }
    getAllFiles(pattern, conf) {
        return new Promise(resolve => {
            glob(
                pattern,
                conf,
                (err, files) => {
                    if (err) {
                        throw err;
                    }
                    resolve(files.map(this.formatDirConstruct));
                }
            );
        });
    }
    
    async init(entry, options) {
        const pattern = entry ||  './**/*';
        // TODO 合并用户自定义配置 和 默认的配置
        const conf = options || {
            nodir: false,
            ignore: ['./node_modules/**/*', './test/**/*', './package?(-lock).json', './scripts/**/*']
        };
        const allFiles = await this.getAllFiles(pattern, conf);
        fs.outputFile('./SUMMARY.md', allFiles.join('\r\n'))
            .then(res => {
                console.log('生成目录成功');
            })
            .catch(err => {
                console.log('生成目录失败', err);
            })
    }
}

const sm = new SummaryMaker();

