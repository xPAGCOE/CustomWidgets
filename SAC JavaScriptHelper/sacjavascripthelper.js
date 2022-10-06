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
			
			tresult = new Array(0);
			
			if(this.objects_map.has(map_id)) {
				let map = this.objects_map.get(map_id);
				for(var ite in map.values()) {
					console.log(ite);
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
        
    }

    window.customElements.define('com-sap-sample-sacjavascripthelper', SACJavaScriptHelper);
})()
