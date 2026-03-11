// Copyright (c) 2026 imoutopia
// SPDX-License-Identifier: BSD-3-Clause-Clear
// 保存当前问题ID
let currentQuestionId = null;
// 保存问题数据
let questions = {};

// 从data.json加载数据
fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        // 数据加载完成后加载第一个问题
        getRandomQuestion();
    })
    .catch(error => {
        console.error('Error loading questions:', error);
    });

function getRandomQuestion() {
    const container = document.querySelector(".container");

    // 如果不是第一次加载，先执行滑出动画
    if (currentQuestionId !== null) {
        // 防止重复点击
        if (container.classList.contains("slide-out") || container.classList.contains("slide-in")) {
            return;
        }

        container.classList.add("slide-out");

        // 等待滑出动画完成后加载新问题
        setTimeout(() => {
            loadNewQuestion();
            container.classList.remove("slide-out");
            // 强制重绘
            void container.offsetWidth;
            container.classList.add("slide-in");

            // 滑入动画完成后移除类
            setTimeout(() => {
                container.classList.remove("slide-in");
            }, 400);
        }, 400);
    } else {
        // 第一次加载直接显示
        loadNewQuestion();
    }
}

function loadNewQuestion() {
    // 获取所有问题的键
    const questionKeys = Object.keys(questions);
    // 随机选择一个问题
    const randomIndex = Math.floor(Math.random() * questionKeys.length);
    currentQuestionId = questionKeys[randomIndex];

    const currentQuestion = questions[currentQuestionId];
    document.querySelector(".question").innerHTML = currentQuestion.question;
    document.querySelector(".a").innerHTML = currentQuestion.a;
    document.querySelector(".b").innerHTML = currentQuestion.b;
    document.querySelector(".c").innerHTML = currentQuestion.c;
    document.querySelector(".d").innerHTML = currentQuestion.d;

    // 更新来源链接
    const fromLink = document.querySelector(".from");
    if (currentQuestion.from) {
        fromLink.href = currentQuestion.from;
        fromLink.textContent = "来源: " + currentQuestion.from;
        fromLink.style.display = "inline";
    } else {
        fromLink.style.display = "none";
    }
}

// 数据加载后会在fetch回调中自动加载第一个问题

document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", () => {
        const selectedOption = option.dataset.option;
        const correctAnswer = questions[currentQuestionId].answer;

        if (selectedOption === correctAnswer) {
            document.querySelector(".question").innerHTML = "回答正确！";
            option.classList.add("correct");
        } else {
            document.querySelector(".question").innerHTML = "回答错误！";
            option.classList.add("wrong");
            // 添加背景变红和抖动动画
            document.body.classList.add("wrong-answer");
            // 动画结束后移除类
            // 显示参考链接
            document.querySelector(".reference").style.display = "";
            document.querySelector(".reference").innerHTML = questions[currentQuestionId].reference;
            document.querySelector(".reference").href = questions[currentQuestionId].reference;
            setTimeout(() => {
                document.body.classList.remove("wrong-answer");
            }, 500);
        }

        // 显示正确答案的选项
        document.querySelectorAll(".option").forEach(opt => {
            if (opt.dataset.option === correctAnswer) {
                opt.classList.add("correct");
            }
        });
    });
});

// 下一题按钮点击事件
document.querySelector("#nextBtn").addEventListener("click", () => {
    // 清除所有选项的状态
    document.querySelectorAll(".option").forEach(opt => {
        opt.classList.remove("correct", "wrong");
    });
    // 隐藏参考链接
    document.querySelector(".reference").style.display = "none";
    // 加载新问题
    getRandomQuestion();
});