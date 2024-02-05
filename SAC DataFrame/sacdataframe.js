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
			//console.log("loadWidget call");
			await getScriptPromisify('https://cdn.jsdelivr.net/npm/danfojs@1.1.2/lib/bundle.min.js');
			
			var main_container = this.shadowRoot.getElementById('main_container');
			
			this.dfd = dfd;
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
		
		// DataFrame creation
		newDataFrame(data, options) {
			
			var df = null;
			
			if(this.dfd != null) {
				df = new this.dfd.DataFrame(data, options);
			}
			
			return df;
		}
		
		/*** Attributes ***/
		// index
		index(dataframe) {
			
			var idx = new Array();
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					idx = df.index;
				}
			}
			
			return idx;
		}
		
		// column
		column(dataframe, name) {
			
			var col = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					col = df.column(name);
				}
			}
			
			return col;
		}
		
		// values
		values(dataframe) {
			
			var values = new Array();
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					values = df.values;
				}
			}
			
			return values;
		}
		
		// axis
		axis(dataframe) {
			
			var axis_obj = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					axis_obj = df.axis;
				}
			}
			
			return axis_obj;
		}
		
		// shape
		shape(dataframe) {
			
			var shape_arr = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					shape_arr = df.shape;
				}
			}
			
			return shape_arr;
		}
		
		/*** Indexing, iteration ***/
		// head
		head(dataframe, rows) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.head(rows);
				}
			}
			
			return df;
		}
		
		// loc
		loc(dataframe, args) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.loc(args);
				}
			}
			
			return df;
		}
		
		// iloc
		iloc(dataframe, args) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.iloc(args);
				}
			}
			
			return df;
		}
		
		// tail
		tail(dataframe, rows) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.tail(rows);
				}
			}
			
			return df;
		}
		
		// query
		query(dataframe, kwargs) {
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.query(kwargs);
				}
			}
			
			return df;
		}
		
		/*** Binary operator functions ***/
		// Add
		add(dataframe, other, option) {
			
			var df_new = null;
			
			if(dataframe != null) {
				
				var df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df_new = df.add(other, option);
				}
			}
			
			return df_new;
		}
		
		addDataFrame(dataframe, other, option) {
			
			return this.add(dataframe, other, option);
		}
		
		addValue(dataframe, value, option) {
			
			return this.add(dataframe, value, option);
		}
		
		addValues(dataframe, values, option) {
			
			return this.add(dataframe, values, option);
		}
		
		
		/*** Combining / comparing / joining / merging ***/
		// Append a row
		appendRow(dataframe, values, index, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.append(values, index, {inplace:inplace});
				}
			}
			
			return df;
		}
		
		
		// Add a new column of values
		addColumn(dataframe, column, values, inplace) {
			
			var df = null;
			
			if(dataframe != null) {
				
				df = this.newDataFrame(dataframe.$data, {columns: dataframe.$columns});
				
				if(df != null) {
					df = df.addColumn(column, values, {inplace:inplace});
				}
			}
			
			return df;
		}
    }

    window.customElements.define('com-sap-sample-sacdataframe', SACDataFrame);
})()
