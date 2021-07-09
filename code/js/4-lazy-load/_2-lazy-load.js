// export {}
const template = `<li class="img-item">
  <div class="img-wrap">
    <img src="images/pad.png" class="list-img" data-src="{{img}}" alt="{{name}}">
  </div>
  <div class="img-title">
    <h1>{{name}}</h1>
  </div>
</li>`;

const data = [
  { img: 'images/1.png', name: 'pic1'},
  { img: 'images/2.png', name: 'pic2'},
  { img: 'images/3.png', name: 'pic3'},
  { img: 'images/4.png', name: 'pic4'},
  { img: 'images/5.png', name: 'pic5'},
  { img: 'images/6.png', name: 'pic6'},
  { img: 'images/7.png', name: 'pic7'},
  { img: 'images/8.png', name: 'pic8'},
];

const imgContainer = document.querySelector('.img-list');

const imgList = renderList(data);
imgContainer.innerHTML = imgList;

bindEvent();
setTimeout(() => {
  window.scrollTo(0, 0);
}, 200)
function bindEvent() {
  // 获取所有的 img 标签。
  const imgList = document.querySelectorAll('.list-img');
  window.onload = window.onscroll = throttle(lazyLoad(imgList));
}

function renderList(data) {
  let list = [];
  let elStr;
  
  data.forEach((item) => {
    elStr = template.replace(/{{(.*?)}}/g, function (node, key) {
      // console.log(node);
      // console.log(key);
      return {
        img: item.img,
        name: item.name,
      }[key]
    })
    list.push(elStr);
  })
  return list.join('\r\n');
}

function lazyLoad(images) {
  const len = images.length;
  let n = 0;
  return function () {
    const cHeight = document.documentElement.clientHeight,
          sTop    = document.documentElement.scrollTop || document.body.scrollTop;
    let imgItem;
    for (let i = n; i < len; i++) {
      imgItem = images[i];
      if (imgItem.offsetTop < cHeight + sTop) {
        // console.log(imgItem.getAttribute('data-src'))
        loadImg(imgItem);
        n++;
      }
    }
  }
}

function loadImg(img) {
  img.src = img.getAttribute('data-src') || "";
  img.removeAttribute('data-src');
}

function throttle(fn, wait=200, options={
  heading: true,
  tailing: true,
}) {
  let prev = 0;
  let timeout = null;
  const { heading, tailing } = options;
  const clear= function () {
    clearTimeout(timeout);
    timeout = null;
  }

  return function () {
    let result;
    let now = +new Date();
    const remaining = wait - (now - prev);
    if (heading && remaining > wait || remaining < 0) {
      if (timeout) clear();
      prev = now;
      result = fn.apply(this, arguments);
    } else if (timeout === null && tailing) {
      timeout = setTimeout(() => {
        result = fn.apply(this, arguments);
        prev = +new Date();
        timeout = null;
      }, remaining);
    }
    return result;
  }
}