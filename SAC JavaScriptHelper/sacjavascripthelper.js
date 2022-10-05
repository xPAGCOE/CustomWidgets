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
    <div id="main_container" width="100%">
    </div>
    `;

    class SACHandsonTable extends HTMLElement{
		
        constructor(){
            console.log("constructor call");
			super();

            //HTML objects
            let shadowRoot = this.attachShadow({mode:'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));
    
            this._props = {};
			
			this.htable = null;
			this.data = null;
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
		
		// Setters & Getters
		
		getData() {
			return this.data;
		}

		// Custom events handlers
        // afterOnCellCornerMouseDown
		/*
		afterOnCellCornerMouseDownHandler (evt) {
			console.log("afterOnCellCornerMouseDown triggered");
		}
		*/
    }

    window.customElements.define('com-sap-sample-sacjavascripthelper', SACJavaScriptHelper);
})()
