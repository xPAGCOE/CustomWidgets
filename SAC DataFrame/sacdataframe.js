/*!
	SACDataFrame.js
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
	<script src="https://cdn.jsdelivr.net/npm/danfojs@1.1.2/lib/bundle.min.js"></script>
    <div id="main_container" hidden>
    </div>
    `;

    class SACDataFrame extends HTMLElement{
		
        constructor(){
            console.log("constructor call");
			super();

            //HTML objects
            let shadowRoot = this.attachShadow({mode:'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));
    
            this._props = {};
			
			// private attributes
			this.df = {};
        }
		
		// loadWidget
		async loadWidget() {
			await getScriptPromisify('https://cdn.jsdelivr.net/npm/danfojs@1.1.2/lib/bundle.min.js');
			
			var main_container = this.shadowRoot.getElementById('main_container');
			
			console.log("loadWidget call");
			console.log(dfd);
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
		newDataFrame(data, options) {
			
			console.log("newDataFrame call");
			console.log(data);
			console.log(options);
							
			let var_df = new dfd.DataFrame(data, options);
			
			return this.df;
		}
		
		appendRow(values, index, inplace) {
			
			this.df = this.df.append(values, index, {inplace:inplace});
			
			return this.df;
		}
		
		addColumn(column, values, inplace) {
			
			this.df = this.df.addColumn(column, values, {inplace:inplace});
			
			return this.df;
		}
    }

    window.customElements.define('com-sap-sample-sacdataframe', SACDataFrame);
})()
