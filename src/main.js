const div = dom.find("#test")[0]
dom.style(div, "color", "red")

// const div3 = dom.find("#t3")[0]
// dom.style(div3, "color", "red")
// const n = dom.style(div3, "color")
// console.log(n)

const div3 = dom.find("#t3")[0]
dom.style(div3, {color: "yellow"})

const divList = dom.find(".red")
dom.each(divList, (n) => console.log(n))