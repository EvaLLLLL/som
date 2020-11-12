// 元素选择
const test = som.find("#test")[0];
const t1 = som.find("#t1")[0];
const t2 = som.find("#t2")[0];
const t3 = som.find("#t3")[0];

// 元素创建
const t4 = som.create("t4");
const dragger = som.create("<div>dragger</div>");
som.append(test, t4);
som.after(test, dragger)

// 事件委托
som.on(test, "click", (e) => {
	console.log(som.text(e.target));
});

// 增加样式
som.style(dragger, "border", "1px solid red");
som.style(dragger, "cursor", "pointer");
som.style(dragger, "width", "75px");
som.style(dragger, "height", "75px");

// 变成可拖拽
som.drag(dragger, 8, 75)
