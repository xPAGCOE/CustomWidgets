/*!
	SACJavaScriptHelper.js
*/

var getScriptPromisify = (src) => {
    return new Promise(resolve => {
      $.getScript(src, resolve)
    })
  }

(function () {
    const template = document.createElement('template');
    template.innerHTML = `
	<style>
    :host {
		font-size: 14px;
		font-family: arial;
		font-color: #346187;
		overflow: overlay;
    }
	</style>
    <div id="main_container" hidden>
    </div>
    `;

    class SACJavaScriptHelper extends HTMLElement{
		
        constructor(){
            console.log("constructor call");
			super();

            //HTML objects
            let shadowRoot = this.attachShadow({mode:'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));
    
            this._props = {};
			
			// JS objects Map
			this.objects_map = new Map();
        }
		
		// loadWidget
		async loadWidget() {
			var main_container = this.shadowRoot.getElementById('main_container');
		}
		
		// SAC custom widget events handlers
        onCustomWidgetBeforeUpdate(changedProperties) {
			console.log("onCustomWidgetBeforeUpdate call");
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			console.log("onCustomWidgetAfterUpdate call");
			console.log(changedProperties);
		}
		
		connectedCallback(){
			console.log("connectedCallback call");
		}
		
		// Methods
		
		// Map proxy
		createMap(map_id) {
			
			var bresult = false;
			
			if(!this.objects_map.has(map_id)) {
				this.objects_map.set(map_id, new Map());
				bresult = this.objects_map.has(map_id);
			}
			
			return bresult;
		}
		
		clearMap(map_id) {
			
			var bresult = false;
			
			if(this.objects_map.has(map_id)) {
				let map = this.objects_map.get(map_id);
				map.clear();
				bresult = (map.size === 0);
			}
			
			return bresult;
		}
		
		deleteMap(map_id) {
			
			var bresult = false;
			
			if(this.objects_map.has(map_id)) {
				let map = this.objects_map.get(map_id);
				map.clear();
				bresult = this.objects_map.delete(map_id);
			}
			
			return bresult;
		}
		
		setMapItem(map_id, key, value) {
			
			var bresult = false;
			
			if(this.objects_map.has(map_id)) {
				let map = this.objects_map.get(map_id);
				map.set(key, value);
				bresult = map.has(key);
			}
			
			return bresult;
		}
		
		getMapItem(map_id, key) {
			
			var sresult = {};
			
			if(this.objects_map.has(map_id)) {
				let map = this.objects_map.get(map_id);
				sresult = map.get(key);
			}
			
			return sresult;
		}
		
		deleteMapItem(map_id, key) {
			
			var bresult = false;
			
			if(this.objects_map.has(map_id)) {
				let map = this.objects_map.get(map_id);
				bresult = map.delete(key);
			}
			
			return bresult;
		}
		
		hasMapItem(map_id, key) {
			
			var bresult = false;
			
			if(this.objects_map.has(map_id)) {
				let map = this.objects_map.get(map_id);
				bresult = map.has(key);
			}
			
			return bresult;
		}
		
		getMapItems(map_id) {
			
			var tresult = new Array(0);
			
			if(this.objects_map.has(map_id)) {
				let map = this.objects_map.get(map_id);
				for(const ite of map.values()) {
					tresult.push(ite);
				}
			}
			
			return tresult;
		}
		
		getMapSize(map_id) {
			
			var nresult = 0;
			
			if(this.objects_map.has(map_id)) {
				let map = this.objects_map.get(map_id);
				nresult = map.size;
			}
			
			return nresult;
		}
		
		// Set proxy
		createSet(set_id) {
			
			var bresult = false;
			
			if(!this.objects_map.has(set_id)) {
				this.objects_map.set(set_id, new Set());
				bresult = this.objects_map.has(set_id);
			}
			
			return bresult;
		}
		
		clearSet(set_id) {
			
			var bresult = false;
			
			if(this.objects_map.has(set_id)) {
				let set = this.objects_map.get(set_id);
				set.clear();
				bresult = (set.size === 0);
			}
			
			return bresult;
		}
		
		deleteSet(set_id) {
			
			var bresult = false;
			
			if(this.objects_map.has(set_id)) {
				let set = this.objects_map.get(set_id);
				set.clear();
				bresult = this.objects_map.delete(set_id);
			}
			
			return bresult;
		}
		
		addSetItem(set_id, value) {
			
			var bresult = false;
			
			if(this.objects_map.has(set_id)) {
				let set = this.objects_map.get(set_id);
				set.add(value);
				bresult = set.has(value);
			}
			
			return bresult;
		}
		
		deleteSetItem(set_id, value) {
			
			var bresult = false;
			
			if(this.objects_map.has(set_id)) {
				let set = this.objects_map.get(set_id);
				bresult = set.delete(value);
			}
			
			return bresult;
		}
		
		hasSetItem(set_id, value) {
			
			var bresult = false;
			
			if(this.objects_map.has(set_id)) {
				let set = this.objects_map.get(set_id);
				bresult = set.has(value);
			}
			
			return bresult;
		}
		
		getSetItems(set_id) {
			
			var tresult = new Array(0);
			
			if(this.objects_map.has(set_id)) {
				let set = this.objects_map.get(set_id);
				for(const ite of set.values()) {
					tresult.push(ite);
				}
			}
			
			return tresult;
		}
		
		getSetSize(set_id) {
			
			var nresult = 0;
			
			if(this.objects_map.has(set_id)) {
				let set = this.objects_map.get(set_id);
				nresult = set.size;
			}
			
			return nresult;
		}
		
		// Local Storage proxy
		setLocalStorageItem(key, value) {
			var bresult = false;
			
			try {
				var nlen = localStorage.length;
				localStorage.setItem(key, value);
				bresult = (localStorage.length === ++nlen);
			}
			catch(e) {
				bresult = false;
			}
			
			return bresult;
		}
		
		getLocalStorageItem(key) {
			var sresult = "";
			
			try {
				sresult = localStorage.getItem(key);
			}
			catch(e) {
				sresult = "";
			}
			
			return sresult;
		}
		
		removeLocalStorageItem(key) {
			var bresult = false;
			
			try {
				var nlen = localStorage.length;
				localStorage.removeItem(key);
				bresult = (localStorage.length === --nlen);
			}
			catch(e) {
				bresult = false;
			}
			
			return bresult;
		}
		
		clearLocalStorage() {
			var bresult = false;
			
			try {
				localStorage.clear();
				bresult = (localStorage.length === 0);
			}
			catch(e) {
				bresult = false;
			}
			
			return bresult;
		}
		
		getLocalStorageLength() {
			var nresult = 0;
			
			try {
				nresult = localStorage.length;
			}
			catch(e) {
				nresult = -1;
			}
			
			return nresult;
		}
		
		// Session Storage proxy
		setSessionStorageItem(key, value) {
			var bresult = false;
			
			try {
				var nlen = localStorage.length;
				sessionStorage.setItem(key, value);
				bresult = (sessionStorage.length === ++nlen);
			}
			catch(e) {
				bresult = false;
			}
			
			return bresult;
		}
		
		getSessionStorageItem(key) {
			var sresult = "";
			
			try {
				sresult = sessionStorage.getItem(key);
			}
			catch(e) {
				sresult = "";
			}
			
			return sresult;
		}
		
		removeSessionStorageItem(key) {
			var bresult = false;
			
			try {
				var nlen = sessionStorage.length;
				sessionStorage.removeItem(key);
				bresult = (sessionStorage.length === --nlen);
			}
			catch(e) {
				bresult = false;
			}
			
			return bresult;
		}
		
		clearSessionStorage() {
			var bresult = false;
			
			try {
				sessionStorage.clear();
				bresult = (sessionStorage.length === 0);
			}
			catch(e) {
				bresult = false;
			}
			
			return bresult;
		}
		
		getSessionStorageLength() {
			var nresult = 0;
			
			try {
				nresult = sessionStorage.length;
			}
			catch(e) {
				nresult = -1;
			}
			
			return nresult;
		}
        
    }

    window.customElements.define('com-sap-sample-sacjavascripthelper', SACJavaScriptHelper);
})()
