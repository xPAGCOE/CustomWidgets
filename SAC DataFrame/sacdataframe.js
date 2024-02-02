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
			this.dfd = null;
        }
		
		// loadWidget
		async loadWidget() {
			console.log("loadWidget call");
			await getScriptPromisify('https://cdn.jsdelivr.net/npm/danfojs@1.1.2/lib/bundle.min.js');
			
			var main_container = this.shadowRoot.getElementById('main_container');
			
			this.dfd = dfd;
			console.log(dfd);
		}
		
		// SAC custom widget events handlers
        onCustomWidgetBeforeUpdate(changedProperties) {
			//console.log("onCustomWidgetBeforeUpdate call");
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			//console.log("onCustomWidgetAfterUpdate call");
			//console.log(changedProperties);
			this.loadWidget();
		}
		
		connectedCallback(){
			//console.log("connectedCallback call");
		}
		
		// Methods
		newDataFrame(data, options) {
			
			var df = null;
			
			if(this.dfd != null) {
				df = new this.dfd.DataFrame(data, options);
			}
			
			return df;
		}
		
		appendRow(dataframe, values, index, inplace) {
			
			var df = null;
			
			if((dataframe != null) && (this.dfd != null)) {
				df = new this.dfd.DataFrame(dataframe);
				df = df.append(values, index, {inplace:inplace});
			}
			
			return df;
		}
		
		addColumn(dataframe, column, values, inplace) {
			
			console.log("addColumn call");
			var df = null;
			
			if((dataframe != null) && (this.dfd != null)) {
				df = new this.dfd.DataFrame(dataframe);
				console.log(df);
				df = df.addColumn(column, values, {inplace:inplace});
			}
			
			return df;
		}
    }

    window.customElements.define('com-sap-sample-sacdataframe', SACDataFrame);
})()
