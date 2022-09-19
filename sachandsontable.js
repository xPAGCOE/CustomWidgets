/*!
	SAC Handsontable.js
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
	<link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" />
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
			
			await getScriptPromisify('https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js');
			await getScriptPromisify('https://cdn.jsdelivr.net/npm/hyperformula/dist/hyperformula.full.min.js');
			
			var main_container = this.shadowRoot.getElementById('main_container');
			
			var options = {	data: null,
							rowHeaders: true,
							startRows: 15,
							height: 'auto',
							width: '100%',
							stretchH: 'all',
							columnHeaderHeight: 30,
							contextMenu: true,
							formulas: { engine: HyperFormula },
							fillHandle: { direction: 'vertical', autoInsertRow: true },
							startCols: this.colCount,
							colHeaders: this.colHeaders,
							columns: this.colTypes2,
							licenseKey: 'non-commercial-and-evaluation' // for non-commercial use only
						};
						
			// Destroy existing handsontable instance
			if(this.htable !== null) {
				if (!this.htable.isDestroyed) {
					this.htable.destroy();
				}
			}
			
			this.htable = new Handsontable(main_container, options);
			
			//this.htable.addHook('afterOnCellCornerMouseDown', afterOnCellCornerMouseDownHandler);
		}
		
		// reloadWidget with new options
		async reloadWidget(options) {
			if(this.htable !== null) {
				this.htable.updateSettings(options);
			}
		}

		// SAC custom widget events handlers
        onCustomWidgetBeforeUpdate(changedProperties) {
			console.log("onCustomWidgetBeforeUpdate call");
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			console.log("onCustomWidgetAfterUpdate call");
			
			console.log(changedProperties);
			
			if ("colCount" in changedProperties) {
				this.colCount = changedProperties["colCount"];
			}
			if ("colHeaders" in changedProperties) {
				this.colHeaders = changedProperties["colHeaders"];
			}
			if ("colTypes" in changedProperties) {
				this.colTypes = changedProperties["colTypes"];
				console.log(this.colTypes);
				
				this.colTypes2 = new Array();
				
				for (let i=0; i<this.colTypes.length; i++) {
					switch(this.colTypes[i]) {
						case "text":
							this.colTypes2[i] = { type: 'text' };
							break;
						case "numeric":
							this.colTypes2[i] = { type: 'numeric' };
							break;
						case "integer":
							this.colTypes2[i] = { type: 'numeric', numericFormat: { pattern: '0' } };
							break;
						case "date":
							this.colTypes2[i] = { type: 'date', dateFormat: 'YYYY-MM-DD' };
							break;
						case "member":
						case "property":
							this.colTypes2[i] = { type: 'autocomplete', source: ['New value...'], strict: true, allowInvalid: true, trimDropdown: true };
							break;
						default:
							this.colTypes2[i] = { type: 'text' };
							break;
					}
				}
				console.log(this.colTypes2);
			}
			
			if(this.htable === null) {
				this.loadWidget();
			}
			else {
				this.reloadWidget({ startCols: this.colCount,
									colHeaders: this.colHeaders,
									columns: this.colTypes2 });
			}
		}
		
		connectedCallback(){
			console.log("connectedCallback call");
		}
		
		// Set columns types
		setColType(position, type) {
			this.colTypes[position] = type;
			this.colTypes2[position].type = type;
			
			this.reloadWidget({ columns: this.colTypes2 });
		}
		
		// Set columns values for autocomplete cells
		setColValues(position, values) {
			if (this.colTypes2[position].type == 'autocomplete') {
				this.colTypes2[position].source = this.colTypes2[position].source.concat(values);
				
				this.reloadWidget({ columns: this.colTypes2 });
			}
		}
		
		// Setters & Getters
		setData(value) {
			this.data = value;
			
			this.reloadWidget({ data: this.data });
		}
		
		// Retrieve the data from the table
		getData() {
			if (this.htable !== null) {
				
				// Retrieve data as array of arrays
				let tbl_data = this.htable.getData();
				console.log("Source data: " + tbl_data);
				
				let src_data = "[";
				
				if (tbl_data !== undefined) {
					let i, j, tbl_row;
					
					for (i=0; i<tbl_data.length; i++) {
						
						if (i > 0) { src_data = src_data.concat(","); }
						
						tbl_row = "{";
						
						for (j=0; j<tbl_data[i].length; j++) {
							if (j > 0) { tbl_row = tbl_row.concat(","); }
							tbl_row = tbl_row.concat("\"", this.colHeaders[j], "\":\"", tbl_data[i][j], "\"");
						}
						
						tbl_row = tbl_row.concat("}");
						
						src_data = src_data.concat(tbl_row);
					}
					
					src_data = src_data.concat("]");
					//console.log("Data: " + src_data);
					
					this.data = JSON.parse(src_data);
					//console.log("Data JSON: " + this.data);
				}
			}
			
			return this.data;
		}
		
		// Set data schema
		setSchema(schema, columns_map) {
			
			if(this.colTypes2.length === columns_map.length) {				
				for(var i=0; i<columns_map.length; i++) {
					this.colTypes2[i].data = columns_map[i].data;
				}
				
				this.reloadWidget({ dataSchema:schema, 
									columns:this.colTypes2 });
			}
		}

		// Custom events handlers
        // afterOnCellCornerMouseDown
		/*
		afterOnCellCornerMouseDownHandler (evt) {
			console.log("afterOnCellCornerMouseDown triggered");
		}
		*/
    }

    window.customElements.define('com-sap-sample-sachandsontable', SACHandsonTable);
})()
