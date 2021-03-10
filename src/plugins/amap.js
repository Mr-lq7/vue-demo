/*
 * 异步创建script标签 
 */
export default function MapLoader () { 
	return new Promise((resolve, reject) => {
	if (window.AMap) {
		resolve(window.AMap)
	} else {
		var script = document.createElement('script')
		script.type = 'text/javascript'
		script.async = true
		script.src = 'https://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=13ed970351e00c018ba3d252ed5d8812'
		script.onerror = reject
		document.head.appendChild(script)
	}
	window.initAMap = () => {
		resolve(window.AMap);
	}
	})
  }
