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
		
		createMap() {
			return JSON.stringify(new Map());
		}
		
		setMapItem(map, key, value) {
			
			try {
				var obj_map = JSON.parse(map);
				
				if(obj_map !== undefined) {
					obj_map.set(key, value);
					return JSON.stringify(obj_map);
				}
			}
			catch(e) {
				console.log(e.stack);
				console.log(e.message);
			}
			
			return map;
		}
		
		getMapItem(map, key) {
			try {
				var obj_map = JSON.parse(map);
				
				if(obj_map !== undefined) {
					return JSON.stringify(obj_map.get(key));
				}
			}
			catch(e) {
				console.log(e.stack);
				console.log(e.message);
			}
			
			return "";
		}
        
    }

    window.customElements.define('com-sap-sample-sacjavascripthelper', SACJavaScriptHelper);
})()
