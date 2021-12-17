# local-yarn
process yarn.lock

## 以下是技术经理的工作
## Zip
on your unix machine, under nodejs project home, run
```bash
./gen-yarn-zip <name>
```

## Setup
```bash
yarn global add https://github.com/qiuzhanghua/local-yarn.git#0.6.6
```

## 以下是所有开发者的工作
## Install Zip(一次性)
```bash
local-yarn install <name>.yarn.lock.zip
```

## 设置本地Yarn仓库(TDP应该设置好了)
```bash
yarn config set yarn-offline-mirror ~/tdp/yarn_repository/
```

## update local yarn.lock
```bash
local-yarn get meta
```

## yarn install
```bash
yarn install --offline
```

## 其他开发工作
...