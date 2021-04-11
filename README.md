# README

本项目完成于 Node.js 的学习阶段，尚存在许多不足

## 一、简介

- 相关依赖请自行 `npm install`
- 本仓库中不包含数据库相关文件，下载参考需自行建立数据库表格和环境配置相关文件
- 本仓库中的 **.env** 文件需要进行一定的修改才可以使用
- 测试接口使用：Postman
## 二、接口说明

### 1.用户请求接口
#### 1)用户注册接口

- 作用：注册用户，并添加到数据库
- 请求：POST
- 接口：/users
- 表头：`Content-Type: application/json`
- 参数：
  |参数名|类型|说明|
  |:---:|:---:|:----|
  |id|int|唯一标识，自动递增|
  |name|varchar|用户名(用户传入)|
  |password|varchar|密码(用户传入)|
  |createAt|timestamp|添加数据时自动设置|
  |updateAt|timestamp|更新数据时自动设置|

- 输入示例：

```
  {
    "name": "xxx",
    "password": "12345678"
  }
```

- 输出示例：

```
  {
      "fieldCount": 0,
      "affectedRows": 1,
      "insertId": 1,
      "info": "",
      "serverStatus": 2,
      "warningStatus": 0
  }
```

#### 2)用户登录接口

- 作用：用户登录，添加 token
- 请求：POST
- 接口：/users/login
- 表头：`Content-Type: application/json`
- 参数：
  |参数名|类型|说明|
  |:---:|:---:|:----|
  |name|string|用户名|
  |password|string|密码|

- 输入示例：

```
  {
    "name": "xxx",
    "password": "12345678"
  }
```

- 输出示例：

```
  {
    "id": 1,
    "name": "xxx",
    "token": "token内容字符串"
  }
```

### 2.用户动态接口
#### 1)发布动态接口

- 作用：发表动态，将动态存储到数据库中
- 请求：POST
- 接口：/moment
- 表头：`Content-Type: application/json`
- 参数：
  |参数名|类型|说明|
  |:---:|:---:|:----|
  |id|int|唯一标识，自动递增|
  |content|varchar|动态内容(用户传入)|
  |user_id|int|发表该动态的用户 id|
  |createAt|timestamp|添加数据时自动设置|
  |updateAt|timestamp|更新数据时自动设置|

- 输入示例：

```
  {
    "content": "这是一段内容"
  }
```

- 输出示例：

```
  {
      "fieldCount": 0,
      "affectedRows": 1,
      "insertId": 1,
      "info": "",
      "serverStatus": 2,
      "warningStatus": 0
  }
```

#### 2)获取单个动态接口

- 作用：获取单个动态信息及其发表者相关信息
- 请求：GET
- 接口：/moment/:momentId
- 输出示例：

```
  {
    "id": momentId,
    "content": "这是一段内容",
    "createTime": "2021-03-18T05:42:48.000Z",
    "updateTime": "2021-03-18T05:42:48.000Z",
    "user": {
        "id": userId,
        "name": "username",
        "avatarUrl": "user avatar link"
    },
    "labels": null,
    "comments": null,
    "images": null
  }
```

#### 3)获取动态列表接口

- 作用：获取动态列表
- 请求：GET
- 接口：/moment?offset=偏移量&size=获取数量
- 输出示例：
  以 /moment?offset=0&size=3

```
  [
    {
        "id": 1,
        "content": "内容1",
        "createTime": "2021-03-15T01:00:41.000Z",
        "updateTime": "2021-03-15T05:38:41.000Z",
        "user": {
            "id": userId,
            "name": "username",
        },
        "commentCount": 评论数量,
        "labelCount": 标签数量,
        "images": [
            "动态图片链接"
        ]
    },
    {
        "id": 2,
        "content": "内容2",
        "createTime": "2021-03-15T01:50:12.000Z",
        "updateTime": "2021-03-15T01:50:12.000Z",
        "user": {
            "id": userId,
            "name": "username",
        },
        "commentCount": 0,
        "labelCount": 0,
        "images": null
    },
    {
        "id": 3,
        "content": "内容3",
        "createTime": "2021-03-15T01:50:12.000Z",
        "updateTime": "2021-03-15T01:50:12.000Z",
        "user": {
            "id": userId,
            "name": "username",
        },
        "commentCount": 0,
        "labelCount": 0,
        "images": null
    }
]
```

#### 4)修改动态接口

- 作用：修改动态，并将新动态的内容更新到数据库中
- 请求：PATCH
- 接口：/moment/:momentId
- 表头：`Content-Type: application/json`

- 输入示例：

```
  {
    "content": "这是修改后的内容"
  }
```

- 输出示例：

```
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 1
  }
```

#### 5)删除动态接口

- 作用：删除动态，将动态从数据库中移除
- 请求：DELETE
- 接口：/moment/:momentId

- 输出示例：

```
  {}
```

#### 6)动态标签添加接口

- 作用：为动态添加标签并记录到数据库中
- 请求：POST
- 接口：/moment/:momentId/labels
- 表头：`Content-Type: application/json`
- 输入示例：

```
  {
    "labels":["xx","xx"]
  }
```

- 输出示例：

```
  给动态添加标签成功
```

### 3.用户评论接口
#### 1)发表评论接口

- 作用：对某一动态发表评论
- 请求：POST
- 接口：/comment
- 表头：`Content-Type: application/json`
- 参数：
  |参数名|类型|说明|
  |:---:|:---:|:----|
  |id|int|唯一标识，自动递增|
  |content|varchar|评论内容(用户传入)|
  |momoent_id|int|评论的动态 ID(用户传入)|
  |user_id|int|发表评论的用户 id|
  |comment_id|int|评论的评论 ID(用户传入)|
  |createAt|timestamp|添加数据时自动设置|
  |updateAt|timestamp|更新数据时自动设置|

- 输入示例：

```
  {
    "momentId": 1,
    "content": "评论内容"
  }
```

- 输出示例：

```
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 6,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
  }
```
#### 2)回复评论接口

- 作用：对某一评论进行回复
- 请求：POST
- 接口：/comment/:commentId/reply
- 表头：`Content-Type: application/json`

- 输入示例：

```
  {
      "momentId":1,
      "content":"回复内容"
  }
```

- 输出示例：

```
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 6,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
  }
```
#### 3)修改评论接口

- 作用：对某一评论进行修改
- 请求：PATCH
- 接口：/comment/:commentId

- 输入示例：

```
  {
      "content":"要修改的内容"
  }
```

- 输出示例：

```
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 0  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
```
#### 4)删除评论接口

- 作用：删除动态，将动态从数据库中移除
- 请求：DELETE
- 接口：/comment/:commentId

- 输出示例：

```
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
  }
```
#### 5)获取评论接口
- 作用：获取某条动态的评论
- 请求：GET
- 接口：/comment?momentId=x
- 输出示例：
  以 /comment?momentId=1
```
  [
    {
      "id": 4,
      "content": "前端学习最重要的是HTML+CSS+JavaScript",
      "commentId": null,
      "createTime": "2021-03-15T12:50:27.000Z",
      "user": {
          "id": 4,
          "name": "ddf"
      }
    },
    {
      "id": 5,
      "content": "框架亦是如此",
      "commentId": null,
      "createTime": "2021-03-15T13:03:18.000Z",
      "user": {
          "id": 4,
          "name": "ddf"
      }
    }
  ]
```
### 4.标签数据接口
#### 1)创建标签接口
- 作用：将标签记录到数据库中
- 请求：POST
- 接口：/label
- 表头：`Content-Type: application/json`
- 参数：
  |参数名|类型|说明|
  |:---:|:---:|:----|
  |id|int|唯一标识，自动递增|
  |name|varchar|动态内容|
  |createAt|timestamp|添加数据时自动设置|
  |updateAt|timestamp|更新数据时自动设置|
#### 2)获取标签接口
- 作用：获取某条动态的标签
- 请求：GET
- 接口：/label?limit=显示数量&offset=偏移量
- 输出示例：
  以 /label?limit=2&offset=1
```
  [
    {
      "id": 2,
      "name": "文学",
      "createAt": "2021-03-16T01:53:34.000Z",
      "updateAt": "2021-03-16T01:53:34.000Z"
    },
    {
      "id": 3,
      "name": "情感",
      "createAt": "2021-03-16T01:54:02.000Z",
      "updateAt": "2021-03-16T01:54:02.000Z"
    }
  ]
```
### 5.上传文件接口
#### 1)上传头像接口
- 作用：发表动态，将动态存储到数据库中
- 请求：POST
- 接口：/moment
- 表头：`Content-Type: multipart/form-data;`
- 参数：
  |参数名|类型|说明|
  |:---:|:---:|:----|
  |id|int|唯一标识，自动递增|
  |filename|varchar|文件名|
  |mimetype|varchar|文件类型|
  |size|int|图片大小|
  |user_id|int|用户id|
  |createAt|timestamp|添加数据时自动设置|
  |updateAt|timestamp|更新数据时自动设置|
- 输入：文件
#### 2)上传动态配图接口
- 作用：发表动态，将动态存储到数据库中
- 请求：POST
- 接口：/upload/picture?momentId=x
- 表头：`Content-Type: multipart/form-data;`
- 参数：
  |参数名|类型|说明|
  |:---:|:---:|:----|
  |id|int|唯一标识，自动递增|
  |filename|varchar|文件名|
  |mimetype|varchar|文件类型|
  |size|int|文件大小|
  |user_id|int|用户id|
  |moment_id|int|动态id|
  |createAt|timestamp|添加数据时自动设置|
  |updateAt|timestamp|更新数据时自动设置|
- 输入：文件
### 6.测试相关接口

- 作用：测试登录状态(token)
- 请求：GET
- 接口：/test

- 输出示例：

```
  授权成功~~
```
