# Minecraft知识问答

一个基于Web的Minecraft知识问答应用，通过随机提问的方式帮助玩家测试和提升对Minecraft游戏的了解。

## 开发进度

- [x] 基础界面
- [x] 随机题目
- [ ] 难度选择
- [ ] 难度分类
- [ ] 计时器

## 功能特点

- 🎲 随机题目：每次点击"下一题"都会从题库中随机抽取一个问题
- ✅ 答题反馈：选择答案后会立即显示正确与否，并标出正确答案
- 📚 参考链接：答错时会显示相关参考链接，帮助玩家学习相关知识
- 🎨 流畅动画：包含滑入滑出动画和错误提示动画，提升用户体验
- 📱 响应式设计：适配各种屏幕尺寸的设备

## 如何使用

1. 克隆或下载此仓库到本地
2. 直接在浏览器中打开 `index.html` 文件
3. 点击选项选择答案
4. 点击"下一题"按钮继续答题

## 添加新题目

在 `data/data.json` 文件中添加新的题目，格式如下：

```json
{
    "题目ID": {
        "question": "问题描述",
        "questionid": 题目编号,
        "a": "选项A",
        "b": "选项B",
        "c": "选项C",
        "d": "选项D",
        "answer": "正确答案(a/b/c/d)",
        "from": "题目来源",
        "reference": "参考链接"
    }
}
```

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)

## 浏览器支持

- Chrome
- Firefox
- Safari
- Edge

## 许可证

除data/data.json文件外，本项目遵循[BSD-3-Clause-Clear](LICENSE)许可证。data/data.json文件遵循[CC BY 4.0](LICENSE.data)许可证。

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！
