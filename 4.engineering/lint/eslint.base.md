
> When a file was linted, ESLint would first look in the same directory as that file for a .eslintrc file and then continue up the directory hierarchy until reaching the root, merging configurations from all the .eslintrc files found along the way. This system, which we called the configuration cascade, allowed you to easily override rules for particular directories, something that JSHint wasn’t capable of doing. You could also add more configuration in the eslintConfig key inside of package.json.


eslint 会从当前被lint的文件所在的文件夹开始，寻找config文件；
直到项目的根目录
找到所有的lint文件之后，做规则合并，

越靠近lint目标的config文件内的规则优先级越高；会相互覆盖

最终使用合并后的规则，格式化文件


# flat config

> When the ESLint CLI is used, it searches for eslint.config.js from the current working directory and if not found will continue the search up the directory’s ancestors until the file is found or the root directory is hit. That one eslint.config.js file contains all of the configuration information for that run of ESLint so it dramatically reduces the disk access required as compared to eslintrc, which had to check each directory from the linted file location up to the root for any additional config files

flat config 配置系统中
eslint会寻找目标文件最近的eslint config文件，并到此为止
该文件中是本次lint行为所使用的所有规则，不会再向上寻找并做规则合并

在lint文件所在的文件夹下，没有配置文件时，自动向上寻找的行为还是跟以前一样，直到root文件夹
不同的是，一旦找到不再继续向上寻找所有配置，并合并。

